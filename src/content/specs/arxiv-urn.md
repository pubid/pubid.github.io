---
title: "arXiv URN scheme (urn:pubid:arxiv)"
description: "The arXiv scheme is the pubid scheme itself: arXiv has no URN namespace in the IANA registry, and the base-fallback urn:arxiv: form would map different papers to one URN — so the flavor's to_urn is the universal urn:pubid:arxiv:eprint: scheme, attested across the 14-row corpus."
---

# arXiv URN scheme (urn:pubid:arxiv)

arXiv (the Cornell-hosted e-print repository) registers no URN
namespace in the IANA registry, and the obvious fleet fallback —
`urn:arxiv:<number>:<year>` — is worse than nothing: it maps different
papers to one URN, because an arXiv number alone is not an identity
(the `2301` of `2301.00001` is a year-month pair, and old-form ids
carry no year at all). So the `arxiv` flavor makes an unusual choice,
documented here as its scheme: **`to_urn` is the universal pubid-scheme
URN.** The flavor emits `urn:pubid:arxiv:eprint:…` — the fleet's
lossless codec — as its one and only URN form, and it round-trips by
construction. This is the only batch scheme whose emission and its
lossless form are the same URN.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `pubid:arxiv` — the universal PubID codec's flavor segment; **not IANA-registered**, and no `urn:arxiv:` form exists because it would be ambiguous |
| Assigning authority | none — arXiv assigns e-print ids (`arXiv:2301.00001v1`), and the URN is the fleet's deterministic encoding of that assignment |
| Governing guidance | the pubid scheme's own grammar (see [the universal PubID URN scheme](/library/pubid-urn-scheme)); RFC 8141 URN syntax met |
| Registry context | arXiv's own identifier is the e-print id (`2301.00001`, old-form `math.GT/0309136`); the URN encodes it whole |

## Scheme structure

Every URN carries the `urn:pubid:arxiv:eprint:` lead (the `eprint`
type token), the year, the month and the number as the positional
core, then the old-form atoms and the version:

```
urn:pubid:arxiv:eprint:<year>:<month>:<number>[:archive-<archive>][:sc-<subject-class>][:v-<version>]
```

| Segment | Content | Notes |
|---|---|---|
| `eprint` | the `_type` token | the flavor's one identity-bearing class (plus the bare `id` type) |
| `<year>`, `<month>` | the int year and month of the `YYMM` pair | `2301` → `2023:1`; `0704` → `2007:4`; an old-form id uses its true year and month |
| `<number>` | the e-print sequence number, zero-padding kept | `00001`, `9999`, `136` |
| `archive-<archive>` | the old-form archive | `archive-math`, `archive-astro-ph`, `archive-hep-th` — old ids only (`arXiv:math/0703001`) |
| `sc-<subject-class>` | the old-form subject class | `sc-GT`, `sc-CD`, `sc-AI` — the sub-archive of a dotted old id (`math.GT/0309136`) |
| `v-<version>` | the version, int | `v-1`, `v-12`; optional — a version-less reference omits it |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:pubid:arxiv:eprint:2023:1:00001` | arXiv:2301.00001 | attested in the pubid corpus (14 rows) |
| `urn:pubid:arxiv:eprint:2023:1:00001:v-1` | arXiv:2301.00001v1 | attested in the pubid corpus — the version atom |
| `urn:pubid:arxiv:eprint:2023:1:00001:v-12` | arXiv:2301.00001v12 | attested in the pubid corpus |
| `urn:pubid:arxiv:eprint:2007:4:0001` | arXiv:0704.0001 | attested in the pubid corpus — the `YYMM` pair decodes to `2007:4` |
| `urn:pubid:arxiv:eprint:2007:4:0001:v-1` | arXiv:0704.0001v1 | attested in the pubid corpus |
| `urn:pubid:arxiv:eprint:2003:9:136:archive-math:sc-GT` | arXiv:math.GT/0309136 | attested in the pubid corpus — the old-form archive and subject class |
| `urn:pubid:arxiv:eprint:1991:8:001:archive-astro-ph` | arXiv:astro-ph/9108001 | attested in the pubid corpus — an old id with no subject class |
| `urn:pubid:arxiv:eprint:2001:1:001:archive-cs:sc-AI:v-1` | arXiv:cs.AI/0101001v1 | attested in the pubid corpus — every atom at once |
| `urn:pubid:arxiv:eprint:2015:1:00001` | arXiv:1501.00001 | attested in the pubid corpus |

## Rules that apply to every arXiv URN

- **There is no `urn:arxiv:` form.** The base fallback would key on
  the number and year alone, and arXiv numbers are not identities
  across eras — so the flavor refuses it and emits the pubid scheme
  instead (`to_urn` is `to_pubid_urn`).
- **The year-month pair decodes positionally.** `2301` is stored as the
  year `2023` and month `1`, so the URN carries the decoded values, not
  the printed pair.
- **The zero padding stays in the core.** `00001` emits `00001` — the
  printed sequence number is reconstructed verbatim.
- **Old-form atoms appear only when the id is old.** `archive-` and
  `sc-` name the pre-2007/2015 archive and subject class; a modern id
  omits them entirely.
- **The version is an atom, not a core.** Two versions of one paper
  share the core and differ in `v-N` — the same identity, different
  snapshots.
- **The scheme round-trips by construction.** It is the universal
  codec: parse the URN and the identifier's hash is what emitted it —
  the 14-row corpus pins each row's URN to its identity.

## Status in PubID

The PubID `arxiv` flavor emits exactly the scheme documented here:
`to_urn` returns the pubid-scheme URN, so the emission and the lossless
form are one and the same. The corpus is 14 rows, every one parses,
every one emits, and every one round-trips through the same URN. The
schema landed with the flavor itself (relaton#42). See [the universal
PubID URN scheme](/library/pubid-urn-scheme) for the `urn:pubid:`
codec itself.

## See Also

- [DOI URN scheme (urn:doi)](/specs/doi-urn) — the other repository-identifier flavor
- [URN Mapping Overview](/concepts/urn)
- [arXiv publisher page](/publishers/arxiv)
