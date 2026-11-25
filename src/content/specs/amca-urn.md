---
title: "AMCA URN scheme (urn:amca)"
description: "The PubID-invented URN form the AMCA flavor emits on to_urn — Air Movement and Control Association International has no URN namespace in the IANA registry, so the fleet mints these itself; a numbered positional scheme with the copublisher riding one slash-joined segment, attested across the 39-row corpus."
---

# AMCA URN scheme (urn:amca)

AMCA International (Air Movement and Control Association) has no URN
namespace in the IANA registry and publishes no URN rule for its
standards, publications and interpretations. The `urn:amca:` form
documented here is therefore the PubID fleet's own: the emission of the
`amca` flavor's `to_urn`, carrying no round-trip promise. It is a
numbered positional path — the number, the year, then dot-prefixed
modifiers for the interpretation code, revision, reaffirmation and
copublisher — closed by the identifier class's key. It is one of the
audit's perfect sheets: nothing reshapes, nothing collides. The fleet's
lossless form for the same documents is the universal
`urn:pubid:amca:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `amca` — **not IANA-registered**; the PubID `amca` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an AMCA assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the `ansi/amca` copublisher carries a raw slash, which RFC 8141 permits inside an NSS) |
| Registry context | none; AMCA publications carry the `AMCA`/`ANSI/AMCA` designations with the `(R…)`, `(Rev. …)` and `Interp` suffixes |

## Scheme structure

Every URN carries the `urn:amca:` lead, the number, the year, the
dot-prefixed modifiers in this order, and the identifier class's key:

```
urn:amca:<number>:[<year>]:[interp.<code>]:[rev.<n>]:[reaff.<year>]:[copub.<org>]:<type>
```

| Segment | Content | Notes |
|---|---|---|
| `<number>` | the document number | `210`, `99`, `1011` |
| `<year>` | the year | `16`, `03`, `22` (two-digit years print as stored) |
| `interp.<code>` | the interpretation code, downcased | `interp.aw`, `interp.jw`; `"AMCA 99 JW Interp"` and `"AMCA 99 KB Interp"` are different documents, so the code is identity-bearing |
| `rev.<n>` | the revision | `rev.01-23`, `rev.12-22` |
| `reaff.<year>` | the reaffirmation year | `reaff.2010`, `reaff.2008` |
| `copub.<org>` | the copublisher, downcased | `copub.ansi/amca`, `copub.amca` — the slash-joined org is one segment |
| `<type>` | the identifier class's key | `standard`, `publication`, `interpretation` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:amca:210:16:copub.ansi/amca:standard` | ANSI/AMCA 210-16 /ASHRAE 51-16 | attested in the pubid corpus (39 rows) |
| `urn:amca:99:interp.jw:copub.amca:interpretation` | AMCA 99 JW Interp | attested in the pubid corpus — the interpretation code is identity-bearing |
| `urn:amca:99:interp.kb:copub.amca:interpretation` | AMCA 99 KB Interp | attested in the pubid corpus — a different document than the `JW` interpretation |
| `urn:amca:222:16:copub.amca:publication` | AMCA Publication 222-16 | attested in the pubid corpus |
| `urn:amca:1011:03:reaff.2010:copub.amca:publication` | AMCA Publication 1011-03 (R2010) | attested in the pubid corpus — the reaffirmation year |
| `urn:amca:211:22:rev.01-23:copub.amca:publication` | AMCA Publication 211-22 (Rev. 01-23) | attested in the pubid corpus — the revision |
| `urn:amca:204:interp.aw:copub.amca:interpretation` | AMCA 204 AW Interp | attested in the pubid corpus |

## Rules that apply to every AMCA URN

- **The lead is fixed.** `urn:amca:` carries the private namespace.
- **The modifiers are dot-prefixed, in a fixed order.** interpretation,
  revision, reaffirmation, copublisher — each one appears only when the
  record carries it, and an absent modifier is omitted, never emptied.
- **The interpretation code is identity-bearing.** `interp.jw` and
  `interp.kb` separate two interpretations of the same number; the
  downcased code rides before the copublisher.
- **The copublisher is one slash-joined segment.** `ANSI/AMCA`
  downcasts to `ansi/amca` inside the single `copub.` segment; the raw
  slash is RFC 8141-legal inside an NSS.
- **The type key closes the URN.** `standard`, `publication` and
  `interpretation` are the class keys, appended after the modifiers.
- **The scheme is one-URN-per-document here.** The audit gives 46 ids,
  46 round-trip, 0 reshape, 0 that do not re-parse, 0 raise, 0 empty,
  and 0 colliding URNs — a perfect sheet, like EASC's.

## Status in PubID

The PubID `amca` flavor emits this `urn:amca:` scheme on `to_urn`
today; the audit's numbers above are the perfect sheet. The corpus is
39 rows, every one parses and every one emits.

The universal `urn:pubid:amca:` scheme is the fleet's lossless form:
the `_type` tokens are `id`, `interp`, `pub` and `std`, the number is
the core, and the atoms carry the copublisher (`co-`), the year
(`year-`), the revision (`rev-`), the reaffirmation (`reaffirmed-` —
the String year the corpus serializes, `reaffirmed-2010`, not the bool
the draft guessed) and the interpretation code (`interpcode-`) —
`ANSI/AMCA 210-16 /ASHRAE 51-16` is
`urn:pubid:amca:std:210:co-ASHRAE:year-16`. Landed with issue #670 as
drafted. See [the universal PubID URN scheme](/library/pubid-urn-scheme)
for the `urn:pubid:` codec itself.

## See Also

- [ASHRAE URN scheme (urn:ashrae)](/specs/ashrae-urn) — the joint ANSI/AMCA–ASHRAE standards' other publisher
- [URN Mapping Overview](/concepts/urn)
- [AMCA publisher page](/publishers/amca)
