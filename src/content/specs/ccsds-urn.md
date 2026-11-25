---
title: "CCSDS URN scheme (urn:ccsds)"
description: "The URN namespace of the Consultative Committee for Space Data Systems — urn:ccsds per RFC 7738, carrying the printed book identity of CCSDS Blue, Green, Magenta and Orange Books."
---

# CCSDS URN scheme (urn:ccsds)

CCSDS (Consultative Committee for Space Data Systems) is the assigning
authority of the `ccsds` URN namespace, registered with IANA by RFC 7738
(January 2016) for CCSDS publications. The namespace names the books by
their printed identity — series, book color, issue and status — so the URN
of a CCSDS document is the book id of its cover. The PubID `ccsds` flavor
emits this scheme on `to_urn`.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ccsds` (IANA-registered, RFC 7738, January 2016) |
| Assigning authority | CCSDS |
| Governing guidance | RFC 7738 (January 2016); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; CCSDS books are published through ccsds.org |

## Scheme structure

The printed book identity is carried verbatim as the namespace-specific
string, joined without colons; a corrigendum appends its own segment:

```
urn:ccsds:<series>.<number>-<color>[-<edition>][-<status>][:cor.<n>][:<language>]
```

| Segment | Content | Notes |
|---|---|---|
| `<series>.<number>` | the book number | as printed: `100.0`, `401.0`, `131.31` |
| `<color>` | the book color letter | `B` (Blue Book, Recommended Standard), `G` (Green Book, Recommended Practice), `M` (Magenta Book, Report), `O` (Orange Book, Experimental) |
| `<edition>` | the issue number | `-1`, `-2`, … |
| `<status>` | the `-S` suffix | marks the document's retired state — superseded by a later edition |
| `cor.<n>` | corrigendum ordinal | a corrigendum carries its document and appends `:cor.<n>`, sharing the base's prefix |
| `<language>` | translation language | a final lowercase segment |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ccsds:100.0-G-1-S` | CCSDS 100.0-G-1-S | attested in the pubid corpus (487 rows) |
| `urn:ccsds:120.1-G-3` | CCSDS 120.1-G-3 | attested in the pubid corpus |
| `urn:ccsds:123.0-B-2:cor.1` | CCSDS 123.0-B-2 Cor. 1 | attested in the pubid corpus |
| `urn:ccsds:503.0-B-1-S:cor.1` | CCSDS 503.0-B-1-S Cor. 1 | attested in the pubid corpus |
| `urn:ccsds:401.0-B-16-S` | CCSDS 401.0-B-16-S | attested in the pubid corpus |
| `urn:ccsds:652.1-M-2` | CCSDS 652.1-M-2 | attested in the pubid corpus |
| `urn:ccsds:131.31-O-1:cor.1` | CCSDS 131.31-O-1 Cor. 1 | attested in the pubid corpus |

## Rules that apply to every CCSDS URN

- **The book identity is the NSS.** The series, color, issue and status
  letters of the printed cover carry into the URN unchanged — the URN of
  `CCSDS 100.0-G-1-S` is `urn:ccsds:100.0-G-1-S`.
- **Retired books keep their `-S`.** The trailing status marker stays part
  of the identity; a superseded book and its successor edition are
  distinct URNs.
- **Corrigenda share the base prefix.** `CCSDS 123.0-B-2 Cor. 1` emits
  `urn:ccsds:123.0-B-2:cor.1` — one appended segment on the base book's
  URN.

## Status in PubID

The PubID `ccsds` flavor emits this scheme on `to_urn` today. The audit
over 400 sampled pass ids gives 365 round-trip, 0 reshape, 33 that do not
re-parse, 2 raise, and 0 colliding URNs; the corpus is 490 of 490 pass ids
parse, and every corpus row emits.

The universal `urn:pubid:ccsds:` scheme carries the identifier exactly as
its model does, with the type tokens `base` and `cor` (each taking the
book number as its integer core) and the atoms `type-`, `part-`, `ed-`,
`lang-` and `suffix-` (landed with the 2.0 URN wave, issue pubid#670). A
corrigendum carries its document along `base`, so the two share the slug
prefix — `urn:pubid:ccsds:base:121:part-0:type-B:ed-1:suffix-S:cor:1` —
the same shape the official scheme gives with `:cor.1`.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ETSI URN scheme (urn:etsi)](/specs/etsi-urn), [ITU URN scheme (urn:itu)](/specs/itu-urn), [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [CCSDS publisher page](/publishers/ccsds)
