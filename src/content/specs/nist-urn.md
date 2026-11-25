---
title: "NIST URN scheme (urn:nist)"
description: "The PubID-invented URN form the NIST flavor emits on to_urn — NIST has no URN namespace in the IANA registry, so the fleet mints these itself; the shape and its quirks are documented as emitted, attested across the 19,827-row corpus."
---

# NIST URN scheme (urn:nist)

NIST (National Institute of Standards and Technology) has no URN
namespace in the IANA registry and publishes no URN rule for its
publications, which carry NBS/NIST series designations dating to 1901
(SP, FIPS, CIRC, TN, IR, MONO, HB, LC, CRPL and more). The `urn:nist:`
form documented here is therefore the PubID fleet's own: the legacy
emission of the `nist` flavor's `to_urn`, kept byte-stable because
consumers already mint these URNs, and carrying no round-trip promise.
The fleet's lossless form for the same documents is the universal
`urn:pubid:nist:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `nist` — **not IANA-registered**; the PubID `nist` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a NIST assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (see the rules below) |
| Registry context | none; NIST publications carry the NBS/NIST series designations (SP, FIPS PUB, CIRC, TN, IR, MONO, HB, LC, CSM, CRPL …) |

## Scheme structure

Every URN carries the `urn:nist:` lead, the series token (downcased),
then one dot-joined segment holding the number and every qualifier after
it, and — for a translation — one trailing language segment:

```
urn:nist:<series>:<number>[.<qualifier>…][:<language>]
```

| Segment | Content | Notes |
|---|---|---|
| `<series>` | the NBS/NIST series token, downcased | `sp`, `fips`, `circ`, `tn`, `ir`, `mono`, `hb`, `cs`, `csm`, `crpl`, `lcirc` (`NBS LC 800` emits `lcirc`), `ncstar`, `nsrds`, `rpt`, `dd`, `gcr`, `owmwp`, `ai`, `ams`, `bms`; `sp` when the record names no series |
| `<number>` | the document number | `800-53`, `205`, `1-2`; parts join it with a dash (`488`, `1016`) |
| `<qualifier>` | edition, volume, part, issue, version, update, stage, supplement, errata, addendum, draft, index, insert, section, appendix — dot-joined in emission order | `.r5` (the Rev. spelling `r5`), `.e2` (NBS `e2` editions), `.e1982`, `.pt3-1`, `.v6.n1` (volume + issue), `.2pd` (draft number), `.ipd`, `.sec1`, `.insert`, `.app`, `.errata`, `.add.`, `supp…` (see the rules) |
| `<language>` | the translation language, downcased, its own segment | `por`, `spa` (`NIST IR 8259(por)` → `urn:nist:ir:8259.supp:por`) |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:nist:sp:800-53.r5.supp` | NIST SP 800-53r5 | attested in the pubid corpus (19,827 rows) |
| `urn:nist:fips:205.supp` | FIPS PUB 205 | attested in the pubid corpus |
| `urn:nist:sp:800-63-3.supp` | NIST SP 800-63-3 | attested in the pubid corpus |
| `urn:nist:tn:1235.r2.supp` | NIST TN 1235r2 | attested in the pubid corpus |
| `urn:nist:ir:8259A.supp` | NIST IR 8259A | attested in the pubid corpus |
| `urn:nist:ir:8259.supp:por` | NIST IR 8259(por) | attested in the pubid corpus — the translation is its own trailing segment |
| `urn:nist:crpl:1-2.pt3-1.suppA` | NBS CRPL 1-2pt3-1supA | attested in the pubid corpus — the valued supplement emits `suppA` |
| `urn:nist:circ:24.suppJan1924` | NBS CIRC 24supJan1924 | attested in the pubid corpus — the month-named supplement |
| `urn:nist:csm:v6.n1.supp` | NBS CSM v6n1 | attested in the pubid corpus — the volume/issue pair |
| `urn:nist:sp:800-53. Rev. 5.supp` | NIST SP 800-53 Rev. 5 | attested in the pubid corpus — the printed edition spelling rides the URN, raw space and stray dot included |
| `urn:nist:circ:101.e2` | NBS CIRC 101e2sup | attested in the pubid corpus — a present-but-empty supplement emits nothing while an absent one emits `.supp` |

## Rules that apply to every NIST URN

- **The lead is fixed.** `urn:nist:` carries the private namespace; the
  series follows downcased, `sp` when the record names none.
- **Everything after the number is one dot-joined segment.** The
  qualifiers emit in a fixed order — parts, edition, volume, part,
  volume-issue, version, update, stage, supplement, errata, addendum,
  draft, index, insert, section, appendix — each separated by a dot.
- **The trailing `.supp` is almost always noise.** A nil (absent)
  supplement still emits the `supp` segment, while a present-but-empty
  one emits nothing — the branch is inverted — so 19,765 of the 19,827
  attested URNs end in `.supp` regardless of any supplement.
- **The edition rides its printed spelling.** `NIST SP 800-53r5` and
  `NIST SP 800-53 Rev. 5` are one document with two URNs
  (`urn:nist:sp:800-53.r5.supp` and `urn:nist:sp:800-53. Rev. 5.supp`):
  the form is spelling-sensitive and not one-URN-per-document.
- **No escaping.** Values pass through verbatim, so a raw space reaches
  the NSS whenever a qualifier prints one (113 of the 19,827 attested
  URNs — the ` Rev. N` editions). A space is not in RFC 8141's
  `unreserved` set, so those URNs are not RFC 8141-legal; the form never
  percent-encodes.

## Status in PubID

The PubID `nist` flavor emits this `urn:nist:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 400 ids,
130 round-trip, 247 reshape, 23 that do not re-parse, and 0 colliding
URNs; the corpus is 19,827 rows, every one parses and every one emits.

The universal `urn:pubid:nist:` scheme is the fleet's lossless form: the
positional core is the number, the series and publisher ride atoms
(`pub-`, `series-`), each qualifier is its own atom in the schema's
fixed order (`edtype-`, `ed-`, `sup-`, `upd-`, …), and the spelling-only
values ride the trailing `f` facet group — one URN per document,
path-safe, round-trip by `to_hash`. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ETSI URN scheme (urn:etsi)](/specs/etsi-urn)
- [URN Mapping Overview](/concepts/urn)
- [NIST publisher page](/publishers/nist)
