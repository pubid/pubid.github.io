---
title: "URN Specifications"
---

# URN Specifications

Every PubID maps to a canonical URN (Uniform Resource Name) for machine interchange. These specifications define the URN namespaces for each standards publisher.

## Published Specifications

| Specification | Namespace ID | Status |
|---|---|---|
| [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn) | `urn:iso:std:` | Supersedes RFC 5141 |
| [IEC URN Specification](/specs/iec-urn) | `urn:iec:std:` | Based on IEC URI Model (2020) |
| [IEEE URN scheme (urn:ieee:std)](/specs/ieee-urn) | `urn:ieee:std:` | RFC 8069 (February 2017) |
| [ETSI URN scheme (urn:etsi)](/specs/etsi-urn) | `urn:etsi:` | RFC 8515 (February 2018) |
| [ITU URN scheme (urn:itu)](/specs/itu-urn) | `urn:itu:` | IANA formal URN namespace template |
| [IETF URN scheme (urn:ietf:rfc)](/specs/ietf-urn) | `urn:ietf:rfc:` | RFC 2648 (August 1999) |
| [CCSDS URN scheme (urn:ccsds)](/specs/ccsds-urn) | `urn:ccsds:` | RFC 7738 (January 2016) |
| [IALA URN scheme (urn:mrn:iala)](/specs/iala-urn) | `urn:mrn:iala:` | R1023 (Normative) Ed 1.0, G1143 Ed 3.1, G1164 Ed 1.1 |
| [IHO URN scheme (urn:mrn:iho)](/specs/iho-urn) | `urn:mrn:iho:` | S-100WG4 MRN Guidelines for IHO (2019) |

## Reference Documents

- [RFC 5141 — A URN Namespace for ISO](https://www.rfc-editor.org/rfc/rfc5141) (original, superseded by RFC 5141-bis)
- [RFC 2141 — URN Syntax](https://www.rfc-editor.org/rfc/rfc2141)

## About These Specifications

These URN specifications are maintained as part of the PubID project. Each specification defines:

- The **ABNF grammar** for the Namespace Specific String (NSS)
- **Element descriptions** for each URN component
- **Examples** covering basic identifiers, supplements, stages, and languages
- **Uniqueness and persistence** considerations
- **Resolution** mechanisms
- **Gap analysis** against prior specifications (where applicable)

The ISO and IEC specifications are authored in AsciiDoc and rendered on this site using Asciidoctor; the per-flavor URN scheme pages (IALA, IHO, IEEE, ETSI, ITU, IETF and CCSDS) are reference pages in Markdown. Source files are available in the [PubID repository](https://github.com/pubid/pubid/tree/main/references).

## Implementation

The PubID Ruby library implements URN generation and parsing for all supported publishers:

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")
id.to_urn        # => "urn:iso:std:iso:9001"
id.to_pubid_urn  # => "urn:pubid:iso:is:9001:year-2015"
```

## See Also

- [URN Mapping Overview](/concepts/urn)
- [Library Documentation](/library/)
- [Playground](/)
