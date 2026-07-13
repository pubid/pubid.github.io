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
