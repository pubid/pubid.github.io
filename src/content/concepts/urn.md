---
title: "URN Mapping"
description: "A PubID concept."
---

# URN Mapping

Every PubID can be mapped to a canonical **URN (Uniform Resource Name)** for machine interchange. URNs provide a stable, location-independent identifier.

## What is a URN?

A URN is a standardized identifier syntax defined by [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141). URNs follow the pattern:

```
urn:[namespace]:[specific-string]
```

## PubID URN Patterns

Each publisher maps their PubID syntax to a URN following their specific pattern:

### ISO

```
urn:iso:std:iso[:copublisher]:[number]:[edition]:[language]
```

| PubID | URN |
|-------|-----|
| `ISO 9001:2015` | `urn:iso:std:iso:9001:ed-5:en` |
| `ISO/IEC 17031-1:2020` | `urn:iso:std:iso-iec:17031:-1:ed-1` |
| `ISO 9001:2015/Amd 1:2024` | `urn:iso:std:iso:9001:ed-5:amd:1:v1` |

### IEC

```
urn:iec:std:iec[:copublisher]:[number]:[edition]:[language]
```

| PubID | URN |
|-------|-----|
| `IEC 61131-3:2013` | `urn:iec:std:iec:61131:-3:ed-3` |
| `IEC 60050-111/AMD1/FRAG1 ED2` | `urn:iec:std:iec:60050:111:ed-2:amd:1:frag:1` |

### IEEE

```
urn:ieee:std:[number]:[year]
```

### NIST

```
urn:nist:pub:[type]:[number]:[revision]
```

| PubID | URN |
|-------|-----|
| `NIST SP 800-53 Rev. 5` | `urn:nist:pub:sp:800-53:r5` |
| `NIST SP 800-57 Part 1 Rev. 4` | `urn:nist:pub:sp:800-57:pt1:r4` |

NIST also defines a **machine-readable (MR) style** used as the DOI suffix: `NIST.SP.800-53A` maps to `https://doi.org/10.6028/NIST.SP.800-53A`.

### OIML

```
urn:oiml:pub:[type]:[number]:[year]
```

## Round-Trip Guarantee

PubIDs are designed for **round-trip fidelity**: parse a string, serialize it back, and get identical output. This applies to both human-readable PubID strings and URN representations.

```
Input:  "ISO 9001:2015"
  ↓ Parse
Object: { publisher: "ISO", number: "9001", year: 2015, edition: 5 }
  ↓ Render (PubID)
Output: "ISO 9001:2015"  ✓ identical
  ↓ Render (URN)
URN:    "urn:iso:std:iso:9001:ed-5:en"
```

This same principle applies across all output formats. For NIST, a single identifier can round-trip through four distinct styles:

```
Input:  "NIST SP 800-53A"
  ↓ Parse
Object: { publisher: "NIST", type: "SP", number: "800-53A" }
  ↓ Render (Short)
Output: "NIST SP 800-53A"  ✓
  ↓ Render (Full)
Output: "National Institute of Standards and Technology Special Publication 800-53A"
  ↓ Render (MR/DOI)
Output: "NIST.SP.800-53A"
  ↓ Render (URN)
URN:    "urn:nist:pub:sp:800-53a"
```

## Benefits of URN Mapping

1. **Machine interchange** — Systems can exchange identifiers in a standardized format
2. **Resolution** — URNs can be used for identifier resolution services
3. **Uniqueness** — URNs provide globally unique identifiers
4. **Stability** — URNs are location-independent and persist over time

## Implementation

The PubID Ruby library generates URNs through the `to_urn` method:

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")
id.to_urn  # => "urn:iso:std:iso:9001:ed-5:en"

id = Pubid::Iec.parse("IEC 61131-3:2013")
id.to_urn  # => "urn:iec:std:iec:61131:-3:ed-3"
```

## See Also

- **[URN Specifications](/specs/)** — Full ABNF grammar and reference documentation for ISO (RFC 5141-bis) and IEC URN namespaces
- [The Metaschema](/concepts/metaschema)
- [Common Elements](/concepts/components)
- [Library Quick Start](/library/quick-start)
