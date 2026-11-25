---
title: "OGC URN scheme (urn:ogc)"
description: "The URN namespace of the Open Geospatial Consortium — the formal ogc namespace registered by RFC 5165, and the year-led document emission of the PubID ogc flavor."
---

# OGC URN scheme (urn:ogc)

OGC (Open Geospatial Consortium) is the assigning authority of the `ogc`
URN namespace, registered with IANA by RFC 5165 (March 2008) for OGC
specifications and related resources. The PubID `ogc` flavor emits the
namespace with the OGC document number's own parts — the two-digit year,
the sequence number and the revision tail.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ogc` (IANA-registered, RFC 5165, March 2008) |
| Assigning authority | Open Geospatial Consortium (OGC) |
| Governing guidance | RFC 5165 (March 2008); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; OGC documents are published through ogc.org |

## Scheme structure

The flavor emits the document number split at its printed dashes; the
revision tail is its own segment and only appears when the document
carries one:

```
urn:ogc:<year>:<number>[:<revision>]
```

| Segment | Content | Notes |
|---|---|---|
| `<year>` | the two-digit year of the document number | `01`–`25`, `99`; the printed two-digit form is kept — it is identity here, not a date |
| `<number>` | the sequence number | `009`, `032`, `128` — the zero padding of the printed number stays |
| `<revision>` | the printed revision tail | `r1`–`r12`, with lettered forms riding (`r3a`, `r12a`); a corrigendum tail spells `c1` |

`OGC 02-023r4` emits `urn:ogc:02:023:r4` — the printed `r4` becomes the
revision segment. A document with no revision tail gets no third
segment (`OGC 23-049` → `urn:ogc:23:049`).

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ogc:01:009:a` | 01-009a | attested in the pubid testsuite (88 rows) — the letter-only tail rides as the revision |
| `urn:ogc:02:023:r4` | 02-023r4 | attested in the pubid testsuite |
| `urn:ogc:04:095:c1` | 04-095c1 | attested in the pubid testsuite — the corrigendum tail spells `c1` |
| `urn:ogc:09:102:r3a` | 09-102r3a | attested in the pubid testsuite — the letter rides the revision |
| `urn:ogc:12:128:r12a` | 12-128r12a | attested in the pubid testsuite |
| `urn:ogc:23:049` | 23-049 | attested in the pubid testsuite — no revision tail, no third segment |
| `urn:ogc:24:061` | 24-061 | attested in the pubid testsuite |
| `urn:ogc:99:108:r2` | 99-108r2 | attested in the pubid testsuite |

## Rules that apply to every OGC URN

- **The two-digit year is identity.** The year segment keeps the printed
  two-digit form (`06`, `99`) — it names the document-number series, it
  is not a date, and it is never expanded to four digits.
- **The zero padding is identity.** The number segment keeps the printed
  three-digit padding (`009`, `032`), so the URN round-trips back to the
  printed document number.
- **The revision tail is one segment.** The printed `r<n>` (and its
  lettered forms `r3a`, `r12a`) or `c<n>` moves whole into the revision
  segment; a document without one emits no empty segment.

## Status in PubID

The PubID `ogc` flavor emits this `urn:ogc:` scheme on `to_urn` today.
The audit over the sampled pass ids gives 88 ids, 88 round-trip, 0
reshape, 0 that do not re-parse, 0 raise, 0 empty, and 0 colliding URNs;
the corpus is 88 of 88 pass ids parse, and every corpus row emits.

The universal `urn:pubid:ogc:` scheme carries the identifier exactly as
its model does: the positional core is the number, and the atoms are
`year-` and `rev-`. The year atom keeps the printed two-digit form
(`year-06`) for the same reason the URN segment does — it is identity,
not a date. All corpus rows emit.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [OASIS URN scheme (urn:oasis)](/specs/oasis-urn), [WMO URN scheme (urn:mrn:wmo:pub)](/specs/wmo-urn), [BIPM URN scheme (urn:bipm)](/specs/bipm-urn), [IHO URN scheme (urn:mrn:iho)](/specs/iho-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [OGC publisher page](/publishers/ogc)
