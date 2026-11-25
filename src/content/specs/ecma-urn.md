---
title: "ECMA URN scheme (urn:ecma)"
description: "The PubID-invented URN form the ECMA flavor emits on to_urn — Ecma International has no URN namespace of its own in the IANA registry; a tag segment for the document class plus labelled part, edition and volume segments, attested across the 833-row corpus."
---

# ECMA URN scheme (urn:ecma)

Ecma International has no URN namespace of its own in the IANA registry
and publishes no URN rule for its standards, technical reports and
mementos. The `urn:ecma:` form documented here is therefore the PubID
fleet's own: the emission of the `ecma` flavor's `to_urn` and the
inverse of its `UrnParser`. It is a short positional path — a class
tag, the number, then labelled segments for the part, the edition and
the volume — and it round-trips: the audit reshapes nothing.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ecma` — **not IANA-registered**; the PubID `ecma` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an Ecma assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; Ecma publications carry the ECMA-N numbering, the TR/ technical reports and the MEM/ mementos |

## Scheme structure

Every URN carries the `urn:ecma:` lead, the class tag (bare for
standards, `tr` for technical reports, `mem` for mementos), the number,
then the labelled segments — each only when present:

```
urn:ecma:[:<tag>:]<number>[:part-<part>][:ed-<edition>][:vol-<volume>]
```

| Segment | Content | Notes |
|---|---|---|
| `<tag>` | the document class | absent for standards (`ECMA-411` → `urn:ecma:411`), `tr` (`ECMA TR/101`), `mem` (`ECMA MEM/1970`) |
| `<number>` | the document number | `262`, `402`, `418` |
| `part-<part>` | the part, labelled | `part-1` (ECMA-418-1) |
| `ed-<edition>` | the edition, labelled — the dot of a decimal edition is kept | `ed-1`, `ed-5.1` (`ECMA-262 ed5.1`) — `.` is `unreserved` in RFC 8141, and the URN has an inverse, so the lossless dot stays |
| `vol-<volume>` | the volume, labelled | `vol-2` (ECMA-269 ed3 vol2) |

The edition and volume segments are additive — they only ever split a
collision (without them 804 published documents share 421 URNs), so a
URN minted before they existed still reads back: the parser probes for
the label and leaves the value nil when it is absent.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ecma:262` | ECMA-262 | attested in the pubid corpus (833 rows) |
| `urn:ecma:262:ed-5.1` | ECMA-262 ed5.1 | attested in the pubid corpus — the decimal edition keeps its dot |
| `urn:ecma:418:part-1` | ECMA-418-1 | attested in the pubid corpus — the labelled part |
| `urn:ecma:tr:114:ed-1` | ECMA TR/114 ed1 | attested in the pubid corpus — the `tr` tag |
| `urn:ecma:mem:2026` | ECMA MEM/2026 | attested in the pubid corpus — the `mem` tag |
| `urn:ecma:269:ed-3:vol-2` | ECMA-269 ed3 vol2 | attested in the pubid corpus — the labelled volume |

## Rules that apply to every ECMA URN

- **The lead is fixed.** `urn:ecma:` carries the private namespace.
- **Every optional field carries its own label.** `part-`, `ed-` and
  `vol-` are probed by prefix, so a URN written before a label existed
  still reads back — the labels make the form additive, never breaking.
- **A bare number is a standard.** The `tr` and `mem` tags are the only
  class segments; their absence names a standard.
- **The decimal dot stays.** `ed-5.1` is one edition value; the MR
  string, which has no inverse, collapses it (`ed5-1`) — the URN does
  not.
- **No escaping needed.** The values the corpus carries are digits and
  dots, all inside RFC 8141's NSS charset; none of the 833 attested
  URNs needs encoding.

## Status in PubID

The PubID `ecma` flavor emits this `urn:ecma:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 400 ids,
400 round-trip, 0 reshape, 0 that do not re-parse, 0 raise, 0 empty,
and 0 colliding URNs; the corpus is 833 rows, every one parses and
every one emits.

The universal `urn:pubid:ecma:` scheme is the fleet's lossless form:
the positional core is the number, the atoms are `part-`, `vol-` and
`ed-`, and the `_type` tokens are `std`, `tr` and `memento`. Every
corpus row emits. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ISBN URN scheme (urn:isbn)](/specs/isbn-urn)
- [URN Mapping Overview](/concepts/urn)
- [ECMA publisher page](/publishers/ecma)
