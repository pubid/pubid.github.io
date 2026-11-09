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
urn:iso:std:iso[:copublisher]:[number][:supplement ...]
```

| PubID | URN |
|-------|-----|
| `ISO 9001:2015` | `urn:iso:std:iso:9001` |
| `ISO/IEC 17031-1:2020` | `urn:iso:std:iso-iec:17031:-1` |
| `ISO 9001:2015/Amd 1:2024` | `urn:iso:std:iso:9001:amd:1:2024:v1` |

The ISO URN grammar (RFC 5141-bis) carries no year or language — the
official form is lossy by design.

### IEC

```
urn:iec:std:iec[:copublisher]:[number][:edition][:supplement ...]
```

| PubID | URN |
|-------|-----|
| `IEC 61131-3:2013` | `urn:iec:std:iec:61131-3:2013:::` |
| `IEC 60050-111/AMD1/FRAG1 ED2` | `urn:iec:std:iec:60050-111:::ed-2:::amd:1:` |

### IEEE

```
urn:ieee:ieee:[number]:[year]
```

### NIST

```
urn:nist:[type]:[number]:[revision]
```

| PubID | URN |
|-------|-----|
| `NIST SP 800-53 Rev. 5` | `urn:nist:sp:800-53. Rev. 5.supp` |
| `NIST SP 800-57 Part 1 Rev. 4` | `urn:nist:sp:800-57. Rev. 4.pt1.supp` |

NIST also defines a **machine-readable (MR) style** used as the DOI suffix: `NIST.SP.800-53A` maps to `https://doi.org/10.6028/NIST.SP.800-53A`.

### OIML

```
urn:oiml:pub:[type]:[number]:[year]
```

## Round-Trip Guarantee

PubIDs are designed for **round-trip fidelity**: parse a string, serialize it back, and get identical output. This applies to the human-readable PubID string and — by contract, corpus-wide — to the **pubid-scheme URN** (`urn:pubid:…`). Official URNs follow each organization's registered grammar and may be lossy (the ISO URN grammar carries no year, so `ISO 9001:2015` renders `urn:iso:std:iso:9001`); some flavors' official forms still carry legacy quirks. The always-round-trip machine form is the [pubid URN scheme](/library/pubid-urn-scheme):

```
Input:  "ISO 9001:2015"
  ↓ Parse
Object: { publisher: "ISO", number: "9001", year: 2015 }
  ↓ Render (PubID)
Output: "ISO 9001:2015"  ✓ identical
  ↓ Render (pubid-scheme URN)
URN:    "urn:pubid:iso:is:9001:year-2015"  ✓ round-trips by value
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
```

## Benefits of URN Mapping

1. **Machine interchange** — Systems can exchange identifiers in a standardized format
2. **Resolution** — URNs can be used for identifier resolution services
3. **Uniqueness** — URNs provide globally unique identifiers
4. **Stability** — URNs are location-independent and persist over time

## Implementation

The PubID Ruby library generates URNs through the `to_urn` method, and the
round-trippable pubid-scheme URN through `to_pubid_urn`:

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")
id.to_urn        # => "urn:iso:std:iso:9001"
id.to_pubid_urn  # => "urn:pubid:iso:is:9001:year-2015"
Pubid.to_slug(id)  # => "iso/is/9001/year-2015"
```

## See Also

- **[URN Specifications](/specs/)** — Full ABNF grammar and reference documentation for ISO (RFC 5141-bis) and IEC URN namespaces
- **[The pubid URN Scheme](/library/pubid-urn-scheme)** — the round-trippable `urn:pubid:` scheme and the slug form
- [The Metaschema](/concepts/metaschema)
- [Common Elements](/concepts/components)
- [Library Quick Start](/library/quick-start)
