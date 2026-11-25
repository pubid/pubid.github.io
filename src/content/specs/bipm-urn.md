---
title: "BIPM URN scheme (urn:bipm)"
description: "The BIPM URN shapes — adopted on the ruling of 2026-11-11 from the BIPM editor guides (the guide of record), not from an IANA registration, and emitted by the PubID bipm flavor on to_urn."
---

# BIPM URN scheme (urn:bipm)

BIPM (Bureau International des Poids et Mesures) names its committee
documents, meetings, Metrologia articles and the SI Brochure under
`urn:bipm:`. The provenance of this scheme is not an IANA registration —
BIPM still has no namespace in the IANA registry. The official shapes
are defined by the guide of record (the BIPM editor guides,
`sources/bipm-references-en.adoc`, "URN" clauses) and were adopted on the
ruling of 2026-11-11: the PubID `bipm` flavor emits them on `to_urn`
today.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `bipm` — **not in the IANA URN namespace registry** |
| Assigning authority | BIPM |
| Governing guidance | the guide of record: the BIPM editor guides, `sources/bipm-references-en.adoc`, "URN" clauses, adopted by the pubid ruling of 2026-11-11 |
| Registry context | no IANA registration; the shapes live in the editor guides, and `urn:bipm:` is the guide's own namespace convention |

## Scheme structure

The guide's general pattern is

```
urn:bipm:{version}:{group}:{venue-type}:{venue-id}:{type}:{identifier}:{date}
```

with the venue slots optional. The flavor holds no venue attribute — the
venue qualification lives inside the document number itself (`110-17` is
the 110th meeting's decision 17) — so the venue slots stay unfilled and
one shape falls out per family:

```
committee:  urn:bipm:v1:{group}:{type-word}:{identifier}[:{year}]
meeting:    urn:bipm:v1:{group}:meeting:{number}[:{year}]
metrologia: urn:bipm:v1:metrologia:{volume}[:{issue}[:{article}]]
brochure:   urn:bipm:v1:bipm:si-brochure:{edition}:{version}:{year}
```

| Segment | Content | Notes |
|---|---|---|
| `v1` | the guide's version segment | leads every family |
| `{group}` | the committee group, lowercased | `cipm`, `cgpm`, `cctf`, `ccl`, `jcrb`, `ccauv`, … |
| `{type-word}` | the committee type, **the English name lowercased** | `resolution`, `recommendation`, `decision`, `action`, `statement` — never the `REC`/`RES`/`DECN` abbreviation; a number-less bare form (the MRA `CIPM 2005-06`) keeps an empty type segment |
| `{identifier}` | the document number, with the appendix/annex complement folded in | `110-17`, `101-1`; the appendix complement joins as `-a{n}[.{annex}]` (`112 A3` → `112-a3`) |
| `meeting:{number}` | the venue type `meeting` and the venue-id, as separate segments | the guide's proceedings example glues them (`meeting-26`); pubid keeps them separate |
| `{volume}[:{issue}[:{article}]]` | the Metrologia coordinates | `51`, `51:1:128` |
| `{edition}:{version}:{year}` | the brochure's edition without its `e`, version without its `v`, latest year of the `years` range | `9e v3.01 (2019/2024)` → `9:3.01:2024`; the language segment is dropped (the guide's URN is language-independent); the version segment stays empty when absent (`…si-brochure:9::2019`) |

Two guide examples do not fit the guide's own stated pattern and are
documented rather than reproduced:
`urn:bipm:v1:cipm:resolution:95-2006:1` puts a venue-id and the outcome
ordinal where the pattern's identifier/date slots sit, and
`urn:bipm:v1:cgpm:26:2018:resolution:1` carries the CGPM meeting number
in a venue-id slot the flavor has no attribute for — CGPM resolutions
therefore emit `urn:bipm:v1:cgpm:resolution:1:2018`. The guide's URN
sections for MEP and the CC guides are empty, so those families still
emit no official URN.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:bipm:v1:cctf:recommendation:2:2012` | CCTF REC 2 (2012) | attested in the pubid testsuite (71 rows) |
| `urn:bipm:v1:cipm:decision:101-1:2012` | CIPM DECN 101-1 (2012) | attested in the pubid testsuite — the meeting-decision number rides the identifier slot |
| `urn:bipm:v1:cipm:decision:112-a3:2022` | CIPM DECN 112 A3 (2022) | attested in the pubid testsuite — the appendix complement folds into the identifier |
| `urn:bipm:v1:cipm::2005-06` | CIPM 2005-06 | attested in the pubid testsuite — the bare MRA form keeps its empty type and number segments |
| `urn:bipm:v1:cgpm:resolution:1:1927` | CGPM RES 1 (1927) | attested in the pubid testsuite |
| `urn:bipm:v1:cgpm:meeting:17:1983` | CGPM 17th Meeting (1983) | attested in the pubid testsuite |
| `urn:bipm:v1:ccauv:meeting:1:1999` | CCAUV 1st Meeting (1999) | attested in the pubid testsuite |
| `urn:bipm:v1:metrologia:51:1:128` | Metrologia 51 1 128 | attested in the pubid testsuite |
| `urn:bipm:v1:bipm:si-brochure:9:3.01:2024` | BIPM SI Brochure 9e v3.01 (2019/2024, E) | attested in the pubid testsuite |
| `urn:bipm:v1:bipm:si-brochure:9::2019` | BIPM SI Brochure 9e (2019) | attested in the pubid testsuite — the empty version segment per the guide's own example |

## Rules that apply to every BIPM URN

- **`v1` leads.** Every family carries the guide's version segment as
  its first segment.
- **The type is the English name, never the abbreviation.** The type
  segment is `recommendation`/`resolution`/`decision`/`action`/
  `statement` — the guide spells it out, and `REC`/`RES`/`DECN` codes
  never enter the URN. A number-less bare form keeps the empty segment.
- **The venue slots stay unfilled.** The flavor holds no venue attribute;
  the venue qualification of a document number (`110-17`) rides the
  identifier slot verbatim.
- **The brochure loses its letters.** The edition's `e` and the
  version's `v` are stripped, the language segment is dropped, and the
  year is the latest one the `years` range names.
- **French records emit the same URN.** The URN is language- and
  form-neutral: `Recommandation CCL/1 (2001)` (a French record) and
  `CCL Recommendation 1 (2001)` share one identity.

## Status in PubID

The PubID `bipm` flavor emits these `urn:bipm:` shapes on `to_urn` today
(ruling of 2026-11-11). Every landed `urn:bipm:` URN moved with the
adoption — a `relaton-data-bipm` re-crawl follows, accepted by the owner
— and the pre-adoption faces (`urn:bipm:cipm:res:101-1:2012`,
`urn:bipm:si-brochure:e:9e:v3.01:2019/2024`, the metrologia and meeting
forms without `v1`) stay parseable as documented parse-in aliases: an
alias never renders back as itself, it rebuilds the identifier whose
`to_urn` is the `v1` face, so no stored row or consumer-held URN stops
resolving while the crawl lags. The scheme audit gives 90 ids, 33
round-trip, 21 reshape, 36 that do not re-parse, and 10 colliding URNs —
*sampled on the pre-adoption face*, before the ruling above.

The universal `urn:pubid:bipm:` scheme is untouched by the ruling — the
schema reads `to_hash` only, so the codec needed no deviation knob. The
positional core is the number and the atoms are `part-`, `issue-`,
`year-` (Integer), `ed-`, `v-`, `appendix-`, `annex-`, `lang-`,
`article-`, `form-`, `group-`, `guidekind-`, `mepcode-`, `reportcode-`,
`typecode-`, `variant-` and `years-`; a committee document with no
number (`CGPM DECL (1889)`) emits no core segment and the atom list
carries it (`urn:pubid:bipm:cd:year-1889:group-CGPM:typecode-DECL`).
All 111 corpus rows emit.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [WMO URN scheme (urn:mrn:wmo:pub)](/specs/wmo-urn), [OGC URN scheme (urn:ogc)](/specs/ogc-urn), [ISBN URN scheme (urn:isbn)](/specs/isbn-urn), [DOI URN scheme (urn:doi)](/specs/doi-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [BIPM publisher page](/publishers/bipm)
