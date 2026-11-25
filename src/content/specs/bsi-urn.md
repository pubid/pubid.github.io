---
title: "BSI URN scheme (urn:bsi)"
description: "The PubID-invented URN form the BSI flavor emits on to_urn — BSI has no URN namespace in the IANA registry; a colon path of publisher body, prefix, number, part and date with stage and amendment tails, attested across the 1,500-row corpus."
---

# BSI URN scheme (urn:bsi)

BSI (the British Standards Institution) has no URN namespace in the
IANA registry and publishes no URN rule for its standards. The
`urn:bsi:` form documented here is therefore the PubID fleet's own: the
emission of the `bsi` flavor's `to_urn` and the inverse of its
`UrnParser`. It is a colon path — publisher body, series prefix,
number, part, date — with the type and typed stage in the tail, and a
consolidated identifier appends one segment per attached amendment or
corrigendum.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `bsi` — **not IANA-registered**; the PubID `bsi` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a BSI assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (raw spaces, see the rules) |
| Registry context | none; BSI publications carry the BS series and its deliverable types (PAS, PD, DD, DISC, Flex, adopted EN/ISO/IEC documents) |

## Scheme structure

A single document emits `urn:`, the publisher body (downcased — `bs`
when none), then the identity in emission order:

```
urn:<publisher>:<prefix>:<number>[<iteration>][:-<part>][:-<subpart>][/<second-number>][:<year|date>][:<month>][:v<edition>][:<translation>][:<type>][:stage.<code>]
<base-URN>:amd:<n>[:<year>]  |  <base-URN>:cor:<n>[:<year>]     (a consolidated identifier)
```

| Segment | Content | Notes |
|---|---|---|
| `<publisher>` | the publisher body, downcased | `bs` (the fallback and the BS series), `dd`, `pd`, `disc` (`DISC PD 2000-2` emits `disc`) |
| `<prefix>` | the sub-series letter, downcased | `a` (aerospace, `BS A 109`) |
| `<number>` | the document number | `60269`, `1886`; a Flex month is its own zero-padded segment after the year (`1886:2024:09`); the committee document's year rides from the reference (`30300822:2014`) |
| `-<part>`, `-<subpart>` | the part and subpart, dash-prefixed | `-3`, `-1-1` (the EN 1999 part 1 subpart 1 of a national annex's base) |
| `<year\|date>` | the publication year or rendered date | `1977`, `2010`; omitted when the reference carries none |
| `v<edition>` | the Flex edition | `v2.0` |
| `<type>` | the deliverable type abbr, downcased — omitted for plain BS documents | `pas`, `pd`, `dd`, `ts` |
| `stage.<code>` | the typed stage code | `stage.published` — the only value the corpus attests (153 rows) |
| `amd:<n>[:<year>]`, `cor:<n>[:<year>]` | one tail per attached amendment/corrigendum of a consolidated identifier | `:amd:2:2022` (AMD 2 of 2022), `:amd:1:2008` |

A wrapper owns no identity of its own: an adopted norm, a bundle, a
set, an Expert Commentary or a national annex reads its number, part
and date through `#root` — the document it wraps — so
`BS EN ISO 13485 Expert Commentary` emits the wrapped document's URN
`urn:bsi:bs:13485`, indistinguishable from the standard itself.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:bsi:bs:1016:-10:1977` | BS 1016-10:1977 | attested in the pubid corpus (1,500 rows) |
| `urn:bsi:bs:a:109:2024` | BS A 109:2024 | attested in the pubid corpus — the aerospace prefix |
| `urn:bsi:bs:60269:-3:2010:amd:2:2022` | BS HD 60269-3:2010+A2:2022 | attested in the pubid corpus — the consolidated amendment tail |
| `urn:bsi:bs:1886:2024:09:v2.0` | BSI Flex 1886 v2.0:2024-09 | attested in the pubid corpus — the Flex month and edition |
| `urn:bsi:bs:003:1994:pas:stage.published` | PAS 003:1994 | attested in the pubid corpus — the type and stage tail |
| `urn:bsi:disc:2000:-2:1997` | DISC PD 2000-2:1997 | attested in the pubid corpus — the DISC publisher body |
| `urn:bsi:bs:30300822:2014` | 14/30300822 DC | attested in the pubid corpus — the committee document |
| `urn:bsi:bs:1999:-1-1:2007` | NA to BS EN 1999-1-1:2007+A1:2009 | attested in the pubid corpus — the national annex reads its identity through the wrapped EN |
| `urn:bsi:bs:13485` | BS EN ISO 13485 Expert Commentary | attested in the pubid corpus — the commentary emits the wrapped document's URN |
| `urn:bsi:bs:1501:-2 Addendum No. 1:1973` | BS 1501-2 Addendum No. 1:1973 | attested in the pubid corpus — the raw-space row |

## Rules that apply to every BSI URN

- **The lead carries the publisher body.** The second segment is the
  body's downcased token — `bs` is the fallback when the record names
  none, and the DISC/PD/DD publications lead with their own.
- **A wrapper borrows its identity.** An adoption, bundle, set, Expert
  Commentary or national annex has no number of its own, so the
  generator reads number, part and date through `#root`, however many
  adoption layers intervene — and a commentary or set therefore shares
  the wrapped document's URN (the audit's 6 colliding URNs).
- **A consolidated identifier appends its supplements.** Each attached
  amendment or corrigendum adds one tail (`:amd:<n>[:<y>]`,
  `:cor:<n>[:<y>]`) after the base's URN — `BS HD 60269-3:2010+A2:2022`
  is the base's `…:-3:2010` plus `:amd:2:2022`.
- **Raw spaces pass through.** 38 of the 1,500 attested URNs carry a
  raw space (the `Addendum No. 1`-style legacy rows). A space is not in
  RFC 8141's `unreserved` set, so those URNs are not RFC 8141-legal;
  the form never percent-encodes.
- **The stage tail spells `published`.** The generator only intends the
  stage segment for non-published stages, but the attested corpus
  carries `stage.published` on 153 rows (PAS, PD, DD, TS records) — the
  code arrives at the comparison as a string, not the `:published`
  symbol, so the published stage slips through.

## Status in PubID

The PubID `bsi` flavor emits this `urn:bsi:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 400 ids, 34
round-trip, 84 reshape, 282 that do not re-parse, 0 raise, 0 empty, and
6 colliding URNs; the corpus is 1,500 rows, every one parses and every
one emits. The corpus' raw-coverage residual — the bundled row the
grammar accepted but could not bind, parsanol-ruby#427 — was fixed by
parsanol 1.3.129 (parsanol-ruby#435), and pubid pins both the repaired
parse and the engine-error wrap in its error-contract spec.

The universal `urn:pubid:bsi:` scheme is the fleet's lossless form: the
positional core is the number, and every registry field of the `type`,
`stage` and `typed_stage` components rides as its own atom
(`typeabbr-`, `stagehs-`, `tsabbr-`, …), with nested identifiers written
`ids-(…)` and cross-flavor members (the CEN/ISO/IEC documents an
adoption wraps) carrying their own schemas under qualified tokens
(`cencenelec.en`, `iso.is`). Every corpus row emits. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [BSI publisher page](/publishers/bsi)
