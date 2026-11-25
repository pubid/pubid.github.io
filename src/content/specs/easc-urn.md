---
title: "EASC URN scheme (urn:easc)"
description: "The PubID-invented URN form the EASC flavor emits on to_urn — the Euro-Asian Council for Standardization has no URN namespace in the IANA registry, so the fleet mints these itself; a short lowercase positional scheme for the ПМГ/РМГ series, attested across the 167-row corpus."
---

# EASC URN scheme (urn:easc)

EASC (the Euro-Asian Council for Standardization, Metrology and
Certification) has no URN namespace in the IANA registry and publishes
no URN rule for its interstate rules (ПМГ) and recommendations (РМГ).
The `urn:easc:` form documented here is therefore the PubID fleet's
own: the emission of the `easc` flavor's `to_urn`, carrying no
round-trip promise. It is the fleet's shortest scheme — the lowercased
series, an optional lowercased variant, the number and the year — and
it is perfectly regular: the audit reshapes nothing, raises nothing and
collides nothing. The fleet's lossless form for the same documents is
the universal `urn:pubid:easc:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `easc` — **not IANA-registered**; the PubID `easc` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an EASC assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; EASC publications carry the ПМГ (PMG, interstate rules) and РМГ (RMG, interstate recommendations) series designations, Cyrillic-script on the covers |

## Scheme structure

Every URN carries the `urn:easc:` lead, the series downcased, the
variant (when the record has one) downcased, the number and the year:

```
urn:easc:<series>[:<variant>]:<number>[:<year>]
```

| Segment | Content | Notes |
|---|---|---|
| `<series>` | the series, downcased | `pmg` (the ПМГ interstate rules), `rmg` (the РМГ interstate recommendations); the Cyrillic cover script downcasts to the Latin series token |
| `<variant>` | the defense-related variant, downcased | `v` — the Cyrillic `В` face stores as the Latin `V` and emits lowercase |
| `<number>` | the document number, leading zeros kept | `02`, `31`, `151`, `100` |
| `<year>` | the year | `2008`, `2025`, `93` (a two-digit year prints as it is stored) |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:easc:pmg:02:2008` | ПМГ 02-2008 | attested in the pubid corpus (167 rows) |
| `urn:easc:pmg:02:93` | ПМГ 02-93 | attested in the pubid corpus — the two-digit year |
| `urn:easc:rmg:151:2025` | РМГ 151-2025 | attested in the pubid corpus |
| `urn:easc:rmg:100:2010` | РМГ 100-2010 | attested in the pubid corpus |
| `urn:easc:pmg:v:31:2001` | ПМГ В 31-2001 | attested in the pubid corpus — the Cyrillic `В` variant emits lowercase `v` |

## Rules that apply to every EASC URN

- **The lead is fixed.** `urn:easc:` carries the private namespace;
  only the ПМГ and РМГ identifier classes emit — anything else raises.
- **The series downcasts.** The cover prints Cyrillic (`ПМГ`, `РМГ`);
  the URN carries the lowercased Latin token (`pmg`, `rmg`).
- **The variant is its own lowercased segment.** The defense `В` face
  stores as Latin `V` and emits `v`, between the series and the number.
- **The number keeps its leading zeros.** `ПМГ 02-2008` emits `02`, so
  the URN reconstructs the printed number.
- **The year prints as stored.** Four-digit and two-digit years both
  appear (`2008`, `93`), so the segment is a year only by convention.
- **The scheme is one-URN-per-document here.** The audit gives 167 ids,
  167 round-trip, 0 reshape, 0 that do not re-parse, 0 raise, 0 empty,
  and 0 colliding URNs — the only batch scheme with a perfect sheet.

## Status in PubID

The PubID `easc` flavor emits this `urn:easc:` scheme on `to_urn`
today; the audit's numbers above are the perfect sheet. The corpus is
167 rows, every one parses and every one emits.

The universal `urn:pubid:easc:` scheme is the fleet's lossless form:
the positional core is the number, the `_type` tokens are `pmg` (the
interstate rules), `rmg` (the interstate recommendations) and `id`, and
the atoms carry the series, the year and the variant — the series the
parser records is the Latin transliteration, so `ПМГ В 31-2001` emits
`series-PMG:variant-V`. Landed with issue #670 as drafted. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [GOST URN scheme (urn:gost)](/specs/gost-urn) — the sibling interstate-standards scheme
- [URN Mapping Overview](/concepts/urn)
- [EASC publisher page](/publishers/easc)
