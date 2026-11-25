---
title: "SAE URN scheme (urn:sae)"
description: "The PubID-invented URN form the SAE flavor emits on to_urn — SAE International has no URN namespace in the IANA registry, so the fleet mints these itself; a type-token-and-designation scheme whose date segment is a year or a year-and-month, attested across the 15-row corpus (the flavor was audited from a literal list, not a fixture corpus)."
---

# SAE URN scheme (urn:sae)

SAE International has no URN namespace in the IANA registry and
publishes no URN rule for its ground-vehicle and aerospace standards.
The `urn:sae:` form documented here is therefore the PubID fleet's
own: the emission of the `sae` flavor's `to_urn`, carrying no
round-trip promise. It is a short positional path — the series type
downcased, the printed designation, and the date (a year, or SAE's
year-and-month edition date). Unlike most flavors, SAE was never
audited against a fixture corpus: at audit time it had no fixture
directory under the registry name, so the scheme below is attested by
the 15-row pubid-testsuite corpus and, on the pubid side, by a
contract spec that parses a fixed literal list. The fleet's lossless
form for the same documents is the universal `urn:pubid:sae:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `sae` — **not IANA-registered**; the PubID `sae` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an SAE assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the slash and underscore inside designations — `22520/45A`, `5259/7A_A1` — are legal inside an NSS) |
| Registry context | none; SAE publications carry the series-coded designations (`J3016`, `AS22520/45A`, `AMS4121J`, `AMS-QQ-A-250/4B`, `GEIA-STD-0001`) and the `_yyyymm` edition-date face |

## Scheme structure

Every URN carries the `urn:sae:` lead, the series type downcased (or
the bare `std` when the record carries none), the designation, and the
date:

```
urn:sae:<type>:<designation>[:<yyyy|yyyymm>]
```

| Segment | Content | Notes |
|---|---|---|
| `<type>` | the series code, downcased | `j` (ground-vehicle `J` series), `as` (aerospace `AS`), `ams` (aerospace materials), `arp` (aerospace recommended practices), `eia`, `geia-std`, `ams-std`, `ams-qq-a` (the dash-joined parent codes); a typeless record emits `std` |
| `<designation>` | the printed designation after the series | `3016`, `22520/45A`, `5259/7A_A1`, `4121J` (the revision letter rides in the designation), `250/4B` |
| `<yyyy>` / `<yyyymm>` | the date, as stored | `2010` (a year), `202104` (the year-and-month edition date of `J3016_202104`) |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:sae:j:3016` | SAE J3016 | attested in the pubid corpus (15 rows) |
| `urn:sae:j:3016:202104` | SAE J3016_202104 | attested in the pubid corpus — the year-and-month edition date |
| `urn:sae:as:22520/45A` | SAE AS22520/45A | attested in the pubid corpus — the slash designation |
| `urn:sae:as:5259/7A_A1` | SAE AS5259/7A_A1 | attested in the pubid corpus — slash and underscore ride in the designation |
| `urn:sae:ams:4121J` | SAE AMS4121J | attested in the pubid corpus — the revision letter rides in the designation |
| `urn:sae:arp:4754A:2010` | SAE ARP4754A:2010 | attested in the pubid corpus |
| `urn:sae:j:1939-71:2020` | SAE J1939-71:2020 | attested in the pubid corpus — the part rides in the designation |
| `urn:sae:ams-qq-a:250/4B` | SAE AMS-QQ-A-250/4B | attested in the pubid corpus — the dash-joined parent code |
| `urn:sae:eia:649-1A` | SAE EIA-649-1A | attested in the pubid corpus |

## Rules that apply to every SAE URN

- **The lead is fixed.** `urn:sae:` carries the private namespace.
- **The type is the downcased series code — or `std`.** A record that
  carries no series emits `std`; every other type is the code SAE
  prints, downcased.
- **The designation is verbatim.** Revision letters (`4121J`), slash
  parts (`22520/45A`) and underscores (`5259/7A_A1`) ride inside the
  one designation segment; the emission never decomposes them.
- **The date is a year or a year-and-month.** The `_yyyymm` edition
  face prints as six digits (`202104`); a plain year prints as four.
- **The scheme was attested without a fixture corpus.** The audit ran
  no `to_urn` pass for `sae` (no fixture directory under the registry
  name at audit time); the 15-row corpus above and the pubid contract
  spec's literal list are the attestation.

## Status in PubID

The PubID `sae` flavor emits this `urn:sae:` scheme on `to_urn` today.
The corpus is 15 rows, every one parses and every one emits; the pubid
contract spec parses a fixed literal list, and no fixture-corpus audit
ran for this flavor.

The universal `urn:pubid:sae:` scheme is the fleet's lossless form:
the single `_type` token is `id` (one identifier class carries every
series code, so the series is an atom, not a type), the number is the
core, and the atoms carry the type abbreviation (`typeabbr-`), the
revision (`rev-`), the amendment (`amd-`), the top-level part
(`part-`) and the date — which keeps the canonical flattening's dual
shape (pubid#360; per-instance, not per-flavor): the nested year+month
form uses the Integer atoms `year-`/`month-`, the flat year-alone form
uses `yearflat-` (string) — the ashrae ruling.
`SAE J3016_202104` is `urn:pubid:sae:id:3016:typeabbr-J:year-2021:month-4`;
`SAE ARP4754A:2010` is
`urn:pubid:sae:id:4754:typeabbr-ARP:rev-A:yearflat-2010`. No URN
emitted before the corpus round (issue #669) changed form; the leaf
spec pins the URNs of both shapes. Landed with issue #670 as drafted.
See [the universal PubID URN scheme](/library/pubid-urn-scheme) for
the `urn:pubid:` codec itself.

## See Also

- [ASHRAE URN scheme (urn:ashrae)](/specs/ashrae-urn) — the dual-shape date rule's namesake
- [URN Mapping Overview](/concepts/urn)
- [SAE publisher page](/publishers/sae)
