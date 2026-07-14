---
---

<script setup>
</script>

# URN Specifications

Every PubID maps to a canonical URN (Uniform Resource Name) for machine interchange. These specifications define the URN namespaces for each standards publisher.

## Published Specifications

| Specification | Namespace ID | Status |
|---|---|---|
| [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn) | `urn:iso:std:` | Supersedes RFC 5141 |
| [IEC URN Specification](/specs/iec-urn) | `urn:iec:std:` | Based on IEC URI Model (2020) |

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

The specifications are authored in AsciiDoc and rendered on this site using Asciidoctor. Source files are available in the [PubID repository](https://github.com/metanorma/pubid/tree/main/references).

## Implementation

The PubID Ruby library implements URN generation and parsing for all supported publishers:

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")
id.to_urn  # => "urn:iso:std:iso:9001:ed-5:en"

id = Pubid::Iec.parse("IEC 61131-3:2013")
id.to_urn  # => "urn:iec:std:iec:61131:-3:ed-3"
```

## See Also

- [URN Mapping Overview](/concepts/urn)
- [Library Documentation](/library/)
- [Playground](/)
