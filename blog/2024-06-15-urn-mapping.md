---
title: URN Mapping — Machine-Readable Identifiers for Every Standard
date: 2024-06-15
author: PubID Team
---

# URN Mapping — Machine-Readable Identifiers for Every Standard

Every PubID can be mapped to a canonical **URN (Uniform Resource Name)**, providing a stable, location-independent identifier suitable for machine interchange. Here's how it works.

## What are URNs?

URNs are defined by [RFC 8141](https://www.rfc-editor.org/rfc/rfc8141) and follow the pattern `urn:[namespace]:[specific-string]`. Unlike URLs, URNs don't point to a location — they provide a persistent name for a resource.

## PubID URN Patterns

Each publisher maps their PubID to a URN using a namespace and format specific to their schema.

### ISO

```
ISO 9001:2015 → urn:iso:std:iso:9001:ed-5:en
ISO/IEC 17031-1:2020 → urn:iso:std:iso-iec:17031:-1:ed-1
ISO 9001:2015/Amd 1:2024 → urn:iso:std:iso:9001:ed-5:amd:1:v1
```

### IEC

```
IEC 61131-3:2013 → urn:iec:std:iec:61131:-3:ed-3
IEC 60050-111/AMD1/FRAG1 ED2 → urn:iec:std:iec:60050:111:ed-2:amd:1:frag:1
```

### IEEE

```
IEEE Std 802.3-2018 → urn:ieee:std:802.3-2018
```

## Round-Trip Guarantee

PubIDs are designed for round-trip fidelity in both human-readable and URN formats:

```
Input:  "ISO 9001:2015"
  → Parse → Object → Render (PubID) → "ISO 9001:2015"  ✓
  → Parse → Object → Render (URN)   → "urn:iso:std:iso:9001:ed-5:en"  ✓
```

This means you can convert between PubID string and URN representation without losing information.

## Benefits

1. **Machine interchange** — Systems can exchange identifiers in a standardized format
2. **Resolution** — URNs can serve as keys for identifier resolution services
3. **Uniqueness** — URNs provide globally unique, collision-free identifiers
4. **Stability** — URNs are location-independent and persist regardless of where documents are hosted

## Using URNs in the Library

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")
id.to_urn  # => "urn:iso:std:iso:9001:ed-5:en"

id = Pubid::Iec.parse("IEC 61131-3:2013")
id.to_urn  # => "urn:iec:std:iec:61131:-3:ed-3"
```

## Learn More

- [URN Mapping reference](/concepts/urn) — Full URN patterns and examples
- [Try the playground](/) — See URN output in real time
- [API Reference](/library/api) — `to_urn` and other serialization methods
