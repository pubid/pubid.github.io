---
title: "IEEE URN scheme (urn:ieee:std)"
description: "The URN namespace of the IEEE Standards Association — the formal ieee namespace registered by RFC 8069, and the document-oriented urn:ieee: emission of the PubID ieee flavor."
---

# IEEE URN scheme (urn:ieee:std)

The IEEE Standards Association (IEEE SA) is the assigning authority of the
`ieee` URN namespace, registered with IANA by RFC 8069 (February 2017) for
IEEE standards and related documents. The registered standards form is
`urn:ieee:std:`; the PubID `ieee` flavor emits the namespace with a
document-oriented naming that carries the publishing body, the standard's
code, the year, and the state and relationship markers of the identifier.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ieee` (IANA-registered, RFC 8069, February 2017) |
| Assigning authority | IEEE Standards Association (IEEE SA) |
| Governing guidance | RFC 8069 (February 2017); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; `urn:ieee:std:` is the registered standards form |

## Scheme structure

The flavor emits a colon-separated naming under `urn:ieee:`. The publishing
body comes first; the wrapper-class and type markers, the code, and the
year follow; the draft clause, edition and state markers trail:

```
urn:ieee:<publisher>[:<special-type>][:<type>]:<code>[:<year>][:<draft>][:<edition>][:<month-day>][:<draft-status>][:<markers>]
```

| Segment | Content | Notes |
|---|---|---|
| `<publisher>` | the publishing body, lowercased | defaults to `ieee`; joint bodies join with `-` (`ieee-iec`, `ieee-astm`, `ansi-ieee`) or the printed slash (`ansi/ieee`); the IEC/IEEE co-published pair is `iec-ieee` |
| `<special-type>` | wrapper-class marker | `si`, `redlined`, `conformance`, `interpretation`, `amendment`, `corrigendum`, `errata` |
| `<type>` | the identifier's type word, lowercased | `p` for project drafts; `Std` is dropped — a published standard has no type segment |
| `<code>` | the standard's number, canonical spelling | `802.11ah`, `C37.20.2`, `7.S2`; codes printed with mixed part separators share one canonical spelling |
| `<year>` | publication year | |
| `<draft>` | the draft clause, prefixed `draft.` | carries its printed spelling: `draft./D7.0, Sept 2017` |
| `<edition>` | edition number, prefixed `ed.` | |
| `<month-day>` | month (and day) of the draft | |
| `<draft-status>` | draft state, lowercased | `unapproved` |
| `<markers>` | trailing state and relationship markers | `redline`, `int`, `preprint`, `rel.<…>`, `revof.<…>`, `amdto.<…>`, `adopt.<…>`, `reaff.<…>`, `note.<…>`, `nick.<…>` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ieee:ieee:802.11ah:2016` | IEEE Std 802.11ah-2016 | attested in the pubid corpus (9,413 rows) |
| `urn:ieee:ieee:p:1547:draft./D7.0, Sept 2017` | IEEE P1547/D7.0, Sept, 2017 | attested in the pubid corpus |
| `urn:ieee:ansi/ieee:802.5:1998` | ANSI/IEEE 802.5-1998 (ISO/IEC 8802-5) | attested in the pubid corpus |
| `urn:ieee:iec-ieee:P65700.19.03` | IEC/IEEE CD P65700.19.03 | attested in the pubid corpus |
| `urn:ieee:ieee:C37.20.2:2015:redline` | IEEE Std C37.20.2-2015 - Redline | attested in the pubid corpus |
| `urn:ieee:ieee-astm:si:10:2010:draft./D2:October` | IEEE/ASTM PSI 10/D2, October 2010 | attested in the pubid corpus |
| `urn:ieee:ire:7.S2:1952` | 52 IRE 7.S2 | attested in the pubid corpus |
| `urn:ieee:aiee:1:1962` | AIEE 1-1962 | attested in the pubid corpus |

## Rules that apply to every IEEE URN

- **Namespace.** Every URN sits under the IANA-registered `ieee` namespace
  (RFC 8069); the URN syntax of the URN namespace model applies.
- **Publisher first.** The first segment names the publishing body and
  defaults to `ieee`; a document published jointly names every body
  (`ansi/ieee`, `ieee-iec`, `ieee-astm`).
- **Canonical codes.** The code segment renders canonically rather than as
  printed — codes printed with mixed part separators (`7.4-3-2`) share one
  identity with their uniform spelling.
- **The draft state travels.** The draft clause and its status ride the URN
  (`draft./D7.0, Sept 2017`, `unapproved`), so a draft and the edition it
  precedes are distinct URNs.

## Status in PubID

The PubID `ieee` flavor emits this document-oriented `urn:ieee:` scheme on
`to_urn` today. The audit over 400 sampled corpus ids gives 66 round-trip,
136 reshape, 198 that do not re-parse, and 3 colliding URNs; the lossy
faces are attested in the corpus — the conformance ordinal does not reach
the URN (all three `IEEE Std 1904.1/ConformanceNN-2014` identifiers emit
`urn:ieee:ieee:conformance:2014`), and a corrigendum row may collapse to
its year alone (`ANSI C63.5-2017/Cor. 1-2019` → `urn:ieee:ansi:2019`).

The universal `urn:pubid:ieee:` scheme carries the identifier exactly as
its model does: all 9,049 parseable pass ids (of 9,051) emit, round-trip by
`to_hash`, are path-safe, and give no collision (8,983 distinct URNs over
26 type tokens — `std`, `proj`, `si`, `aiee`, `ire`, `nesc` and their
kin). The scheme's URNs can be long — the longest is 264 characters,
above the 255-byte file-name limit that once made `relaton-data-ieee` lose
crawl batches, so a slug used as a file name must be shortened or hashed.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ETSI URN scheme (urn:etsi)](/specs/etsi-urn), [ITU URN scheme (urn:itu)](/specs/itu-urn), [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn), [CCSDS URN scheme (urn:ccsds)](/specs/ccsds-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [IEEE publisher page](/publishers/ieee)
