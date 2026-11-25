---
title: "CSA URN scheme (urn:csa)"
description: "The PubID-invented URN form the CSA flavor emits on to_urn — the Canadian Standards Association has no URN namespace in the IANA registry, so the fleet mints these itself; a prefix-plus-labels scheme with two-digit years, attested across the 230-row corpus."
---

# CSA URN scheme (urn:csa)

CSA Group (the Canadian Standards Association) has no URN namespace in
the IANA registry and publishes no URN rule for its standards, CEC
(harmonized Canadian Electrical Code) parts, series and packages. The
`urn:csa:` form documented here is therefore the PubID fleet's own: the
legacy emission of the `csa` flavor's `to_urn`, carrying no round-trip
promise. It prints the publisher prefix, the number, then labelled
segments for the `NO.` counter, the series flag, the two-digit year,
the reaffirmation, the package and the format and French markers. The
fleet's lossless form for the same documents is the universal
`urn:pubid:csa:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `csa` — **not IANA-registered**; the PubID `csa` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a CSA Group assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (the code-only records, see the rules below) |
| Registry context | none; CSA publications carry the `CSA`/`CAN/CSA` prefixes, the `C22.2 NO.` CEC numbering and the `SERIES`/`PACKAGE` suffixes |

## Scheme structure

Every URN carries the `urn:csa:` lead, the publisher prefix, the
number, then the labelled segments — each only when present:

```
urn:csa:<prefix>:<number>[:no.<n>][:series.<bool|prefix>][<year>][:reaff.<year>][:pkg.<n>][:format.dash][:french]
```

| Segment | Content | Notes |
|---|---|---|
| `<prefix>` | the publisher prefix, downcased | `csa`; **empty** for a code-only record (`B651HB-18`), leaving `urn:csa::` |
| `<number>` | the document number, with the CEC part dash-joined | `12.4`, `A165`, `C22.2-286` (the `C22.2 NO. 286` CEC form) |
| `no.<n>` | the `NO.` counter, labelled | `no.0`, `no.286` |
| `series.<…>` | the series flag | `series.true` (a `SERIES` record); a series *prefix* rides the same label (`series.<prefix>`) |
| `<year>` | the year, two digits, after its prefix | `22`, `F20` (the French-edition year prefix prints verbatim) |
| `reaff.<year>` | the reaffirmation year, labelled | `reaff.2009` (the `(R2009)` face) |
| `pkg.<n>` | the package number, labelled | the `PACKAGE` records |
| `format.dash` | the dash year format marker | printed when the face is `CSA 12.2-02` rather than `CSA 12.2:02` |
| `french` | the French-edition marker | `CSA B149.1:F20` is the French edition — a different publication than `CSA B149.1:20`, so it gets its own marker |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:csa:csa:12.4:22` | CSA 12.4:22 | attested in the pubid corpus (230 rows) |
| `urn:csa:csa:12.2:02:format.dash` | CSA 12.2-02 | attested in the pubid corpus — the dash face carries the format marker |
| `urn:csa:csa:C22.2-286:no.286:23` | CSA C22.2 NO. 286:23 | attested in the pubid corpus — the CEC part dash-joins the number, the `NO.` counter rides its label |
| `urn:csa:csa:C22.2-1:no.1:04:reaff.2009:format.dash` | CSA C22.2 NO. 1-04 (R2009) | attested in the pubid corpus |
| `urn:csa:csa:A165:series.true:14:reaff.2024` | CSA A165 SERIES:14 (R2024) | attested in the pubid corpus — the series flag |
| `urn:csa:csa:B149.1:F20:french` | CSA B149.1:F20 | attested in the pubid corpus — the French-edition marker |
| `urn:csa::B651HB:18:format.dash` | B651HB-18 | attested in the pubid corpus — a code-only record keeps an empty publisher segment, so the URN carries a doubled colon |

## Rules that apply to every CSA URN

- **The lead is fixed.** `urn:csa:` carries the private namespace; the
  publisher prefix follows, downcased.
- **A code-only record keeps an empty prefix segment.** The generator
  declines to fall back to `csa` when the record printed no publisher,
  so the URN carries `urn:csa::` — a doubled colon, not RFC 8141-legal.
- **The CEC part dash-joins the number.** `C22.2 NO. 286` emits
  `C22.2-286`, and the `NO.` counter repeats the bare number after its
  `no.` label.
- **The year is two digits when it starts with 20.** `2022` prints `22`;
  the French edition's `F` prefix rides the year verbatim (`F20`).
- **The markers are additive.** `reaff.`, `pkg.`, `format.dash` and
  `french` each name their own fact, so an affirmation or a language
  edition extends the base document's URN rather than replacing it.
- **The wrapper forms raise.** Combined (`A23.1:19/CSA A23.2:19`),
  bundled (`… + A1:15 + A2:21`) and adoption (`CSA ISO/IEC 8824-1:22`)
  records raise on `to_urn` — the audit gives 292 raises of 400 sampled
  ids — and their 600 corpus rows carry no URN representation; only the
  universal scheme emits them.

## Status in PubID

The PubID `csa` flavor emits this `urn:csa:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 400 ids, 9
round-trip, 77 reshape, 22 that do not re-parse, 292 raise, 0 empty,
and 0 colliding URNs; the corpus is 829 pass ids, every one parses, and
the 230 rows that carry URNs all emit.

The universal `urn:pubid:csa:` scheme is the fleet's lossless form: the
positional core is the number, the `_type` tokens are `std`, `ca`
(Canadian adoptions), `ca2` (CSA adoptions of ISO/IEC documents), `cec`
(the C22.2 series), `combined`, `bundled`, `package`, `series`, `amd`,
`base` and `id`, and the atoms carry the series flag, year,
reaffirmation, CEC part, code-only flag, materials-after-keyword flag,
number, package keyword and package materials — with a combined
identifier's members riding `ids-(…)`, a bundled one's followers
`bundledwith-(…)`, and `french-` an atom (identity compares it, issue
#656). An adoption's document nests with its own flavor's schema:
`CSA ISO/IEC 8824-1:22` is
`urn:pubid:csa:iso.is:8824:co-IEC:part-1:year-2022:ca2`. All 829 corpus
rows emit. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [CSA publisher page](/publishers/csa)
