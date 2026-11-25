---
title: "ASHRAE URN scheme (urn:ashrae)"
description: "The PubID-invented URN form the ASHRAE flavor emits on to_urn — ASHRAE has no URN namespace in the IANA registry; a flat colon path of publisher, number, year, type and supplement markers, attested across the 2,178-row corpus."
---

# ASHRAE URN scheme (urn:ashrae)

ASHRAE (the American Society of Heating, Refrigerating and
Air-Conditioning Engineers) has no URN namespace in the IANA registry
and publishes no URN rule for its standards, guidelines and addenda.
The `urn:ashrae:` form documented here is therefore the PubID fleet's
own: the emission of the `ashrae` flavor's `to_urn` and the inverse of
its `UrnParser`. It is a flat colon path — publisher, number, year,
type, then one segment per qualifier — and a supplement appends a
single marker segment to its base document's URN.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ashrae` — **not IANA-registered**; the PubID `ashrae` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an ASHRAE assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (the `/` in `copub.ansi/ashrae`, see the rules) |
| Registry context | none; ASHRAE publications carry the Standard/Guideline series and ANSI co-publications |

## Scheme structure

A document emits `urn:ashrae:`, its number, its year (when present),
its type (downcased), then the qualifiers in emission order:

```
urn:ashrae:<number>[:<year>]:<type>[:<suffix>][:amd.<n>][:reaff.<year>][:copub.<org>]
<document-URN>:<marker>          (a supplement)
```

| Segment | Content | Notes |
|---|---|---|
| `<number>` | the document number, verbatim | `55`, `62.1`, `1.4`, `90A,B,C`; undated drafts keep their suffix letters (`0.3P`) |
| `<year>` | the publication year, plain | `2023`, `2005`; a year-less reference omits the segment (`urn:ashrae:0:guideline`) |
| `<type>` | the series type, downcased | `standard`, `guideline` |
| `<suffix>`, `amd.<n>` | edition suffix and amendment | downcased |
| `reaff.<year>` | the reaffirmation | `reaff.89`, `reaff.2003` — the year rides as printed, two- or four-digit |
| `copub.<org>` | the co-publisher, downcased | `copub.ansi/ashrae`, `copub.ansi/ashrae/ies` — the `/` of the org name passes through raw |
| `<marker>` | the supplement marker — the same word the MR slug uses | `add.<letter>` (Addendum), `adds.<a-b-…>` (combined addenda), `errata` / `errata.<yyyy-mm-dd>`, `interp` (Interpretations), `pkg.supplement-package` (Addenda Supplement Package) |

A supplement keeps the year, the type and the qualifiers on its base:
its URN is the base document's URN plus the one marker segment —
`urn:ashrae:62.1:2022:standard:copub.ansi/ashrae:add.ab` is Addendum ab
of the ANSI/ASHRAE co-published Standard 62.1-2022.

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ashrae:55:2023:standard` | ASHRAE Standard 55-2023 | attested in the pubid corpus (2,178 rows) |
| `urn:ashrae:103:2007:standard` | ASHRAE Standard 103-2007 | attested in the pubid corpus |
| `urn:ashrae:62.1:2022:standard:copub.ansi/ashrae:add.ab` | ANSI/ASHRAE Addendum ab to ASHRAE Standard 62.1-2022 | attested in the pubid corpus — the base carries the co-publisher, the marker rides last |
| `urn:ashrae:0:2005:guideline:errata.2011-09-28` | ASHRAE Guideline 0-2005 Errata (September 28, 2011) | attested in the pubid corpus — the dated errata marker |
| `urn:ashrae:1.4:2019:guideline:add.a` | ASHRAE Addendum a to Guideline 1.4-2019 | attested in the pubid corpus |
| `urn:ashrae:0:guideline:adds.a-b-c-d` | ASHRAE Addenda a, b, c, d to Guideline 0 | attested in the pubid corpus — the combined-addenda marker |
| `urn:ashrae:15.2:2022:standard:interp` | Interpretations for Standard 15.2-2022 | attested in the pubid corpus |
| `urn:ashrae:102:1983:standard:reaff.89` | ASHRAE Standard 102-1983 (RA89) | attested in the pubid corpus |
| `urn:ashrae:15:2007:standard:pkg.supplement-package` | ASHRAE Standard 15-2007: Addenda Supplement Package | attested in the pubid corpus |
| `urn:ashrae:90A,B,C:standard` | ASHRAE Standard 90A,B,C | attested in the pubid corpus — the comma passes through raw |

## Rules that apply to every ASHRAE URN

- **The lead is fixed.** `urn:ashrae:` carries the private namespace;
  the flavor replaces the lead segment with the publisher only when the
  record names one, and every attested row keeps `ashrae`.
- **A supplement is its base plus one marker.** The marker is the word
  the MR slug uses (`add.a`, `errata`, `interp`, `pkg.`), so the URN
  surface and the slug surface cannot drift apart; without the marker,
  every supplement of one document collapsed onto the base's bare URN.
- **Order mirrors the face.** Number, year, type, then suffix,
  amendment, reaffirmation, co-publisher — the supplement marker comes
  last, after the base's own qualifiers (`…:reaff.2006:errata.2006-05-01`).
- **No escaping.** Values pass through verbatim: the `/` of a
  co-publisher (`copub.ansi/ashrae`, 75 attested rows) and the comma of
  `90A,B,C` are outside RFC 8141's NSS charset, so those URNs are not
  RFC 8141-legal; the form never percent-encodes.
- **Reaffirmations keep the printed year.** `reaff.89` and
  `reaff.2003` both attest — the two-digit and four-digit forms are
  identity.

## Status in PubID

The PubID `ashrae` flavor emits this `urn:ashrae:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 400 ids,
42 round-trip, 352 reshape, 6 that do not re-parse, 0 raise, 0 empty,
and 0 colliding URNs; the corpus is 2,178 rows, every one parses and
every one emits, and each is a distinct URN.

The universal `urn:pubid:ashrae:` scheme is the fleet's lossless form:
the positional core is the number, and the atoms are `co-`, `year-`,
the date atoms, `addendumcode-`/`addendumcodes-`,
`packagedescription-`, `reaffirmed-` and `suffix-`, with one `_type`
token per series (`std`, `g`, `add`, `err`, `interp`, `ap`, `ca`).
See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [AMCA publisher page](/publishers/amca), [ANSI publisher page](/publishers/ansi)
- [URN Mapping Overview](/concepts/urn)
- [ASHRAE publisher page](/publishers/ashrae)
