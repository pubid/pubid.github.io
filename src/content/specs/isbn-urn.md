---
title: "ISBN URN scheme (urn:isbn)"
description: "The URN namespace of the International ISBN Agency — the formal isbn namespace registered by RFC 3187, naming books by their ISBN. The PubID isbn flavor has no urn_generator; its pubid scheme covers it."
---

# ISBN URN scheme (urn:isbn)

The International ISBN Agency is the assigning authority of the `isbn`
URN namespace, registered with IANA as a formal namespace by RFC 3187
(January 2002). The namespace names books by their ISBN: the
namespace-specific string is the ISBN itself, hyphenated as its
registration group spells it. The PubID `isbn` flavor parses and renders
ISBNs; it has no `urn_generator`, so this page documents the registered
scheme only — [the universal PubID URN scheme](#status-in-pubid) covers
the flavor's own emission.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `isbn` (IANA-registered, formal namespace, RFC 3187, January 2002) |
| Assigning authority | International ISBN Agency |
| Governing guidance | RFC 3187 (January 2002); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry (formal namespaces) |

## Scheme structure

The namespace-specific string is the ISBN — the ten- or thirteen-digit
book number with its hyphenation, check digit included:

```
urn:isbn:<isbn>
```

| Segment | Content | Notes |
|---|---|---|
| `<isbn>` | the ISBN, hyphenated | the registration group, registrant, publication and check-digit elements joined with `-`: `0-306-40615-2`, `978-3-16-148410-0` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:isbn:0-306-40615-2` | ISBN 0-306-40615-2 | the registered form (RFC 3187); the ISBN itself is row `isbn.book.0001` of the pubid testsuite |
| `urn:isbn:978-3-16-148410-0` | ISBN 978-3-16-148410-0 | the registered form (RFC 3187) applied to row `isbn.book.0002` of the pubid testsuite |

The pubid testsuite attests this flavor with only three rows — all three
are the ISBNs above — a deliberately small corpus for a namespace whose
NSS is a checked, internationally assigned number.

## Rules that apply to every ISBN URN

- **The NSS is the ISBN.** No series, edition or format facet rides the
  URN: a book number is the whole identity, and the same book in another
  format carries another ISBN and therefore another URN.
- **Hyphenation stays.** The hyphenated spelling is the canonical NSS
  form; the digits-only spelling is the same number, not another.
- **The check digit closes the number.** The final character is the ISBN
  check digit — part of the identity, never dropped.

## Status in PubID

The PubID `isbn` flavor has no `urn_generator`: its `to_urn` falls back
to the namespace-only form `urn:isbn` — no namespace-specific string —
which is attested as the `urn` representation of all three testsuite
rows. The scheme audit over the sampled pass ids gives 4 ids, 0
round-trip, 4 that do not re-parse, and 1 colliding URN — the collision
is that degenerate emission, which is not a usable URN of the registered
scheme.

The universal `urn:pubid:isbn:` scheme is what covers the flavor: both
spellings are optional atoms beside a type with no positional core, so
`ISBN 0-306-40615-2` emits
`urn:pubid:isbn:book:hyphenated-0-306-40615-2:raw-0306406152`, and an
ISBN given bare serializes the `raw-` atom alone. All corpus rows emit.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [DOI URN scheme (urn:doi)](/specs/doi-urn) — the sibling number-namespace page
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [ISBN publisher page](/publishers/isbn)
