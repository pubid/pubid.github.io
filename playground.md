---
title: Playground
---

# Playground

Try parsing publication identifiers in real time. Select an example or type your own.

<Playground />

## Supported Examples

The playground currently supports pre-computed results for common identifiers across major publishers. For full parsing support, use the Ruby library:

```ruby
require 'pubid'

# Parse any supported identifier
id = Pubid::Iso.parse("ISO 9001:2015")
puts id.to_h    # => Hash of components
puts id.to_urn  # => URN representation
```

## Next Steps

- [Anatomy of a PubID](/concepts/anatomy) — Visual identifier breakdown
- [Library Quick Start](/library/quick-start) — Detailed usage guide
- [Browse Publishers](/publishers/) — All supported schemes
