---
title: "CEN-CENELEC URN scheme (urn:cen)"
description: "The PubID-invented URN form the CEN-CENELEC flavor emits on to_urn — the European standards bodies have no URN namespace in the IANA registry, so the fleet mints these itself; a publisher-led scheme whose lead reads urn:cen, attested across the 189-row corpus."
---

# CEN-CENELEC URN scheme (urn:cen)

CEN and CENELEC (the European Committee for Standardization and the
European Committee for Electrotechnical Standardization) have no URN
namespace in the IANA registry and publish no URN rule for their ENs,
HDs, ENVs, CRs, CWAs, guides, technical reports and specifications. The
`urn:cen:` form documented here is therefore the PubID fleet's own: the
emission of the `cen_cenelec` flavor's `to_urn` and the inverse of its
`UrnParser`, carrying no external registration. Note the lead: the
flavor is `cen_cenelec`, but the emission writes `urn:cen` — the
publisher (`en` for a published EN, `cen`, `hd`, `cr`, `cwa`, `env`,
`es` …) is the second segment, not the namespace. Supplements ride
their base, adoptions inline the adopted document's MR string, and a
draft stage closes the URN. The fleet's lossless form for the same
documents is the universal `urn:pubid:cencenelec:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `cen` — **not IANA-registered**; the PubID `cen_cenelec` flavor's private namespace (the flavor's own name, `cen_cenelec`, never appears in the URN) |
| Assigning authority | none — the form is the fleet's emission, not a CEN/CENELEC assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (the spaced EN numbers, see the rules below) |
| Registry context | none; CEN/CENELEC publications carry the EN/HD/ENV/ES/CR/CWA/TS/TR designations, the `/A` amendments, the `+A` consolidations and the `prEN`/`FprEN` draft stages |

## Scheme structure

Every URN carries the `urn:cen:` lead, the publisher segment, the
type (when the stage gives one that is not a plain EN), the number —
with a part or subpart dash-joined — the date, then the stage and
language segments; a supplement appends to its base, a consolidation
joins them with `plus`, an adoption inlines the adopted document's MR
string with its separators as colons:

```
urn:cen:<publisher>[-<copubs>]:[<type>:]<number>[-<part>][-<subpart>]:<date>[:stage.<code>][:<languages>]
urn:cen:<…base…>:amd:<n>[:<year>]           (a /A amendment)
urn:cen:<…base…>:cor:<n-or-year>            (an /AC corrigendum)
urn:cen:<…base…>:plus:(amd|cor):<n>[:<year>]  (a +A consolidation)
urn:cen:<…base…>:frag:<n>                    (a FRAG fragment)
urn:cen:<publisher>:<adopted-mr-string>[:stage.<code>]  (an adoption)
```

| Segment | Content | Notes |
|---|---|---|
| `<publisher>` | the publisher, downcased | `en` (the default when the record names none), `cen`, `hd`, `cr`, `cwa`, `env`, `es`, `cen-clc`, `cen-clc-etsi` — `CEN/CLC/ETSI/TR` dash-joins all three bodies |
| `<number>` | the document number, parts dash-joined | `13250`, `60335-1`, `12101-5`, `954-100` |
| `<date>` | the date or year | `2000`, `2016-11` (the corrigendum month form) |
| `amd:<n>[:<year>]`, `cor:<…>`, `frag:<n>` | the supplements, labelled | `amd:1:2005` (`/A1:2005`), `cor:2003` (an unnumbered `/AC` keeps only the year), `frag:2` |
| `plus` | the consolidation marker | `EN 285:2015+A1:2021` emits `…:2015:plus:amd:1:2021`, keeping the consolidated form apart from the standalone amendment |
| `stage.<code>` | the draft stage | `stage.proposal` (`prEN`), `stage.final_proposal` (`FprEN`); a published document omits it |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:cen:en:13250:2000:amd:1:2005` | EN 13250:2000/A1:2005 | attested in the pubid corpus (189 rows) — the amendment rides its base |
| `urn:cen:en:285:2015:plus:amd:1:2021` | EN 285:2015+A1:2021 | attested in the pubid corpus — the `plus` consolidation marker |
| `urn:cen:en:60335-1:2012:amd:1` | EN 60335-1:2012/A1 | attested in the pubid corpus — an undated amendment |
| `urn:cen:en:13254:2000:cor:2003` | EN 13254:2000/AC:2003 | attested in the pubid corpus — the unnumbered corrigendum keeps only the year |
| `urn:cen:en:60038:amd:1:frag:2` | EN 60038/A1 FRAG2 | attested in the pubid corpus — the fragment of an amendment |
| `urn:cen:cen:iso:ts:21003-7:2019` | CEN ISO/TS 21003-7:2019 | attested in the pubid corpus — the adoption inlines the adopted document's MR string |
| `urn:cen:en:iec:62368-1:2020` | EN IEC 62368-1:2020 | attested in the pubid corpus |
| `urn:cen:hd:60269-3` | HD 60269-3 | attested in the pubid corpus |
| `urn:cen:cr:13933:2000` | CR 13933:2000 | attested in the pubid corpus |
| `urn:cen:cwa:14050-21:2000` | CWA 14050-21:2000 | attested in the pubid corpus |
| `urn:cen:cen:1` | CEN Guide 1 | attested in the pubid corpus |
| `urn:cen:cen-clc-etsi:101551:2026` | CEN/CLC/ETSI/TR 101551:2026 | attested in the pubid corpus — three bodies dash-join into the publisher segment |
| `urn:cen:en:16114:2011:stage.final_proposal` | FprEN 16114:2011 | attested in the pubid corpus — the draft stage |
| `urn:cen:en:10160:stage.proposal` | prEN 10160 | attested in the pubid corpus — an undated draft |
| `urn:cen:en:302 326-2:2026` | EN 302 326-2 V2.2.1:2026 | attested in the pubid corpus — the spaced number and version ride raw; the version `V2.2.1` is lost |

## Rules that apply to every CEN-CENELEC URN

- **The lead is `urn:cen` for every document, CEN and CENELEC alike.**
  The flavor is `cen_cenelec`, but the emitted namespace is the bare
  `cen`; the HD/CLC/ETSI identity rides the publisher segment, never
  the NID.
- **A supplement appends to its base's URN.** Amendments, corrigenda
  and fragments extend the base with `amd:`, `cor:` and `frag:` labels;
  a consolidation inserts the `plus` marker so `EN 285:2015+A1:2021`
  stays apart from a would-be standalone `EN 285:2015/A1:2021`.
- **An adoption inlines the adopted document's MR string.** The
  publisher and the adopted document's MR string join with a dot, whose
  dot and underscore separators become colons — `CEN ISO/TS 21003-7`
  emits `urn:cen:cen:iso:ts:21003-7`. A draft stage on the adoption
  closes the URN.
- **A published document carries no stage segment.** `stage.proposal`
  and `stage.final_proposal` print only for the `prEN`/`FprEN` drafts;
  the stage code `published` emits nothing.
- **The version is lost, and spaced numbers keep their space.**
  `EN 302 326-2 V2.2.1:2026` emits `urn:cen:en:302 326-2:2026` — the
  raw space reaches the NSS (not RFC 8141-legal) and the `V2.2.1`
  version never prints.
- **The publisher defaults to `en`.** A record that names no publisher
  prints `en`, so plain ENs, prENs and FprENs share the segment.

## Status in PubID

The PubID `cen_cenelec` flavor emits this `urn:cen:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 192 ids,
89 round-trip, 69 reshape, 34 that do not re-parse, 0 raise, 0 empty,
and 0 colliding URNs; the corpus is 189 rows, every one parses and
every one emits.

The universal `urn:pubid:cencenelec:` scheme is the fleet's lossless
form: the `_type` tokens are `en` (European Norm), `aen` (adopted EN),
`amd`, `cor`, `consol` (consolidated identifiers), `cr` (CEN reports),
`cwa` (workshop agreements), `chd`/`hd` (the two harmonization
documents), `ep` (prestandards), `es` (specifications), `fragment`,
`guide`, `tr`, `ts` and the `base`/`id` internals, and the atoms carry
the publisher, co-publishers, part, subpart, year, month, the nested
date, version and stage — with an adoption riding `adopted-(…)` and a
consolidated identifier's members `ids-(…)` (they have no core number:
`EN 14988:2017+A1:2020` is
`urn:pubid:cencenelec:consol:ids-(cencenelec:en:14988:year-2017),(cencenelec:amd:1:year-2020)`).
The schema landed partially with GOST (for the types a GOST adoption
can name) and completed with issue #670, adding `subpart-` and the
nested-date atoms without changing the GOST-nested URNs. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [IEC URN Specification](/specs/iec-urn), [GOST URN scheme (urn:gost)](/specs/gost-urn)
- [URN Mapping Overview](/concepts/urn)
- [CEN-CENELEC publisher page](/publishers/cen-cenelec)
