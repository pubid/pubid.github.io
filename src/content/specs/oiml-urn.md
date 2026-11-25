---
title: "OIML URN scheme (urn:oiml)"
description: "The PubID-invented URN form the OIML flavor emits on to_urn — the International Organization of Legal Metrology has no URN namespace in the IANA registry, so the fleet mints these itself; a downcased type-and-code positional scheme with bulletin and certification-system special shapes, attested across the 90-row corpus."
---

# OIML URN scheme (urn:oiml)

OIML (the International Organization of Legal Metrology) has no URN
namespace in the IANA registry and publishes no URN rule for its
Recommendations (R), Documents (D), Guides (G), Vocabularies (V), Basic
Publications (B), Expert Reports (E) and Seminar Reports (S). The
`urn:oiml:` form documented here is therefore the PubID fleet's own:
the emission of the `oiml` flavor's `to_urn`, carrying no round-trip
promise. It is a downcased positional path — the type letter, the code,
the year, the stage, the language — with two dedicated shapes for the
OIML Bulletin (a structured `YYYY-II-SS` locator) and the OIML-CS
documents (the `family-number` pair). It is heavily reshaping: 96 of
the audit's 105 ids do not come back as they went in. The fleet's
lossless form for the same documents is the universal
`urn:pubid:oiml:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `oiml` — **not IANA-registered**; the PubID `oiml` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an OIML assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the `e/f` language join prints a raw slash, which RFC 8141 permits inside an NSS) |
| Registry context | none; OIML publications carry the `OIML <letter> <number>:<year>` designations and the `(E)`/`(F)` language parentheticals |

## Scheme structure

Every ordinary URN carries the `urn:oiml:` lead, the type downcased,
the code, the year, the stage, the iteration and the language; a
supplement appends its typed-stage token and its own ordinal. Two
classes have dedicated shapes:

```
urn:oiml:<type>:<code>[:<year>][:<stage>][:<iteration>][:<language>]
urn:oiml:bulletin:<YYYY-II-SS locator>
urn:oiml:cs:<family>-<number>
```

| Segment | Content | Notes |
|---|---|---|
| `<type>` | the series letter, downcased | `r` (Recommendations), `d` (Documents), `g` (Guides), `v` (Vocabularies), `b` (Basic Publications), `e` (Expert Reports), `s` (Seminar Reports); replaced by the publisher when the record carries one |
| `<code>` | the document code | `106`, `138`, `117-1` (a part rides in the code), `1-100` (the two-part Guide) |
| `<year>` | the publication year | `2009`, `2021`, `1974` |
| `<stage>` | the draft stage, downcased | `wd` (working draft), `cd` (committee draft) |
| `<iteration>` | the draft iteration | `R 201 1WD` emits `wd:1`, `R 91-1 3.1CD` emits `cd:3.1` |
| `<language>` | the language code, downcased | `e`, `f`, `en`, `fra`, `e/f` (a dual-language face keeps its slash: `OIML D 11:2013(E/F)` emits `e/f`) |
| `<YYYY-II-SS>` | the Bulletin locator | the structured year-issue-sequence tuple; the generator always emits it in this form, however the input was formatted — the corpus carries no Bulletin rows, so no attested example exists |
| `<family>-<number>` | the OIML-CS document identity | `pd-05`, `cid-01`, `od-01` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:oiml:r:106` | OIML R 106 | attested in the pubid corpus (90 rows) |
| `urn:oiml:r:138:2009:e` | Amendment (2009) to OIML R 138 Edition 2007 (E) | attested in the pubid corpus — three input spellings of the same amendment all emit this URN |
| `urn:oiml:r:117-1:2019` | OIML R 117-1:2019 | attested in the pubid corpus — the part rides in the code segment |
| `urn:oiml:r:201:wd:1` | OIML R 201 1WD | attested in the pubid corpus — the stage and its iteration |
| `urn:oiml:v:2:2013:e/f` | OIML V 2:2013(E/F) | attested in the pubid corpus — the dual-language face keeps its slash |
| `urn:oiml:b:18:2018` | OIML B 18:2018 | attested in the pubid corpus |
| `urn:oiml:cs:pd-05` | OIML-CS PD 05 Edition 6 | attested in the pubid corpus — the printed edition and the trailing amendment are print states, not URN segments |
| `urn:oiml:g:1-100:2008` | OIML G 1-100:2008 | attested in the pubid corpus |

## Rules that apply to every OIML URN

- **The lead is fixed.** `urn:oiml:` carries the private namespace.
- **The type downcasts to its letter.** `R` → `r`, `V` → `v`; a record
  that carries a publisher replaces the letter with the downcased
  publisher instead.
- **The Bulletin has its own locator.** The (year, issue, sequence)
  tuple is the identity — the Bulletin carries no code — and the URN is
  the structured `YYYY-II-SS` form no matter how the input was
  formatted; the corpus carries no Bulletin rows, so the shape is
  documented from the generator alone.
- **A certification-system document is its family-number pair.**
  `cs:pd-05`; the printed edition and the trailing `(Amendment 1)` are
  print states and drop.
- **A supplement emits under its base.** The amendment's URN is the
  base's type, code and year followed by the supplement's ordinal —
  `OIML R 138:2009 Amendment 1` emits `urn:oiml:r:138:2009:1`; when the
  base keeps the year (`R 138:2009 Amendment 1`) the base's year is
  read through the base.
- **The dual-published URN is degenerate by design here.**
  `ISO 4064-1:2024|OIML R 49-1:2024` collapses into the base path; the
  universal scheme carries both sides as nested identifiers.
- **The scheme reshapes heavily.** 96 of the audit's 105 ids do not
  re-emit as their input face, and 6 URNs collide — a lossy summary,
  not a lossless key.

## Status in PubID

The PubID `oiml` flavor emits this `urn:oiml:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 105 ids,
3 round-trip, 96 reshape, 6 that do not re-parse, 0 raise, 0 empty, and
6 colliding URNs. The corpus is 90 rows, every one parses and every one
emits.

The universal `urn:pubid:oiml:` scheme is the fleet's lossless form:
the number is the core of every type except the dual-published (no
core; its two nested identifiers ride `first-`/`second-`), the `_type`
tokens are `amd`, `annex`, `bp`, `bulletin`, `cs`, `document`, `dp`,
`err`, `er`, `guide`, `id`, `rec`, `sr` and `v`, and the atoms carry
the publisher, part, year, edition, stage, language, amendment, family,
iteration, letter, the trailing-word flag, and the two nested sides;
`parsed_format` and `space_separator` are spelling facets. Nested
ISO adoptions ride the ISO schema's qualified token. Landed with issue
#656 as drafted. See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [JCGM URN scheme (urn:jcgm)](/specs/jcgm-urn) — the sibling metrology scheme (the GUM and VIM families)
- [URN Mapping Overview](/concepts/urn)
- [OIML publisher page](/publishers/oiml)
