---
title: Understanding PubID Algebra — How Standards Documents Relate
date: 2024-03-01
author: PubID Team
---

# Understanding PubID Algebra — How Standards Documents Relate

Standards documents don't exist in isolation. They have relationships: amendments modify base standards, corrigenda fix errors, standards come in multiple parts, and one publisher may adopt another's standard. **PubID algebra** gives these relationships formal structure.

## Why Algebra Matters

Without a formal model of identifier relationships:

- You can't programmatically find all amendments to a standard
- You can't determine that `ISO 9001:2015/Amd 1:2024` is a supplement to `ISO 9001:2015`
- You can't identify adopted standards like `BS ISO 9001:2015` as British Standard's adoption of the ISO original
- You can't bundle related documents for procurement or reference

## The Core Relations

### Amendment

An amendment **modifies** a base standard by adding, changing, or deleting specified elements.

| Publisher | Example |
|-----------|---------|
| ISO | `ISO 9001:2015/Amd 1:2024` |
| IEC | `IEC 61131-3:2013/AMD1:2019` |
| CEN | `EN 196-3:2005+A1:2008` |

### Corrigendum

A corrigendum **corrects** technical or editorial errors without adding new content.

| Publisher | Example |
|-----------|---------|
| ISO | `ISO 9001:2015/Cor 1:2016` |
| IEC | `CISPR 16-1-3:2004/COR1:2006` |

### Part

Multi-part standards are **related** through part numbers.

| Publisher | Example |
|-----------|---------|
| ISO/IEC | `ISO/IEC 17031-1:2020` (Part 1) |
| IEEE | `IEEE Std 802.3-2018` |

### Adoption

One publisher may **adopt** another's standard, often with national modifications.

| Publisher | Example |
|-----------|---------|
| BSI | `BS ISO 9001:2015` (UK adoption of ISO) |
| CEN | `EN ISO 13485:2016` (European adoption of ISO) |
| CSA | `CAN/CSA-ISO 9001:2016` (Canadian adoption) |

### Consolidated

A consolidated version incorporates all amendments into the base standard.

| Publisher | Example |
|-----------|---------|
| IEC | `IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV` |
| CEN | `EN 196-3:2005+A1:2008` |

## Implementation

In the PubID Ruby library, algebraic relations are modeled as first-class objects:

```ruby
# Parse an identifier with a supplement
id = Pubid::Iso.parse("ISO 9001:2015/Amd 1:2024")

# Access the supplement
id.supplement  # => Amendment object

# Parse an adopted standard
id = Pubid::Bsi.parse("BS ISO 9001:2015")
id.adoption  # => The adopted ISO identifier
```

## Learn More

- [PubID Algebra reference](/concepts/algebra) — All relation types with examples
- [Browse publishers](/publishers/) — Per-publisher algebra support
- [Library Quick Start](/library/quick-start) — Start parsing identifiers
