---
title: "API URN scheme (urn:api)"
description: "The PubID-invented URN form the API flavor emits on to_urn — the American Petroleum Institute has no URN namespace in the IANA registry, so the fleet mints these itself; a flat scheme whose type segment is always std, attested across the 193-row corpus."
---

# API URN scheme (urn:api)

API (the American Petroleum Institute) has no URN namespace in the IANA
registry and publishes no URN rule for its standards, recommended
practices, specifications, technical reports, bulletins, publications
and MPMS chapters. The `urn:api:` form documented here is therefore the
PubID fleet's own: the legacy emission of the `api` flavor's `to_urn`,
carrying no round-trip promise. It is the fleet's flattest scheme: the
type segment is hard-wired to `std` regardless of the record's class,
and the URN keeps only the number, an optional part and an optional
year. The fleet's lossless form for the same documents is the universal
`urn:pubid:api:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `api` — **not IANA-registered**; the PubID `api` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an API assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; API publications carry the STD/RP/SPEC/TR/BULL/PUBL/MPMS/COS type words and the bare typeless numbering |

## Scheme structure

Every URN is the `urn:api:` lead, the fixed `std` type segment, the
number — with a part dash-joined — and the year:

```
urn:api:std:<number>[-<part>][:<year>]
```

| Segment | Content | Notes |
|---|---|---|
| `std` | the fixed type segment | `RP`, `SPEC`, `TR`, `BULL`, `PUBL`, `MPMS` and `COS` all emit `std`; the record's class is only in the universal scheme |
| `<number>` | the document number | `1104`, `11P`, `11L2`, `1628B`, `10B`, `1509` (a typeless record rides the same segment) |
| `-<part>` | the part, dash-joined onto the number segment | `-08` (`API COS 1-08` emits `1:-08`), `-2` (`API RP 10B-2` emits `10B:-2`) |
| `<year>` | the year | only when the record dates itself — none of the 193 attested rows carries one |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:api:std:1104` | API STD 1104 | attested in the pubid corpus (193 rows) |
| `urn:api:std:1637` | API RP 1637 | attested in the pubid corpus — the RP class emits `std` |
| `urn:api:std:11P` | API SPEC 11P | attested in the pubid corpus |
| `urn:api:std:11L2` | API BULL 11L2 | attested in the pubid corpus — the bulletin class |
| `urn:api:std:1628B` | API PUBL 1628B | attested in the pubid corpus |
| `urn:api:std:1509` | API 1509 | attested in the pubid corpus — the typeless record rides the same form |
| `urn:api:std:1:-08` | API COS 1-08 | attested in the pubid corpus — the part keeps its dash |
| `urn:api:std:10` | API MPMS CH 10.10 (also API MPMS CH 10.9) | attested in the pubid corpus — the chapter section is dropped, so the two chapters collide |
| `urn:api:std:10B:-2` | API RP 10B-2 | attested in the pubid corpus |

## Rules that apply to every API URN

- **The lead and the type segment are fixed.** `urn:api:std` is the
  whole type story: the emission returns `std` unconditionally, so an
  RP, a SPEC, a TR, a bulletin, a publication, an MPMS chapter, a COS
  and a typeless record are indistinguishable by URN.
- **The part dash-joins the number segment.** `API COS 1-08` emits
  `1:-08` — the dash stays inside the part's own segment, per the
  corpus.
- **The MPMS section is dropped.** `API MPMS CH 10.10` emits
  `urn:api:std:10`, identical to `API MPMS CH 10.9` — the audit gives
  11 colliding URNs, mostly MPMS chapter families.
- **The year segment exists but the corpus never fills it.** Only a
  record that dates itself can print a year (the typeless standards);
  none of the 193 attested rows carries one.
- **No escaping needed.** The values the corpus carries are digits and
  letters, all inside RFC 8141's NSS charset.

## Status in PubID

The PubID `api` flavor emits this `urn:api:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 193 ids, 40
round-trip, 153 reshape, 0 that do not re-parse, 0 raise, 0 empty, and
11 colliding URNs; the corpus is 193 rows, every one parses and every
one emits.

The universal `urn:pubid:api:` scheme is the fleet's lossless form: the
positional core is the number, the `_type` tokens are `std`,
`rp` (recommended practice), `spec` (specification), `tr` (technical
report), `bulletin`, `pub` (publication), `mpms` (the MPMS chapters),
`cos` (continuous-operations standards), `ts` (the typeless standards)
and the `base`/`id` internals, and the atoms carry the part, the
section, the subsection and the year. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ASTM URN scheme (urn:astm)](/specs/astm-urn), [ASME URN scheme (urn:asme)](/specs/asme-urn)
- [URN Mapping Overview](/concepts/urn)
- [API publisher page](/publishers/api)
