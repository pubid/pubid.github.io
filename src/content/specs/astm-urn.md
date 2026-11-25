---
title: "ASTM URN scheme (urn:astm)"
description: "The PubID-invented URN form the ASTM flavor emits on to_urn — ASTM International has no URN namespace in the IANA registry, so the fleet mints these itself; a type-tag positional scheme with two-digit years, attested across the 248-row corpus."
---

# ASTM URN scheme (urn:astm)

ASTM International has no URN namespace in the IANA registry and
publishes no URN rule for its standards, data series, manuals, research
reports and work items. The `urn:astm:` form documented here is
therefore the PubID fleet's own: the legacy emission of the `astm`
flavor's `to_urn`, carrying no round-trip promise. It is a short
positional path — a type tag, the code (which composes the designation
letter, the number and the suffixes), then a two-digit year and the
labelled reapproval, edition and work-item segments. The fleet's
lossless form for the same documents is the universal
`urn:pubid:astm:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `astm` — **not IANA-registered**; the PubID `astm` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an ASTM assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (the ISO/ASTM co-publications, see the rules below) |
| Registry context | none; ASTM publications carry the letter-prefixed designations (`A36`, `D2148`, `E2938`), the DS/MNL/MONO/RR/WK series and the `/M` metric companions |

## Scheme structure

Every URN carries the `urn:astm:` lead, the type tag (bare `std` when
the record names no type), the code — with a part or subpart dash-joined
onto it — then the year and the labelled segments, each only when
present:

```
urn:astm:<type>:<code>[-<part>][-<subpart>][:<year>][:<sub-year>][:reapp.<year>][:e<edition>][:wip][:wk.<n>]
```

| Segment | Content | Notes |
|---|---|---|
| `<type>` | the document class, downcased | `std` — the emission's default; the corpus' data-series, manual, monograph, research-report and work-in-progress records all ride it (see the rules) |
| `<code>` | the composed designation | `D2148`, `A36M` (the `/A36M` metric companion keeps its `M`), `25A` (the DS letter rides the number), `11-S1` (the suffix), `1001` (the RR number) |
| `<year>` | the year, two digits | `22` (2022), `95` (1995) — a four-digit year is cut to its last two |
| `reapp.<year>` | the reapproval year, labelled | `reapp.2024` (the `(2024)` face) |
| `e<edition>` | the edition, glued after `e` | `e1`, `e9TH` (the `9TH` manual edition) |
| `wk.<n>` | the work-item number, labelled | the `WK` records ride `std` as a bare number today |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:astm:std:D2148:22` | ASTM D2148-22 | attested in the pubid corpus (248 rows) |
| `urn:astm:std:A36M:19` | ASTM A36/A36M-19 | attested in the pubid corpus — the metric companion keeps its `M` |
| `urn:astm:std:C1870:18:reapp.2024` | ASTM C1870-18(2024) | attested in the pubid corpus — the labelled reapproval |
| `urn:astm:std:C1028:07:e1` | ASTM C1028-07e1 | attested in the pubid corpus — the glued edition |
| `urn:astm:std:51261:13:reapp.2020:e1` | ASTM 51261-13(2020)e1 | attested in the pubid corpus |
| `urn:astm:std:1:e9TH` | ASTM MNL1-9TH-EB | attested in the pubid corpus — the manual rides `std`, the edition is `e9TH`, the EB format is lost |
| `urn:astm:std:1001` | ASTM RR:A01-1001 | attested in the pubid corpus — the `RR` type and the `A01` committee are lost |
| `urn:astm:std:91249` | ASTM WK91249 | attested in the pubid corpus — the work item rides `std`, unlabelled |
| `urn:astm:std:11-S1` | ASTM DS11-S1-EB | attested in the pubid corpus — the suffix dash-joins the code |
| `urn:iso/astm:std:52905` | ISO/ASTMTR52905-EB | attested in the pubid corpus — the co-publisher replaces the namespace lead: `urn:iso/astm:…` |

## Rules that apply to every ASTM URN

- **The lead is fixed — except when a co-publisher replaces it.** The
  emission writes `urn:astm`, then overwrites the second segment with
  the publisher and its co-publishers (`urn:iso/astm:…` for the ISO/ASTM
  TRs). A slash is not legal in an RFC 8141 NID, so the ISO/ASTM URNs
  are not RFC 8141-legal.
- **The type tag is always `std` in practice.** Every attested class —
  data series, manual, monograph, research report, work in progress —
  emits `std`; only the code distinguishes them, and `RR:A01-1001`'s
  committee is dropped outright.
- **The year is two digits.** A four-digit year is cut to its last two
  (`22` for 2022), so the century is implied and `…:22` can only be told
  from `…:1922` by the corpus.
- **The part and subpart dash-join the code.** They do not get segments
  of their own: `ASTM DS11-S1-EB` emits `11-S1`.
- **The format suffix is lost.** The `-EB` electronic-book marker never
  prints, so `ASTM DS4B-EB` and its print twin share one URN — 31
  attested colliding URNs.
- **The reapproval and edition are labelled, the work item is not.**
  `reapp.` and `e` prefix their values; a `WK` record prints its number
  bare, indistinguishable from a standard.

## Status in PubID

The PubID `astm` flavor emits this `urn:astm:` scheme on `to_urn`
today. The URN-scheme audit gives 245 ids, 25 round-trip, 153 reshape,
67 that do not re-parse, and 31 colliding URNs; the corpus is 248 rows,
every one parses and every one emits.

The universal `urn:pubid:astm:` scheme is the fleet's lossless form:
the positional core is the number, the `_type` tokens are `std`,
`isodual` (the ISO dual publications), `adj` (adjuncts), `ds` (data
series), `mnl` (manuals), `mono` (monographs), `rr` (research reports),
`tr` (technical reports) and `wk` (work in progress), and the atoms, in
the schema order, carry the publisher, committee, designation letter,
subseries, suffix, metric flag, year, sub-year, reapproval, edition,
supplement flag, `tp`, format suffix, `ea`, `dvd` and holiday flag — the
format suffix emits as `format--EB` because the value keeps its own
dash. The longest attested URN is 75 characters. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [ANSI URN scheme (urn:ansi)](/specs/ansi-urn)
- [URN Mapping Overview](/concepts/urn)
- [ASTM publisher page](/publishers/astm)
