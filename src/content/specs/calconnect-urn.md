---
title: "CalConnect URN scheme (urn:calconnect)"
description: "The PubID-invented URN form the CalConnect flavor emits on to_urn — CalConnect has no URN namespace in the IANA registry, so the fleet mints these itself under its own calconnect namespace (not urn:cc); series and full-date forms, attested across the 189-row corpus."
---

# CalConnect URN scheme (urn:calconnect)

CalConnect (The Calendaring and Scheduling Consortium) has no URN
namespace in the IANA registry and publishes no URN rule for its
standards, directives and working drafts. The `urn:calconnect:` form
documented here is therefore the PubID fleet's own: the emission of the
`calconnect` flavor's `to_urn` and the inverse of its `UrnParser`,
carrying no external registration. It is a bare positional path — the
series (keeping its printed case), the number, the date — and it
round-trips: the audit reshapes nothing. Earlier drafts of this fleet's
records and site data carried a `urn:cc:` pattern; that form is not
what the flavor emits — the namespace is the full `calconnect`
(the publisher token `CC` never enters the URN). The fleet's lossless
form for the same documents is the universal `urn:pubid:calconnect:`
scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `calconnect` — **not IANA-registered**; the PubID `calconnect` flavor's private namespace (not the `cc` shorthand some earlier site drafts carried) |
| Assigning authority | none — the form is the fleet's emission, not a CalConnect assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; CalConnect publications carry the `CC` publisher token, the slash series (`CC/A`, `CC/DIR`, `CC/WD`) and the ISO-style numbering |

## Scheme structure

Every URN carries the `urn:calconnect:` lead, the series (when the
record has one, keeping its printed case), the number, and the date —
each segment omitted (never emptied) when absent:

```
urn:calconnect:[<series>:]<number>[:<date>]
```

| Segment | Content | Notes |
|---|---|---|
| `<series>` | the series token, printed case kept | `A` (the affiliated series), `DIR` (directives), `WD` (working drafts); the case is kept so a URN reconstructs the human form losslessly |
| `<number>` | the document number, string-kept | `11001`, `18011`, `0001` (leading zeros kept), `0707.1` |
| `<date>` | the publication date | `2024` (a year), `2024-07-23` (a working draft's full ISO date) |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:calconnect:11001:2024` | CC 11001:2024 | attested in the pubid corpus (189 rows) |
| `urn:calconnect:18011:2018` | CC 18011:2018 | attested in the pubid corpus |
| `urn:calconnect:18011` | CC 18011 | attested in the pubid corpus — a partial (date-less) reference omits the segment |
| `urn:calconnect:A:0001:2000` | CC/A 0001:2000 | attested in the pubid corpus — the series segment, printed case kept |
| `urn:calconnect:DIR:10001:2019` | CC/DIR 10001:2019 | attested in the pubid corpus — the directives series |
| `urn:calconnect:WD:51017:2024-07-23` | CC/WD 51017:2024-07-23 | attested in the pubid corpus — the full-date working-draft form |
| `urn:calconnect:WD:58012:2013` | CC/WD 58012:2013 | attested in the pubid corpus |

## Rules that apply to every CalConnect URN

- **The lead is `urn:calconnect`, not `urn:cc`.** The publisher token
  `CC` is the human face's constant; the URN never carries it, and the
  namespace is the flavor's full name.
- **The series keeps its printed case.** `A`, `DIR` and `WD` are
  emitted as stored, so the URN reconstructs the human form losslessly;
  the emission never downcases.
- **An absent segment is omitted, not emptied.** The generator compacts
  the parts, so no empty `:` segment ever appears — a series-less
  standard is `urn:calconnect:18011:2018`, a partial one
  `urn:calconnect:18011`.
- **A partial (date-less) reference has no round-trippable URN form.**
  The trailing segments are read positionally, so `urn:calconnect:11001`
  is ambiguous with a series-less dated URN and does not parse back —
  the audit's 2 non-re-parsing ids; partial refs are matched by the
  pubid face, not by URN.
- **The full date hyphenates.** A working draft's `2024-07-23` prints
  whole in one segment; the hyphens are RFC 8141-legal.

## Status in PubID

The PubID `calconnect` flavor emits this `urn:calconnect:` scheme on
`to_urn` today. The URN-scheme audit over ≤400 sampled pass ids gives
189 ids, 187 round-trip, 0 reshape, 2 that do not re-parse (the partial
refs), 0 raise, 0 empty, and 0 colliding URNs; the corpus is 189 rows,
every one parses and every one emits.

The universal `urn:pubid:calconnect:` scheme is the fleet's lossless
form: the positional core is the number, the `_type` tokens are `std`
(standard) and `id`, and the atoms carry the series, the year, the
month and the day separately. Landed with issue #670 as drafted. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn) — CalConnect's specifications ride the iCalendar RFCs
- [URN Mapping Overview](/concepts/urn)
- [CalConnect publisher page](/publishers/calconnect)
