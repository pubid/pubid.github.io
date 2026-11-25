---
title: "IDF URN scheme (urn:idf)"
description: "The PubID-invented URN form the IDF flavor emits on to_urn — the International Dairy Federation has no URN namespace in the IANA registry, so the fleet mints these itself; a positional scheme that leaves an empty type segment on typeless standards and appends the stage code, attested across the 65-row corpus."
---

# IDF URN scheme (urn:idf)

IDF (the International Dairy Federation) has no URN namespace in the
IANA registry and publishes no URN rule for its standards and reviewed
methods. The `urn:idf:` form documented here is therefore the PubID
fleet's own: the emission of the `idf` flavor's `to_urn`, carrying no
round-trip promise. It is a positional path — the number, the part, the
year, then the stage (or type) abbreviation downcased — and it has two
visible scars: a typeless standard leaves an **empty trailing segment**
(`urn:idf:1:2010:`), and a part keeps its leading dash
(`urn:idf:124:-2:2005:`). Most ids reshape: the stage runs live through
the ISO-style stage machine, so the emitted abbreviation often spells a
different stage than the input face. The fleet's lossless form for the
same documents is the universal `urn:pubid:idf:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `idf` — **not IANA-registered**; the PubID `idf` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an IDF assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (an empty segment is legal NSS-wise, but it is fleet scar, not design) |
| Registry context | none; IDF publications carry the `IDF <number>:<year>` designations, the `IDF/<STAGE> <number>` staged faces and the `IDF RM` reviewed-method series |

## Scheme structure

Every URN carries the `urn:idf:` lead, the number, the part (with its
leading dash), the subpart, the year, the edition and the type (or
stage) abbreviation downcased; a supplement appends its typed-stage
token and ordinal. A typeless standard emits no type, leaving the
trailing segment empty:

```
urn:idf:<number>:[-<part>]:[<year>]:[<stage-or-type-abbr>]
```

| Segment | Content | Notes |
|---|---|---|
| `<number>` | the document number | `1`, `259`, `125A` (the letter rides in the number) |
| `-<part>` | the part, dash-prefixed | `124-2` emits `-2`; the dash is the shared Base convention for a part |
| `<year>` | the publication year | `2010`, `1988`, omitted when the record has none |
| `<stage-or-type-abbr>` | the stage abbreviation, downcased | `awi`, `cd`, `dis`, `fdis`, `np`, `prf`, `pwi`, `wd`, `wda`, `wdar`, `wdr`, `drm`, `fdrm`, `pdrm`; a published standard emits nothing, leaving the empty trailing segment; reviewed-method stages carry a raw space (`awi rm`, `np rm`) |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:idf:1:2010:` | IDF 1:2010 | attested in the pubid corpus (65 rows) — the typeless standard leaves the empty trailing segment |
| `urn:idf:172:` | IDF 172 | attested in the pubid corpus — a year-less, typeless reference keeps the empty segment |
| `urn:idf:124:-2:2005:` | IDF 124-2:2005 | attested in the pubid corpus — the part keeps its leading dash |
| `urn:idf:125A:1988:` | IDF 125A:1988 | attested in the pubid corpus — the letter rides in the number |
| `urn:idf:145:2023:dis` | IDF/DIS 145:2023 | attested in the pubid corpus — the stage abbreviation downcasts |
| `urn:idf:210:2024:awi rm` | IDF/AWI RM 210:2024 | attested in the pubid corpus — the reviewed-method stage keeps its raw space |
| `urn:idf:1:2023:amd:amd:1` | IDF 146:2003/AMD 1:2023 | attested in the pubid corpus — a supplement emits its own typed-stage and ordinal (the base number does not survive; this is one of the audit's reshapes) |
| `urn:idf:1:2009:cor:cor:1` | IDF 148-1:2008/COR 1:2009 | attested in the pubid corpus |

## Rules that apply to every IDF URN

- **The lead is fixed.** `urn:idf:` carries the private namespace; a
  publisher or copublisher replaces the namespace segment
  (`parts[1]`), so a joint face would ride there.
- **A typeless standard emits the empty trailing segment.** The
  generator joins its parts and the absent type leaves `urn:idf:1:2010:`
  — legal, and one of the scheme's visible scars.
- **The part keeps its dash.** `124-2` emits `-2`, mirroring the shared
  Base part convention.
- **The stage is the machine's output, not the input's face.** The
  emitted abbreviation comes from the parsed stage, so `IDF/WDA 60`
  emits `wda` and `IDF/DRM 155` emits `drm` — and most ids reshape
  under round-trip.
- **A reviewed-method stage keeps its raw space.** `awi rm`, `np rm`,
  `prf rm` carry the two-word abbreviation verbatim; the space is RFC
  8141-legal inside an NSS but not parsed back by every consumer.
- **A supplement replaces the number.** The typed supplement emits its
  own ordinal in place of its base's number
  (`146:2003/AMD 1:2023` → `urn:idf:1:2023:amd:amd:1`), so the URN does
  not identify the base it amends — 47 of the audit's 67 ids reshape.

## Status in PubID

The PubID `idf` flavor emits this `urn:idf:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 67 ids, 11
round-trip, 47 reshape, 9 that do not re-parse, 0 raise, 0 empty, and 0
colliding URNs. The corpus is 65 rows, every one parses and every one
emits.

The universal `urn:pubid:idf:` scheme is the fleet's lossless form: the
`_type` tokens are `all`, `amd`, `cor`, `id`, `is` and `rm`, and — per
the NIST ruling — the `type`, `stage` and `typed_stage` components
serialize every registry field, each field its own atom (`pubbody-`,
`typeabbr-`, `typename-`, `typetypecode-`, `part-`, `year-`,
`stageabbr-`, `stagename-`, `stagestagecode-`,
`stageharmonizedstages-`, `typedstageabbr-`, `typedstagename-`,
`typedstage-`, `typedstagelongabbr-`, `typedstageshortabbr-`,
`typedstagestagecode-`, `typedstagetypecode-`). The URNs therefore run
long; the audit's open finding is that `to_hash` serializes component
internals and reducing them to one identifying value (the ISO
`Components::Code` precedent) would change `to_hash` and need a
relaton-data re-crawl — a separate decision. Landed with issue #670 as
drafted. See [the universal PubID URN scheme](/library/pubid-urn-scheme)
for the `urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn) — the stage machine IDF's faces follow
- [URN Mapping Overview](/concepts/urn)
- [IDF publisher page](/publishers/idf)
