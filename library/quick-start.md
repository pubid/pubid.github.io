# Quick Start

Get started with the PubID Ruby gem in minutes.

## Installation

```bash
gem install pubid
```

## Parsing Identifiers

### Basic Parse

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")
puts id.class        # => Pubid::Iso::Identifiers::InternationalStandard
puts id.to_s         # => "ISO 9001:2015"
```

### Multi-Part Standards

```ruby
id = Pubid::Iso.parse("ISO/IEC 17031-1:2020")
puts id.publisher    # => "ISO"
puts id.copublisher  # => "IEC"
puts id.number       # => "17031"
puts id.part         # => "1"
puts id.year         # => 2020
```

### With Supplements

```ruby
id = Pubid::Iso.parse("ISO 9001:2015/Amd 1:2024")
puts id.to_s  # => "ISO 9001:2015/Amd 1:2024"
puts id.to_urn
```

### Drafts and Stages

```ruby
id = Pubid::Iso.parse("ISO/DIS 45001")
puts id.stage  # => stage info

id = Pubid::Ieee.parse("IEEE P802.3bf/D3.0")
puts id.to_s
```

## URN Generation

```ruby
id = Pubid::Iso.parse("ISO 9001:2015")
id.to_urn  # => "urn:iso:std:iso:9001:ed-5:en"

id = Pubid::Iec.parse("IEC 61131-3:2013")
id.to_urn  # => "urn:iec:std:iec:61131:-3:ed-3"
```

## Serialization

```ruby
id = Pubid::Iso.parse("ISO 9001:2015")

# Hash
id.to_h
# => { publisher: "ISO", number: "9001", year: 2015, edition: 5, ... }

# JSON
id.to_json
# => JSON string representation
```

## Cross-Publisher Support

```ruby
# NIST
id = Pubid::Nist.parse("NIST SP 800-53 Rev. 5")

# BSI
id = Pubid::Bsi.parse("BS ISO 9001:2015")

# IEEE
id = Pubid::Ieee.parse("IEEE Std 802.3-2018")

# ETSI
id = Pubid::Etsi.parse("ETSI EN 300 392-2 V3.4.1 (2017-04)")

# ITU
id = Pubid::Itu.parse("ITU-T G.992.1")
```

## Error Handling

```ruby
begin
  id = Pubid::Iso.parse("invalid identifier")
rescue => e
  puts "Parse error: #{e.message}"
end
```

## Next Steps

- [API Reference](/library/api)
- [Contributing](/library/contributing)
- [Browse Publishers](/publishers/)
