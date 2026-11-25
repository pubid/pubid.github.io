---
title: "OMG URN scheme (urn:omg)"
description: "The degenerate URN form the OMG flavor emits on to_urn — the Object Management Group has no URN namespace in the IANA registry and the flavor defines no generator of its own, so the shared base emits the bare urn:omg; the pubid scheme carries the identity, attested across the 21-row corpus."
---

# OMG URN scheme (urn:omg)

OMG (the Object Management Group — UML, SysML, CORBA, DDS) has no URN
namespace in the IANA registry and publishes no URN rule for its
specifications. The form documented here is therefore the PubID
fleet's own — and it is the one scheme in the fleet with **no
generator of its own**: the `omg` flavor defines no `UrnGenerator`, so
the shared base generator emits the namespace and nothing else. The
result is degenerate: `OMG AMI4CCM 1.0`, `OMG CORBA` and `OMG UML
2.5.1` all emit the bare `urn:omg`, and a version or document-part
marker surfaces as a stray dash segment (`urn:omg:-PDF`). Nothing
round-trips — by design this scheme identifies nothing beyond the
publisher — and the flavor's identity lives entirely in the universal
`urn:pubid:omg:` scheme, which is what the Status section below
covers.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `omg` — **not IANA-registered**; the PubID `omg` flavor's private namespace |
| Assigning authority | none — the form is the shared base generator's emission, not an OMG assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it (the bare `urn:omg` is a legal URN with an empty NSS only by the fleet's own reading — it identifies no document) |
| Registry context | none; OMG specifications carry the `OMG <Acronym>[ <Version>]` designations (`OMG UML 2.5.1`, `OMG DDS 5 beta 3`) |

## Scheme structure

Every URN is the bare namespace, plus — when the record carries a
part-like marker — a dash-prefixed stray segment:

```
urn:omg[:-<part>]
```

| Segment | Content | Notes |
|---|---|---|
| (namespace only) | the whole emission for most records | `OMG AMI4CCM 1.0`, `OMG CORBA`, `OMG UML 2.5.1` all emit `urn:omg` — the acronym and version never enter |
| `-<part>` | a document-part marker, dash-prefixed | `OMG DDS 1.4 PDF` emits `urn:omg:-PDF`, `OMG UML 2.1.1 Infrastructure` emits `urn:omg:-Infrastructure` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:omg` | OMG AMI4CCM 1.0 | attested in the pubid corpus (21 rows) — every specification without a part marker carries the same URN |
| `urn:omg` | OMG CORBA | attested in the pubid corpus — the same URN as AMI4CCM 1.0 |
| `urn:omg:-PDF` | OMG DDS 1.4 PDF | attested in the pubid corpus — the PDF marker is the only distinguishing segment |
| `urn:omg:-Infrastructure` | OMG UML 2.1.1 Infrastructure | attested in the pubid corpus |
| `urn:omg` | OMG UML 2.5.1 | attested in the pubid corpus |

## Rules that apply to every OMG URN

- **The flavor defines no generator.** `omg` is the one flavor whose
  `to_urn` is the shared base emission untouched — the base joins
  `urn`, the namespace, and whatever stray parts fall through.
- **The acronym never enters.** The one fact that names an OMG
  specification is not in the URN.
- **The version never enters.** `1.0` and `2.5 beta` are print states
  as far as this emission is concerned.
- **Nothing round-trips.** The audit gives 21 ids, 0 round-trip, 0
  reshape, 21 that do not re-parse, 0 raise, 0 empty, and 2 colliding
  URNs — the whole corpus maps onto two URNs.
- **The scheme identifies the publisher, nothing more.** `urn:omg`
  says "an OMG specification" and stops; matching a document is the
  pubid face's job, not the URN's.

## Status in PubID

The PubID `omg` flavor emits this degenerate `urn:omg` form today, and
the audit's numbers above say what it is worth. The **pubid scheme
covers the flavor**: `urn:pubid:omg:` has no positional core — an OMG
specification names itself by its acronym — the `_type` tokens are `id`
and `spec`, and the atoms carry the acronym (`acronym-`), the version
(`v-`) and the part (`part-`): `OMG AMI4CCM 1.0` is
`urn:pubid:omg:spec:acronym-AMI4CCM:v-1.0`. That scheme is the only
machine form of an OMG identifier worth interchanging; landed with
issue #670 as drafted. See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [URN Mapping Overview](/concepts/urn)
- [OMG publisher page](/publishers/omg)
