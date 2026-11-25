---
title: "ASME URN scheme (urn:asme)"
description: "The PubID-invented URN form the ASME flavor emits on to_urn — ASME has no URN namespace in the IANA registry; a special-type lead, the publisher code, the number and year, then labelled qualifier segments, attested across the 727-row corpus."
---

# ASME URN scheme (urn:asme)

ASME (the American Society of Mechanical Engineers) has no URN
namespace in the IANA registry and publishes no URN rule for its codes
and standards. The `urn:asme:` form documented here is therefore the
PubID fleet's own: the emission of the `asme` flavor's `to_urn` and the
inverse of its `UrnParser`. It leads with the special document class
when one applies, then the publisher code, the number, the year, and a
tail of labelled qualifier segments.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `asme` — **not IANA-registered**; the PubID `asme` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an ASME assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (raw spaces, see the rules) |
| Registry context | none; ASME publications carry the code series (B18, Y14, A17, BPVC …), the PTC performance test codes and the CSA/API/ANS co-publications |

## Scheme structure

Every URN carries the `urn:asme:` lead, then — only when present — the
special document class, then the publisher code, the number (with the
part and subpart glued on), the year, then the labelled qualifiers:

```
urn:asme:[:<special>:]<publisher>[-<copubs>]:<number>[-<part>][-<subpart>]:<year>[:ed.<n>][:ptc-suffix.<n>][:csa.<n>][:pub1.<x>][:code1.<x>][:pub2.<x>][:joint.<x>][reaff.<year>][:revnote.<text>][:prev.<text>][:<languages>]
```

| Segment | Content | Notes |
|---|---|---|
| `<special>` | the special document class — present only for the three kinds that need it | `handbook` (A17.1/CSA B44 Handbook), `ptc` (PTC performance test codes), `csa` (a CSA-numbered record) |
| `<publisher>[-<copubs>]` | the publisher code, downcased, co-publishers joined with dashes | `asme` (the default), `csa`, `api/asme`, `asme/ans`, `iso/asme` |
| `<number>` | the document number; the part and subpart glue to it with hyphens | `B18.3`, `A112.19.12`, `PTB-14`, `RA-S-1.1` |
| `<year>` | the publication year, plain | `2022`, `2007`; a draft keeps its placeholder year (`20XX`, `202X`) |
| `ed.<n>` | the edition | labelled |
| `ptc-suffix.<n>`, `csa.<n>` | the PTC and CSA qualifiers — suppressed when the `<special>` lead already names the class | `csa.B44` on a handbook row |
| `pub1.<x>`, `code1.<x>`, `pub2.<x>`, `joint.<x>` | the first publisher/code, second publisher and joint publisher of a co-publication | `pub1.api:code1.579-2:pub2.asme`, `joint.asme/ans` |
| `reaff.<year>`, `revnote.<text>`, `prev.<text>` | reaffirmation, draft revision note, parenthetical revision | `revnote.[Revision of ASME Y14.43-2011 (R2020)]` |
| `<languages>` | the language codes, comma-joined, bare segment | |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:asme:asme:B18.3:2022` | ASME B18.3-2022 | attested in the pubid corpus (727 rows) |
| `urn:asme:handbook:asme:A17.1:2010:csa.B44` | ASME A17.1/CSA B44 Handbook-2010 | attested in the pubid corpus — the `handbook` lead and the CSA qualifier |
| `urn:asme:csa:asme:A17.1:2007` | ASME A17.1/CSA B44-2007 | attested in the pubid corpus — the `csa` lead suppresses the trailing `csa.B44` |
| `urn:asme:api/asme:PTB-14:2009:pub1.api:code1.579-2:pub2.asme` | API 579-2 /ASME PTB-14-2009 | attested in the pubid corpus — the two-publisher co-publication |
| `urn:asme:asme/ans:RA-S-1.1:2022:joint.asme/ans` | ASME/ANS RA-S-1.1-2022 | attested in the pubid corpus — the joint publisher |
| `urn:asme:asme:Y14.41:202X:prev.(Revision of ASME Y14.41-2019)` | ASME Y14.41-202X (Revision of ASME Y14.41-2019) | attested in the pubid corpus — the parenthetical revision, spaces and all |
| `urn:asme:asme:BPVC COMPLETE CODE BIND:2023` | ASME BPVC COMPLETE CODE BIND-2023 | attested in the pubid corpus — the raw-space row |

## Rules that apply to every ASME URN

- **The lead is fixed; the special class leads when it applies.**
  `urn:asme:` carries the private namespace; `handbook`, `ptc` and
  `csa` take the slot before the publisher, and naming the class there
  suppresses the matching labelled qualifier at the tail — the `csa`
  lead drops `csa.B44`, the `ptc` lead drops `ptc-suffix.<n>`.
- **The publisher is the second segment.** The code is downcased and
  co-publishers join it with dashes; the `pub1.`/`pub2.`/`joint.`
  labels carry the two-publisher detail the segment cannot.
- **Parts glue to the number.** The part and subpart append to the
  number segment with hyphens, so one document stays one segment.
- **Raw spaces pass through.** 9 of the 727 attested URNs carry raw
  spaces (the BPVC binder rows, the revision notes) — a space is not in
  RFC 8141's `unreserved` set, so those URNs are not RFC 8141-legal;
  the form never percent-encodes.
- **Draft placeholders ride as-is.** `20XX` and `202X` are the year
  segment of a draft, verbatim.

## Status in PubID

The PubID `asme` flavor emits this `urn:asme:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 400 ids,
381 round-trip, 5 reshape, 14 that do not re-parse, 0 raise, 0 empty,
and 0 colliding URNs; the corpus is 727 rows, every one parses and
every one emits.

The universal `urn:pubid:asme:` scheme is the fleet's lossless form:
the positional core is the number and the `_type` token is `std`, with
every qualifier its own atom — `pub-`, `lang-`, `csanumber-`,
`draftyear-`, `firstcode-`, `firstpublisher-`, `handbook-`,
`jointpublisher-`, `parentheticalrevision-`, `ptcsuffix-`,
`revisionnote-`, `secondpublisher-`. Every corpus row emits. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ASTM publisher page](/publishers/astm)
- [URN Mapping Overview](/concepts/urn)
- [ASME publisher page](/publishers/asme)
