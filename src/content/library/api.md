---
title: "API Reference"
description: "PubID library documentation."
---

# API Reference

## Top-Level Methods

### `Pubid::{Flavor}.parse(string)`

Parse a publication identifier string into an identifier object.

```ruby
id = Pubid::Iso.parse("ISO 9001:2015")
id = Pubid::Iec.parse("IEC 61131-3:2013")
id = Pubid::Nist.parse("NIST SP 800-53 Rev. 5")
```

**Parameters:**
- `string` (String) — The identifier to parse

**Returns:** Identifier object (flavor-specific class)

**Raises:** `ParseError` if the identifier cannot be parsed

## Identifier Instance Methods

### `#to_s(**opts)`

Render the identifier as a canonical string.

```ruby
id = Pubid::Iso.parse("ISO 9001:2015")
id.to_s  # => "ISO 9001:2015"
```

**Options (varies by flavor):**
- `:lang` — Language for localized output
- `:with_edition` — Include edition number

### `#to_urn`

Generate a URN representation.

```ruby
id.to_urn  # => "urn:iso:std:iso:9001:ed-5:en"
```

### `#to_h`

Serialize to a Hash.

```ruby
id.to_h  # => { publisher: "ISO", number: "9001", ... }
```

### `#to_json`

Serialize to JSON.

```ruby
id.to_json  # => '{"publisher":"ISO","number":"9001",...}'
```

## Identifier Relations

Predicates that relate two identifiers. Each returns `true` or `false`; a
predicate that does not apply returns `false` rather than raising. Wrappers
(supplement bases, consolidated collections) compare through the document
they wrap.

| Predicate           | True when |
|---------------------|-----------|
| `supplement_of?`    | self is a supplement (amendment, corrigendum, …) whose base is the other identifier |
| `has_supplement?`   | the other identifier is a supplement of self |
| `dated_version_of?` | both are the same document differing only in date |
| `sibling_of?`       | same document, different part/subpart |
| `edition_of?`       | both are editions of the same document |
| `includes?`         | self is an "all parts" collection covering the other identifier |
| `draft_of?`         | self is a draft of the published identifier |
| `related_to?`       | any of the above |

Two rules govern supplement composites such as
`BS 7273-4:2015+A1:2021` (the document `BS 7273-4:2015` read together with
its amendment):

- **The supplement year is identity-bearing.** An amendment is published
  once under its ordinal — `+A1:2022` does not exist — so the year is never
  ignored when matching dates.
- **Composites of one base document are editions of each other** — they are
  the consolidated document's successive states. A composite and its bare
  base are *not* editions: the series is supersession, not an edition-year
  relationship, and the amendment supplements the base without superseding
  it.

```ruby
a1   = Pubid::Bsi.parse("BS 7273-4:2015+A1:2021")
a2   = Pubid::Bsi.parse("BS 7273-4:2015+A2:2023")
bare = Pubid::Bsi.parse("BS 7273-4:2015")

a1.edition_of?(a2)       # => true — prior edition of the consolidated document
a1.dated_version_of?(a2) # => false — differs by incorporation, not just date
a1.edition_of?(bare)     # => false — supersession series, not edition-year

amd  = Pubid::Iso.parse("ISO 9001:2015/Amd 1:2020")
base = Pubid::Iso.parse("ISO 9001:2015")
amd.supplement_of?(base) # => true — and not edition_of?
```

## Common Attributes

Most identifier objects expose these attributes:

| Attribute | Type | Description |
|-----------|------|-------------|
| `publisher` | String | Publisher code |
| `number` | String | Document number |
| `part` | String | Part number |
| `year` | Integer | Publication year |
| `edition` | Integer | Edition number |
| `stage` | Stage | Development stage |
| `language` | String | Language code |
| `type` | Type | Document type |

## Flavor-Specific Classes

Each flavor has its own identifier classes under `Pubid::{Flavor}::Identifiers::*`.

For example, ISO has:
- `Pubid::Iso::Identifiers::InternationalStandard`
- `Pubid::Iso::Identifiers::TechnicalReport`
- `Pubid::Iso::Identifiers::Amendment`
- etc.

## Registry

The `Pubid::IdentifierRegistry` provides lookup capabilities:

```ruby
# Find by flavor and type
Pubid::IdentifierRegistry.find_by_type(:iso, :is)

# Get all identifiers for a flavor
Pubid::IdentifierRegistry.all_for_flavor(:iso)

# Export as JSON
Pubid::IdentifierRegistry.to_json
```

## See Also

- [Quick Start](/library/)
- [Contributing](/library/contributing)
