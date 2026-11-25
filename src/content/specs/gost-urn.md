---
title: "GOST URN scheme (urn:gost)"
description: "The PubID-invented URN form the GOST flavor emits on to_urn — GOST has no URN namespace in the IANA registry, so the fleet mints these itself; a bare positional scheme that keeps only the type lead, the number and the year, attested across the 199-row corpus."
---

# GOST URN scheme (urn:gost)

GOST (the interstate and national standards of Russia and the
CIS-participating states) has no URN namespace in the IANA registry and
publishes no URN rule for its standards. The `urn:gost:` form documented
here is therefore the PubID fleet's own: the legacy emission of the
`gost` flavor's `to_urn`, carrying no round-trip promise. It is the
fleet's most reductive scheme: every URN is `urn:gost:std[:r]:<number>[:<year>]`
— the adoption, harmonization, co-publisher and reference structure of
the identifier all collapse away, because the generator walks to the
base standard and prints only its number and year. The fleet's lossless
form for the same documents is the universal `urn:pubid:gost:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `gost` — **not IANA-registered**; the PubID `gost` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a GOST assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; GOST publications carry the interstate (`GOST`) and Russian national (`GOST R`) designations, adoption slashes and parenthesised references |

## Scheme structure

Every URN is the fixed `urn:gost:std` lead, the `r` marker for a
Russian national standard, the number and the year — nothing else:

```
urn:gost:std[:r]:<number>[:<year>]
```

| Segment | Content | Notes |
|---|---|---|
| `std` | the fixed type lead | every GOST standard rides `std`; the harmonized/identical adoption classes do not appear — the generator walks to the base standard first |
| `r` | the Russian-national marker | `GOST R 1.0-2015` emits `r`; an interstate standard omits it |
| `<number>` | the document number, dots included | `1437`, `1.0`, `12.4.202`, `28246.2`, `34.11` |
| `<year>` | the year | `2024`, `99` (a two-digit year prints as it is stored) |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:gost:std:1437:2024` | GOST 1437-2024 (ASTM D129-18) | attested in the pubid corpus (199 rows) — the ASTM reference is lost |
| `urn:gost:std:166` | GOST 166 (ISO 3599-76) | attested in the pubid corpus — an undated standard, the ISO reference lost |
| `urn:gost:std:r:1.0:2015` | GOST R 1.0-2015 | attested in the pubid corpus — the `r` national marker |
| `urn:gost:std:r:34.11:2012` | GOST R 34.11-2012 | attested in the pubid corpus |
| `urn:gost:std:r:12.4.202:99` | GOST R 12.4.202-99 | attested in the pubid corpus — the two-digit year, the dotted number |
| `urn:gost:std:r:58904:2020` | GOST R 58904-2020/ISO/TR 25901-1:2016 | attested in the pubid corpus — the identical-adoption half is lost |
| `urn:gost:std:28246.2:2025` | GOST 28246.2-2025 (IEC 63242-2:2024) | attested in the pubid corpus |

## Rules that apply to every GOST URN

- **The lead is fixed.** `urn:gost:std` is the type lead; there is no
  second form.
- **The generator walks to the base standard.** A harmonized standard or
  an identical adoption delegates to its base before generating, so the
  adoption class, the adopted document and the parenthesised reference
  never reach the URN: `GOST R 58904-2020/ISO/TR 25901-1:2016` is
  `urn:gost:std:r:58904:2020`.
- **Only the national marker survives the type system.** `r` is the one
  distinction the URN carries — interstate and national standards are
  told apart by it and nothing else.
- **The number keeps its dots.** `1.0`, `12.4.202` and `28246.2` print
  verbatim; the dot is `unreserved` in RFC 8141.
- **The year prints as stored.** Four-digit and two-digit years both
  appear (`2024`, `99`), so the segment is a year only by convention.
- **The scheme is not one-URN-per-document.** With adoptions flattened
  onto their bases, the audit gives 123 reshapes and 9 colliding URNs of
  200 ids.

## Status in PubID

The PubID `gost` flavor emits this `urn:gost:` scheme on `to_urn`
today. The URN-scheme audit gives 200 ids, 77 round-trip, 123 reshape,
and 9 colliding URNs; the corpus is 199 rows, every one parses and
every one emits.

The universal `urn:pubid:gost:` scheme is the fleet's lossless form:
the positional core is the number, the `_type` tokens are `is`
(interstate), `ns` (national), `h` (harmonized), `ia` (identical
adoption), `fr` (foreign reference) and `id`, and the atoms carry the
publisher, co-publisher, year, subtype, raw text, the adopted
identifiers and the adopted document. A harmonized or identical
adoption holds its base standard in `base`, so the base's number and
year write twice — once per node — and the adopted documents nest with
their own flavor's schema (`astm`, `cencenelec`, `iec`, `ieee`, `iso`).
The corpus gives 199 URNs of 200 rows: `ГОСТ Р 71039—2023` and
`ГОСТ Р 71039— 2023` are one document with one hash. A known gap,
pinned by the flavor's spec: a foreign reference keeps its text in
`raw`, which `to_hash` does not write yet, so two adoptions of
different unknown documents share one URN; the `raw-` atom is already
declared for the fix. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [ASTM URN scheme (urn:astm)](/specs/astm-urn), [EASC URN scheme (urn:easc)](/specs/easc-urn)
- [URN Mapping Overview](/concepts/urn)
- [GOST publisher page](/publishers/gost)
