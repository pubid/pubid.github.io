---
title: "ANSI URN scheme (urn:ansi)"
description: "The PubID-invented URN form the ANSI flavor emits on to_urn — ANSI has no URN namespace in the IANA registry, so the fleet mints these itself; a positional scheme where co-publishers join the namespace lead, attested across the 196-row corpus."
---

# ANSI URN scheme (urn:ansi)

ANSI (American National Standards Institute) has no URN namespace in
the IANA registry and publishes no URN rule for the American National
Standards it designates. The `urn:ansi:` form documented here is
therefore the PubID fleet's own: the legacy emission of the `ansi`
flavor's `to_urn`, carrying no round-trip promise (the flavor landed
with the IEEE wave, which nests ANSI ids). It is a short positional
path — the number, the part, the year, then the labelled revision,
edition and stage segments — with one structural quirk: the publisher
and its co-publishers overwrite the segment after the lead, so a
co-published standard changes what reads like the namespace
(`urn:ansi-iec:…`, `urn:iso/astm:…`-style). The fleet's lossless form
for the same documents is the universal `urn:pubid:ansi:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `ansi` — **not IANA-registered**; the PubID `ansi` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an ANSI assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it for the records that keep the `ansi` lead |
| Registry context | none; ANSI designations carry the developer's own numbering (`C135.14`, `X9.62`, `802.3`) under the ANSI/ developer prefix |

## Scheme structure

Every URN carries the `urn:ansi:` lead — overwritable by the
publisher-plus-co-publishers segment — then the number, part, subpart,
year and the labelled segments, each only when present:

```
urn:ansi[-<copubs>]:<number>[:<part>][:<subpart>][:<year>][:rev-<r>][:<edition>][:<stage>]
```

| Segment | Content | Notes |
|---|---|---|
| `ansi[-<copubs>]` | the publisher segment — the co-publishers dash-join it | `ansi`, `ansi-ieee`, `ansi-iec`, `ansi-isa`, `ansi-tia` |
| `<number>` | the document number | `802.3`, `C135.14`, `X9.8`, `568.2` |
| `<part>` | the part, its own segment, dash kept | `-1` (`ANSI X9.8-1:2007` emits `X9.8:-1:2007`) — the audit finds the year of `ANSI 802.3-2012` stored in `part` (relaton#45), which is why the trailing `-2012` prints as this segment |
| `<year>` | the year | `2007`, `1986` |
| `rev-<r>` | the revision letter, labelled | `rev-D` (`ANSI/TIA-568.2-D`) — `568.2-C` and `568.2-D` are two documents |
| `<stage>` | the typed stage, when not `ans` | the draft stages |
| `<languages>` | the languages, comma-joined | one trailing segment |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:ansi:802.3:2012` | ANSI 802.3-2012 | attested in the pubid corpus (196 rows) — the year rides the part segment (relaton#45) |
| `urn:ansi:C135.14:1979` | ANSI C135.14-1979 | attested in the pubid corpus |
| `urn:ansi:X9.8:-1:2007` | ANSI X9.8-1:2007 | attested in the pubid corpus — the part keeps its dash |
| `urn:ansi-ieee:1:1986` | ANSI/IEEE 1-1986 | attested in the pubid corpus — the co-publisher joins the publisher segment |
| `urn:ansi-iec:60601:-1` | ANSI/IEC 60601-1 | attested in the pubid corpus |
| `urn:ansi-isa:61511:-1:2018` | ANSI/ISA-61511-1-2018 | attested in the pubid corpus |
| `urn:ansi-tia:568.2:rev-D` | ANSI/TIA-568.2-D | attested in the pubid corpus — the labelled revision letter |

## Rules that apply to every ANSI URN

- **The lead is `urn:ansi` only when ANSI is the sole publisher.** The
  generator overwrites the segment after the lead with the publisher and
  its dash-joined co-publishers, so `ANSI/IEEE 1-1986` is
  `urn:ansi-ieee:1:1986` — the co-publisher rides the NID position, not
  the NSS.
- **The part is its own segment and keeps its dash.** `-1` prints as a
  `-1` segment; the audit's finding that `ANSI 802.3-2012` stores its
  year in `part` (relaton#45) means a year-suffixed designation prints
  through the same segment (`802.3:2012`).
- **The revision letter is labelled.** `rev-D` separates
  `ANSI/TIA-568.2-D` from a would-be `568.2` — `568.2-C` and `568.2-D`
  are two documents, and the label keeps them apart.
- **The `ans` stage does not print.** A record whose typed stage is the
  American National Standard itself omits the stage segment; only a
  draft stage prints.
- **ASHRAE- and IES-published designations route away.** `ANSI/ASHRAE
  90.1-2019` parses as an ASHRAE identifier and emits the ASHRAE scheme
  (`urn:ashrae:90.1:2019:standard:copub.ansi/ashrae`); 2 of the 196
  corpus rows carry the historical `urn:ansi-ashrae:` form and now emit
  there.

## Status in PubID

The PubID `ansi` flavor emits this `urn:ansi:` scheme on `to_urn`
today. The URN-scheme audit over ≤400 sampled pass ids gives 192 ids,
136 round-trip — the rest carry a co-publisher or a part that the
inverse parser does not read; the corpus is 196 rows, every one parses
and every one emits.

The universal `urn:pubid:ansi:` scheme is the fleet's lossless form:
the positional core is the number, the `_type` tokens are `std`
(standard), `ans` (American National Standard) and `id`, and the atoms
carry the publisher, co-publishers, type, part, subpart, year, the date
group, edition, stage, iteration, language and location — a component
maps through its identifying field only, and a value in a registry
field it does not place raises rather than enters the URN. A trailing
`-YYYY` is the year (relaton#45): `ANSI 802.3-2012` is
`urn:pubid:ansi:std:802.3:pub-ANSI:part-2012`, the dash a spelling
facet — cutting the facet group gives the URN of `ANSI 802.3:2012`, the
same document. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ASHRAE URN scheme (urn:ashrae)](/specs/ashrae-urn), [ASTM URN scheme (urn:astm)](/specs/astm-urn)
- [URN Mapping Overview](/concepts/urn)
- [ANSI publisher page](/publishers/ansi)
