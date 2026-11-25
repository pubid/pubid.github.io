---
title: "ITU URN scheme (urn:itu)"
description: "The URN namespace of the International Telecommunication Union — the formal itu template, carrying ITU-T Recommendations, ITU-R Reports and Resolutions, Operational Bulletins and their supplements."
---

# ITU URN scheme (urn:itu)

The ITU (International Telecommunication Union) is the assigning authority
of the `itu` URN namespace, registered with IANA under the formal URN
namespace template. The namespace covers the publications of the ITU
sectors — ITU-T (Telecommunication Standardization), ITU-R
(Radiocommunication) and ITU-D (Development): Recommendations, Reports,
Resolutions, Questions, Operational Bulletins, the Radio Regulations, and
their supplements and corrigenda.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `itu` (IANA-registered, formal URN namespace template) |
| Assigning authority | ITU — through its sectors ITU-T, ITU-R and ITU-D |
| Governing guidance | the formal template registration; URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry (formal namespaces) |

## Scheme structure

The flavor emits a colon-separated naming under `urn:itu:`. The sector
comes first, the type markers of the independently numbered classes and
the designation follow, and the printed date closes the URN:

```
urn:itu:<sector>:[<marker>]:<series.code>[:<ordinal>][:<date>]
```

| Segment | Content | Notes |
|---|---|---|
| `<sector>` | the publishing sector, lowercased | `t`, `r`, `d`; an Operational Bulletin carries no sector and takes the literal `itu` instead |
| `<marker>` | type marker of the independently numbered classes | `report` (a Report numbers independently of the series, so `BT.2020-1` alone is ambiguous), `resolution` (`1-9` is also a Recommendation number) |
| `<series.code>` | series joined to the code | joined with `.` (`D.305R`, `X.680`); a series-dash designation joins with `-`; an Operational Bulletin keeps the printed `OB.<n>`; the Radio Regulations are `RR` |
| `<ordinal>` | supplement or corrigendum ordinal | follows the base document: `ITU-T X.680 (1997) Technical Cor. 3` → `…X.680:1997:3` |
| `<date>` | the printed date | `MM/YYYY`, the bare year, or — for an Operational Bulletin — `DD/MM/YYYY` |

Annexes, attachments and range ends carry their own markers (`:annex`,
`:attachment`, `to-<range-end>`), and a series-group designation carries
the `series` word, so `ITU-T E-100 series Suppl. 2` and
`ITU-T E-100 Suppl. 2` stay distinct.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:itu:t:X.680:1997:3:02/2001` | ITU-T X.680 (1997) Technical Cor. 3 (02/2001) | attested in the pubid corpus (2,756 rows) |
| `urn:itu:t:V.27bis:1976:1:09/1977` | ITU-T V.27 bis (1976) Amd. 1 (09/1977) | attested in the pubid corpus |
| `urn:itu:r:report:BT.2020-1:2000` | Report ITU-R BT.2020-1 (2000) | attested in the pubid corpus |
| `urn:itu:r:resolution:1-9:2023` | Resolution ITU-R 1-9 (2023) | attested in the pubid corpus |
| `urn:itu:itu:OB.1:annex` | Annex to ITU OB No. 1 | attested in the pubid corpus |
| `urn:itu:t:D.305R:11/1988` | ITU-T D.305 R (11/1988) | attested in the pubid corpus |
| `urn:itu:r:RR:2020` | ITU-R RR (2020) | attested in the pubid corpus |
| `urn:itu:t:E:1:12/1972` | ITU-T E Suppl.1 (12/1972) | attested in the pubid corpus |

## Rules that apply to every ITU URN

- **Sector lowercase; the Bulletin is bare.** The sector letter lowercases
  (`t`, `r`, `d`); an Operational Bulletin, which never carries a sector,
  takes the literal `itu` segment instead.
- **Independently numbered types carry their marker.** A Report or a
  Resolution spells `report`/`resolution` into the URN, so it cannot share
  an identifier with a Recommendation numbered from the same space.
- **The printed date travels.** The date segment is the printed `MM/YYYY`
  (or the bare year); an Operational Bulletin's day-bearing date
  (`15.III.2016`) prints `DD/MM/YYYY`.
- **Combined designations emit the first.** A common-text joint identifier
  (`ITU-T E.164/I.331/Q.11 bis`) emits its first designation — the
  attested row gives `urn:itu:t:E.164:11/1988`; the twin ISO/IEC identity
  is carried by the universal scheme (below).

## Status in PubID

The PubID `itu` flavor emits this `urn:itu:` scheme on `to_urn` today. The
audit over 400 sampled corpus ids gives 299 round-trip, 84 reshape, 17
that do not re-parse, and 0 colliding URNs.

The universal `urn:pubid:itu:` scheme carries the identifier exactly as
its model does: all 2,758 pass ids emit, round-trip by `to_hash`, are
path-safe, and give 2,756 distinct URNs — the two shared URNs are not
collisions: `ITU-T OB.1096` and `ITU OB No. 1096` (with and without a
date) are one document each since pubid#696. The longest URN is 160
characters. The scheme spells the facets the `urn:itu:` emission folds
away — the rendering-only flags the ITU classes call facets
(`Suppl.1`/`Suppl. 1`, `V.25 ter`/`V.25ter`, `D.502R`/`D.502 R`), the
combined designation's second half (`combseries-`, `combnumber-`, …), and
the nested ISO/IEC twin of a joint Recommendation (`twin-(…)`) — so the
full printed identity survives the URN.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ETSI URN scheme (urn:etsi)](/specs/etsi-urn), [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn), [CCSDS URN scheme (urn:ccsds)](/specs/ccsds-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [ITU publisher page](/publishers/itu)
