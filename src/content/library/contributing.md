---
title: "Contributing"
description: "PubID library documentation."
---

# Contributing

Contributions to PubID are welcome! Here's how to get started.

## Adding a New Publisher Schema

### 1. Create the Flavor Module

```ruby
# lib/pubid/{flavor}/identifier.rb
module Pubid
  module Myflavor
    class Identifier < ::Pubid::Identifier
      def self.parse(string)
        parsed = Parser.parse(string)
        Builder.build(parsed)
      end
    end
  end
end
```

### 2. Define the Parser

```ruby
# lib/pubid/{flavor}/parser.rb
module Pubid
  module Myflavor
    class Parser < Parslet::Parser
      rule(:publisher) { str("MYPUB") }
      rule(:number) { digits }
      rule(:year) { str(":") >> digits }
      rule(:root) { publisher >> space >> number >> year.maybe }
    end
  end
end
```

### 3. Define Identifier Types

```ruby
# lib/pubid/{flavor}/identifiers/standard.rb
module Pubid
  module Myflavor
    module Identifiers
      class Standard < ::Pubid::Identifier
        attribute :publisher, :string
        attribute :number, :string
        attribute :year, :integer
      end
    end
  end
end
```

### 4. Add Tests

Create fixture files in `spec/fixtures/{flavor}/identifiers/pass/` and `fail/`:

```
spec/fixtures/myflavor/identifiers/pass/standard.txt
```

Each line is one identifier to test for successful parsing.

### 5. Register in Main Module

```ruby
# lib/pubid/{flavor}.rb
require_relative "{flavor}/identifier"
```

## Development Setup

```bash
git clone https://github.com/pubid/pubid
cd pubid
bundle install

# Run all tests
bundle exec rake test:all

# Run specific flavor tests
bundle exec rspec spec/pubid/myflavor/

# Lint
bundle exec rake rubocop:all
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass: `bundle exec rake`
5. Submit a pull request

## Reporting Issues

Report bugs or request features at [github.com/pubid/pubid/issues](https://github.com/pubid/pubid/issues).
