---
title: "The pubid URN Scheme"
description: "The urn:pubid: scheme and the slug form — the always-round-trip machine forms of a PubID."
---

# The pubid URN Scheme

Every identifier has two URN forms: the **pubid scheme** (`urn:pubid:…`),
pubid's own namespace, which carries the full typed model and always
round-trips — and the **official URN** (`#to_urn`, e.g. `urn:iso:std:…`),
which follows the registered grammar of the organization and may be lossy.
The pubid scheme is also the source of the **slug** form, the same identity
wearing HTTP-path clothes (`iso/is/9001/year-2015`).

| | pubid scheme | official URN |
|--|--|--|
| Method | `Identifier#to_pubid_urn` | `Identifier#to_urn` |
| Parse | `Pubid.parse_urn` (routes `urn:pubid:`), `Pubid.parse_pubid_urn` (this scheme only) | `Pubid.parse_urn` (routes by namespace to the flavor URN parser) |
| Namespace | `urn:pubid:<flavor>:` | the organization's registered namespace (`urn:iso:std:`, `urn:ietf:rfc:` …) |
| Contract | always round-trips: `Pubid.parse_urn(id.to_pubid_urn).to_hash == id.to_hash` — corpus-wide, injective, path-safe | as faithful as the registered grammar allows; may be lossy |
| Use | slug for HTTP paths, API and parsing | outward-facing render form; never a slug source |

The lossiness of the official form is real, not theoretical: the ISO URN
grammar carries no year, so `ISO 9001:2015` renders the official URN
`urn:iso:std:iso:9001`. The pubid scheme exists so a machine form that
round-trips by value is always available.

## The API

```ruby
require 'pubid'

id = Pubid::Iso.parse("ISO 9001:2015")

id.to_pubid_urn    # => "urn:pubid:iso:is:9001:year-2015"
id.to_urn          # => "urn:iso:std:iso:9001" (official — lossy by design)

Pubid.parse_urn(id.to_pubid_urn)   # => the identifier (routes urn:pubid: to the shared codec)
Pubid.parse_pubid_urn("urn:pubid:iso:is:9001:year-2015")  # => the identifier
Pubid.parse_urn("urn:iso:std:iso:9001")  # => official URNs route to the flavor's URN parser
```

`Pubid.parse_urn` detects the namespace: a `urn:pubid:` URN is decoded by
the shared codec, every other namespace goes to its flavor's URN parser.
`Pubid.parse_pubid_urn` accepts a pubid-scheme URN and *only* that — an
official URN raises `Pubid::Errors::UrnParseError`, for a consumer that
must not mistake a lossy form for the round-trippable one.

## The slug

The slug is the pubid-scheme URN without the `urn:pubid:` prefix, with
each `:` segment joined by `/`:

```ruby
id  = Pubid::Iso.parse("ISO/IEC 13818-1:2015/Amd 3:2016")
Pubid.to_slug(id)   # => "iso/is/13818/co-IEC/part-1/year-2015/amd/3/co-IEC/year-2016"

Pubid.from_slug("iso/is/9001/year-2015")  # => ISO 9001:2015
```

`Pubid.to_slug` accepts an identifier or its pubid-scheme URN;
`Pubid.from_slug` rebuilds the exact URN and parses it through the same
canonical gate, so a slug round-trips by `to_hash` exactly like its URN.
The transform is bijective because no value contains a raw `:` or `/` —
a property the contract suite enforces corpus-wide, so servers and proxies
never see empty segments or percent-encoding in a slug.

## The segment grammar

```
pubid-urn = "urn:pubid:" flavor ":" body
body      = node *( ":" node ) [ ":f" 1*( ":" facet ) ]
node      = type-token *( ":" core ) *( ":" atom )
atom      = name "-" atom-value
facet     = node-index "." name "-" value
```

A supplement is a node *after* the node it modifies, so all supplements of
a document share the slug prefix of that document:

```
ISO/IEC 13818-1:2015/Amd 3:2016
  → urn:pubid:iso:is:13818:co-IEC:part-1:year-2015:amd:3:co-IEC:year-2016
```

The segment kinds:

- **Flavor** — the flavor segment of the identifier's type (`iso`,
  `cencenelec`, `3gpp`), so a URN routes by the same registry `Pubid.parse`
  uses. A node of another flavor (e.g. the CEN layer of a BSI adoption)
  carries a qualified token (`cencenelec.aen`).
- **Positional core** — a value a type always has (normally the document
  number) is a bare segment in a fixed, schema-declared order:
  `urn:pubid:iso:is:9001:year-2015`.
- **Atoms** — a value that can be absent is an atom `<name>-<value>`,
  found by its prefix, not its position. An absent atom leaves no segment,
  so the URN never contains an empty `::`.
- **Facets** — a value that records only a spelling (a language code's
  original form, an edition's original text) goes in the trailing
  `:f:` group. Identity ignores facets (`==`, `eql?`, `hash` and `===` skip
  them), but the URN keeps them, so the full form still round-trips byte
  for byte.
- **Escape** — a byte outside `[A-Za-z0-9._-]` is written `~XX`
  (upper-case hex). `%` is deliberately not used: servers decode `%2F`
  before routing. A core value that would read as structure (`amd`,
  `iec.is`) gets its first character escaped (`~61md`), while digit-led
  numbers (`9001`, `802.11`, `800-53`) and upper-case ones (`G.711`) stay
  as they are — the rule reads the shape of the value only, never the
  schemas that happen to exist, so published URNs keep their meaning when
  flavors add tokens.

## Canonical form and errors

Exactly one string exists for each identifier. The parser decodes the URN,
rebuilds the identifier, encodes it again, and refuses the input when the
two differ — a needless escape, an atom out of its canonical order, a
trailing `~`. Failures are loud:

| Error | Raised when |
|--|--|
| `Pubid::Errors::UrnParseError` | the URN/slug is malformed, unknown, non-canonical, or its values cannot build an identifier |
| `Pubid::Errors::InvalidInputError` | the input is not a String, exceeds the 16,000-character limit, or the flavor has no schema yet |

`#to_pubid_urn` raises `InvalidInputError` when a flavor has no URN schema
or the schema does not place one of the identifier's values — a schema gap
fails loudly, it never silently drops a value.

## Per-flavor schemas

The codec is shared, implemented once in the gem (`lib/pubid/pubid_urn/`);
each flavor declares a schema (`lib/pubid/<flavor>/pubid_urn_schema.rb`)
naming its type tokens, positional core and atoms. Atom prefixes come from
one vocabulary, so the same concept has the same atom in every flavor
(`year-2015`, `part-1`, `lang-en`, `ed-3`) across all landed flavors.

The complete per-flavor design — every flavor's schema table and the
rulings that shaped them — is `docs/URN-SCHEMES.adoc` in the
[pubid repository](https://github.com/pubid/pubid/blob/main/docs/URN-SCHEMES.adoc).

## See Also

- [API Reference](/library/api)
- [Constructing Identifiers](/library/constructing-identifiers)
- [URN Mapping (concept)](/concepts/urn)
