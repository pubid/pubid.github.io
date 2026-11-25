---
title: "IETF URN scheme (urn:ietf:rfc)"
description: "The URN namespace of the IETF itself — urn:ietf per RFC 2648, covering RFCs, the BCP/STD/FYI sub-series and Internet-Drafts, emitted by the PubID ietf flavor on to_urn."
---

# IETF URN scheme (urn:ietf:rfc)

The IETF registered the `ietf` URN namespace for its own documents with
IANA through RFC 2648 (August 1999), and is its own assigning authority.
The namespace covers the RFC series and the sub-series that index it —
Best Current Practice (BCP), Standard (STD) and For Your Information (FYI)
— plus the Internet-Draft series. The PubID `ietf` flavor emits this
official scheme on `to_urn` directly: over the audited sample every
identifier round-trips.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ietf` (IANA-registered, RFC 2648, August 1999) |
| Assigning authority | the IETF itself |
| Governing guidance | RFC 2648, "A URN Namespace for IETF Documents"; URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; RFCs resolve through the RFC Editor |

## Scheme structure

```
urn:ietf:{rfc|bcp|std|fyi}:<number>
urn:ietf:id:<draft-name>[:<version>]
```

| Segment | Content | Notes |
|---|---|---|
| `rfc` | the RFC series | `RFC 1` → `urn:ietf:rfc:1` |
| `bcp` | Best Current Practice sub-series | `BCP 10` → `urn:ietf:bcp:10` |
| `std` | Standard sub-series | `STD 8` → `urn:ietf:std:8` |
| `fyi` | For Your Information sub-series | `FYI 8` → `urn:ietf:fyi:8` |
| `id` | Internet-Draft series | the draft name follows the `id` marker |
| `<version>` | the draft's `-NN` version suffix | becomes its own segment: `draft-ietf-dnsop-svcb-https-04` → `urn:ietf:id:draft-ietf-dnsop-svcb-https:04` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ietf:rfc:1` | RFC 1 | attested in the pubid corpus (2,526 rows) |
| `urn:ietf:rfc:1068` | RFC 1068 | attested in the pubid corpus |
| `urn:ietf:bcp:184` | BCP 184 | attested in the pubid corpus |
| `urn:ietf:std:8` | STD 8 | attested in the pubid corpus |
| `urn:ietf:fyi:8` | FYI 8 | attested in the pubid corpus |
| `urn:ietf:id:draft-ietf-dnsop-svcb-https:04` | draft-ietf-dnsop-svcb-https-04 | attested in the pubid corpus |
| `urn:ietf:id:draft-bastian-jose-alg-ecdh-mac` | draft-bastian-jose-alg-ecdh-mac (version-less) | attested in the pubid corpus |

## Rules that apply to every IETF URN

- **Only concrete documents emit.** The flavor raises for an identifier
  that is not a concrete RFC, BCP, STD, FYI or Internet-Draft — a bare
  `Pubid::Ietf::Identifier` has no series and no URN.
- **The version moves off the name.** A draft's printed `-NN` version
  suffix becomes its own `:NN` segment, so the base draft name and every
  versioned revision share the `urn:ietf:id:<draft-name>` prefix.
- **The sub-series numbers stay whole.** BCP, STD and FYI numbers are
  themselves indices over RFCs; the URN names the sub-series entry, not
  the RFCs it aggregates.

## Status in PubID

The PubID `ietf` flavor already emits the official RFC 2648 scheme on
`to_urn`, and it round-trips: the audit over 400 sampled pass ids gives
400 round-trip, 0 reshape, 0 that do not re-parse, and 0 colliding URNs;
the corpus is 2,526 of 2,526 pass ids parse, and every corpus row emits.

The universal `urn:pubid:ietf:` scheme carries the identifier exactly as
its model does, with a type token per class — `rfc`, `bcp`, `fyi`, `std`,
and `id2` for the Internet-Draft (the draft reserved `id` for the bare
identifier) — the `v-` version atom, and a draft name whose first byte
escapes (landed with the 2.0 URN wave, issue pubid#670). All 2,526 corpus
rows emit on it too.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ETSI URN scheme (urn:etsi)](/specs/etsi-urn), [ITU URN scheme (urn:itu)](/specs/itu-urn), [CCSDS URN scheme (urn:ccsds)](/specs/ccsds-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [IETF publisher page](/publishers/ietf)
