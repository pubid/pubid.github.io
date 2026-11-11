---
title: "Constructing Identifiers"
description: "Build identifiers programmatically with the pubid gem."
---

# Constructing Identifiers

There are three ways to obtain an identifier: parsing a printed reference,
rebuilding from a serialized hash, and constructing from typed attributes.
The v1 entry point — `Pubid::Iso::Identifier.create(...)` — no longer exists;
the v2 constructor is `.new` with keyword arguments.

## Parsing

`Pubid.parse` routes on the leading prefix token (longest match first), so the
right grammar is chosen even when the caller does not know the flavor:

```ruby
require 'pubid'

Pubid.parse("ISO 8601-1:2019").class   # => Pubid::Iso::Identifiers::InternationalStandard
Pubid.parse("JIS Z 8301:2019").class   # => Pubid::Jis::Identifiers::JapaneseIndustrialStandard
```

When the flavor is known, name it directly: `Pubid::Iso.parse("ISO 9001:2015")`.

## The constructor

`Pubid::<Flavor>::Identifier.new` takes one keyword argument per declared
attribute, coerces scalars into the components the attributes declare, and
**raises `ArgumentError` naming any key the class does not declare** — a
silently-dropped key would otherwise produce an identifier with no year and
no diagnostic.

```ruby
Pubid::Iso::Identifier.new(number: "8601", part: "1", year: "2019")
# => ISO 8601-1:2019
```

For a non-default document type, construct the concrete class — the class is
the type:

```ruby
Pubid::Iso::Identifiers::TechnicalReport.new(number: 123).to_s
# => "ISO/TR 123"
```

Scalars coerce into degenerate components — `year:`, `month:`, `day:` fold
into the date, `edition: 2` wraps into the edition component, and IEC accepts
`languages: ["en"]` and `copublishers: ["ISO"]`:

```ruby
Pubid::Iec::Identifiers::InternationalStandard.new(
  number: "1000", part: "1", year: 2023, edition: 2, languages: ["en"],
).to_s   # => "IEC 1000-1:2023 ED2(en)"
```

The coercion is type-aware: a flavor that declares an attribute as a plain
string keeps the string, and `number` is never wrapped.

## Stages (ISO)

ISO stages are typed stages — a stage and document type combined (`WD`,
`DIS`, `FDIS`, `WD Amd`, `DAM`, `FDCor`). Look the registry entry up and set
it:

```ruby
Pubid::Iso::Identifiers::InternationalStandard.new(
  number: 123, typed_stage: Pubid::Iso.locate_stage("WD"),
).to_s   # => "ISO/WD 123"

ts = Pubid::Iso.locate_stage("FDIS")
ts.abbreviation  # => "FDIS"
ts.name          # => "Final Draft International Standard"
```

ISO type and stage are derived from `typed_stage` — there is no separate
`type:` or `stage:` keyword to set. The stage iteration (`.2` in
`ISO/DIS 123-1.2`) is its own keyword, `stage_iteration:`.

## Supplements with a base

A supplement wraps the document it modifies under the uniform `base`
attribute; the supplement is its own class with the ordinal in `number`:

```ruby
base = Pubid::Iso::Identifiers::InternationalStandard.new(
  number: "123", part: "1", year: 2019,
)

Pubid::Iso::Identifiers::Amendment.new(number: 1, year: 2021, base: base).to_s
# => "ISO 123-1:2019/Amd 1:2021"

Pubid::Iso::Identifiers::Corrigendum.new(number: "1", year: "2021", base: base).to_s
# => "ISO 123-1:2019/Cor 1:2021"
```

IEC renders the compact supplement face:

```ruby
base = Pubid::Iec::Identifiers::InternationalStandard.new(
  number: "60050", part: "351", year: 2013,
)
Pubid::Iec::Identifiers::Amendment.new(number: "1", year: 2016, base: base).to_s
# => "IEC 60050-351:2013/AMD1:2016"
```

IEEE carries its identity in a `code:` keyword:

```ruby
Pubid::Ieee::Identifier.new(code: "802.11", year: 2020).to_s
# => "IEEE Std 802.11-2020"
```

## Copublishers

Joint publications are modeled per flavor. IEC coerces copublisher scalars;
ISO takes its own `Publisher` component:

```ruby
Pubid::Iec::Identifiers::InternationalStandard.new(
  number: "1000", copublishers: ["ISO"],
).to_s  # => "IEC/ISO 1000"

Pubid::Iso::Identifier.new(
  publisher: Pubid::Iso::Components::Publisher.new(copublisher: ["IEC"]),
  number: 123,
).to_s  # => "ISO/IEC 123"
```

## from_hash

`#to_hash` emits the canonical hash, and `Pubid.from_hash` rebuilds the
concrete class from it — reading the `_type` key
(`pubid:<flavor>:<type>`), so the caller never names the flavor:

```ruby
id = Pubid::Iso.parse("ISO 9001:2015/Amd 1:2020/Cor 1:2021")
Pubid.from_hash(id.to_hash).to_s  # => "ISO 9001:2015/Amd 1:2020/Cor 1:2021"
```

The round-trip invariant `from_hash(id.to_hash) == id` holds for every flavor
— equality is what index lookups are made of, so a construction path that
holds a value the other path does not would break matching.

## Errors

`Pubid.parse` raises `Pubid::Errors::ParseError` (a `Parslet::ParseFailed`)
for an unparseable string; unknown constructor keys raise `ArgumentError`;
a hash with no or unknown `_type` raises `Pubid::Errors::InvalidInputError`.
Rescue `Pubid::Errors::Error` to catch all of them.
