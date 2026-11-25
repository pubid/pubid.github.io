---
title: "EU URN scheme (urn:eu)"
description: "The PubID-invented URN form the EU flavor emits on to_urn — the European Union has no URN namespace in the IANA registry, and its official identifier is the ELI (http://data.europa.eu/eli/…), not any URN; the urn:eu: form is the fleet's own convenience shape, attested across the 15-row corpus."
---

# EU URN scheme (urn:eu)

The European Union publishes no URN rule for its legal acts and has no
URN namespace in the IANA registry. More than that: **the EU already
has an official machine identifier, and it is not a URN.** The ELI —
European Legislation Identifiers (`http://data.europa.eu/eli/reg/2011/1227/oj`)
— is the identifier the EU's own publication system (CELLAR, EUR-Lex)
assigns and resolves, and the `eu` flavor gives it back on `#to_eli`.
The `urn:eu:` form documented here is the PubID fleet's own
convenience shape — the emission of the flavor's `to_urn`, carrying no
round-trip promise and no official standing. Per the fleet's
dual-identifier ruling, the ELI is the official form and this page
says so plainly: if you need the act's identifier as the EU defines
it, use the ELI; use `urn:eu:` only where a URN-shaped token is
required. The fleet's lossless form is the universal
`urn:pubid:eu:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `eu` — **not IANA-registered**; the PubID `eu` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an EU assignment. **The EU's assigning authority lives on the ELI**: `data.europa.eu` (the Publications Office) assigns and resolves ELI identifiers |
| Governing guidance | none published for `urn:eu:`; the ELI is governed by the EU's own ELI specification (Council conclusions of 2015 and the Publications Office's ELI implementation) |
| Registry context | the ELI (`http://data.europa.eu/eli/{reg|dir|dec}/<year>/<number>[/oj]`) is the official identifier — CELEX (`32011R1227`) is the legacy one; `urn:eu:` is neither |

## Scheme structure

Every URN carries the `urn:eu:` lead, the ELI act type, the year and
the number — the CELEX and ELI order, whatever order the act prints
in:

```
urn:eu:<reg|dir|dec>:<year>:<number>
```

| Segment | Content | Notes |
|---|---|---|
| `<reg\|dir\|dec>` | the legal act type — the ELI segment | `reg` (Regulation, CELEX letter R), `dir` (Directive, letter L), `dec` (Decision, letter D); the type rides in the URN so a regulation and a decision with the same numbers do not collide |
| `<year>` | the act year, first | `2011`, `2016` — the CELEX and ELI order, even when the print is `<number>/<year>` (`1227/2011` → `2011:1227`) |
| `<number>` | the act number | `1227`, `680`, `87` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:eu:reg:2011:1227` | EU Regulation 1227/2011 — ELI `http://data.europa.eu/eli/reg/2011/1227/oj` | attested in the pubid corpus (15 rows) |
| `urn:eu:reg:2016:679` | EU Regulation 2016/679 | attested in the pubid corpus |
| `urn:eu:dir:2016:680` | EU Directive 2016/680 | attested in the pubid corpus |
| `urn:eu:dec:2010:87` | EU Decision 2010/87 | attested in the pubid corpus |
| `urn:eu:reg:2014:2015` | EU Regulation No 2015/2014 | attested in the pubid corpus — the number-first print normalizes to the year-first URN (`32014R2015` renders with `No` so it parses back to itself) |
| `urn:eu:reg:2006:1907` | EU Regulation 1907/2006 | attested in the pubid corpus — the pre-2015 number-first print |

## Rules that apply to every EU URN

- **The ELI is the official identifier; this scheme is not.** The EU's
  Publications Office assigns and resolves ELIs; `urn:eu:` is a
  pubid-invented convenience shape with no registration and no
  resolution infrastructure. Nothing about it is authoritative.
- **The lead is fixed.** `urn:eu:` carries the private namespace.
- **The act type is a segment.** `reg`/`dir`/`dec` — the ELI segment
  words — keep a regulation and a decision that share year and number
  from colliding.
- **The order is year-first, always.** Both numbers normalize to the
  CELEX/ELI order; a pre-2015 regulation printed `1227/2011` still
  emits `2011:1227`.
- **The legal family never enters.** `(EU)`, `(EC)`, `(Euratom)` are
  print faces; the universal scheme carries the family as an atom, this
  one drops it.
- **The scheme identifies the act type + year + number, nothing more.**
  The subtype of an implementing regulation (`reg_impl`) and the
  number-order flag are spelling; the universal scheme carries them as
  facets, this one drops them.

## Status in PubID

The PubID `eu` flavor emits this `urn:eu:` scheme on `to_urn` today,
and gives the official identifiers back on `#to_celex` and `#to_eli`.
The corpus is 15 rows, every one parses and every one emits. (On the
pubid side, 28 of 35 full-id fixture rows parse — the 7 failures are
deliberately rejected oddities: a bare number, a pair with no year, two
two-digit-year acts, two conflicting families, a year-0000 CELEX and an
unknown ELI subtype.)

The universal `urn:pubid:eu:` scheme is the fleet's lossless form: the
year and the number are the positional core (year first, the CELEX and
ELI order), the `_type` tokens are `reg`, `dir` and `dec`, the legal
family is the `family-` atom, and the spelling-only facets are
`numberfirst-` (the print order when it differs from the default rule)
and `subtype-` (the ELI type subtype `impl`/`del`/`financ` of a
`reg_impl`-style ELI) — `EU Decision 1082/2013` in its number-first
spelling is `urn:pubid:eu:dec:2013:1082:f:0.numberfirst-true`. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [URN Mapping Overview](/concepts/urn)
- [EU publisher page](/publishers/eu)
