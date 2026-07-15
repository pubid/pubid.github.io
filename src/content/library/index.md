---
title: "Library"
description: "PubID library documentation."
---

# Library

The PubID Ruby gem provides parsing, rendering, and URN generation for all supported publisher schemes.

<script setup>
import VersionBadge from '../.vitepress/theme/components/VersionBadge.vue'
</script>

<div style="margin-bottom:1.5rem;">
  <VersionBadge />
</div>

This documentation reflects the identifier schemes exported from the pubid-ruby gem linked above.

## Installation

Add to your Gemfile:

```ruby
gem 'pubid'
```

Or install directly:

```bash
gem install pubid
```

## Features

- **Parse** any supported identifier into structured components
- **Render** components back to a canonical string
- **Generate URNs** for machine interchange
- **Serialize** to JSON, YAML, or Hash
- **Validate** identifier syntax
- **37+ publisher schemes** supported out of the box

## Quick Example

```ruby
require 'pubid'

# Parse
id = Pubid::Iso.parse("ISO 9001:2015")

# Access components
id.publisher    # => "ISO"
id.number       # => "9001"
id.year         # => 2015

# Render
id.to_s         # => "ISO 9001:2015"

# URN
id.to_urn       # => "urn:iso:std:iso:9001:ed-5:en"

# Serialize
id.to_h         # => { publisher: "ISO", number: "9001", ... }
id.to_json      # => JSON representation
```

## Per-Flavor Parsing

```ruby
# ISO
Pubid::Iso.parse("ISO/IEC 17031-1:2020/Amd 1:2022")

# IEC
Pubid::Iec.parse("IEC 61131-3:2013/AMD1:2019")

# IEEE
Pubid::Ieee.parse("IEEE Std 802.3-2018")

# NIST
Pubid::Nist.parse("NIST SP 800-53 Rev. 5")

# BSI
Pubid::Bsi.parse("BS ISO 9001:2015")

# CEN-CENELEC
Pubid::CenCenelec.parse("EN 196-3:2005+A1:2008")

# And 17+ more publishers...
```

## Architecture

The library uses a layered architecture:

1. **Pre-parser** — Normalizes legacy/malformed identifiers via `update_codes.yaml`
2. **Parser** — PEG grammar (Parslet) produces a parse tree
3. **Builder** — Converts parse tree to an identifier object
4. **Identifier** — Lutaml::Model object with `to_s`, `to_urn`, `to_h`

## Next Steps

- [Quick Start Guide](/library/quick-start)
- [API Reference](/library/api)
- [Contributing](/library/contributing)
