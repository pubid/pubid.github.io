# PubID Components

All PubID schemas share a common set of components. This page documents each component, its semantics, and how different publishers use it.

## Publisher

The organization responsible for publishing the document.

| Publisher | Code | Full Name |
|-----------|------|-----------|
| ISO | `ISO` | International Organization for Standardization |
| IEC | `IEC` | International Electrotechnical Commission |
| IEEE | `IEEE` | Institute of Electrical and Electronics Engineers |
| ITU | `ITU` | International Telecommunication Union |
| NIST | `NIST` / `NBS` | National Institute of Standards and Technology |
| BSI | `BS` | British Standards Institution |
| CEN | `CEN` / `CLC` | European Committee for Standardization |
| ETSI | `ETSI` | European Telecommunications Standards Institute |
| JIS | `JIS` | Japanese Industrial Standards |
| OIML | `OIML` | International Organization of Legal Metrology |

Joint publications use multiple codes: `ISO/IEC`, `ISO/ASTM`, `IEC/IEEE`.

## Document Type

The category of publication deliverable.

| Type | Used By | Examples |
|------|---------|---------|
| International Standard | ISO, IEC, IDF | `ISO 9001:2015`, `IEC 61131-3:2013` |
| Technical Report | ISO, IEC, ASTM, ASHRAE, CEN, JIS | `ISO/TR 10450:2019`, `ASTM TR` |
| Technical Specification | ISO, IEC, CEN, JIS | `ISO/TS 22003:2013` |
| Guide | ISO, IEC, CEN, OIML, JCGM | `ISO Guide 73:2009`, `OIML G 1` |
| Publicly Available Specification | ISO, IEC, BSI | `ISO/PAS 45001:2017`, `PAS 9980:2022` |
| Special Publication | NIST | `NIST SP 800-53 Rev. 5` |
| Recommended Practice | API, SAE | `API RP 500`, `SAE ARP4754A` |

## Number

A unique numeric identifier assigned by the publisher. Some identifiers include:
- Simple numbers: `9001`, `802.3`, `800-53`
- Numbers with sub-parts: `17031-1`, `61131-3`
- Letter-prefixed numbers: `JIS A 0001`, `SAE J3016`

## Year

The year of publication or latest revision.

| Publisher | Format | Example |
|-----------|--------|---------|
| ISO/IEC | `:YYYY` | `:2015` |
| IEEE | `-YYYY` | `-2018` |
| NIST | Implicit in number or `Rev.` | `Rev. 5` |
| BSI | `:YYYY` | `:2017` |
| CSA | `:YY` or `:YYYY` | `:24` or `:2024` |

## Stage

Development stages indicate where a document is in its lifecycle.

### ISO/IEC Harmonized Stages

| Code | Abbreviation | Name |
|------|-------------|------|
| 10.00 | NP | New Proposal |
| 20.00 | WD | Working Draft |
| 30.00 | CD | Committee Draft |
| 40.00 | DIS / CDV | Draft International Standard |
| 50.00 | FDIS | Final Draft International Standard |
| 60.00 | PRF | Proof (pre-publication) |
| 60.60 | — | Published |

### Typed Stages

Typed stages combine the document type with the development stage:

| Abbreviation | Meaning |
|-------------|---------|
| DTR | Draft Technical Report |
| DTS | Draft Technical Specification |
| FDTR | Final Draft Technical Report |
| FDTS | Final Draft Technical Specification |
| AWI | Approved Work Item |
| NP | New Proposal / New Work Item Proposal |
| PRF | Proof of an International Standard |

### NIST Stages

NIST defines development stages for documents circulated outside the agency:

| Abbreviation | Name | Example |
|-------------|------|---------|
| WD | Work-in-Progress Draft | `NIST SP 800-XX (WD)` |
| PRD | Preliminary Draft | `NIST SP 800-XX (PRD)` |
| PD | Public Draft | `NIST SP 800-XX (PD)` |
| — | Final | `NIST SP 800-XX` |

Encoding stages in identifiers allows reviewers to uniquely cite drafts and prevents confusion between draft and final publications.

## Part

Many standards are published in multiple parts. Parts are typically separated by a hyphen:

| Publisher | Format | Example |
|-----------|--------|---------|
| ISO/IEC | `[Number]-[Part]` | `ISO 17031-1` |
| NIST | `[Number]-[Part]` | `NIST SP 800-53` |
| IEEE | `[Number].[Subpart]` | `IEEE 802.3` |
| JIS | `[Number]-[Part]` | `JIS B 0205-2` |

## Language

Some publishers include language codes:

| Code | Language |
|------|----------|
| `en` | English |
| `fr` | French |
| `ru` | Russian |
| `E` | English (OIML) |

## See Also

- [Anatomy of a PubID](/concepts/anatomy) — Visual breakdown
- [The Metaschema](/concepts/metaschema) — Formal definition
- [PubID Algebra](/concepts/algebra) — Identifier composition
- [Relationships](/concepts/relationships) — How identifiers relate to each other
