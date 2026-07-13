---
title: Designing Your PubID Scheme
description: A 12-dimension guide to designing a formal publication identifier scheme using the PubID metaschema, with real-world examples from ISO, NIST, ASTM, and more.
---

# Designing Your PubID Scheme

This guide helps standards publishers formalize their publication identifier scheme using the PubID metaschema. Whether you're an international body like ISO, a national standards organization like BSI, or a trade association like API, the same principles apply.

## Why Formalize Your Identifier Scheme?

A well-designed identifier scheme solves a fundamental problem: **how does anyone — human or machine — uniquely and unambiguously identify a specific document?**

Without a formal scheme:
- The same document may be cited differently in different contexts
- Machines cannot reliably parse, compare, or exchange identifiers
- Supplements and amendments are ambiguous ("ISO 9001/Amd 1" — to which edition?)
- Cross-referencing between publishers is impossible

With a PubID scheme:
- **Unambiguous identification** — Every document has exactly one canonical identifier
- **Machine parsing** — Software decomposes identifiers into semantic components (publisher, type, number, year, stage, supplement)
- **Round-trip fidelity** — Parse and re-render to get identical output
- **Cross-publisher interoperability** — Identifiers from different publishers share a common metaschema
- **Multi-style rendering** — One identifier renders in multiple formats without information loss
- **Lossless interchange** — Convert between human-readable, URN, and JSON without losing information

## Design Dimensions

When designing your PubID scheme, you need to address each of these dimensions. Not every dimension applies to every publisher — SAE has one document type with no stages, while ISO has 18 types with a 7-stage lifecycle. The key is to be deliberate about each decision.

---

### 1. Publisher Identity

Your publisher code is the namespace for all your identifiers. Choose it carefully — it will appear in millions of citations.

**Choosing a publisher code:**

| Publisher | Code | Reasoning |
|-----------|------|-----------|
| International Organization for Standardization | `ISO` | Universally recognized acronym |
| International Electrotechnical Commission | `IEC` | Universally recognized acronym |
| Institute of Electrical and Electronics Engineers | `IEEE` | Widely known abbreviation |
| National Institute of Standards and Technology | `NIST` | US government agency acronym |
| British Standards Institution | `BSI` | National body abbreviation |
| American Petroleum Institute | `API` | Industry association abbreviation |
| Consultative Committee for Space Data Systems | `CCSDS` | Inter-organization abbreviation |

**Design considerations:**

- **Stability**: Once chosen, this code never changes. It appears in URNs, databases, and citations permanently.
- **Uniqueness**: Check that your code doesn't conflict with existing PubID publishers.
- **Copublishing**: If you co-publish documents with other bodies, define how joint codes combine. ISO uses slash-separated copublishers: `ISO/IEC 17031-1:2020`, `ISO/ASTM 51423-1`. Decide whether the copublisher order matters (ISO/IEC vs IEC/ISO are different identifiers in practice).
- **URN namespace**: Your publisher code becomes your URN namespace identifier (NID): `urn:iso:...`, `urn:nist:...`, `urn:ieee:...`.
- **Historical names**: If your organization was previously known by a different name (NIST was NBS before 1988), decide whether legacy identifiers remain valid and how they map.

---

### 2. Document Types

Document types classify the **nature of the deliverable**. Each type represents a distinct kind of publication with its own rules and purpose.

**Enumerating your types:**

Start by listing every type of document your organization publishes. For each type, define:

| Property | Description | Example (ISO) |
|----------|-------------|---------------|
| **Type key** | Machine-readable identifier | `is`, `tr`, `ts` |
| **Title** | Full human-readable name | International Standard |
| **Short form** | Abbreviation used in identifiers | `IS`, `TR`, `TS` |
| **Abbreviations** | All recognized abbreviation variants | `["", "IS"]` for International Standard |

**Spectrum of complexity:**

```
Simple                          Complex
─────────────────────────────────────────────────
SAE: 1 type (base)         ISO: 18 types
ASME: 1 type (standard)    BSI: 17+ types
                            NIST: 19 types
                            IEEE: 17+ variants
```

**Design considerations:**

- **Is the type always present?** ISO always shows the type (implicitly for IS, explicitly for TR, TS, etc.). NIST always shows the type code (SP, FIPS, IR). But for some publishers, the type is implicit in the numbering.
- **Type abbreviation conventions**: ISO uses uppercase abbreviations (TR, TS, PAS). IEEE uses "Std" for published standards and "P" for project drafts. NIST uses 2-4 letter codes (SP, FIPS, IR, HB, TN). Be consistent.
- **Subtypes**: Do any of your types have subtypes? BSI has aerospace standards (`BS A`, `BS AU`, `BS M`) that are variants of British Standards.
- **Open/closed principle**: Register types in a Scheme class so new types can be added without modifying existing parser rules. Each new type is a new entry, not a change to existing code.

---

### 3. Numbering Scheme

The numbering scheme determines how individual documents are identified within a type.

**Common patterns:**

| Pattern | Example | Structure | Used By |
|---------|---------|-----------|---------|
| Simple sequential | `ISO 9001` | type + number | ISO, IEC |
| Series + number | `NIST SP 800-53` | type + series-number | NIST |
| Letter + number + year | `ASTM E2938-15` | code+number-year | ASTM |
| Type + number + version | `ETSI EN 301 419 V1.1.1` | type+number.version | ETSI |
| Handbooks | `PLATEAU Handbook 1` | type + number | PLATEAU |

**Part numbering for multi-part documents:**

Most publishers support multi-part documents. The separator and numbering vary:

```
ISO 9001-1:2015           → hyphen separator, numeric part
NIST SP 800-57 Part 1     → "Part" separator
CEN EN 12345-1            → hyphen separator
ITU-T G.992.1             → dot separator (within a series)
```

**Design considerations:**

- **Stability**: Document numbers should never change. If ISO 9001 was assigned, it remains 9001 forever.
- **Uniqueness scope**: Is the number unique within the type (ISO 9001 is unique within IS type) or globally unique across all types?
- **Leading zeros**: Decide whether numbers have leading zeros. ISO doesn't (`ISO 9001`), but some internal systems might.
- **Gap tolerance**: Numbers don't need to be sequential. ISO 9001 and ISO 9004 exist, but 9002 and 9003 were withdrawn.
- **Part depth**: Can parts have sub-parts? (ISO 9999-1 can have further subdivisions in URNs.)

---

### 4. Editions and Revisions

This dimension tracks **which version** of a document is being referenced. The design choice here has significant implications for citation accuracy.

**Three models:**

**a) Year-based edition (ISO, IEC, JIS)**

```
ISO 9001:2015     → published 2015, 5th edition
ISO 9001:2008     → published 2008, 4th edition (superseded)
```

The year serves as the edition indicator. When citing, the year is essential — "ISO 9001" without a year is ambiguous.

**b) Revision number (NIST)**

```
NIST SP 800-53 Rev. 5     → 5th revision
NIST SP 800-53r5           → machine-readable form
```

Revisions are explicitly numbered and the revision number is part of the identifier. NIST supports both long form (`Rev. 5`) and short form (`r5`).

**c) Reapproval year (ASTM)**

```
ASTM E2938-15       → originally published 2015
ASTM E2938-15(2023) → reapproved in 2023 without changes
```

ASTM uses the original year plus an optional reapproval year in parentheses.

**Key design questions:**

- **Is undated citation valid?** ISO allows `ISO 9001` (undated) to mean "the latest edition." NIST requires the revision. Which model do you follow?
- **Edition vs revision**: An "edition" is a substantive new version. A "revision" (in NIST terms) is similar. Make the semantic clear.
- **Supersession**: When edition 2 replaces edition 1, what happens to references to edition 1? (They remain valid — each edition is a distinct document.)

---

### 5. Development Stages and Drafts

Not every publisher uses development stages. If your documents are published directly (like ASTM standards), you can skip this dimension entirely. But if your documents go through a formal public review lifecycle, stages are essential.

**ISO/IEC stage model (the most complex):**

```
PWI → NP → WD → CD → DIS → FDIS → IS
 00   10    20   30   40    50    60
```

| Stage | Code | Name | Harmonized | Meaning |
|-------|------|------|------------|---------|
| Preliminary Work Item | PWI | 00.00-00.99 | Idea stage |
| New Proposal | NP/NWIP | 10.00-10.99 | Proposed for development |
| Working Draft | WD | 20.00-20.99 | Under development |
| Committee Draft | CD | 30.00-30.99 | Sent to committee for review |
| Draft International Standard | DIS | 40.00-40.99 | Sent to all member bodies |
| Final DIS | FDIS | 50.00-50.99 | Final approval ballot |
| International Standard | IS | 60.00-60.60 | Published |

**Typed stages** — When stage + type combine into a single abbreviation:

```
DTR  = Draft Technical Report    (DIS stage + TR type)
FDTR = Final Draft Technical Report (FDIS stage + TR type)
DTS  = Draft Technical Specification
```

This is a distinctive ISO/IEC feature. It allows identifiers like `ISO/DTR 10017` to clearly indicate both the stage and type.

**IEEE draft model (numbered):**

IEEE uses numbered drafts rather than named stages:
```
IEEE P802.3bf/D1.0  → Project 802.3bf, Draft 1.0
IEEE P802.3bf/D3.0  → Project 802.3bf, Draft 3.0
IEEE Std 802.3bf-2011 → Published standard
```

The "P" prefix indicates a project (draft). Published standards use "Std" instead.

**BSI/CEN model (typed stage prefixes):**

```
BS EN 12345     → Published European Norm adopted as British Standard
prEN 12345      → Draft (proposal) European Norm
DD 12345        → Draft for Development
BS Draft 12345  → Draft British Standard
```

**Design questions:**

- Do your documents have publicly visible draft stages?
- Are stages indicated by prefixes (BS EN, prEN), abbreviations (DIS, FDIS), or both?
- Do you need harmonized stage codes for cross-publisher interoperability?
- Do stages combine with types into typed stages (DTR, FDTR)?
- Are draft identifiers valid for citation, or only published documents?

---

### 6. Supplements

Supplements modify a base document. Modeling them correctly is critical because supplements inherit context from their base.

**Common supplement types:**

| Type | Key | ISO Example | NIST Example |
|------|-----|-------------|-------------|
| Amendment | `amd` | ISO 9001:2015/Amd 1:2023 | — |
| Corrigendum | `cor` | ISO 9001:2015/Cor 1:2017 | — |
| Addendum | `add` | ISO 2631/DAD 1 | — |
| Update | — | — | NIST SP 800-53 Rev. 5 Upd. 1 |

**How supplements reference their base:**

```
ISO 9001:2015/Amd 1:2023
│     │   │      │    │
│     │   │      │    └── Supplement year
│     │   │      └── Supplement number
│     │   └── Supplement type (Amendment)
│     └── Base document year
└──────── Base document number
```

**Nesting**: Can supplements be supplemented? In ISO, yes:

```
ISO/IEC 17031-1:2020/Amd 1:2022/Cor 1:2023
                          │          │
                          │          └── Corrigendum to the Amendment
                          └── Amendment to the base
```

**Design questions:**

- What supplement types do you need? (amendments, corrigenda, addenda, errata, updates)
- Do supplements have their own year/date?
- Can supplements be chained (supplement to a supplement)?
- Are supplements always attached to a base, or can they be standalone documents?
- How are supplements numbered? (sequential across all supplements to the base, or per-type?)

---

### 7. Copublishers and Joint Publications

When two or more organizations publish a document together, the identifier must reflect all publishers.

**ISO copublishing pattern:**

```
ISO/IEC 17031-1:2020     → ISO + IEC joint publication
ISO/ASTM 51423-1:2019    → ISO + ASTM joint publication
ISO/IEC/IEEE 8802-3:2021 → Three-way joint (triple logo)
```

The copublisher order is significant — the first publisher is the "lead." `ISO/IEC` and `IEC/ISO` are different PubIDs referring to the same document.

**Design questions:**

- Do you co-publish documents? With which organizations?
- Is copublisher order significant in your scheme?
- Are copublished identifiers recognized by both/all publishers?
- Do copublished documents have different identifiers at each publisher? (BSI adopts ISO standards as "BS ISO 9001:2015" — a different identifier.)

---

### 8. Language

If your documents are published in multiple languages, the identifier must distinguish them.

**ISO language pattern:**

```
ISO 9001:2015        → Default (English)
ISO 9001:2015(en)    → Explicit English
ISO 9001:2015(fr)    → French
ISO 9001:2015(ru)    → Russian
```

Language codes follow ISO 639-1. In URNs: `urn:iso:std:iso:9001:ed-5:en`.

**CIE language patterns:**

CIE supports multiple language formats:
```
CIE S 023/E:2019     → English (slash format)
CIE S 023/D:2019     → German (slash format)
CIE S 023:2019(en)   → English (parenthetical format)
```

**Design questions:**

- Do you publish in multiple languages?
- Is the default language implicit (no code) or explicit?
- What language code standard do you use? (ISO 639-1 is recommended.)
- Are translations different documents or the same document in different languages?

---

### 9. Rendering Styles and Machine-Readable Forms

A single PubID should render into multiple formats without information loss. This is a core innovation of the PubID metaschema.

**Style spectrum:**

| Style | Purpose | ISO Example | NIST Example |
|-------|---------|-------------|-------------|
| **Full (long)** | Title pages, formal citations | `International Standard ISO 9001:2015` | `National Institute of Standards and Technology Special Publication 800-53 Revision 5` |
| **Abbreviated** | Space-constrained references | — | `Natl. Inst. Stand. Technol. Spec. Publ. 800-53 Rev. 5` |
| **Short** | Inline citations, running text | `ISO 9001:2015` | `NIST SP 800-53 Rev. 5` |
| **Machine-readable** | DOI suffix, databases, file naming | `ISO:9001:2015` | `NIST.SP.800-53.r5` |
| **URN** | Machine interchange, resolution | `urn:iso:std:iso:9001:ed-5:en` | `urn:nist:pub:sp:800-53:r5` |
| **JSON** | API responses, structured data | `{"publisher":"ISO","number":"9001",...}` | `{"publisher":"NIST","series":"SP",...}` |

**Design principle — lossless interchange:**

```
                    ┌─────────────┐
  "ISO 9001:2015"──▶│             │──▶ urn:iso:std:iso:9001:ed-5:en
                    │  Parsed     │
  ISO:9001:2015 ───▶│  Components │──▶ {"publisher":"ISO","number":"9001",...}
                    │             │──▶ ISO 9001 (short form)
  [URN input] ─────▶│             │──▶ ISO 9001:2015/Amd 1:2023 (with supplements)
                    └─────────────┘
```

Any input style can be parsed into the same structured components, then re-rendered into any output style. The conversion is bidirectional and lossless.

**Design questions:**

- Which rendering styles do you need? (At minimum: short + URN)
- Do you need a machine-readable form compatible with DOI registration?
- Should the full form spell out your organization's full name?
- Are there legacy formats that must still be parseable?

---

### 10. URN Mapping

Every PubID maps to a canonical URN ([RFC 8141](https://www.rfc-editor.org/rfc/rfc8141)) for machine interchange. The URN provides a stable, location-independent identifier.

**URN structure:**

```
urn:{publisher}:{class}:{type}:{number}:{part}:{edition}:{language}
```

**Examples:**

```
urn:iso:std:iso:9001:ed-5:en
urn:iso:std:iso-iec:17031:-1:ed-1:amd:1:v1
urn:nist:pub:sp:800-53:r5
urn:ieee:std:802.3:2018
```

**URN design principles:**

- Use lowercase throughout
- Use stable, unchanging components
- Include enough information for unambiguous resolution
- Ensure round-trip: `URN → parse → to_urn → URN` is identity
- Define how each metaschema element maps to URN path segments

**Design questions:**

- What is your URN namespace identifier (NID)?
- How do copublishers appear in URNs? (ISO uses `iso-iec` for joint publications)
- How are supplements encoded?
- Are URNs registered in an IANA registry?

---

### 11. Citation and Bibliographic References (ISO 690)

When citing standards in academic papers, technical reports, or other standards, [ISO 690](https://www.iso.org/standard/43320.html) provides the guidelines for bibliographic references. Your PubID scheme should map cleanly to ISO 690 requirements.

**ISO 690 citation for a standard (author-date system):**

```
INTERNATIONAL ORGANIZATION FOR STANDARDIZATION, 2015. ISO 9001:2015.
Quality management systems — Requirements. 5th ed. Geneva: ISO.
```

**ISO 690 citation (numeric system):**

```
[1] ISO 9001:2015, Quality management systems — Requirements.
```

**ISO 690 citation for a NIST publication:**

```
NIST SP 800-53 Rev. 5, Recommendation for Security and Privacy Controls
for Federal Information Systems and Organizations. Gaithersburg: NIST, 2020.
```

**Mapping PubID elements to ISO 690:**

| PubID Element | ISO 690 Element | Notes |
|---------------|-----------------|-------|
| Publisher (fullName) | Creator/Author | Full organization name |
| Type + Number + Year | Title/Designation | The identifier itself serves as the title designation |
| Year | Date of publication | |
| Edition/Revision | Edition statement | "5th ed." or "Rev. 5" |
| Language | Language note | Required for multi-language documents |
| URN | Standard identifier | Persistent identifier for the resource |

**ISO 690 principles that apply to PubID design:**

1. **Facilitate retrieval** — The identifier must help readers find the exact document
2. **Reflect the content accurately** — The edition/version must be correct
3. **Adopt uniform presentation** — Same format across all citations in a work
4. **Reference derivative works alongside the original** — Supplements must cite their base

Per ISO 690, when citing a standard, the series title and number are **essential** elements. This means your PubID's type abbreviation + number must be sufficient to identify the document in a citation.

**Design questions:**

- Does your short-form identifier carry enough information for unambiguous citation?
- How does your identifier appear in running text vs. a reference list?
- Can readers find the document from the identifier alone, or do they need additional context?

---

### 12. Extensibility — Open/Closed Principle

Your PubID scheme will evolve. New document types will be created, new development stages may be introduced, and new rendering requirements will emerge. Design for this from the start.

**Open/closed principle:**

- **Open for extension** — New types, stages, and styles can be added
- **Closed for modification** — Existing identifier formats never change

**Practical patterns:**

**a) Scheme registry for types**

All identifier types are registered in a Scheme class. Adding a type adds a new class and registry entry — no existing parser rules change:

```
Scheme.identifiers = [
  InternationalStandard,       # existing
  TechnicalReport,             # existing
  TechnologyTrendsAssessment,  # newly added — no other code changed
]
```

**b) Additive parser rules**

PEG grammar rules are additive. A new document type adds new parsing alternatives without modifying existing rules:

```
# Existing rule
identifier = standard / technical_report
# After extension — just add to the alternation
identifier = standard / technical_report / new_type
```

**c) New rendering styles without modification**

New output formats are added as new serializer methods. Existing `to_s`, `to_urn`, `to_h` remain unchanged. A new `to_doi` method is simply added.

**Design questions:**

- How will new document types be introduced? Is there a registration process?
- When a new stage is added, do existing identifiers change? (They shouldn't.)
- Are there deprecated types or stages that must still be parseable?
- How do you handle breaking changes? (Answer: you don't — maintain backward compatibility.)

---

## Decision Checklist

Before implementing your PubID scheme, confirm you've addressed every dimension:

| Dimension | Key Question | Your Decision |
|-----------|-------------|---------------|
| **Publisher identity** | What is your publisher code? Is it stable and unique? | |
| **Copublishers** | Do you co-publish? How are joint identifiers formed? | |
| **Document types** | What types do you publish? What are their keys and abbreviations? | |
| **Numbering** | Sequential, series-based, or catalog-based? Are parts supported? | |
| **Editions** | Year-based, number-based, or revision-based? Is undated citation valid? | |
| **Stages** | Do documents have public draft stages? Are typed stages needed? | |
| **Supplements** | Amendments, corrigenda, addenda? Can supplements be chained? | |
| **Language** | Multi-language publications? Default language implicit or explicit? | |
| **Rendering** | Which output styles: short, full, abbreviated, MR, URN? | |
| **URN** | What is your URN namespace? How do elements map to path segments? | |
| **Citation** | How does your identifier appear in ISO 690 references? | |
| **Extensibility** | How will new types/stages be added without breaking existing identifiers? | |
| **Legacy formats** | Are there historical identifier formats that must still parse? | |

## Implementation Path

Once your scheme is designed, implement it in the PubID framework:

1. **Create a flavor module** — `lib/pubid/{your_flavor}/`
2. **Define identifier classes** — One class per document type, with `def self.type` and optional `TYPED_STAGES`
3. **Write a PEG parser** — Parslet grammar rules for your syntax
4. **Implement a Scheme** — Registry of types, stages, and typed stages
5. **Add URN mapping** — URN generator and parser for round-trip
6. **Write rendering** — Output styles (`to_s`, `to_urn`, `to_h`)
7. **Add tests** — Fixture files with real-world examples (pass + fail cases)
8. **Register** — Add your flavor to the PubID module registry
9. **Document** — Add a publisher page to the website with types, examples, and rendering styles

## Real-World Examples

### Minimal scheme: SAE

SAE has a single document type. No stages, no supplements, no typed stages.

```
SAE J1939-71
SAE J1939/71_202403
```

Components: publisher, number, (optional) revision date.

### Medium complexity: ASTM

ASTM has 9 document types but no stages. Reapproval dates add versioning.

```
ASTM E2938-15           → Standard, published 2015
ASTM E2938-15(2023)     → Same, reapproved 2023
ASTM E2938-15e2         → Same, edition 2
```

### Complex scheme: ISO

ISO has 18 document types, a 7-stage lifecycle, typed stages, supplements, copublishers, and language codes.

```
ISO/IEC 17031-1:2020/Amd 1:2022
ISO/DIS 45001
ISO/TS 22002-1:2008(en)
```

## See Also

- [Anatomy of a PubID](/concepts/anatomy) — How PubIDs are structured
- [The Metaschema](/concepts/metaschema) — Formal element definitions
- [Common Elements](/concepts/components) — Shared component reference
- [PubID Algebra](/concepts/algebra) — Relationships between identifiers
- [URN Mapping](/concepts/urn) — Machine-readable URN representation
- [Browse Publishers](/publishers/) — See all implemented schemas

---

*Reference: [ISO 690:2023](https://www.iso.org/standard/43320.html) — Information and documentation — Guidelines for bibliographic references and citations to information resources*
