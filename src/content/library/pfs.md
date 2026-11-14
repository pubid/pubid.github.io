---
title: "The .pfs Format Schema Language"
description: "The PFS language reference: what a .pfs definition declares, what the compiler enforces, and how a compiled flavor is proven byte-parity against its coded sibling."
---

# The .pfs Format Schema Language

A `.pfs` file is the data form of an identifier flavor: plain YAML that
declares the scheme's publishers, type tokens, field patterns, canonical and
alternate templates, typed-stage bindings, URN schema and — required, not
optional — its examples. The compiler
([`scripts/pfs`](https://github.com/pubid/pubid-grammar/blob/main/scripts/pfs)
in [pubid-grammar](https://github.com/pubid/pubid-grammar)) generates the
PARG edition-2 grammar from the declarations, bakes the artifact through the
pinned parsanol pipeline, verifies every example against the **baked**
artifact, and can emit the Ruby flavor module a gem vendors. The
TypeScript side loads the same baked artifact, so one definition file, one
bake, produces both engines' flavors with one conformance set.

This page is the working reference. The normative language reference is
[`definitions/README.md`](https://github.com/pubid/pubid-grammar/blob/main/definitions/README.md)
in pubid-grammar; the adopted design — and the declarability matrix over all
44 flavors — is
[pubid#706](https://github.com/pubid/pubid/issues/706). For the concepts
behind the language, see [PFS — the PubID Format Schema](/concepts/pfs).

Every snippet on this page was compiled and verified with the real
toolchain (`scripts/pfs`, parsanol 1.3.126): each example file compiles
`pfs: 1`, bakes a checksum-verified artifact, and its positives and
negatives verify green.

## The worked example

The canonical worked example is the fictional-SDO scheme from pubid#706 §2 —
the Wxyz Standards Consortium (`WCS`). One type, two fields, a canonical
face with an alternate accept spelling:

```yaml
pfs: 1

scheme: wcs
title: "Wxyz Standards Consortium publications"

organization:
  name: "Wxyz Standards Consortium"
  publisher: "WCS"
  prefixes: ["WCS"]

grammar:
  digit: "%x30-39"
  number_char: "%x30-39 / %x2E"

types:
  standard:
    key: std
    title: "Wxyz Standard"
    short: "STD"
    tag: "pubid:wcs:std"
    stage:
      code: pubwcs
      stage_code: published
      abbr: ["WCS"]

fields:
  number:
    pattern: "1*number_char"
    kind: string
  year:
    pattern: "4digit"
    kind: string

templates:
  canonical: '"WCS/STD" " " {number} ":" {year}'
  alternates:
    - '"WCS" " " "STD" " " {number} " " {year}'

urn:
  namespace: wcs
  schema:
    atoms:
      - { path: number, prefix: number }
      - { path: year, prefix: year }
    types:
      - { type: "pubid:wcs:std", token: std, core: [] }

examples:
  positives:
    - input: "WCS/STD 101:2024"
      renders: "WCS/STD 101:2024"
    - input: "WCS STD 101 2023"
      renders: "WCS/STD 101:2023"
    - input: "WCS STD 10.5 2026"
      renders: "WCS/STD 10.5:2026"
  negatives:
    - "WCS/STD :2024"
    - "WCS/STD 101:20"
    - "WCS/XYZ 101:2024"
```

Compiling it bakes the artifact and replays the examples against the bake —
this exact file compiles green (the output paths are passed explicitly so
the printout stays machine-independent; the defaults land in the
compiler's own `grammars/` and `artifacts/`):

```console
$ ruby scripts/pfs compile wxyz.pfs --as wcs_pfs \
    --grammar-out grammars/wcs_pfs.parg --artifact-out artifacts/wcs_pfs.json \
    --parsanol-version 1.3.126
compiled wxyz.pfs (pfs:1) -> grammars/wcs_pfs.parg
baked -> artifacts/wcs_pfs.json (checksum sha256:c7401..., compiler 1.3.126)
examples: 3 positives, 3 negatives — verified against the baked artifact
```

(The checksum covers the artifact envelope, which records the definition's
source path — same definition, same relative path, same checksum.)

The alternate accepts `WCS STD 101 2023` and normalizes it to the canonical
`WCS/STD 101:2023`; the negatives show the field shapes doing the rejecting
(a missing number, a two-digit year, a foreign scheme token).

## The file, section by section

| Section | Required | Declares |
|--|--|--|
| `pfs` | yes | the schema major — exactly `1` in v1 |
| `scheme` / `title` | yes | the scheme key and display title |
| `organization` | yes | the body's name, its PUBLISHER constant, the head-dispatch tokens `Pubid.parse` routes on |
| `modules` | no | the module-library bindings (name, pinned version, parameters) |
| `grammar` | no | named lexical terms — PARG fragments the fields and templates reference; every segment carries a semantic name |
| `date` | no | the calendar binding: fields folded into the shared `Components::Date` |
| `types` | yes | the identifier types: semantic key, wire tag, typed-stage binding |
| `fields` | yes | the captures: each a whole-pattern lexical rule with a kind (`string` or `list`), optional sub-numbering, builder-only folds |
| `templates` | yes | the canonical render face and the alternate accept spellings |
| `supplements` | no | the supplement run: synthesized amendment/corrigendum wrapper classes over the base |
| `urn` | yes | the scheme's URN namespace, the official segment order, the pubid-scheme schema |
| `mr` | no | the MR-slug hooks: the segments the shared MrString renderer reads from the columns |
| `examples` | yes | the live test panel: positives that must parse and render, negatives that must fail |

The file is plain YAML — mappings, sequences, scalars. Anchors, aliases,
tags, merge keys and duplicate keys are all rejected: a schema that is the
wizard's lossless substrate must round-trip exactly, so the silent
last-key-wins of duplicate keys cannot hide a copy-pasted declaration.

### `types:` — the typed identity

Each type declares its semantic `key`, an optional `web` segment, titles,
the wire tag (defaulting to `pubid:<scheme>:<name>`), and an optional typed
stage binding — the body-local `code`, the harmonized `stage_code`, and the
parse-in `abbr` spellings. Two types may not claim the same key, the same
wire tag, or the same stage abbreviation; either collision is a compile
error citing both claimants. In v1 the generated Ruby flavor is
single-type: a multi-type scheme models one type per definition (the CEN
port models the EN face, its other classes staying coded). The one
multi-class shape is the `supplements:` declaration, which synthesizes the
wrapper classes itself (below) — those are not declared types.

### `fields:` — the captures

A field's `pattern` is one PARG term; the whole pattern is the capture, so
the model stores exactly what the scheme defines — the DOI definition's
prefix pattern captures the whole printed `10.` face, no builder
re-assembly. v1 carries two kinds: `string` (the whole capture is one
attribute) and `list` (a collection binding — below). Repetition is
ABNF-shaped: `1*digit` (one or more), `4digit` (exactly four), `2*digit`
(two or more).

Three pattern-level extensions ride on a field:

- `sub_numbering: {separators: [...]}` — the tier-B extension that folds
  `[ (sep1 / sep2 …) 1*digit ]` onto the pattern with the capture staying
  whole (CalConnect's `CC/Adv 0707.1:2007` — the `0707.1` is part of the
  number, exactly as the coded flavor models it);
- `builder_only: true` — a capture the builder consumes but no template
  renders (the etsi definition's `part` item and `edition` face);
- `fold: {into: target, flag: is_edition}` — the fold: a builder-only
  capture lands on another field's column plus a boolean flag (etsi's
  `edition` → `version` + `is_edition`); the source's render presence is
  the flag, the target's is suppressed while it holds, so the `V1.5.1`
  and `ed.1` faces stay mutually exclusive at render time exactly as the
  grammar makes them at parse time. A fold requires a plain `into:` target
  and a collision-free `flag:`.

A `kind: list` field is a **collection binding**: it binds an `item:`
capture per repetition. The etsi definition's `parts` field has pattern
`1*("-" etsi_part)` with `item: part` — the printed `-1-0` dash run binds
as `["1", "0"]`, dropped when empty. The `render:` composition drives the
face — `render: {glue: "-", style: prefix}` glues each item before itself
(`-1-0`); `style: infix` joins with the glue instead. The item capture is
a plain string field the list claims; it is not a render surface.

### `templates:` — the template language

Templates carry four kinds of segments, and nothing else:

- `"literal"` — a quoted literal face;
- `{field}` — a declared field, compiled to its capture, rendered as the
  identifier's value;
- `bare_word` — a reference to a `grammar:` rule (or a bound module's);
- `[ … ]` — an optional segment, with alternation written `a / b`.

The **canonical** template is the render face and must be a single sequence;
top-level alternation there is rejected — variants belong under
`alternates:`, which are parse-in spellings that normalize to the canonical
form. An optional in the canonical face is a **presence guard**: it renders
its inner face iff every field directly inside captured, with nested
optionals deciding their own presence inside — so CalConnect's face

```yaml
canonical: '"CC" ["/" {series}] " " {number} [":" {year} ["-" {month} "-" {day}]]'
```

renders `CC/WD 51017:2024-07-23` and `CC 18011` alike, with no stray
separators. Presence guards are the tier-A declarable rendering surface —
value-dependent branch logic stays with coded flavors. An optional with no
field anywhere inside cannot render and is rejected.

An **alternated optional** is a conditional render segment: it renders its
first alternative whose fields captured. The etsi canonical face's tail —

```yaml
canonical: '"ETSI " {type} " " {number} [" " {minor}] [{parts}]{supplements}[" V" {version} / " ed." {edition}] [" (" {year} "-" {month} ")"]'
```

— renders ` V1.5.1` for a versioned row and ` ed.1` for an edition row
(the `ed.` alternative renders under the fold flag), so every dated input
renders its full printed form. The compiled renderer and the compiler's
own example verifier share these semantics, and the definition's
`renders:` rows pin them.

### `grammar:` — named lexical terms

The optional `grammar:` map declares named lexical terms the fields and
templates reference — PARG fragments, the scheme's char tables as data
(`digit: "%x30-39"`). Every segment carries a semantic name: a fragment
with an unnamed capture (`( … )` without `as name`) is a compile-time
rejection citing the rule, and the compiler names every generated rule the
same way (`number`, `part`, `supplement_kind`, …) — the grammar is
self-understandable to the bodies reading it (owner directive,
2026-11-13).

### `supplements:` — the supplement run

The etsi definition declares the printed supplement run (`/A1/C1`) once:

```yaml
supplements:
  run: supplements
  item: supplement
  kind: supplement_kind
  number: supplement_number
  wrappers:
    amendment:
      face: "A"
      tag: "pubid:etsi:amendment"
      title: "Amendment"
    corrigendum:
      face: "C"
      tag: "pubid:etsi:corrigendum"
      title: "Corrigendum"
```

The compiler generates the run grammar from the declared kind faces (the
run/item/kind/number names must be free; two wrappers claiming one kind
face, or one wire tag, cite both), and the builder folds the run into
**synthesized wrapper classes** — `{_type, number, base}`, outermost last,
so the printed order IS the nesting: `ETSI ETS 300 092-1/A1/C1` is
Corrigendum(1, Amendment(1, Standard)). The wrappers carry the supplement
suffix in the MR slug themselves, and the schema's wrapper rows carry the
Integer ordinal as an int-kind core (below).

### `date:` — the calendar binding

`date: {fields: [year, month, day]}` folds the named fields into the shared
`Pubid::Components::Date` the coded flavors use: one attribute, a builder
composing the component, a flat canonical hash. Without it, every field is
a plain string attribute.

### `urn:` — the machine forms

`namespace` is the scheme's official URN namespace; `official` declares the
official URN's ordered segments — absent fields leave no segment. A segment
is a field (optionally `lower:`cased), a fused date group joined with `-`,
or one of the composition surfaces:

```yaml
official:
  - { field: type, lower: true }
  - compose:
      - { field: number }
      - { field: minor, glue: " " }
      - { field: parts, glue: "-", style: prefix }
  - { field: version, affix: "v", edition_affix: "ed.", lower: true }
  - { date: [year, month] }
```

(the etsi definition's declaration, byte-identical with the coded
generator's output): a `compose:` glues slots into one segment; an `affix:`
prefixes the field's value, and `edition_affix:` replaces the affix while
the fold flag holds — `V1.5.1` yields the `v1.5.1` segment, `ed.1` the
`ed.1` segment.

`schema` is the pubid-scheme schema (`PubidUrn.define`): `atoms` (path +
prefix, optionally `kind: list`) and `types` (wire tag, token, positional
core). A core entry may be a bare path (string-kind, the legacy emission)
or a `[path, kind]` pair — `[[number, int]]`, the coded schemas' Integer
supplement ordinals. A compiled flavor inherits the
whole [pubid URN scheme](/library/pubid-urn-scheme) — round-trip, slug,
path safety and the canonical gate — by construction.

### `mr:` — the MR-slug hooks

The shared MrString renderer reads its segments from the columns; the
`mr:` declaration fills the slots the scheme prints differently:

```yaml
mr:
  type: { field: type }
  number: { join: [number, minor, parts], glue: "-" }
  year: { join: [year, month], glue: "-" }
  edition: { field: version }
```

(the etsi definition's hooks — its slug is `etsi.eg.201-880.1-2-1`).
Undeclared segments keep the shared model's answer; the supplement
suffix is the wrapper's own rule, so the compiled slug is byte-identical
with the coded one.

### `examples:` — the live test panel

At least one positive is required. Each positive must parse against the
generated grammar, render as its declared `renders:`, and bind identically
through the baked artifact; each negative must fail to parse. The examples
double as the grammar's embedded test block, so the artifact replays them in
every engine — and the wizard runs them live as the user builds.

## The module library

Schemes are not written from scratch — national bodies adopt the ISO/IEC
inner formats and CEN overlays them. The library ships that machinery as
named, versioned modules
([`definitions/modules/*.pfsmod`](https://github.com/pubid/pubid-grammar/tree/main/definitions/modules)):

| Module | Carries |
|--|--|
| `iso.inner` / `iec.inner` | the inner document face as a referenceable module — not the declared ISO/IEC schemes, which stay tier-D coded |
| `en.overlay` | the CEN adoption layer: the EN face with its draft tokens (`prEN`/`FprEN`) |
| `national.prefix` | the parameterized NSB tokens — DIN, BS, NF, SS-, NEN-, UNE-, ÖNORM, CAN/CSA — the parameter is data |
| `supplements.core` / `edition.core` | the core operators as bindings: the definition binds its body's vocabulary, never redefines what the operator does |

A definition binds a module by name **and** pinned version — a bare name
would let the version drift silently:

```yaml
modules:
  - module: iso.inner
    version: 1
  - module: en.overlay
    version: 1
  - module: national.prefix
    version: 1
    parameters:
      prefixes: ["DIN"]
  - module: supplements.core
    version: 1
```

(This exact binding compiles green. The definition's own surface around
it is a handful of lines — the canonical face and the examples — because
everything else comes from the modules:

```yaml
templates:
  canonical: '"DIN EN" " " {number} ["-" {part}] [":" {year}]'

examples:
  positives:
    - input: "DIN EN 1325"
      renders: "DIN EN 1325"
    - input: "DIN EN 12464-1:2011"
      renders: "DIN EN 12464-1:2011"
  negatives:
    - "DIN"
    - "nonsense"
    - "NF EN 1325"
```

```console
$ ruby scripts/pfs compile din.pfs --as din_pfs \
    --grammar-out grammars/din_pfs.parg --artifact-out artifacts/din_pfs.json \
    --parsanol-version 1.3.126
compiled din.pfs (pfs:1) -> grammars/din_pfs.parg
baked -> artifacts/din_pfs.json (checksum sha256:77e5a..., compiler 1.3.126)
examples: 2 positives, 3 negatives — verified against the baked artifact
```

The shipped
[`cen.pfs`](https://github.com/pubid/pubid-grammar/blob/main/definitions/cen.pfs)
composition port mirrors the same composition. `BS EN ISO 9001`,
`NF EN ISO 9001` and `DIN EN ISO 9001` are one definition composed with
the same modules and a different `prefixes` value.)

Modules declare **identity** composition, not just grammar: an NSB
identifier is a wrapper-with-adopted — the adopted document is the base —
and a module whose `identity:` names a `base_module:` holds the definition
to binding that module. They also declare their **extension hooks** (the BS
`+A1` national amendment numbering, re-dating); where a body exceeds the
parameters, it drops to a coded hook beside the definition — explicit, never
implicit.

The composition is checked at compile time, all cited:

| Rule | Check |
|--|--|
| unknown module | fail-closed — a module the library does not carry cannot be composed |
| version | the bound version must equal the shipped one — newer is refused (fail-closed), stale is refused too (no silent downgrade) |
| parameters | supplied keys must match the module's declarations; a required parameter missing is an error; reserved tokens fail inside parameter values |
| fragment collisions | a `grammar:` name claimed by two modules, or by a module and the definition, cites both — templates resolve against the merged view, so a collision would be a silent rebinding |
| token claims | two co-bound modules claiming one token cite both; a claim shared with the binding definition is co-ownership — binding is the sharing |
| identity base | a module whose identity names `base_module` holds the definition to binding it |

The composed flavor carries the resolved composition as an introspectable
`MODULES` constant, and the generated grammar header lists the bound modules
with their source hashes, so regeneration drift cites the module document.

## What the compiler rejects

Every rejection is a compile-time error whose message begins with the
offending rule — the section path of the declaration that failed
(`Pfs::InvalidDefinition`, or `Pfs::ExampleFailure` for the example panel):

| Rule | Check |
|--|--|
| `pfs` | exactly `1`; a higher major fails closed |
| unknown keys | any key the compiler does not know is an error — an unknown key means a dialect newer than `pfs: 1` |
| reserved tokens | `ed`, `amd`, `cor` cannot be claimed as type keys, publisher or prefix tokens, or stage abbreviations — nor by a module's tokens or parameters |
| ambiguity: types | two types claiming the same key, wire tag or stage abbreviation cite both |
| ambiguity: templates | an alternate structurally identical to the canonical face — or to another alternate — cites both |
| ambiguity: modules | fragment and token collisions across the composition cite both claimants |
| duplicate names | duplicate YAML keys are rejected by the strict loader with the duplicate's line; a field name colliding with a `grammar:` rule name is rejected |
| unknown references | templates referencing an undeclared `{field}` or `grammar:` rule; URN atoms, types and official segments referencing undeclared fields |
| malformed terms | multi-line `grammar:` fragments or field patterns (line discipline is the compiler's job), unbalanced quotes or brackets |
| named segments | a `grammar:` fragment with an unnamed capture (`( … )` without `as name`) is rejected citing the rule — every grammar segment carries a semantic name |
| render faces | a canonical optional with no field inside cannot render — presence would be undecidable; a list's item capture and the supplement run's internals are not render surfaces |
| lists | a `kind: list` field requires a declared `item:` (plain string, unclaimed) and a `render:` composition; a fold requires a plain `into:` target and a collision-free `flag:` |
| supplements | the run/item/kind/number names must be free; two wrappers claiming one kind face, or one wire tag, cite both |
| examples | at least one positive required; every positive must parse, render and bind identically through the baked artifact; every negative must fail |

## Versioning

`pfs: 1` is the schema major. Evolution is additive within a version; a new
major may reinterpret, and compilers refuse definitions newer than they
support — fail-closed, the engine's `binding_version` precedent. The same
rule applies per module: a definition pinned to a newer module major than
the library ships is refused, and so is a stale pin. The remaining
declared-but-unbuilt v1 surfaces — multiple declared `types:` per
generated flavor (the supplements declaration is the one multi-class
shape), free-standing `stages:` maps, semantic decode rules, field kinds
beyond `string` and `list` — fail closed rather than compiling halfway: a
definition using them stops at the error, never at a half-compiled flavor.

## Compiling

```bash
# compile + bake + verify (the engine pin is mandatory — bake-one.rb rule)
ruby scripts/pfs compile definitions/doi.pfs --as doi_pfs \
  --parsanol-version "$(grep -o 'PARSANOL_VERSION: .*' \
    .github/workflows/parg-conformance.yml | awk '{print $2}')"

# emit the Ruby flavor module for vendoring (the pubid PR's lib/ files)
ruby scripts/pfs compile definitions/doi.pfs --as doi_pfs \
  --parsanol-version 1.3.126 --ruby-out <pubid-repo>/lib

# regenerate the derived contracts (schemas/ + corpora/), then commit
# grammars/, artifacts/, schemas/, corpora/ together
rake contracts:regen
```

Generation is deterministic: recompiling a definition reproduces the
committed grammar and artifact byte-for-byte (spec-pinned), and CI fails on
any drift between the definitions and the committed outputs. The
`--as` flavor key differs from `scheme:` exactly when a compiled flavor
lands as a dev alias beside its coded sibling — the alias carries the
scheme-canonical wire tag and URN namespace, so its `to_hash`, `to_s`,
`to_urn` and `to_pubid_urn` stay byte-identical with the coded flavor while
`Pubid.parse` keeps routing to the coded one. Coexistence, not cutover;
cutover is a separate decision.

## One definition, both engines

The artifact is the runtime. The Ruby flavor vendors the generated module
over the baked artifact; the TypeScript side loads the same
`artifacts/<key>.json` through the artifact runtime — zero grammar code on
either side that is not derived from the definition. Three flavors exist
on both engines this way — `doi_pfs`
([pubid-ts#170](https://github.com/pubid/pubid-ts/pull/170)),
`calconnect_pfs`
([pubid-ts#174](https://github.com/pubid/pubid-ts/pull/174)) and
`etsi_pfs` ([pubid-ts#175](https://github.com/pubid/pubid-ts/pull/175)) —
each joined with a byte-parity gate over a shared conformance set, and
each flavor's pubid-urn schema table is the verbatim port of the Ruby
schema. One artifact, both engines.

## The parity harness

A compiled flavor is proven against its coded sibling by a parity harness —
[`spec/pubid/doi_pfs/parity_spec.rb`](https://github.com/pubid/pubid/blob/main/spec/pubid/doi_pfs/parity_spec.rb)
is the pattern: over **all** of the coded flavor's inputs (its fixtures, the
corpus rows with their aliases, constructed edge cases), the compiled flavor
and the coded one must agree byte-for-byte on `to_s` / `to_hash` / `to_urn`
/ `to_mr_string` / `to_pubid_urn`, and fail on the same inputs with the same
error class. The harness's own rule bears quoting: *drift is a defect in the
definition or the compiler, never a reason to relax an expectation here.*

The landed proofs — all four harnesses green on pubid main (2.0.26):

- `doi_pfs` — the smallest scheme, zero renderer branches: 55/55
  byte-identical;
- `etsi_pfs` — the largest corpus: **24,718/24,718 full parity** — accept,
  `to_hash`, `to_pubid_urn`, `to_s`, `to_urn` and `to_mr_string` on every
  row, the phase-2 pins closed by the compiler v2;
- `calconnect_pfs` — the acceptance port: **400-example byte parity over
  the whole corpus** (every payload row's canonical hash, human and urn
  forms, aliases and round trip, plus every negative);
- `cen_pfs` — the module-composition port: **55 corpus rows absorbed
  byte-identically, 134 pinned** as the unabsorbed ledger — the measured
  boundary of the module library, whose six coded-machinery blockers are
  documented in the definition's header.

cen's harness additionally pins the per-file row totals, so a compiler
advance that starts absorbing former-gap rows turns the spec red and
forces a conscious ledger update.

## v1 boundaries

The compiler v2 narrowed these from the phase-1 list — collection
bindings, conditional render segments, the fold, supplement wrappers,
int-kind URN cores, the declared URN-generator surface, the MR hooks and
the named-segments rule are all declarations now. What still fails closed,
stated plainly, so a definition stops at the error instead of compiling
halfway:

- multiple `types:` per generated Ruby flavor — the PARG grammar handles
  the general shape, the generated flavor is single-type (the supplements
  declaration is the one multi-class shape, and its wrapper classes are
  synthesized, not declared);
- free-standing `stages:` maps — body→harmonized mappings without a type;
- field kinds beyond `string` and `list`;
- semantic decode rules — the vintage-dependent decode problem stays a v2
  concern; alternates are spelling-only, per the facets ruling.

Tier-C flavors (BSI, IEEE, NIST) stay coded until their machinery is
declarable; ISO and IEC remain out of scope as declared schemes, their inner
formats living on as the module library.

## See Also

- [PFS — the PubID Format Schema](/concepts/pfs) — the concept page
- [The Corpus Contract](/concepts/corpus) — the pipeline a port must satisfy
- [The pubid URN Scheme](/library/pubid-urn-scheme) — the machine forms a compiled flavor inherits
- [pubid-grammar `definitions/`](https://github.com/pubid/pubid-grammar/tree/main/definitions) — the shipped definitions (`doi`, `etsi`, `calconnect`, `cen`) and modules
- [pubid#706](https://github.com/pubid/pubid/issues/706) — the adopted design and the declarability matrix
- [pubid#714](https://github.com/pubid/pubid/pull/714) — the CalConnect and cen_cenelec proof ports (merged)
