---
title: "OASIS URN scheme (urn:oasis)"
description: "The URN namespace of OASIS — the formal oasis namespace registered by RFC 3121, and the verbatim-slug emission of the PubID oasis flavor."
---

# OASIS URN scheme (urn:oasis)

OASIS (Organization for the Advancement of Structured Information
Standards) is the assigning authority of the `oasis` URN namespace,
registered with IANA by RFC 3121 (January 2002) for OASIS specifications
and related work. The PubID `oasis` flavor emits the namespace with the
record's specification identifier as a single verbatim segment.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `oasis` (IANA-registered, RFC 3121, January 2002) |
| Assigning authority | OASIS |
| Governing guidance | RFC 3121 (January 2002); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; OASIS specifications are published through oasis-open.org |

## Scheme structure

The flavor emits the specification identifier — the record's `original`
value — as one verbatim URN segment (OASIS slugs never contain a colon):

```
urn:oasis:<specification-identifier>
```

| Segment | Content | Notes |
|---|---|---|
| `<specification-identifier>` | the specification slug, as printed | `EDXL`, `amqp-core`, `SAML-v1.1`, `DITA-v1.3-Errata02`; case is the record's own (`BIASPROFILE`, `xacml-rest-v1.1`) |

The only characters that occur in real records outside the URN-safe set
are the space and a stray `]` (both in a handful of malformed records);
these are percent-encoded so the URN stays well-formed — `OASIS ECF
v4.01` emits `urn:oasis:ECF%20v4.01` — and the flavor's URN parser
reverses them exactly. Clean slugs — dots, hyphens, mixed case — pass
through unchanged.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:oasis:EDXL` | OASIS EDXL | attested in the pubid testsuite (45 rows) |
| `urn:oasis:amqp-core` | OASIS amqp-core | attested in the pubid testsuite |
| `urn:oasis:SAML-v1.1` | OASIS SAML-v1.1 | attested in the pubid testsuite |
| `urn:oasis:DITA-v1.3-Errata02` | OASIS DITA-v1.3-Errata02 | attested in the pubid testsuite — the erratum rides the slug |
| `urn:oasis:UBL-v2.4` | OASIS UBL-v2.4 | attested in the pubid testsuite |
| `urn:oasis:OSLC-CM-v1.0` | OASIS OSLC-CM-v1.0 | attested in the pubid testsuite |
| `urn:oasis:ECF%20v4.01` | OASIS ECF v4.01 | attested in the pubid testsuite — the space percent-encodes as `%20` |
| `urn:oasis:CTAS-v3.0%5D-PS01` | OASIS CTAS-v3.0]-PS01 | attested in the pubid testsuite — the stray `]` percent-encodes as `%5D` |

## Rules that apply to every OASIS URN

- **The slug is verbatim.** The identifier segment is the record's own
  specification identifier — its case, its dots and hyphens, and its
  stage and errata suffixes (`-CS01`, `-PS01`, `-Errata02`) are identity.
- **Two escapes, explicitly.** Only the space and the stray `]`
  percent-encode (`%20`, `%5D`); a blanket URI escape is deliberately
  not applied, so clean slugs pass through untouched and the URN parser
  reverses the two encodings exactly.
- **One segment, no colons.** OASIS slugs never contain a colon, so the
  NSS is always a single segment.

## Status in PubID

The PubID `oasis` flavor emits this `urn:oasis:` scheme on `to_urn`
today. The audit over the sampled pass ids gives 45 ids, 45 round-trip,
0 reshape, 0 that do not re-parse, 0 raise, 0 empty, and 0 colliding
URNs; the corpus is 45 of 45 pass ids parse, and every corpus row emits.

The universal `urn:pubid:oasis:` scheme carries the identifier exactly
as its model does: the positional core is the specification name, and
the atoms are `part-`, `v-` (the version), `stage-`, `label-` and
`original-` (the verbatim slug) — so the best-effort decomposition the
flavor parses out of the slug (spec name, version, stage, part, label)
rides the URN as first-class atoms beside the slug itself, where the
`urn:oasis:` emission carries only the slug. All corpus rows emit.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [OGC URN scheme (urn:ogc)](/specs/ogc-urn), [DOI URN scheme (urn:doi)](/specs/doi-urn), [XSF URN scheme (urn:xmpp)](/specs/xsf-urn), [3GPP URN scheme (urn:3gpp)](/specs/tgpp-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [OASIS publisher page](/publishers/oasis)
