---
title: "ETSI URN scheme (urn:etsi)"
description: "The URN namespace of the European Telecommunications Standards Institute — urn:etsi per RFC 8515, which the PubID etsi flavor keeps on to_urn."
---

# ETSI URN scheme (urn:etsi)

ETSI (European Telecommunications Standards Institute) is the assigning
authority of the `etsi` URN namespace, registered with IANA by RFC 8515
(February 2018). The namespace names ETSI's published deliverables —
European Standards, Technical Reports, Technical Specifications, Special
and Group Specifications — and the PubID `etsi` flavor keeps its `to_urn`
on this scheme: the document's type, number, version and date spell the
URN exactly as they spell the printed identifier.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `etsi` (IANA-registered, RFC 8515, February 2018) |
| Assigning authority | ETSI |
| Governing guidance | RFC 8515 (February 2018); URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry; ETSI publications carry the URN in their metadata |

## Scheme structure

```
urn:etsi:<type>:<code>:<version>:<date>
```

| Segment | Content | Notes |
|---|---|---|
| `<type>` | the deliverable type, lowercased | `en` (European Standard), `eg`, `etr` (Technical Report), `ets` (Telecommunication Standard), `ts` (Technical Specification), `tr`, `gs` (Group Specification); defaults to `en` when the identifier carries no type |
| `<code>` | the deliverable number, as printed | spacing kept: `300 053`, `101 377-3-8`, `MEC 026` |
| `<version>` | version or edition | printed `V1.5.1` lowercases to `v1.5.1`; the edition face prints `ed.1` — `ed.1` and `V1` are two documents |
| `<date>` | publication date | `YYYY-MM`, or `YYYY` when the month is absent |

A supplement follows its base document: the base's segments come first,
then the supplement notation and its ordinal. The amendment and
corrigendum faces (`/A1`, `/C1`) do not reach the URN today — their rows
emit the base document's naming with their own date
(`ETSI ETS 300 011/A2 ed.1 (1996-03)` → `urn:etsi:ets:300 011:ed.1:1996-03`).

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:etsi:en:300 831:v1.2.1:1999-10` | ETSI EN 300 831 V1.2.1 (1999-10) | attested in the pubid corpus (21,432 rows) |
| `urn:etsi:eg:200 053:v1.5.1:2004-06` | ETSI EG 200 053 V1.5.1 (2004-06) | attested in the pubid corpus |
| `urn:etsi:etr:145:ed.1:1994-10` | ETSI ETR 145 ed.1 (1994-10) | attested in the pubid corpus |
| `urn:etsi:ets:300 392-4-1:ed.1:1999-01` | ETSI ETS 300 392-4-1 ed.1 (1999-01) | attested in the pubid corpus |
| `urn:etsi:gs:MEC 026:v2.1.1:2019-01` | ETSI GS MEC 026 V2.1.1 (2019-01) | attested in the pubid corpus |
| `urn:etsi:tr:101 290:v1.4.1:2020-06` | ETSI TR 101 290 V1.4.1 (2020-06) | attested in the pubid corpus |
| `urn:etsi:ts:103 738:v1.4.1:2021-10` | ETSI TS 103 738 V1.4.1 (2021-10) | attested in the pubid corpus |

## Rules that apply to every ETSI URN

- **Type lowercased.** The printed type word (`EN`, `EG`, `ETR`, `GS` …)
  lowercases into the first segment; a type-less identifier defaults to
  `en`.
- **The code prints as printed.** The number segment keeps its printed
  spacing and part structure (`300 392-4-1`) — it is the ETSI deliverable
  number, not a compacted key.
- **Version and edition are distinct.** The `V`-prefixed version and the
  `ed.N` edition face are different documents; the URN keeps whichever the
  identifier carries, lowercased.
- **The date closes the URN.** The publication date comes last, as
  `YYYY-MM` or the bare year.

## Status in PubID

The PubID `etsi` flavor stays on this official scheme for `to_urn`. The
audit over 400 sampled pass ids gives 324 round-trip and 21 that do not
re-parse (55 raises came from the audit script, not the gem — see
pubid#656).

The universal `urn:pubid:etsi:` scheme carries the identifier exactly as
its model does: all 24,718 pass ids emit, round-trip by `to_hash`, are
path-safe, and give one URN each — no collision; the longest URN is 93
characters. Its atoms are `type-`, `part-` (a list), `minor-`, `year-`,
`month-`, `day-`, `v-` and the edition boolean `isedition-` (so `ed.1` and
`V1` stay two documents there too), and a supplement's ordinal serializes
with an integer core along its `base`. The parser accepts what the model
accepts: `urn:pubid:etsi:amd:1` builds an Amendment with no `base`, which
round-trips but whose `to_s` raises — the URN makes that object reachable;
it does not make it valid.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn), [ITU URN scheme (urn:itu)](/specs/itu-urn), [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn), [CCSDS URN scheme (urn:ccsds)](/specs/ccsds-urn)
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [ETSI publisher page](/publishers/etsi)
