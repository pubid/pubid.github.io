---
title: "EVS URN scheme (urn:evs)"
description: "The PubID-invented URN form the EVS flavor emits on to_urn — the Estonian Centre for Standardisation has no URN namespace in the IANA registry, so the fleet mints these itself; national adoptions reuse the adopted CEN identifier's URN path under a swapped namespace, attested across the 35-row corpus."
---

# EVS URN scheme (urn:evs)

EVS (the Estonian Centre for Standardisation) has no URN namespace in
the IANA registry and publishes no URN rule for its standards and
adoptions. The `urn:evs:` form documented here is therefore the PubID
fleet's own: the emission of the `evs` flavor's `to_urn`, carrying no
round-trip promise. Its one structural idea is delegation: a national
adoption of a CEN document generates the adopted identifier's own URN
and swaps the `urn:cen:` namespace for `urn:evs:`, so the two flavors
stay consistent by construction; the ISO/IEC and plain Estonian shapes
compose from their own captures. The scheme mirrors the CEN adoption
vocabulary (`na`, `plus`, `amd`, `cor`) and keeps a raw space when an
adopted ETSI V-version prints one. The fleet's lossless form for the
same documents is the universal `urn:pubid:evs:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `evs` — **not IANA-registered**; the PubID `evs` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an EVS assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the adopted-ETSI raw space, e.g. `301 406-1`, is legal inside an NSS) |
| Registry context | none; EVS publications carry the `EVS`, `EVS-EN`, `EVS-EN ISO`, `EVS-EN ISO/IEC`, `EVS-ISO`, `EVS-IEC`, `EVS-TS` and `EVS-TR` designations |

## Scheme structure

A national adoption inlines the adopted CEN URN's path (namespace
swapped); the other shapes compose from the flavor's captures, and the
supplement and national-annex markers follow the CEN vocabulary:

```
urn:evs:[pr:]<body>:<number>:<year>[:na[:<na-year>]][:plus]:[amd|cor]:[<n>]:[<year>][:<language>]
```

| Segment | Content | Notes |
|---|---|---|
| `pr:` | the draft prefix | `prEVS-EN 100:2026` emits `urn:evs:pr:en:100:2026` |
| `<body>` | the adoption body or EVS type, downcased | `en` (national adoptions of European standards, with the adopted document's own chain inlined: `iso`, `iso-iec`, `iec`), `iso` / `iec` (international adoptions), `es`, `ts`, `tr` (plain Estonian documents) |
| `<number>` | the document number | `921`, `18216`, `27017`; an adopted ETSI V-version keeps its raw space (`301 406-1`) |
| `<year>` | the year | `2019`, `2026` |
| `na[:<na-year>]` | the national annex | `+NA` and `/NA` both emit `na`; the annex year appends (`na:2010`) |
| `plus:amd|cor:...` | the consolidation marker | the `+` separator spelling emits `plus` (`+A1` → `plus:amd:1:2014`); the slash and space spellings carry no marker (`/A1` → `amd:1:2014`) |
| `<language>` | the language | `et`, or the `et-en` joined form on a plain Estonian standard |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:evs:921:2019` | EVS 921:2019 | attested in the pubid corpus (35 rows) |
| `urn:evs:en:18216:2026` | EVS-EN 18216:2026 | attested in the pubid corpus — the adopted CEN path under the swapped namespace |
| `urn:evs:iso:9001:2015` | EVS-ISO 9001:2015 | attested in the pubid corpus — an international adoption |
| `urn:evs:iec:62368-1:2020` | EVS-IEC 62368-1:2020 | attested in the pubid corpus |
| `urn:evs:en:iso-iec:27017:2026` | EVS-EN ISO/IEC 27017:2026 | attested in the pubid corpus — the joint adoption dash-joins the orgs |
| `urn:evs:en:71-1:2011:plus:amd:1:2014` | EVS-EN 71-1:2011+A1:2014 | attested in the pubid corpus — the `+` separator emits `plus` |
| `urn:evs:en:71-1:2011:amd:1:2014` | EVS-EN 71-1:2011 AMD1:2014 | attested in the pubid corpus — the space spelling carries no `plus` |
| `urn:evs:en:1993-1-1:2005:na:2010:et` | EVS-EN 1993-1-1:2005+NA:2010 et | attested in the pubid corpus — the national annex with its year and the language |
| `urn:evs:pr:en:100:2026` | prEVS-EN 100:2026 | attested in the pubid corpus — the draft prefix leads |
| `urn:evs:ts:1:2019` | EVS-TS 1:2019 | attested in the pubid corpus |
| `urn:evs:811:2018:et-en` | EVS 811:2018 et-en | attested in the pubid corpus — the joined language form |

## Rules that apply to every EVS URN

- **The lead is fixed.** `urn:evs:` carries the private namespace; the
  generator swaps `urn:cen:` for it on adoptions.
- **A national adoption delegates to the adopted identifier's URN.**
  The path after the namespace is the CEN identifier's own emission —
  an adoption of a CEN/CENELEC-ISO/IEC chain inlines the whole chain
  (`en:iso-iec:27017`); a non-CEN base raises rather than mis-emit.
- **The separator spelling is partly preserved.** The `+` spelling of a
  supplement or national annex emits the `plus` marker; the slash and
  space spellings emit the bare marker — so the consolidation's
  spelling survives only partially.
- **The national annex is its own segment.** `na`, with the annex year
  appended when the record carries one.
- **The draft prefix leads.** `pr:` sits before the body — a draft is
  another document than the published standard.
- **The adopted-ETSI raw space survives.** `301 406-1` prints with a
  space and the URN keeps it — RFC 8141-legal inside an NSS, but not
  re-parseable by space-splitting consumers.

## Status in PubID

The PubID `evs` flavor emits this `urn:evs:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 36 ids, 29
round-trip, 7 reshape, 0 that do not re-parse, 0 raise, 0 empty, and 4
colliding URNs. The corpus is 35 rows, every one parses and every one
emits.

The universal `urn:pubid:evs:` scheme is the fleet's lossless form: the
`_type` tokens are `es`, `id`, `ia` and `na`, the number is the core,
and the atoms carry the part, year, language, amendment kind/number/
year, corrigendum kind/year, EVS type, international org, national
annex year — and `draftprefix-` (bool), which was a facet when the
schema landed and is an atom now (`prEVS-EN 100:2026` is another
document than `EVS-EN 100:2026`, so identity compares it, issue #656).
The separator spellings are facets, cut from identity. Nested
identifiers of other flavors ride their own schema's qualified token —
`EVS-EN 18216:2026` is `urn:pubid:evs:cencenelec.en:18216:year-2026:na`.
Landed with issue #656 as drafted. See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [CEN-CENELEC URN scheme (urn:cen)](/specs/cen_cenelec-urn) — the namespace EVS adoptions delegate to
- [URN Mapping Overview](/concepts/urn)
- [EVS publisher page](/publishers/evs)
