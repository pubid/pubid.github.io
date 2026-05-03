# The PubID Metaschema

The PubID metaschema is the formal definition of how publication identifiers are structured. It provides a shared vocabulary and set of rules that each publisher's schema builds upon.

## Design Principles

1. **Extensibility** — The metaschema defines common elements; publishers extend it with their specifics
2. **Round-trip fidelity** — Parse any identifier and re-render it identically
3. **Multi-style rendering** — A single set of data elements can be rendered in multiple formats (full, abbreviated, short, machine-readable, URN) without information loss
4. **Machine-readable** — Every element has a formal definition suitable for automated processing
5. **Human-readable** — The output format remains familiar to standards users

## Metaschema Elements

### Core Elements (Present in Most Schemas)

| Element | Type | Description |
|---------|------|-------------|
| `publisher` | String | The issuing organization code (ISO, IEC, IEEE, etc.) |
| `type` | String | Document type key (is, tr, ts, guide, etc.) |
| `number` | String | Unique document number |
| `year` | Integer | Publication year |
| `part` | String | Part number |

### Extended Elements (Publisher-Specific)

| Element | Type | Used By | Description |
|---------|------|---------|-------------|
| `edition` | String | ISO, IEC, JIS | Edition number |
| `stage` | String | ISO, IEC | Development stage abbreviation |
| `typed_stage` | String | ISO, IEC | Combined stage+type (e.g., DTR, FDTS) |
| `language` | String | ISO, IEC, CIE | Language code |
| `copublisher` | String | ISO | Joint publisher code |
| `supplement` | Object | Most publishers | Amendment, corrigendum, or addendum |
| `draft_version` | String | IEEE | Draft version number |
| `vap_suffix` | String | IEC | Value-added product suffix |
| `sector` | String | ITU | ITU sector (R, T, D) |
| `version` | String | ETSI, BSI Flex | Version number |
| `revision` | String | NIST | Revision number |

## How Publishers Use the Metaschema

Each publisher defines a **schema** that specifies:

1. **Which elements they use** — Not all publishers use all elements
2. **Allowed values** — For example, which document types, stage codes, or language codes
3. **Syntax rules** — How elements combine into a string representation
4. **URN format** — How the identifier maps to a URN

### Example: ISO Schema

```
ISO/[Copublisher] [TypedStage] [Number]-[Part]:[Year]/[Supplement]([Language])
```

- Uses: publisher, copublisher, type, number, part, year, stage, typed_stage, language, supplement
- Stages: NP, WD, CD, DIS, FDIS, PRF, IS
- Supplements: Amendment (Amd), Corrigendum (Cor), Addendum (Add)

### Example: NIST Schema

```
[Publisher] [Type] [Number]-[Part] Rev. [Revision] Vol. [Volume]
```

- Uses: publisher (NIST or NBS), type, number, part, revision, volume, edition, stage, update, translation
- Types: SP, FIPS, IR, TN, HB, etc.
- Historical: NBS prefix for pre-1988 documents
- **Multi-style rendering**: NIST was the first to define four distinct output styles from a single data model:
  - **Full (Long)**: `National Institute of Standards and Technology Special Publication 800-53A`
  - **Abbreviated**: `Natl. Inst. Stand. Technol. Spec. Publ. 800-53A`
  - **Short**: `NIST SP 800-53A`
  - **Machine-Readable**: `NIST.SP.800-53A` (used as DOI suffix)

## Multi-Style Rendering

The PubID metaschema supports rendering a single identifier into multiple output formats. This means one parse operation produces data elements that can be serialized in different contexts:

| Output Format | Used For | Example |
|---------------|----------|---------|
| Human-readable string | Citations, references | `ISO 9001:2015` |
| URN | Machine interchange, resolution | `urn:iso:std:iso:9001:ed-5:en` |
| JSON | API responses, databases | `{"publisher":"ISO","number":"9001","year":2015}` |
| Full style (NIST) | Title page, bibliography | `National Institute of Standards and Technology Special Publication 800-53A` |
| Short style (NIST) | Inline citations | `NIST SP 800-53A` |
| Machine-readable (NIST) | DOI, machine interchange | `NIST.SP.800-53A` |

This interchange is **lossless**: converting from any style to any other style preserves all semantic information. The data model is the single source of truth; the styles are just different serializations.

## Formal Definition

The metaschema is implemented in the PubID Ruby library as:

- **Shared components** in `lib/pubid/components/` — reusable element definitions
- **Per-publisher schemas** in `lib/pubid/{flavor}/` — publisher-specific rules
- **Parsers** — PEG grammars (Parslet) for each publisher's syntax
- **Serializers** — Lutaml::Model mappings for JSON/YAML/URN output

## See Also

- [Common Elements](/concepts/elements) — Detailed element reference
- [PubID Algebra](/concepts/algebra) — Relationships between identifiers
- [URN Mapping](/concepts/urn) — Machine-readable URN representation
- [Browse Publishers](/publishers/) — See all implemented schemas
