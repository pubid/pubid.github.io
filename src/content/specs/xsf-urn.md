---
title: "XSF URN scheme (urn:xmpp)"
description: "The URN namespace of the XMPP Standards Foundation — the xmpp namespace registered by RFC 4854 for XMPP protocol namespaces, and the XEP-document emission of the PubID xsf flavor."
---

# XSF URN scheme (urn:xmpp)

The XMPP Standards Foundation (XSF) is the assigning authority of the
`xmpp` URN namespace, registered with IANA by RFC 4854 (April 2007). The
registered namespace is the XMPP namespace: it names the protocol
namespaces of the Extensible Messaging and Presence Protocol, one URN per
protocol namespace (`urn:xmpp:<name>`), each defined by an XSF document.
The XSF's documents themselves are the XEP series (XMPP Extension
Protocols); the PubID `xsf` flavor models that series and emits its
document-number form on `to_urn`.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `xmpp` (IANA-registered, RFC 4854, April 2007) |
| Assigning authority | XMPP Standards Foundation (XSF) |
| Governing guidance | RFC 4854 (April 2007); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; the registered scheme names XMPP protocol namespaces |

## Scheme structure

The registered scheme names protocol namespaces: the NSS is the
protocol's namespace name as its XEP defines it, lowercased and joined
with hyphens:

```
urn:xmpp:<protocol-namespace>
```

| Segment | Content | Notes |
|---|---|---|
| `<protocol-namespace>` | the XMPP protocol namespace name | assigned by the XEP that defines the protocol — e.g. XEP-0047's `urn:xmpp:ibb` |

The PubID `xsf` flavor models the XSF's *documents* — the XEP series —
and emits their document-number form under the locally adopted `xsf`
namespace, keeping the printed zero padding so the URN round-trips back
to the printed identifier:

```
urn:xsf:xep:<number>
```

| Segment | Content | Notes |
|---|---|---|
| `<number>` | the XEP number, zero padding preserved | `0001`, `0049`, `0289`; the editor's two word-named documents (`README`, `xxxx`) carry their word in the same slot |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:xsf:xep:0001` | XEP 0001 | attested in the pubid testsuite (51 rows) |
| `urn:xsf:xep:0049` | XEP 0049 | attested in the pubid testsuite |
| `urn:xsf:xep:0169` | XEP 0169 | attested in the pubid testsuite |
| `urn:xsf:xep:0289` | XEP 0289 | attested in the pubid testsuite |
| `urn:xsf:xep:README` | XEP README | attested in the pubid testsuite — the editor README is a real document of the series |
| `urn:xsf:xep:xxxx` | XEP xxxx | attested in the pubid testsuite — the XEP template |

## Rules that apply to every XSF URN

- **The zero padding is identity.** The number segment keeps its printed
  zero padding (`xep:0001`, never `xep:1`), so the URN round-trips back
  to the printed identifier.
- **Two literals, no slug rule.** The two word-named documents of the
  repository (`XEP README`, `XEP xxxx`) parse as exact literals; any
  other word form (`XEP readme`, `XEP foo`) is refused.
- **The registered namespace is the XMPP namespace.** RFC 4854 registers
  `xmpp`, and its URNs name the protocol namespaces XEPs define; the
  flavor's XEP-document form (below) is pubid's emission face, not the
  registered protocol-namespace form.

## Status in PubID

The PubID `xsf` flavor emits the XEP-document form `urn:xsf:xep:<number>`
on `to_urn` today — a locally adopted namespace, not the registered
`urn:xmpp:` protocol-namespace form, which pubid does not emit. The audit
over the sampled pass ids gives 51 ids, 51 round-trip, 0 reshape, 0 that
do not re-parse, 0 raise, 0 empty, and 0 colliding URNs; the corpus is 51
of 51 pass ids parse, and every corpus row emits.

The universal `urn:pubid:xsf:` scheme carries the identifier exactly as
its model does: the XEP number is the positional core (a string, so the
zero padding and the two word names survive verbatim) and the flavor
declares no atoms — `XEP 0001` emits `urn:pubid:xsf:xep:0001`.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [3GPP URN scheme (urn:3gpp)](/specs/tgpp-urn), [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn), [OASIS URN scheme (urn:oasis)](/specs/oasis-urn), [WMO URN scheme (urn:mrn:wmo:pub)](/specs/wmo-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [XSF publisher page](/publishers/xsf)
