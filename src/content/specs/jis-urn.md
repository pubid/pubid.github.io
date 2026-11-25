---
title: "JIS URN scheme (urn:jis)"
description: "The PubID-invented URN form the JIS flavor emits on to_urn — JIS has no URN namespace in the IANA registry; the emission carries the classification letter and number verbatim, raw space included, and is not RFC 8141-legal. Attested across the 10,575-row corpus."
---

# JIS URN scheme (urn:jis)

JIS (Japanese Industrial Standards) has no URN namespace in the IANA
registry and publishes no URN rule for its standards, which are
established by JISC and published by the JSA. The `urn:jis:` form
documented here is therefore the PubID fleet's own: the emission of the
`jis` flavor's `to_urn` (and the inverse of its `UrnParser`). It
round-trips, but it knowingly violates RFC 8141: **every attested JIS
URN contains a raw space** in the NSS (`urn:jis:A 0001:1999`), because
the classification letter and the number are emitted verbatim with the
space the printed identifier carries. The form is documented here as
emitted.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `jis` — **not IANA-registered**; the PubID `jis` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a JIS/JSA assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not meet it — the raw space (see the rules) |
| Registry context | none; JIS publications carry the letter-classified designations (JIS A, B, C, …, Z) and the WES welding-engineering series |

## Scheme structure

Every URN carries the `urn:jis:` lead, the document code, the year, and
then — only when present — the language letter and the supplement
notation:

```
urn:jis:<code>:<year>[:<language>][:<supplement-notation>]
```

| Segment | Content | Notes |
|---|---|---|
| `<code>` | the classification letter + space + number, verbatim | `A 0001`, `B 0205-1`, `X 0208`; the WES series keeps its own head and its part dashes (`WES 7700-1`, `WES TR 2032`) — no `JIS` prefix is added for it |
| `<year>` | the year | `1999`, `2025`; the supplement carries its own year, not the base's |
| `<language>` | the bracketed language letter, downcased | `e` (from `WES 3003(E)`) |
| `<supplement-notation>` | the amendment/explanation notation, downcased — itself containing a space and, when dated, a second year | `amd 1:2025` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:jis:A 0001:1999` | JIS A 0001:1999 | attested in the pubid corpus (10,575 rows) — the raw space |
| `urn:jis:B 0205-1:2001` | JIS B 0205-1:2001 | attested in the pubid corpus — the part rides the code |
| `urn:jis:X 0208:2012` | JIS X 0208:2012 | attested in the pubid corpus |
| `urn:jis:WES 7700-1:2019` | WES 7700-1:2019 | attested in the pubid corpus — the WES series keeps its root, no `JIS` prefix |
| `urn:jis:WES TR 2032:2024` | WES TR 2032:2024 | attested in the pubid corpus |
| `urn:jis:WES 3003:1995:e` | WES 3003(E):1995 | attested in the pubid corpus — the language letter is its own downcased segment |
| `urn:jis:WES 3003:2025:amd 1:2025` | WES 3003(E):1995/AMD 1:2025 | attested in the pubid corpus — the amendment notation carries its own space, colon and year |

## Rules that apply to every JIS URN

- **The lead is fixed.** `urn:jis:` carries the private namespace.
- **The code is verbatim, space included.** The classification letter
  and the number emit exactly as printed — `A 0001`, never `A-0001` and
  never percent-encoded — so **all 10,575 attested URNs contain a raw
  space**. RFC 8141's `unreserved` set has no space, so no attested JIS
  URN is RFC 8141-legal; `Pubid::Jis::UrnParser` still reads them back,
  splitting on colons and prefixing `JIS ` to any code that does not
  already start with `WES `.
- **The WES series keeps its head.** A welding-engineering code
  (`WES 3003`, `WES TR 2032`) emits with its series name, not under a
  `JIS` prefix; the parser reconstructs the printed face from the same
  rule.
- **A supplement owns the year slots it prints.** The amendment emits
  its own year after the code and its dated notation after that
  (`WES 3003:2025:amd 1:2025` for the 1995 base's AMD 1) — the base's
  year does not appear.

## Status in PubID

The PubID `jis` flavor emits this `urn:jis:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 400 ids, 400
round-trip, 0 reshape, 0 that do not re-parse, 0 raise, 0 empty, and 0
colliding URNs; the corpus is 10,575 rows, every one parses and every
one emits. The round-trip is the flavor's own — the raw space remains
an RFC 8141 non-conformance by construction.

The universal `urn:pubid:jis:` scheme is the fleet's lossless form and
stays RFC 8141-clean: the positional core is the zero-padded number
(`jis:0001`), and the atoms are `series-`, `part-`, `year-` and
`reaffirmed-` — the classification letter rides `series-` instead of a
space-bearing code segment. Every corpus row emits. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [PLATEAU publisher page](/publishers/plateau)
- [URN Mapping Overview](/concepts/urn)
- [JIS publisher page](/publishers/jis)
