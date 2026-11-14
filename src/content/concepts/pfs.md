---
title: "PFS — the PubID Format Schema"
description: "One data file per body declares its identifier scheme and compiles to the Ruby and TypeScript flavors — grammar, renderer, URN schema and conformance set, all from declarations."
---

# PFS — the PubID Format Schema

Today a new identifier format becomes code, written twice: a Ruby flavor
module (parser, renderer, URN generator, typed stages) and a TypeScript
counterpart. PFS makes it data instead. A body declares its scheme in one
`.pfs` file — plain YAML — and the compiler generates the grammar, bakes a
checksum-verified artifact through the existing parsanol pipeline, and
hands the same artifact to both engines. The Ruby gem and pubid-ts run the
same compiled flavor, derived from the same declarations, checked against
the same conformance set. One definition file, one bake, both engines, one
conformance set.

The design was adopted in
[pubid#706](https://github.com/pubid/pubid/issues/706), whose scripted
declarability matrix measured all 44 flavors; the language reference is
[`definitions/README.md`](https://github.com/pubid/pubid-grammar/blob/main/definitions/README.md)
in pubid-grammar, and the reference page for the `.pfs` language lives at
[The .pfs Format Schema Language](/library/pfs).

## Why data

The codebase already proves formats can be data: typed stages and type
declarations are structured hashes, the TypeScript flavors run grammar-as-data
on one shared engine, and the format registries are objects. PFS composes
those existing artifacts rather than inventing new machinery — it compiles to
exactly the runtime objects a hand-written flavor builds, so coded flavors
remain first-class and keep working unchanged. A flavor may move to a
`.pfs` definition file by file, with its own corpus as the regression net.

## The corpus is the spec

A definition cannot compile without examples. Every positive must parse,
render as declared, and bind identically through the **baked** artifact;
every negative must fail. The examples are embedded in the compiled grammar
as its test block, so the artifact replays them in every engine — the
definition's live test panel, not documentation.

The same philosophy governs adoption: a flavor is ported to PFS only when
the port reproduces the coded flavor byte-for-byte on every corpus row its
model represents — and rejects what it cannot, with the boundary pinned as
an explicit ledger. The cen port ran that rule twice: it first shipped as
the honest boundary (55 rows absorbed, 134 pinned as the ledger), and when
the compiler grew the six declared-emission features, the definition
absorbed the whole corpus — 189/189, zero pinned. The boundary moved by
extending the language, never by editing fixtures. Drift is a failed port,
never a fixture edit. The proof pattern is the
[parity harness](https://github.com/pubid/pubid/blob/main/spec/pubid/doi_pfs/parity_spec.rb)
each compiled flavor ships beside its coded sibling.

## The tier model

The declarability matrix measured every flavor against what a declarative
language can express: **27 of the 44 flavors (61%)** were expressible in
v1 as drawn — publishers, type tokens, field patterns, canonical and
alternate templates, typed-stage bindings — covering about 43,800 corpus
fixtures. The boundaries have narrowed since the matrix was drawn: the
compiler now carries collection bindings, conditional render segments, the
edition-fold, supplement wrapper synthesis, int-kind URN cores, the
declared URN-generator surface and the MR-slug hooks — the constructs the
etsi bracket had pinned as the phase-3 backlog — and the cen absorption
added the six declared-emission features on top: multi-type emission, the
draft stages, the wrapper shapes, the adopted-base dispatch with its coded
hook, the publisher-type defaults and the fused URN segments. Every
grammar segment — declared or generated — carries a semantic name, and an
unnamed capture is a compile-time rejection: the grammar is
self-understandable to the bodies reading it. Twelve more flavors (tier B)
become expressible through the extension catalog — the sub-numbering
extension and the calendar binding have landed, vocabulary tables and the
rest are declared-but-unbuilt — and through the module library below.
Three flavors — BSI, IEEE, NIST — carry structural machinery that stays
coded for now. ISO and IEC are out of scope as declared schemes by
scoping; their *inner* formats, however, are exactly what the module
library ships.

## The module library

National standards bodies do not invent identifier schemes — they adopt the
ISO and IEC inner formats, and CEN overlays the European face. That
machinery used to be hand-coded once per body. PFS ships it once: the
library is live in pubid-grammar
([`definitions/modules/*.pfsmod`](https://github.com/pubid/pubid-grammar/tree/main/definitions/modules))
— six named, versioned modules a definition binds:

- `iso.inner` / `iec.inner` — the inner document faces as referenceable
  libraries (not the declared ISO/IEC schemes, which stay coded);
- `en.overlay` — the CEN adoption layer, the EN face with its draft tokens;
- `national.prefix` — the national body's tokens (DIN, BS, NF, SS-, NEN-,
  UNE-, ÖNORM, CAN/CSA) as *parameters* — the same module with a different
  data value;
- `supplements.core` / `edition.core` — the core amendment and corrigendum
  operators as bindings.

A DIN-EN-ISO adoption is a handful of lines: bind the inner face, the
adoption overlay and the national prefix, declare the publisher — the
definition compiles green with the bound modules doing the machinery, and
the DIN, BS and NF variants are the same definition with a different
`prefixes` value, all compiled against the shipped library. Two
soundness rules are enforced at compile time: modules declare **identity**
composition (an adoption is a wrapper with an adopted base, not a grammar
soup), and they declare their **extension hooks** (a BS `+A1` national
amendment, re-dating) — where a body exceeds the parameters, it drops to a
coded hook beside its definition, explicit and never implicit.

## The wizard connection

The YAML layer is the substrate the Conormis identifier-format wizard
builds on (adoption posted:
[conormis/platform#406](https://github.com/conormis/platform/issues/406)):
the file is the lossless serialization the UI's
model and a hand editor both round-trip, the required examples are the
wizard's live test panel, and the module library is its palette. A body can
start declarative in the wizard and graduate to an upstream `.pfs` file with
zero redesign — the wizard emits the same file upstream consumes.

## Where it stands

Four compiled flavors ship beside their coded siblings in the pubid gem
(2.0.28) as dev-alias keys, each with its parity harness green on pubid
main: `doi_pfs` — the smallest scheme, zero renderer branches, 55/55
byte-identical; `etsi_pfs` — the largest corpus, 24,718/24,718 full byte
parity after the compiler v2 closed the phase-2 pins; `calconnect_pfs` —
the acceptance port, 400-example byte parity over the whole corpus with
the sub-numbering extension and the calendar binding in; `cen_pfs` — the
module-composition port grown into the full-absorption proof, 189/189
corpus rows byte-identical with zero pins, the phase-2 boundary closed by
the compiler's six declared-emission features
([pubid-grammar#122](https://github.com/pubid/pubid-grammar/pull/122) +
[pubid#721](https://github.com/pubid/pubid/pull/721)). Drift is a failed
port, never a fixture edit. On the TypeScript side the compiled
`doi_pfs`, `calconnect_pfs` and `etsi_pfs` flavors joined pubid-ts over
the same baked artifacts
([pubid-ts#170](https://github.com/pubid/pubid-ts/pull/170),
[#174](https://github.com/pubid/pubid-ts/pull/174),
[#175](https://github.com/pubid/pubid-ts/pull/175)) — one artifact,
both engines, demonstrated for three flavors.

## See Also

- [The .pfs Format Schema Language](/library/pfs) — the language reference
- [The Corpus Contract](/concepts/corpus) — the pipeline PFS ports must satisfy
- [The pubid URN Scheme](/library/pubid-urn-scheme) — the machine forms a compiled flavor inherits
- [pubid#706](https://github.com/pubid/pubid/issues/706) — the adopted design and the declarability matrix
- [pubid-grammar `definitions/`](https://github.com/pubid/pubid-grammar/tree/main/definitions) — the shipped definitions and modules
