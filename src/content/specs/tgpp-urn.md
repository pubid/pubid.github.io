---
title: "3GPP URN scheme (urn:3gpp)"
description: "The URN namespace of the 3rd Generation Partnership Project — the formal 3gpp namespace registered by RFC 5279, and the type-led emission of the PubID tgpp flavor."
---

# 3GPP URN scheme (urn:3gpp)

3GPP (the 3rd Generation Partnership Project) is the assigning authority of
the `3gpp` URN namespace, registered with IANA by RFC 5279 (March 2013)
for 3GPP specifications and technical reports. The namespace carries the
partnership's Technical Specifications (TS) and Technical Reports (TR)
with their release and version qualifiers; the PubID `tgpp` flavor emits
this scheme on `to_urn`.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `3gpp` (IANA-registered, RFC 5279, March 2013) |
| Assigning authority | 3GPP — the partnership of ARIB, ATIS, CCSA, ETSI, TSDSI, TTA and TTC |
| Governing guidance | RFC 5279 (March 2013); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; 3GPP specifications are published through 3gpp.org |

## Scheme structure

The flavor emits a colon-separated naming under `urn:3gpp:`. The
lowercased type prefix leads, the document code follows, and the release
and version close the URN:

```
urn:3gpp:<type>:<code>[:<release>][:<version>]
```

| Segment | Content | Notes |
|---|---|---|
| `<type>` | the document type prefix, lowercased | `ts` (Technical Specification), `tr` (Technical Report) |
| `<code>` | the document code, canonical spelling | the dotted number with its letter suffix and hyphenated parts: `23.207`, `01.01`, `02.06dcs`, `03.20ext`, `29.198-04-1`, `23.700-01` |
| `<release>` | the release token, as printed | `Ph1`, `Ph2`, `UMTS`, `Release 2000`, `REL-96` … `REL-19` |
| `<version>` | the three-part version | `2.0.0`, `5.3.0`, `18.0.0` |

A partial identifier — one without a release, a version, or both — drops
only its *trailing* empty segments, so a bare reference gets the clean
`urn:3gpp:ts:23.207` rather than a malformed `urn:3gpp:ts:23.207::`. An
*interior* empty segment is kept, so the release-less form keeps the URN
it has always emitted: `TS 29.215/2.0.0` → `urn:3gpp:ts:29.215::2.0.0`.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:3gpp:ts:23.207:REL-4:2.0.0` | TS 23.207:REL-4/2.0.0 | attested in the pubid testsuite (32 rows) |
| `urn:3gpp:tr:23.700-01:REL-19:0.1.0` | TR 23.700-01:REL-19/0.1.0 | attested in the pubid testsuite |
| `urn:3gpp:ts:01.01:Ph1:3.0.0` | TS 01.01:Ph1/3.0.0 | attested in the pubid testsuite |
| `urn:3gpp:ts:02.68:Release 2000:9.0.0` | TS 02.68:Release 2000/9.0.0 | attested in the pubid testsuite — the legacy release token carries its printed spelling, space included |
| `urn:3gpp:ts:03.20ext:Ph1:3.0.0` | TS 03.20ext:Ph1/3.0.0 | attested in the pubid testsuite — the letter suffix rides the code segment |
| `urn:3gpp:ts:29.198-04-1:REL-5:5.0.0` | TS 29.198-04-1:REL-5/5.0.0 | attested in the pubid testsuite — the hyphenated parts ride the code segment |
| `urn:3gpp:ts:29.215::2.0.0` | TS 29.215/2.0.0 | attested in the pubid testsuite — the release-less form keeps its interior empty segment |
| `urn:3gpp:tr:26.905:REL-8:1.0.0` | TR 26.905:REL-8/1.0.0 | attested in the pubid testsuite |

## Rules that apply to every 3GPP URN

- **Type lowercase.** The type prefix is the flavor's `ts`/`tr`, always
  lowercased; the printed `TS`/`TR` never appears in the URN.
- **The printed release travels.** The release segment carries its printed
  spelling — the phase forms (`Ph1`, `Ph2`), the system names (`UMTS`,
  `Release 2000`) and the numbered releases (`REL-4` … `REL-19`) are all
  identity.
- **Trailing empties drop; interior empties stay.** A partial reference is
  not padded with trailing colons, but a release-less identifier keeps the
  interior empty segment its URN has always carried.
- **The code is the whole document number.** The dotted number, its letter
  suffix (`dcs`, `ext`) and its hyphenated parts (`29.198-04-1`,
  `23.700-01`) form one code segment.

## Status in PubID

The PubID `tgpp` flavor emits this `urn:3gpp:` scheme on `to_urn` today.
The scheme audit has no sampled rows for this flavor (no fixture directory
under the registry name), but all 32 rows of the pubid testsuite carry the
emission above and all 32 corpus rows emit the pubid scheme.

The universal `urn:pubid:3gpp:` scheme carries the identifier exactly as
its model does: the positional core is the number, and the atoms are
`part-` (the parts list), `v-` (the version), `release-` (the release) and
`suffix-` (the letter suffix) — `TS 01.01:REL-96/5.0.0` emits
`urn:pubid:3gpp:ts:01.01:part-01:release-96:v-5.0.0`, so the parts and the
release ride the URN as first-class atoms rather than positionally.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [XSF URN scheme (urn:xmpp)](/specs/xsf-urn), [DOI URN scheme (urn:doi)](/specs/doi-urn), [OASIS URN scheme (urn:oasis)](/specs/oasis-urn), [OGC URN scheme (urn:ogc)](/specs/ogc-urn)
- [IEEE URN scheme](/specs/ieee-urn), [ETSI URN scheme](/specs/etsi-urn) and [ITU URN scheme](/specs/itu-urn) — the sibling telecom namespaces
- [URN Mapping Overview](/concepts/urn)
- [3GPP publisher page](/publishers/tgpp)
