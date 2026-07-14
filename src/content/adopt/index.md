---
title: Adopt PubID
description: A guide for standards organizations to adopt the PubID identifier scheme — with NIST as the first official adopter.
---

# Adopt PubID

PubID gives standards organizations a structured, machine-readable identifier scheme that preserves meaning across every form — human-readable, URN, and JSON. If your organization publishes standards, technical reports, or any documents that need unambiguous identification, PubID can work for you.

## Why adopt a formal identifier scheme?

Without a formal scheme, identifiers are ambiguous, inconsistent, and impossible for machines to parse reliably. With PubID:

- **Unambiguous identification** — Every document has exactly one canonical identifier
- **Machine parsing** — Software decomposes identifiers into semantic components automatically
- **Round-trip fidelity** — Parse any format, re-render it identically
- **Multi-style rendering** — One identifier, multiple output formats, zero information loss
- **URN mapping** — Every identifier maps to a canonical URN for machine interchange

## NIST: The first official adopter

In April 2022, the [NIST Information Services Office](https://www.nist.gov/associate-director-management-resources/staff-offices/information-services-office) officially published the [Publication Identifier Syntax for NIST Technical Series Publications](https://www.nist.gov/system/files/documents/2022/04/01/PubID_Syntax_NIST_TechPubs.pdf) — making NIST the **first standards organization to formally adopt a universal PubID scheme**. [Ribose](https://www.ribose.com) was involved from the conception phase alongside the NIST ISO and CSRC teams, and was acknowledged in both the original 2020 draft and the final PubID 1.0 document.

### What NIST did

NIST defined a single identifier that renders in **four distinct styles**, all derived from the same data model:

| Style | Usage | Example |
|-------|-------|---------|
| **Full** | Title page, bibliography | National Institute of Standards and Technology Special Publication 800-53A |
| **Abbreviated** | Authority section | Natl. Inst. Stand. Technol. Spec. Publ. 800-53A |
| **Short** | Inline citations | NIST SP 800-53A |
| **Machine-Readable** | DOI suffix | NIST.SP.800-53A |

### The migration

NIST's catalog spans **19,333+ documents dating back to 1901** (when the agency was still the National Bureau of Standards). Adopting PubID meant retroactively converting every identifier to the new scheme.

The open-source [`nist-pubid`](https://github.com/metanorma/nist-pubid) conversion tool was built to handle this migration — parsing legacy identifiers and DOIs, extracting data elements, and generating the new PubIDs in any style.

Notable changes included normalizing series abbreviations (`NISTIR` → `NIST IR`, `NISTGCR` → `NIST GCR`) and standardizing revision formatting across the entire catalog.

### What NIST proved

NIST's adoption demonstrated that:

1. A single data model can serve both humans and machines
2. Round-trip fidelity across multiple rendering styles is practical
3. Over a century of legacy identifiers can be migrated programmatically
4. Encoding development stages in identifiers prevents misidentification of drafts

Every publisher schema in PubID builds on this foundation.

## How to adopt

Adopting PubID for your organization follows five steps:

1. **[Define your identifier elements](/adopt/guide#1-publisher-identity)** — catalog what your identifiers already contain
2. **[Design your rendering styles](/adopt/guide#9-rendering-styles-and-machine-readable-forms)** — decide which output formats you need
3. **Define your URN namespace** — every PubID publisher gets a URN namespace for interchange
4. **[Implement and test](/adopt/guide#implementation-path)** — create a flavor module, parser, and URN mapping
5. **Migrate legacy identifiers** — parse, generate, validate, and map your full catalog

See the [Designing Your Scheme guide](/adopt/guide) for a detailed walkthrough covering all 12 design dimensions, with real-world examples from ISO, NIST, ASTM, and more.

## Get in touch

Interested in adopting PubID for your organization? Drop us a note at [Ribose](https://www.ribose.com) — we'd be happy to share what we've learned from working with NIST and other standards bodies, and walk you through the design decisions and trade-offs.

## Resources

- [Designing Your Scheme](/adopt/guide) — Detailed design guide (12 dimensions)
- [NIST Publisher Schema](/publishers/nist) — See how NIST PubID is structured
- [Browse Publishers](/publishers/) — All 26+ implemented schemas
- [The Metaschema](/concepts/metaschema) — Formal element definitions
- [PubID Algebra](/concepts/algebra) — Identifier composition and relationships
- [Blog: NIST PubID](/blog/2024-08-01-nist-pubid) — Full NIST adoption story
- [nist-pubid on GitHub](https://github.com/metanorma/nist-pubid) — The NIST conversion tool
- [pubid-ruby on GitHub](https://github.com/metanorma/pubid) — Reference implementation
