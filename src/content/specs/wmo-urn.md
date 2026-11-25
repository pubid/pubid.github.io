---
title: "WMO URN scheme (urn:mrn:wmo:pub)"
description: "WMO's assigning-authority form of the IANA-registered mrn namespace — the IALA-pattern publication MRN adopted as the fleet extension by pubid#763, emitted by the PubID wmo flavor on to_urn."
---

# WMO URN scheme (urn:mrn:wmo:pub)

WMO (World Meteorological Organization) names its publications under the
`mrn` URN namespace — the Maritime Resource Name namespace that IALA
developed and IANA registered as a formal namespace — as an assigning
authority. WMO owns no namespace of its own in the IANA registry, and no
authoritative WMO `urn:mrn:wmo:` rule is published (the S-411 repository
carries none), so the shape documented here is the fleet's
assigning-authority extension of the `mrn` namespace, following the IALA
pattern, adopted by the pubid#763 ruling, until WMO publishes one. The
PubID `wmo` flavor emits this scheme on `to_urn`.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `mrn` (IANA-registered, formal template `mrn`) |
| Assigning authority | WMO, as an MRN assigning authority — not the namespace owner |
| Governing guidance | the MRN syntax of the IALA scheme (RFC 2141 URN syntax); the WMO form is the fleet's IALA-pattern extension, adopted by the pubid#763 ruling — **no authoritative WMO `urn:mrn:wmo:` rule is published** |
| Registry context | IANA URN namespace registry (`mrn`, formal namespaces); WMO publications carry WMO-No. and S-series numbers |

## Scheme structure

Every URN carries the MRN lead, the WMO organization identifier `wmo`,
the `pub` type namespace of the IALA publication pattern, and the series
code of the publication; the volume, status, edition and updated-in
qualifiers follow in the order the human face prints them:

```
urn:mrn:wmo:pub:<code>[:vol-<v>][:status-<s>][:ed<x>][:updated-<y>]
```

| Segment | Content | Notes |
|---|---|---|
| `<code>` | the publication's series code | `wmo-<n>` (the WMO-No. series, `wmo-1364`), `wmo-td-<n>` (Technical Documents, `wmo-td-196`), `jcomm-tr-<n>` (joint WMO/IOC reports, `jcomm-tr-14`), `gaw-<n>` (GAW reports, `gaw-312`), `s-<n>` (the S-100 specs, `s-411`); an annex joins its base as `:annex[-<letter>]` |
| `vol-<v>` | the volume | caseless, lowercased: `vol-i.1`, `vol-iii`, `vol-d` |
| `status-<s>` | the edition's status word | caseless, lowercased: `status-provisional` |
| `ed<x>` | the edition, glued after `ed` | the calendar-year face on a publication (`ed2025`); the year pair keeps its slash out of the NSS as a hyphen (`ed2021-2018`); the dotted face on a standard or annex (`ed1.2.1`) |
| `updated-<y>` | the year the edition was updated in | `updated-2025` |

An annex of an S-series specification carries the base specification's
code, then `annex-<letter>` (lettered form) or bare `annex` (an "Annex"
without a letter), then the annex's own edition.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:mrn:wmo:pub:wmo-1364:ed2025` | WMO-No. 1364, 2025 edition | attested in the pubid testsuite (40 rows) |
| `urn:mrn:wmo:pub:wmo-306:vol-i.1:ed2020` | WMO-No. 306, Volume I.1, 2020 edition | attested in the pubid testsuite |
| `urn:mrn:wmo:pub:wmo-8:ed2021-2018` | WMO-No. 8, 2021/2018 edition | attested in the pubid testsuite — the year pair hyphenates |
| `urn:mrn:wmo:pub:wmo-8:status-provisional:ed2026` | WMO-No. 8, Provisional 2026 edition | attested in the pubid testsuite |
| `urn:mrn:wmo:pub:wmo-1364:ed2023:updated-2025` | WMO-No. 1364, 2023 edition, updated in 2025 | attested in the pubid testsuite |
| `urn:mrn:wmo:pub:wmo-td-196` | WMO/TD-No. 196 | attested in the pubid testsuite — the Technical Document series |
| `urn:mrn:wmo:pub:jcomm-tr-14` | JCOMM Technical Report No. 14 | attested in the pubid testsuite — the joint WMO/IOC series |
| `urn:mrn:wmo:pub:gaw-312` | GAW Report No. 312 | attested in the pubid testsuite — the GAW series |
| `urn:mrn:wmo:pub:s-411:ed1.2.1` | S-411 1.2.1 | attested in the pubid testsuite — the dotted edition face |
| `urn:mrn:wmo:pub:s-411:annex-a` | S-411 Annex A | attested in the pubid testsuite |

## Rules that apply to every WMO URN

- **The MRN lead is fixed.** `urn:mrn:wmo:pub` carries the namespace,
  the organization identifier and the publication type namespace; the
  IALA MRN pattern is the syntax this form extends.
- **The series code is the prefix.** The printed series name maps to its
  slug — `WMO-No.` → `wmo-`, `WMO/TD-No.` → `wmo-td-`,
  `JCOMM Technical Report No.` → `jcomm-tr-`, `GAW Report No.` → `gaw-`,
  the bare `S-` specs → `s-` — so the series rides the code segment and
  two series can never collapse onto one code.
- **The segment order mirrors the human face.** Volume, status, edition
  and updated-in follow in the order the cover prints them.
- **Caseless qualifiers lowercase.** The volume and status segments are
  downcased (`vol-i.1`, `status-provisional`); the parser re-cases them.
- **No slash in the NSS.** The year pair's slash hyphenates
  (`ed2021-2018`), the same hyphenation the MR slug uses — RFC 2141 has
  no slash in the trans set.

## Status in PubID

The PubID `wmo` flavor emits this `urn:mrn:wmo:pub:` scheme on `to_urn`
today. The audit over the sampled pass ids gives 58 ids, 58 round-trip,
0 reshape, 0 that do not re-parse, 0 raise, 0 empty, and 15 colliding
URNs — the corpus' alternate spellings of the same documents; each
distinct document has one URN. The corpus is 58 of 58 pass ids parse,
and every corpus row emits.

The universal `urn:pubid:wmo:` scheme carries the identifier exactly as
its model does: the positional core is the number, and the atoms are
`series-`, `vol-`, `ed-` (one atom — the calendar-year face on a
publication, the dotted face on a standard or annex; the year pair
escapes its slash as `ed-2021~2F2018`), `status-`, `updated-` and the
annex atoms `annexform-` and `letter-` (the iala schema's markers).
`series` is nil on the WMO-No. default, so every pre-widening URN is
unchanged. All 58 corpus rows emit.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IALA URN scheme (urn:mrn:iala)](/specs/iala-urn) — the MRN owner scheme this form extends, and [IHO URN scheme (urn:mrn:iho)](/specs/iho-urn) — the sibling assigning-authority scheme
- [OGC URN scheme (urn:ogc)](/specs/ogc-urn), [BIPM URN scheme (urn:bipm)](/specs/bipm-urn)
- [URN Mapping Overview](/concepts/urn)
- [WMO publisher page](/publishers/wmo)
