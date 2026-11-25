---
title: "GB URN scheme (urn:gb)"
description: "The PubID-invented base-fallback URN form the GB flavor emits on to_urn — no Chinese standardization body has a URN namespace in the IANA registry, so the fleet's shared base generator mints urn:gb: itself; nothing round-trips and the pubid scheme is the lossless form, attested across the 10-row corpus."
---

# GB URN scheme (urn:gb)

China's standardization bodies (SAC and the sector and group bodies
whose codes ride the flavor — `GB`, `GB/T`, `JB`, `HB`, `GBn`, `T/…`)
have no URN namespace in the IANA registry and publish no URN rule for
their standards. The `urn:gb:` form documented here is therefore the
PubID fleet's own — and specifically the **shared base generator's
fallback**: the `gb` flavor defines no `UrnGenerator` of its own, so
the base joins the namespace, the downcased publishing body, the
number, the part and the year. It carries no round-trip promise and
delivers none: the audit re-parses none of its ids (the base path is
positional and the body is already downcased into it), and 1 collision
shows the shape's lossiness. The fleet's lossless form for the same
documents is the universal `urn:pubid:gb:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `gb` — **not IANA-registered**; the PubID `gb` flavor's private namespace |
| Assigning authority | none — the form is the shared base generator's emission, not an SAC assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the group-registry slash in `t/gzaepi` is legal inside an NSS) |
| Registry context | none; Chinese standards carry the `GB`, `GB/T`, `GB/Z`, `JB/T`, `HB/Z`, `GBn`, `T/GZAEPI` body-plus-mandate designations with the `<number>-<year>` numbering |

## Scheme structure

Every URN carries the `urn:gb:` lead, the downcased publishing body,
the number, the dash-prefixed part (when the record has one) and the
year:

```
urn:gb:<body>:<number>:[-<part>]:[<year>]
```

| Segment | Content | Notes |
|---|---|---|
| `<body>` | the publishing body, downcased | `gb` (all GB, GB/T and GB/Z faces — the mandate letter never appears), `jb`, `hb`, `gbn`, `t/gzaepi` (a group standard; the registry slash rides in the segment) |
| `<number>` | the document number | `1234`, `5606`, `13368` |
| `-<part>` | the part, dash-prefixed | `5606.1` emits `-1` |
| `<year>` | the year | `2010`, `2004`; a year-less reference omits the segment |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:gb:gb:1234:2010` | GB 1234-2010 | attested in the pubid corpus (10 rows) |
| `urn:gb:gb:20223:2006` | GB/T 20223-2006 | attested in the pubid corpus — the `/T` mandate never enters the URN |
| `urn:gb:gb:5606:-1:2004` | GB/T 5606.1-2004 | attested in the pubid corpus — the dash-prefixed part |
| `urn:gb:gb:123:2008` | GB/Z 123-2008 | attested in the pubid corpus — the `/Z` guide mandate likewise drops |
| `urn:gb:gbn:123:1990` | GBn 123-1990 | attested in the pubid corpus — `GBn/T 123-1990` carries the same URN (the mandate drops, and 1 collision results) |
| `urn:gb:jb:13368:2018` | JB/T 13368-2018 | attested in the pubid corpus — a sector body |
| `urn:gb:hb:12:2010` | HB/Z 12-2010 | attested in the pubid corpus |
| `urn:gb:t/gzaepi:001:2018` | T/GZAEPI 001-2018 | attested in the pubid corpus — a group standard, body downcased with the registry slash kept |
| `urn:gb:gb:5606` | GB/T 5606 (all parts) | attested in the pubid corpus — the all-parts wrapper collapses to its base |

## Rules that apply to every GB URN

- **The flavor defines no generator.** The emission is the shared base
  generator's fallback — namespace, body, number, part, year, joined.
- **The mandate letter never enters.** `GB` and `GB/T` are different
  documents and both emit `urn:gb:gb:...`; the base path has no
  segment for the mandate.
- **The body downcasts into the path.** `T/GZAEPI` emits `t/gzaepi` —
  the registry slash rides inside the body segment.
- **Nothing round-trips.** The audit gives 10 ids, 0 round-trip, 0
  reshape, 10 that do not re-parse, 0 raise, 0 empty, and 1 colliding
  URN (`GBn 123-1990` vs `GBn/T 123-1990`) — a lossy summary, not a
  lossless key.
- **An all-parts wrapper collapses to its base.** `GB/T 5606 (all
  parts)` emits the base's URN; the members ride `ids-` in the
  universal scheme only.

## Status in PubID

The PubID `gb` flavor emits this base-fallback `urn:gb:` form today.
The corpus is 10 rows, every one parses and every one emits; the
audit's re-parse and collision numbers above say what the form is
worth as a key.

The universal `urn:pubid:gb:` scheme is the fleet's lossless form: the
number is the core of the `std` type, and the publishing body and the
mandate letter (`T` of GB/T) are atoms — `JB/T 13368-2018` is
`urn:pubid:gb:std:13368:pub-JB:mandate-T:year-2018`. The `_type`
tokens are `all`, `id` and `std` (the all-parts wrapper has no core
and carries its members as `ids-`). Landed with issue #670 as drafted.
See [the universal PubID URN scheme](/library/pubid-urn-scheme) for
the `urn:pubid:` codec itself.

## See Also

- [URN Mapping Overview](/concepts/urn)
- [GB publisher page](/publishers/gb)
