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
this exact file compiles green:

```console
$ ruby scripts/pfs compile wxyz.pfs --as wcs_pfs \
    --parsanol-version 1.3.126
compiled wxyz.pfs (pfs:1) -> grammars/wcs_pfs.parg
baked -> artifacts/wcs_pfs.json (checksum sha256:684c3..., compiler 1.3.126)
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
| `grammar` | no | named lexical terms — PARG fragments the fields and templates reference |
| `date` | no | the calendar binding: fields folded into the shared `Components::Date` |
| `types` | yes | the identifier types: semantic key, wire tag, typed-stage binding |
| `fields` | yes | the captures: each a whole-pattern lexical rule with a kind |
| `templates` | yes | the canonical render face and the alternate accept spellings |
| `urn` | yes | the scheme's URN namespace, the pubid-scheme schema, the official segment order |
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
port models the EN face, its other classes staying coded).

### `fields:` — the captures

A field's `pattern` is one PARG term; the whole pattern is the capture, so
the model stores exactly what the scheme defines — the DOI definition's
prefix pattern captures the whole printed `10.` face, no builder
re-assembly. v1 carries the `string` kind. A field may declare
`sub_numbering: {separators: [...]}` — the tier-B extension that folds
`[ (sep1 / sep2 …) 1*digit ]` onto the pattern with the capture staying
whole (CalConnect's `CC/Adv 0707.1:2007` is part of the number, exactly as
the coded flavor models it). Repetition is ABNF-shaped: `1*digit` (one or
more), `4digit` (exactly four), `2*digit` (two or more).

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

### `date:` — the calendar binding

`date: {fields: [year, month, day]}` folds the named fields into the shared
`Pubid::Components::Date` the coded flavors use: one attribute, a builder
composing the component, a flat canonical hash. Without it, every field is
a plain string attribute.

### `urn:` — the machine forms

`namespace` is the scheme's official URN namespace; `official` declares the
official URN's ordered segments (a field, or a fused date group joined with
`-` — absent fields leave no segment); `schema` is the pubid-scheme schema
(`PubidUrn.define`): `atoms` (path + prefix, optionally `kind: list`) and
`types` (wire tag, token, positional core). A compiled flavor inherits the
whole [pubid URN scheme](/library/pubid-urn-scheme) — round-trip, slug,
path safety and the canonical gate — by construction.

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

(This binding is from a DIN-adoption definition that compiles green — two
positives, three negatives verified — mirroring the shipped
[`cen.pfs`](https://github.com/pubid/pubid-grammar/blob/main/definitions/cen.pfs)
composition port. `BS EN ISO 9001`, `NF EN ISO 9001` and `DIN EN ISO 9001`
are one definition composed with the same modules and a different
`prefixes` value.)

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
| render faces | a canonical optional with no field inside cannot render — presence would be undecidable |
| examples | at least one positive required; every positive must parse, render and bind identically through the baked artifact; every negative must fail |

## Versioning

`pfs: 1` is the schema major. Evolution is additive within a version; a new
major may reinterpret, and compilers refuse definitions newer than they
support — fail-closed, the engine's `binding_version` precedent. The same
rule applies per module: a definition pinned to a newer module major than
the library ships is refused, and so is a stale pin. Declared-but-unbuilt
v1 surfaces (field kinds beyond `string`, multi-type emission, free-standing
stage and supplement maps) fail closed rather than compiling halfway — a
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
either side that is not derived from the definition. The compiled `doi_pfs`
flavor exists on both engines this way:
[pubid-ts#170](https://github.com/pubid/pubid-ts/pull/170) joins the Ruby
side with a byte-parity gate over a shared conformance set, and the flavor's
pubid-urn schema table is the verbatim port of the Ruby schema.

## The parity harness

A compiled flavor is proven against its coded sibling by a parity harness —
[`spec/pubid/doi_pfs/parity_spec.rb`](https://github.com/pubid/pubid/blob/main/spec/pubid/doi_pfs/parity_spec.rb)
is the pattern: over **all** of the coded flavor's inputs (its fixtures, the
corpus rows with their aliases, constructed edge cases), the compiled flavor
and the coded one must agree byte-for-byte on `to_s` / `to_hash` / `to_urn`
/ `to_mr_string` / `to_pubid_urn`, and fail on the same inputs with the same
error class. The harness's own rule bears quoting: *drift is a defect in the
definition or the compiler, never a reason to relax an expectation here.*

The landed bracket: `doi_pfs` (the smallest scheme, zero branches) and
`etsi_pfs` (the largest corpus — 24,718 fixtures) run green on pubid main
(90 parity examples, 0 failures at time of writing). The CalConnect
acceptance port and the cen_cenelec module-composition proof are in review
in [pubid#714](https://github.com/pubid/pubid/pull/714) — cen's harness
additionally pins the six coded-machinery blockers the composition does not
absorb as an explicit ledger, the measured boundary of the module library.

## v1 boundaries

Stated plainly, so a definition fails closed instead of compiling halfway:

- field kinds other than `string` — integer-kind patterns are a later
  extension;
- multiple `types:` per generated Ruby flavor — the PARG grammar handles the
  general shape, the generated flavor is single-type;
- free-standing stage maps and supplement declarations — the edition and
  supplement machinery's tokens (`ed`, `amd`, `cor`) are reserved, and the
  operators arrive as module bindings;
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
- [pubid#714](https://github.com/pubid/pubid/pull/714) — the CalConnect and cen_cenelec proof ports
