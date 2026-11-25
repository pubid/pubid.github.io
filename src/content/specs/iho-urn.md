---
title: "IHO URN scheme (urn:mrn:iho)"
description: "The Maritime Resource Name scheme of the International Hydrographic Organization — publication and product MRNs under urn:mrn:iho, adopted from the S-100WG4 MRN Guidelines for IHO (2019)."
---

# IHO URN scheme (urn:mrn:iho)

IHO names its publications and data products in the `mrn` URN namespace as
assigning authority `iho`, under the IHO MRN guidance adopted by the
S-100WG4 ("MRN Guidelines for IHO", February 2019). The `mrn` namespace
itself was developed by IALA on the URI syntax of RFC 3986 and is governed
by IALA through mrnregistry.org; IHO has been granted the
`urn:mrn:iho` branch, and S-100 4.0.0 (clauses 3-10 and 11-7.4) names the
MRN as the recommended Globally Unique Identifier (GUID) for IHO data.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `mrn` (IANA-registered, formal template `mrn`) |
| Assigning authority | `iho` (managed by the IHO Secretariat on behalf of IHO) |
| Governing guidance | S-100WG4 "MRN Guidelines for IHO", 27 February – 1 March 2019 |
| Registry context | mrnregistry.org (IALA); MRN recommended in S-100 4.0.0 (3-10, 11-7.4) |

## Publication MRNs

IHO publications (standards, specifications and other published works)
carry a `pub` namespace followed by the distinguishing characteristics of
the individual publication:

```
urn:mrn:iho:pub:<type>:<name-or-number>:<edition>[:<correction>[:<clarification>][:<additional>]]
```

| Segment | Content | Notes |
|---|---|---|
| `pub` | fixed namespace for publications | literal |
| `<type>` | publication type code | see the type table below |
| `<name-or-number>` | publication name or number, lowercased | standards use the lowercase name form `sNNN` (e.g. `s57`, `s98`, `s158`) |
| `<edition>` | edition number | dotted three-part form `x.y.z` is the form IHO itself prints (see examples) |
| `<correction>` | correction number | optional |
| `<clarification>` | clarification number | optional |
| `<additional>` | additional version information | optional; may carry further namespaces as per need |

### Publication type codes

| Code | Publication type |
|---|---|
| `bathy` | Bathymetric Publications |
| `cb` | Capacity Building Publications |
| `reg` | Miscellaneous (Base Regulatory Publications) |
| `per` | Periodic Publications |
| `spec` | Standards and Specifications — IHO standards and specifications, including the whole S-series |

### Examples

| MRN | Names | Attestation |
|---|---|---|
| `urn:mrn:iho:pub:spec:s57:3:1:supplement3` | S-57, edition 3, correction 1, supplement 3 | the worked example of the S-100WG4 guidance |
| `urn:mrn:iho:pub:spec:s98:1.0.0` | S-98 Main Ed 1.0.0 | printed in the metadata block of S-98 Ed 1.0.0 — IHO's own precedent for the dotted edition |
| `urn:mrn:iho:pub:spec:s158:1.0.0` | S-158 (Validation Checks — Introduction and Structure), Ed 1.0.0 | the S-158 framework publication; lands with the S-158 model (pubid#774) |
| `urn:mrn:iho:pub:spec:s158-102:1.0.0` | S-158:102 (validation checks for S-102), Ed 1.0.0 | member publication of the S-158 series; lands with the S-158 model (pubid#774) |

**Compound publication numbers.** The S-158 series is a framework
publication defining a series of separate check specifications, each named
by the official IHO product number whose checks it specifies (`S-158:102`
specifies the validation checks for the S-102 product). In the MRN, the
member number hyphenates into the name segment (`s158-102`) rather than
becoming a separate segment, so the edition keeps its canonical fourth
colon-position after `urn:mrn:iho:pub`. This is the PubID extension of the
guidance for compound publication numbers; it lands with the S-158 model
(pubid#774).

## Product MRNs

IHO data products (datasets and product instances) use the `prod`
namespace, so that the MRN clearly reveals it names a product:

```
urn:mrn:iho:prod:<product name>:<edition number>:<correction number>:<clarification number>[:<information about related specification>]
```

| MRN | Names | Attestation |
|---|---|---|
| `urn:mrn:iho:prod:s64tds:3:0:1:unencrypted:powerup` | S-64 ENC test dataset version 3.0.1, unencrypted, power-up check | the worked example of the S-100WG4 guidance |
| `urn:mrn:iho:prod:int3:3.5:19000` | IHO INT3 version 3.5, Lowesmouth to Port Rimon panel | the worked example of the S-100WG4 guidance |

The final segment may carry additional information about the related
specification as per need. The MRN of a product specification is included
in the specification itself, and a public location lists the MRNs of the
IHO product specifications.

## Rules that apply to every IHO MRN

- **Length.** The MRN specification sets no length limit, but MRN length
  adds to the byte size of every dataset that carries it. The `urn:mrn:iho`
  prefix is 11 bytes; the recommended maximum length of an IHO MRN is
  **128 bytes** (hard limit).
- **Persistence.** MRN GUIDs are preserved throughout an object's lifetime —
  also when objects are reused in new products — for traceability and so
  that user systems can link instances of the same object across products.
- **Reserved codes.** Ranges of reserved codes (producer codes, product and
  publication codes) are established at IHO level for use during
  specification development; producer codes follow S-100WG3-6.4.

## Status in PubID

The PubID `iho` flavor adopts this scheme as the IHO URN scheme; the
S-158 series model (framework publication plus `s158-NNN` member check
specifications) lands with the S-158 model (pubid#774). Before the MRN
adoption, PubID emitted a positional scheme (`urn:iho:<series>:<number>:…`,
e.g. `urn:iho:s:98:ed-1.0.0`) on `to_urn` — that shape is unattested in
IHO publications and migrates away in favour of the `urn:mrn:iho` scheme
documented here.

## See Also

- [IALA URN scheme (urn:mrn:iala)](/specs/iala-urn) — the sibling maritime MRN scheme
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [IHO publisher page](/publishers/iho)
