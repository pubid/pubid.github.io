# About PubID

## The Problem

Every standards publisher has their own way of identifying documents. ISO uses `ISO 9001:2015`, IEEE uses `IEEE Std 802.3-2018`, NIST uses `NIST SP 800-53 Rev. 5`. These identifiers follow different conventions, have different syntaxes, and carry different metadata.

There is no universal way to:
- **Parse** an identifier into its semantic components
- **Exchange** identifiers between systems without loss
- **Resolve** an identifier to meaningful metadata
- **Compare** identifiers across publishers

## The Solution

**PubID** is an open standardization effort that defines a **metaschema** for publication identifiers. Each publisher defines their own PubID schema using this metaschema, enabling:

- **Human-readable** identifiers with defined, unambiguous syntax
- **Machine-parseable** decomposition into semantic components (publisher, type, number, year, stage, etc.)
- **Round-trip fidelity** — parse and re-render to get identical output
- **Multi-style rendering** — a single identifier can be rendered in multiple formats (full, abbreviated, short, machine-readable) without information loss
- **Cross-publisher interoperability** through a shared metaschema
- **URN mapping** — every PubID maps to a canonical URN for machine interchange

## The Metaschema

The PubID metaschema defines the common elements that make up any publication identifier:

| Element | Required | Description |
|---------|----------|-------------|
| Publisher | Yes | The issuing organization (ISO, IEC, IEEE, etc.) |
| Document Type | Yes | The type of deliverable (Standard, Report, Guide, etc.) |
| Document Number | Yes | The unique identifier number |
| Year | Optional | Publication or revision year |
| Part | Optional | Part number for multi-part standards |
| Edition | Optional | Edition number |
| Stage | Optional | Development stage (Draft, CD, DIS, FDIS, etc.) |
| Language | Optional | Language code (en, fr, ru, etc.) |
| Supplement | Optional | Amendment, Corrigendum, Addendum |

Each publisher's schema specifies which elements are used, their allowed values, and how they combine syntactically.

## Multi-Style Rendering

A key innovation in PubID is the ability to render the same identifier in multiple styles without information loss. A single identifier is parsed into structured components, then re-rendered in any output format:

<FormatDiagram />

This pattern extends across all supported publishers: every PubID can render as a human-readable string, a URN, or structured JSON. Parse any style, and you can re-render it in any other — the interchange is lossless.

## Open Standardization

PubID is a **public, open-source effort**. This means:

- All publisher schemas are openly defined and documented
- The metaschema is designed for extensibility — any publisher can define their own schema
- The reference implementation is open source (Ruby gem)
- Community contributions are welcome

## Origin

PubID was created by [Ribose](https://www.ribose.com) to solve the real-world challenge of identifying and cross-referencing standards documents across multiple publishers. The project emerged from work on standards management systems that needed to reliably parse, render, and exchange publication identifiers.

## The Ecosystem

| Component | Description |
|-----------|-------------|
| **Metaschema** | Formal definition of identifier elements and their relationships |
| **Publisher Schemas** | 26+ publisher-specific schema definitions |
| **Reference Library** | Ruby gem implementing all schemas with parse/render/URN support |
| **This Website** | Documentation, interactive playground, and schema registry |

<script setup>
import VersionBadge from './.vitepress/theme/components/VersionBadge.vue'
</script>

**Data pipeline:** Publisher schema data on this site is exported directly from the [pubid-ruby](https://github.com/metanorma/pubid) reference implementation. The export version is:

<div style="margin:0.5rem 0;">
  <VersionBadge />
</div>

## Get Involved

- **GitHub**: [github.com/pubid](https://github.com/pubid)
- **Reference Implementation**: [github.com/pubid/pubid](https://github.com/pubid/pubid)
- **This Site**: [github.com/pubid/pubid.github.io](https://github.com/pubid/pubid.github.io)

---

*An open source project maintained by [Ribose](https://www.ribose.com)*
