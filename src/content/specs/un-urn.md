---
title: "UN URN scheme (urn:un)"
description: "The PubID-invented base-fallback URN form the UN flavor emits on to_urn — the United Nations has no URN namespace in the IANA registry, so the shared base generator mints urn:un: itself; the document symbol collapses to its final number, and the pubid scheme is the lossless form, attested across the 4-row corpus."
---

# UN URN scheme (urn:un)

The United Nations has no URN namespace in the IANA registry and
publishes no URN rule for its document symbols. The `urn:un:` form
documented here is therefore the PubID fleet's own — and specifically
the **shared base generator's fallback**: the `un` flavor defines no
`UrnGenerator` of its own, so the base emits the namespace and the
document's final number (plus the year, when the record carries a
date). The document symbol — the part that actually identifies a UN
document (`A/RES/78/1`, `TRADE/WP.4/1068`) — never enters. The result
is degenerate: `A/RES/78/1` emits the bare `urn:un:1`, which any other
number-1 document would share. The fleet's lossless form for the same
documents is the universal `urn:pubid:un:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `un` — **not IANA-registered**; the PubID `un` flavor's private namespace |
| Assigning authority | none — the form is the shared base generator's emission, not a UN assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the `R.` prefix of a recommendation number rides verbatim) |
| Registry context | none; UN document symbols follow the Editorial Manual pattern `{Series}/{Body}[/{Year}]/{Number}` (`A/RES/78/1`, `TRADE/CEFACT/2004/32`) |

## Scheme structure

Every URN is the namespace, the final number, and — when the record
carries a date — the year:

```
urn:un:<number>[:<year>]
```

| Segment | Content | Notes |
|---|---|---|
| `<number>` | the document's final number element, verbatim | `1`, `32`, `1068`, `R.1068` (the recommendation letter rides in the number) |
| `<year>` | the record's date year | `2004` of `TRADE/CEFACT/2004/32`; the `78` of `A/RES/78/1` is path, not date, so it never appears |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:un:1` | A/RES/78/1 | attested in the pubid corpus (4 rows) — the whole symbol collapses to the final `1` |
| `urn:un:32:2004` | TRADE/CEFACT/2004/32 | attested in the pubid corpus — the path drops, the year rides |
| `urn:un:1068` | TRADE/WP.4/1068 | attested in the pubid corpus |
| `urn:un:R.1068` | TRADE/WP.4/R.1068 | attested in the pubid corpus — the recommendation letter rides in the number |

## Rules that apply to every UN URN

- **The flavor defines no generator.** The emission is the shared base
  generator's fallback — namespace, number, year, joined.
- **The document symbol never enters.** The series (`A`, `TRADE`), the
  body (`RES`, `CEFACT`, `WP.4`) and the symbol's year element are the
  identity of a UN document, and none of them appear.
- **Two documents share one URN.** `urn:un:1` names every document
  whose final element is `1` — General Assembly resolution 78/1 today,
  anything else tomorrow.
- **Nothing round-trips.** The audit gives 5 ids, 0 round-trip, 0
  reshape, 5 that do not re-parse, 0 raise, 0 empty, and 0 colliding
  URNs recorded (the collisions are structural: any two same-numbered
  documents collide by construction).
- **The scheme identifies the final number, nothing more.** Matching a
  document is the pubid face's job, not the URN's.

## Status in PubID

The PubID `un` flavor emits this base-fallback `urn:un:` form today.
The corpus is 4 rows, every one parses and every one emits — the
smallest corpus in the fleet, and honest about it.

The universal `urn:pubid:un:` scheme is the fleet's lossless form: the
final number is the positional core and the symbol's path is the
`path-` list atom — `A/RES/78/1` is `urn:pubid:un:document:A,RES,78:1`,
so the General Assembly, the resolution series and the session all
ride in the URN and no two symbols collide. The `_type` tokens are
`document` and `id`. Landed with issue #670 as drafted. See [the
universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [URN Mapping Overview](/concepts/urn)
- [UN publisher page](/publishers/un)
