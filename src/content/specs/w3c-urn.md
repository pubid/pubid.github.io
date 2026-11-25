---
title: "W3C URN scheme (urn:w3c)"
description: "The PubID-invented URN form the W3C flavor emits on to_urn — the World Wide Web Consortium has no URN namespace in the IANA registry, so the fleet mints these itself; a type-token-and-slug scheme whose dated tracks carry their yyyymmdd date, attested across the 29-row corpus."
---

# W3C URN scheme (urn:w3c)

W3C (the World Wide Web Consortium) has no URN namespace in the IANA
registry and publishes no URN rule for its technical reports — its own
web-facing identifiers are HTTPS URLs, not URNs. The `urn:w3c:` form
documented here is therefore the PubID fleet's own: the emission of the
`w3c` flavor's `to_urn`, carrying no round-trip promise. It is the
maturity-track token downcased (`rec`, `crd`, `dnote`, `wd`, …), the
shortname, and the `yyyymmdd` date when the record carries one; a
typeless historical report emits the bare slug. It is perfectly
regular: the audit reshapes nothing and collides nothing. The fleet's
lossless form for the same documents is the universal
`urn:pubid:w3c:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `w3c` — **not IANA-registered**; the PubID `w3c` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a W3C assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; W3C technical reports carry the `W3C <TRACK>-<shortname>-<yyyymmdd>` designations (`REC-CSS1-19990111`, `CRD-accelerometer-20250212`) plus undated historical slugs (`2dcontext`, `becss`) |

## Scheme structure

Every URN carries the `urn:w3c:` lead, the track token downcased (when
the record has one), the shortname, and the date:

```
urn:w3c:[<track>]:<shortname>[:<yyyymmdd>]
```

| Segment | Content | Notes |
|---|---|---|
| `<track>` | the maturity-track token, downcased | `rec` (Recommendation), `per`, `pr`, `cr`, `crd` (Candidate Recommendation and its draft), `note`, `dnote` (Note and Draft Note), `obsl` (Obsolete Recommendation), `spsd` (Superseded Recommendation), `wd` (Working Draft); a typeless report emits no token and no empty segment |
| `<shortname>` | the document shortname, case kept | `CSS1`, `accelerometer`, `did-spec-registries`, `2dcontext`, `becss`, `07-WebData`; the dash-joined shortname keeps its dashes |
| `<yyyymmdd>` | the publication date | `19990111`, `20250212`; a date-less report omits the segment |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:w3c:rec:CSS1:19990111` | W3C REC-CSS1-19990111 | attested in the pubid corpus (29 rows) |
| `urn:w3c:crd:accelerometer:20250212` | W3C CRD-accelerometer-20250212 | attested in the pubid corpus |
| `urn:w3c:dnote:webcodecs-flac-codec-registration:20240419` | W3C DNOTE-webcodecs-flac-codec-registration-20240419 | attested in the pubid corpus |
| `urn:w3c:note:CDFsubmit` | W3C NOTE-CDFsubmit | attested in the pubid corpus — a date-less Note |
| `urn:w3c:obsl:widgets-apis:20181011` | W3C OBSL-widgets-apis-20181011 | attested in the pubid corpus |
| `urn:w3c:spsd:2dcontext:20210128` | W3C SPSD-2dcontext-20210128 | attested in the pubid corpus |
| `urn:w3c:2dcontext` | W3C 2dcontext | attested in the pubid corpus — the typeless form |
| `urn:w3c:becss` | W3C becss | attested in the pubid corpus |
| `urn:w3c:07-WebData` | W3C 07-WebData | attested in the pubid corpus — the case and leading digits are kept |

## Rules that apply to every W3C URN

- **The lead is fixed.** `urn:w3c:` carries the private namespace.
- **The track downcasts; the shortname does not.** `REC-` emits `rec`,
  but `CSS1`, `CDFsubmit` and `InkML` keep their case — the shortname
  is verbatim.
- **A typeless report has no empty segment.** `W3C 2dcontext` emits
  `urn:w3c:2dcontext`; the absent track is omitted, not left empty.
- **The date is the `yyyymmdd` face.** The compact eight-digit date
  rides as its own segment; a date-less report omits it.
- **The scheme is one-URN-per-document here.** The audit gives 29 ids,
  29 round-trip, 0 reshape, 0 that do not re-parse, 0 raise, 0 empty,
  and 0 colliding URNs — a perfect sheet, like EASC's, AMCA's and
  IANA's.

## Status in PubID

The PubID `w3c` flavor emits this `urn:w3c:` scheme on `to_urn` today;
the audit's numbers above are the perfect sheet. The corpus is 29 rows,
every one parses and every one emits.

The universal `urn:pubid:w3c:` scheme is the fleet's lossless form: the
`_type` tokens are the maturity tracks (`cr`, `crd`, `dn`, `note`,
`or`, `per`, `pr`, `rec`, `std`, `sr`, `wd`, plus `id`), the shortname
is the core, and `date-` is the only atom. One escape shows the codec's
shape rule: `becss` reads as a type token by shape, so its first byte
escapes — `urn:pubid:w3c:std:~62ecss`. Landed with issue #656 as
drafted. See [the universal PubID URN scheme](/library/pubid-urn-scheme)
for the `urn:pubid:` codec itself.

## See Also

- [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn) — the web's other standards-track URN namespace
- [URN Mapping Overview](/concepts/urn)
- [W3C publisher page](/publishers/w3c)
