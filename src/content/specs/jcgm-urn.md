---
title: "JCGM URN scheme (urn:jcgm)"
description: "The PubID-invented URN form the JCGM flavor emits on to_urn — the Joint Committee for Guides in Metrology has no URN namespace in the IANA registry, so the fleet mints these itself; a numbered scheme whose GUM guides ride a gum.N token and whose meetings get their own urn:jcgm:meeting shape, attested across the 31-row corpus."
---

# JCGM URN scheme (urn:jcgm)

JCGM (the Joint Committee for Guides in Metrology — the BIPM-hosted
body behind the GUM and the VIM) has no URN namespace in the IANA
registry and publishes no URN rule for its guides, their supplements
and its meetings. The `urn:jcgm:` form documented here is therefore the
PubID fleet's own: the emission of the `jcgm` flavor's `to_urn`,
carrying no round-trip promise. It has three shapes — the base guide
path, the meeting path (`urn:jcgm:meeting:<n>:<year>`), and the
supplement, which rides its base's path — and the GUM guides carry
their number in a `gum.N` token while bare `JCGM GUM`/`JCGM VIM-3`
references carry the word itself. The fleet's lossless form for the
same documents is the universal `urn:pubid:jcgm:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `jcgm` — **not IANA-registered**; the PubID `jcgm` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a JCGM assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the comma-joined language list `en,fr` is legal inside an NSS) |
| Registry context | none; JCGM publications carry the `JCGM <number>:<year>` designations, the `GUM`/`VIM` word forms, and the `<n>th Meeting (<year>)` face |

## Scheme structure

A base guide carries the number (or the `gum.N` token), the part and
subpart (dash-prefixed), the date, the edition, the iteration, the
typed stage and the languages; a meeting carries its own path; a
supplement repeats its base then appends its typed stage and ordinal:

```
urn:jcgm:[meeting]:<number>:[-<part>]:[<date|year>]:[ed.<n>]:[iter.<n>]:[<typed-stage>]:[<languages>]
```

| Segment | Content | Notes |
|---|---|---|
| `<number>` | the guide number, or the `gum.N` token | `100`, `101`, `200`; the GUM-series guides emit `gum.1`, `gum.6`; the bare word forms emit themselves (`JCGM GUM` → `urn:jcgm:GUM`) |
| `meeting` | the meeting path word | `JCGM 17th Meeting (2012)` emits `urn:jcgm:meeting:17:2012` |
| `-<part>` / `-<subpart>` | the part and subpart, dash-prefixed | the shared Base convention |
| `<date>` | the date or year | `2008`, or the meeting/amendment year |
| `ed.<n>` | the edition | dot-prefixed |
| `iter.<n>` | the stage iteration | dot-prefixed |
| `<typed-stage>` | the supplement's typed stage | `amendment`, `corrigendum` — the `guide`/`gum_guide` codes never append (the number form already implies them) |
| `<languages>` | the language codes, comma-joined | `en`, `fr`, `en,fr` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:jcgm:100` | JCGM 100 | attested in the pubid corpus (31 rows) |
| `urn:jcgm:100:2008` | JCGM 100:2008 | attested in the pubid corpus |
| `urn:jcgm:100:2008:en` | JCGM 100:2008(E) | attested in the pubid corpus |
| `urn:jcgm:100:2008:amendment:1:2026` | JCGM 100:2008/Amd 1:2026 | attested in the pubid corpus — the supplement rides its base's path |
| `urn:jcgm:101:2008:corrigendum:1:2009` | JCGM 101:2008/Cor 1:2009 | attested in the pubid corpus |
| `urn:jcgm:200:2012:en,fr` | JCGM 200:2012(E/F) | attested in the pubid corpus — the comma-joined languages |
| `urn:jcgm:GUM` | JCGM GUM | attested in the pubid corpus — the bare word form |
| `urn:jcgm:gum.1:2022` | JCGM GUM-1:2022-11-28 | attested in the pubid corpus — the `gum.N` token; the month and day do not enter the URN |
| `urn:jcgm:meeting:17:2012` | JCGM 17th Meeting (2012) | attested in the pubid corpus — the meeting path |

## Rules that apply to every JCGM URN

- **The lead is fixed.** `urn:jcgm:` carries the private namespace.
- **The GUM series is a `gum.N` token.** `JCGM GUM-1` emits `gum.1`;
  the bare word references (`JCGM GUM`, `JCGM VIM-3`) emit the word
  itself as the number, case kept.
- **A meeting has its own path.** `meeting:<n>:<year>` — the ordinal
  and the year are the whole identity.
- **A supplement repeats its base, then appends.** The base's path
  comes first, then the supplement's typed stage and its own ordinal
  (the "1" of `/Cor 1`, never the iteration); a dated supplement's year
  closes the URN.
- **The guide type never appends.** `guide` and `gum_guide` are implied
  by the number form, so their type codes are not emitted; only
  `amendment` and `corrigendum` appear as typed stages.
- **The languages are comma-joined into one segment.** `en,fr` rides as
  one segment — RFC 8141-legal inside an NSS.
- **The scheme nearly round-trips.** The audit gives 31 ids, 29
  round-trip, 2 reshape, 0 that do not re-parse, 0 raise, 0 empty, and
  0 colliding URNs.

## Status in PubID

The PubID `jcgm` flavor emits this `urn:jcgm:` scheme on `to_urn`
today. The audit's numbers are above. The corpus is 31 rows (8 plain
guides, 16 meetings, 3 amendments, 2 corrigenda, 2 GUM guides), every
one parses and every one emits.

The universal `urn:pubid:jcgm:` scheme is the fleet's lossless form:
the number is the core of every type, the `_type` tokens are `amd`,
`cor`, `guide`, `gumguide`, `id` and `meeting`, and the atoms carry the
year, the month, the day and the language list — `JCGM 100:2008/Amd
1:2026` is
`urn:pubid:jcgm:guide:100:year-2008:lang-en:amd:1:year-2026`. The
original language code is a spelling facet (`langsrc-`). Landed with
issue #656 as drafted. See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [BIPM URN scheme (urn:bipm)](/specs/bipm-urn) — the host organization's own scheme
- [OIML URN scheme (urn:oiml)](/specs/oiml-urn) — the sibling metrology scheme
- [URN Mapping Overview](/concepts/urn)
- [JCGM publisher page](/publishers/jcgm)
