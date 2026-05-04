---
title: What is PubID? A Universal Language for Standards Identifiers
date: 2024-01-15
author: PubID Team
---

# What is PubID? A Universal Language for Standards Identifiers

Every standards document has an identifier — but every publisher uses a different format. ISO writes `ISO 9001:2015`. IEEE writes `IEEE Std 802.3-2018`. NIST writes `NIST SP 800-53 Rev. 5`. These identifiers carry rich semantic meaning, but that meaning is locked in format-specific syntax that only humans can interpret.

**PubID** changes that.

## The Problem

Consider what happens when you need to:

- **Search** across standards from multiple publishers
- **Link** an IEEE standard to the ISO standard it references
- **Track** amendments and corrigenda across different publishers
- **Exchange** identifier data between different systems

Each publisher has their own conventions, their own syntax, and their own edge cases. There's no universal parser, no universal format, and no universal way to relate identifiers from different publishers.

## The Solution: A Metaschema

PubID defines a **metaschema** — a formal schema that describes the common elements of any publication identifier:

- **Publisher** — Who issued the document
- **Document Type** — What kind of document it is (Standard, Report, Guide, etc.)
- **Number** — The unique identifier number
- **Year** — When it was published
- **Part** — For multi-part standards
- **Stage** — Where it is in the development lifecycle
- **Supplement** — Amendments, corrigenda, and addenda

Each publisher then defines their own schema using this metaschema, specifying which elements they use, their allowed values, and how they combine syntactically.

## Round-Trip Fidelity

A core design principle of PubID is **round-trip fidelity**: parse an identifier string, decompose it into structured components, and re-render it back to get **identical output**. No information is lost in the transformation.

```ruby
id = Pubid::Iso.parse("ISO 9001:2015")
id.to_s  # => "ISO 9001:2015"  (identical to input)
id.to_urn  # => "urn:iso:std:iso:9001:ed-5:en"
```

## 23+ Publishers and Growing

PubID currently supports 23+ publishers including ISO, IEC, IEEE, NIST, BSI, CEN, ETSI, ITU, ASTM, ASHRAE, and more. Each publisher has a dedicated parser, renderer, and URN generator.

## Get Involved

PubID is open source. You can:

- [Browse all supported publishers](/publishers/)
- [Learn how the metaschema works](/concepts/metaschema)
- [Try the interactive playground](/)
- [Contribute on GitHub](https://github.com/pubid/pubid)
