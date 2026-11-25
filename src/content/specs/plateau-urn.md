---
title: "PLATEAU URN scheme (urn:plateau)"
description: "The PubID-invented URN form the PLATEAU flavor emits on to_urn — MLIT Japan's PLATEAU project has no URN namespace in the IANA registry, so the fleet mints these itself; a two-digit zero-padded positional scheme for the Handbooks and Technical Reports, attested across the 118-row corpus."
---

# PLATEAU URN scheme (urn:plateau)

PLATEAU (the MLIT Japan 3D-city-model project) has no URN namespace in
the IANA registry and publishes no URN rule for its Handbooks and
Technical Reports. The `urn:plateau:` form documented here is therefore
the PubID fleet's own: the emission of the `plateau` flavor's `to_urn`,
carrying no round-trip promise. It is a bare positional path — the type
downcased, the number zero-padded to two digits, and (when the record
has one) the annex number or annex letter as a final segment. It is not
lossless: the edition and the volume label (`本編`, `本編＋付録`) never
enter the URN, so every edition of a handbook collapses to one URN by
design. The fleet's lossless form for the same documents is the
universal `urn:pubid:plateau:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `plateau` — **not IANA-registered**; the PubID `plateau` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an MLIT assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; PLATEAU publications carry the `PLATEAU [Type] #[Number]` designations with the Japanese `第X.X版` edition face |

## Scheme structure

Every URN carries the `urn:plateau:` lead, the type downcased, the
number zero-padded to two digits, and — when the record has one — the
annex number or the annex letter downcased:

```
urn:plateau:<type>:<number>[:<annex-number>|<letter>]
```

| Segment | Content | Notes |
|---|---|---|
| `<type>` | the document type, downcased | `handbook` (the Handbooks), `tr` (Technical Reports; the printed `Technical Report` two-word face downcasts to the `tr` token), `annex` (the Annex supplements) |
| `<number>` | the document number, zero-padded to two digits | `00`, `03`, `46`; PLATEAU keeps `number` an Integer, so `#00` formats as `00` |
| `<annex-number>` | the annex number of a handbook, zero-padded to two digits | `Handbook #03-1` emits `03:01` |
| `<letter>` | the letter of an Annex supplement, downcased | an Annex has no number of its own; a hand-built one writes its letter here |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:plateau:handbook:00` | PLATEAU Handbook #00 第1.0版 | attested in the pubid corpus (118 rows) — the edition does not enter the URN, so 第2.0版 and every later edition carry the same URN |
| `urn:plateau:handbook:03:01` | PLATEAU Handbook #03-1 第1.0版 | attested in the pubid corpus — the annex number zero-pads to two digits |
| `urn:plateau:handbook:01` | PLATEAU Handbook #01 第2.3版 | attested in the pubid corpus |
| `urn:plateau:tr:00` | PLATEAU Technical Report #00 | attested in the pubid corpus |
| `urn:plateau:tr:46:01` | PLATEAU Technical Report #46-1 | attested in the pubid corpus — the `-1` annex suffix is its own zero-padded segment |

## Rules that apply to every PLATEAU URN

- **The lead is fixed.** `urn:plateau:` carries the private namespace;
  the publisher never appears as a segment.
- **The number zero-pads to two digits.** The generator formats
  `%02d`, so `#00` emits `00` and `#03-1` emits `03:01`; the padding is
  the emission's, not the document's (the printed face is `#00`).
- **The edition never enters the URN.** `第1.0版` through `第4.0版` of
  Handbook #00 all carry `urn:plateau:handbook:00` — the audit's 10
  colliding URNs, a collapse by design.
- **The volume label never enters the URN.** 本編 and 本編＋付録 are
  two same-date publications of one edition, and both carry the same
  URN; only the universal scheme separates them.
- **A Technical Report downcasts to `tr`.** The printed two-word face
  never appears; the token is the short form.
- **An annex is number or letter, never both.** A handbook's `-1`
  suffix formats as a two-digit segment; an Annex supplement (which has
  no number of its own) carries its downcased letter instead.

## Status in PubID

The PubID `plateau` flavor emits this `urn:plateau:` scheme on `to_urn`
today. The URN-scheme audit over the pass ids gives 115 ids, 83
round-trip, 32 reshape, and 10 colliding URNs — the reshapes and
collisions are the edition and volume collapses above. The corpus is
118 rows (35 Handbook, 83 Technical Report), every one parses and every
one emits.

The universal `urn:pubid:plateau:` scheme is the fleet's lossless form:
`number` stays an Integer (the one flavor outside the `:string`
retype), so the core is `:int` (`#00` is the core `0`), and the atoms
carry the publisher (`pub-`), edition (`ed-`), annex (`annex-`, int)
and volume (`vol-`, the 本編/本編＋付録 label written in `~XX` escapes)
— `PLATEAU Handbook #00 第1.0版` is `urn:pubid:plateau:hb:0:ed-1.0`,
`PLATEAU Technical Report #46-1` is
`urn:pubid:plateau:tr:46:annex-1`, and a hand-built Annex writes its
letter as an atom (`urn:pubid:plateau:tr:46:annex:letter-A`). Landed
with issue #656 as drafted. See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [JIS URN scheme (urn:jis)](/specs/jis-urn) — the sibling Japanese national scheme
- [URN Mapping Overview](/concepts/urn)
- [PLATEAU publisher page](/publishers/plateau)
