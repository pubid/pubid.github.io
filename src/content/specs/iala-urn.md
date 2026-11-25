---
title: "IALA URN scheme (urn:mrn:iala)"
description: "The Maritime Resource Name scheme of IALA — urn:mrn:iala per R1023 (Normative), G1143 Unique Identifiers for Maritime Resources, and G1164 Management of MRN Organisation Identifiers."
---

# IALA URN scheme (urn:mrn:iala)

IALA (International Organization for Marine Aids to Navigation) owns the
Maritime Resource Name (MRN) — the URN namespace for the maritime domain
that IALA developed on the URN syntax of RFC 2141 and the URI syntax of
RFC 3986, obtained from IANA as a formal URN namespace (`mrn`). IALA
governs the namespace through its MRN registry and provides MRN domains
to other authorities; the IHO MRN scheme for its own namespace
(`urn:mrn:iho`) is built on this IALA scheme. IALA's own publication MRNs
print on the covers and page footers of its documents.

The scheme is defined by three authoritative documents, adopted together
by IALA Recommendation R1023 (Normative):

| Document | Title | Role |
|---|---|---|
| R1023 Ed 1.0 (June 2022) | Maritime Resource Names | the normative recommendation |
| G1143 Ed 3.1 | Unique Identifiers for Maritime Resources | the syntax and its areas of application |
| G1164 Ed 1.1 | Management of Maritime Resource Name Organisation Identifiers | the governance of organization identifiers |

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `mrn` (IANA-registered, formal template `mrn`) |
| MRN owner | IALA; the IALA Secretariat administers the namespace |
| Basis | RFC 2141 (URN syntax), RFC 3986 (URI), RFC 5234 (ABNF), RFC 8141 |
| Registry | IALA MRN registry website (mrnregistry.org) |

## Scheme structure

Every MRN has the form `urn:mrn:<OID>:<OSS>`, where `<OID>` is the
organization identifier (the governing organization) and `<OSS>` the
organization-specific namespace string:

```
<MRN> ::= "urn" ":" "mrn" ":" <OID> ":" <OSS>
<NSS> ::= <governing-organization> ":" <type> ":" <type-specific-part>
```

| Segment | Content | Rules |
|---|---|---|
| `mrn` | the namespace identifier | fixed; case-insensitive in processing, conventionally lowercase |
| `<OID>` | organization identifier | at least three lowercase alphanumeric characters; no RFC 2141 "reserved" characters; must not use ISO 3166-1 alpha-3 country codes |
| `<type>` | the area of application | assigned per governing organization (see the IALA namespace areas below) |
| `<type-specific-part>` | the identifier within the type namespace | defined by the responsible MRN authority |

MRNs are case-insensitive in processing and are conventionally written in
lowercase. The `int` governing organization is a reserved wildcard for
situations where no organization can be assigned; IALA does not recommend
it outside documentation, private testing and experimental contexts.

## Publication MRNs

Publications are one of the defined areas of application of the IALA
namespace (G1143 Annex A, section A4). The publication type namespace is
`pub`, and identifiers referenced outside the context of the publication
author use the prefixes:

```
urn:mrn:iala:pub:<managed name spaces>
urn:mrn:iala:pub:<ISO 3166 Code>:<managed name spaces>
```

The second form prefixes the ISO 3166-1 alpha-2 code of the country of
the publishing authority. The `<managed name spaces>` are defined by the
responsible MRN authority, which ensures their uniqueness within the
domain.

### Edition format

IALA's own publications carry their edition as a trailing `ed` segment.
The form printed on the covers and page footers of the authoritative
documents is `ed<x.y>` (a lowercase `ed` marker directly followed by the
dotted edition number):

| MRN | Names | Attestation |
|---|---|---|
| `urn:mrn:iala:pub:r1023:ed1.0` | R1023, Maritime Resource Names, Ed 1.0 | printed on the cover and page footers of R1023 Ed 1.0 |
| `urn:mrn:iala:pub:g1143:ed3.1` | G1143, Unique Identifiers for Maritime Resources, Ed 3.1 | printed in the page footers of G1143 Ed 3.1 |
| `urn:mrn:iala:pub:g1164:ed1.1` | G1164, Management of MRN Organisation Identifiers, Ed 1.1 | printed in the page footers of G1164 Ed 1.1 |
| `urn:mrn:iala:pub:g1143` | the publication with identifier `g1143` defined by IALA | the edition-less example of G1143 Annex A4 (example 1) |
| `urn:mrn:iala:pub:ca:cg:ramn:2018` | Radio Aids to Marine Navigation (`ramn`), issued by the Canadian Coast Guard (`cg`) in Canada (`ca`), year of issue 2018 | the country-prefixed example of G1143 Annex A4 (example 2) |

### Areas of application of the IALA namespace

The publication namespace is one of several type namespaces IALA defines
under `iala` (G1143 Annex A); each is reserved for description of its
area:

| Type namespace | Area | Annex A section |
|---|---|---|
| `aton` | Marine Aids to Navigation | A1 |
| `vts` | Vessel Traffic Services | A2 |
| `wwy` | Waterways | A3 |
| `pub` | Publications | A4 |
| `obj` | Object (reserved wildcard for an unknown or impractical type) | A5 |

## Organization identifier governance

G1164 defines how organization identifiers are assigned and managed:

- **Ownership.** IALA is the MRN Owner; the IALA Secretariat administers
  the namespace and adjudicates OID applications. OID owners administer
  the assignment of MRNs within their assigned OID.
- **Assignment.** Applications go to the IALA Secretariat (published via
  the IALA MRN registry website); IALA responds within 90 days, and an
  IALA National member sponsorship may be requested.
- **Permanence.** All OID assignments are permanent: an OID is never
  removed from use and subsequently re-assigned to another entity, and
  uniqueness within the MRN namespace is never violated.
- **Publication.** Assigned OIDs and their owner information are published
  through IALA websites or other means; OIDs must be widely available.
- **Format.** OIDs must contain a minimum of three lowercase alphanumeric
  characters, must not contain RFC 2141 "reserved" characters, and must
  not use ISO 3166-1 alpha-3 country codes.

## Status in PubID

The PubID `iala` flavor emits and parses these MRNs; its emission is being
revamped to this official scheme of the three authoritative documents
(pubid branch `iala/urn-revamp`). The flavor's pre-revamp emission named
coded publications by their zero-padded series code; the revamp aligns
emission and parsing with the official documents documented on this page.

## See Also

- [IHO URN scheme (urn:mrn:iho)](/specs/iho-urn) — the sibling maritime MRN scheme, built on this one
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [IALA publisher page](/publishers/iala)
