---
title: "IANA URN scheme (urn:iana)"
description: "The PubID-invented URN form the IANA flavor emits on to_urn — the Internet Assigned Numbers Authority maintains the URN registry itself but has no own namespace in it, so the fleet mints urn:iana: itself; a two-level registry-slug scheme with the leading underscore kept, attested across the 30-row corpus."
---

# IANA URN scheme (urn:iana)

IANA (the Internet Assigned Numbers Authority) keeps the IANA URN
registry for everyone else — `urn:isbn:`, `urn:ietf:`, `urn:ogc:` all
live there — but registers no namespace of its own, and publishes no
URN rule for its protocol parameter registries as documents. The
`urn:iana:` form documented here is therefore the PubID fleet's own:
the emission of the `iana` flavor's `to_urn`, carrying no round-trip
promise. It is the fleet's plainest scheme — the top-level registry
slug, then the sub-registry slug when the record has one — and it is
perfectly regular: the audit reshapes nothing, raises nothing and
collides nothing. The fleet's lossless form for the same documents is
the universal `urn:pubid:iana:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `iana` — **not IANA-registered**; the PubID `iana` flavor's private namespace (IANA the organization curates the registry where every other NID lives, but has no NID itself) |
| Assigning authority | none — the form is the fleet's emission, not an IANA assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; IANA registry pages carry hierarchical slug names (`_6lowpan-parameters`, `eap-sake-parameters`) with slash-separated sub-registries |

## Scheme structure

Every URN carries the `urn:iana:` lead, the top-level registry slug
and — when the record has one — the sub-registry slug. A registry slug
contains no colon (its charset is `[a-zA-Z0-9._-]`), so the two levels
split unambiguously:

```
urn:iana:<registry>[:<sub-registry>]
```

| Segment | Content | Notes |
|---|---|---|
| `<registry>` | the top-level registry slug, verbatim | `_6lowpan-parameters`, `calipso`, `idna-tables-11.0.0`; the leading underscore is part of the canonical form and never reads as structure |
| `<sub-registry>` | the sub-registry slug, verbatim | `lowpan_nhc`, `edhoc-cipher-suites`, `sip-parameters-13`; the source's `/` separator becomes the segment boundary |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:iana:_6lowpan-parameters` | IANA _6lowpan-parameters | attested in the pubid corpus (30 rows) |
| `urn:iana:_6lowpan-parameters:lowpan_nhc` | IANA _6lowpan-parameters/lowpan_nhc | attested in the pubid corpus — the `/` sub-registry becomes a segment |
| `urn:iana:calipso` | IANA calipso | attested in the pubid corpus |
| `urn:iana:edhoc:edhoc-cipher-suites` | IANA edhoc/edhoc-cipher-suites | attested in the pubid corpus |
| `urn:iana:idna-tables-11.0.0:idna-tables-context` | IANA idna-tables-11.0.0/idna-tables-context | attested in the pubid corpus — dots ride in the slug |
| `urn:iana:ssh-parameters:ssh-parameters-20` | IANA ssh-parameters/ssh-parameters-20 | attested in the pubid corpus |

## Rules that apply to every IANA URN

- **The lead is fixed.** `urn:iana:` carries the private namespace —
  minted by the fleet, not by the authority that mints every other URN
  namespace.
- **The slug is verbatim.** Case, underscores, dots and the leading
  `_` are kept exactly as IANA prints them; the emission never
  normalizes.
- **The `/` separator becomes a segment boundary.** A sub-registry is
  its own segment, so `edhoc/edhoc-cipher-suites` emits
  `urn:iana:edhoc:edhoc-cipher-suites`.
- **No empty emission.** A stale pre-`number` row would otherwise emit
  the bare `urn:iana:`; the generator refuses — every affected
  identifier raises instead.
- **The scheme is one-URN-per-document here.** The audit gives 30 ids,
  30 round-trip, 0 reshape, 0 that do not re-parse, 0 raise, 0 empty,
  and 0 colliding URNs — a perfect sheet, like EASC's and AMCA's.

## Status in PubID

The PubID `iana` flavor emits this `urn:iana:` scheme on `to_urn`
today; the audit's numbers above are the perfect sheet. The corpus is
30 rows, every one parses and every one emits.

The universal `urn:pubid:iana:` scheme is the fleet's lossless form:
the registry slug is the core of the `registry` type (the `id` type has
an empty core) and the sub-registry is the `subregistry-` atom — the
same two facts the emission carries, restated in the fleet's codec.
Landed with issue #656 as drafted. See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn) — a namespace IANA itself registers
- [ISBN URN scheme (urn:isbn)](/specs/isbn-urn) — another IANA-registered namespace
- [URN Mapping Overview](/concepts/urn)
- [IANA publisher page](/publishers/iana)
