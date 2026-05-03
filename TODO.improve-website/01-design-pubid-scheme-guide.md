# Task: Create "Designing Your PubID Scheme" Guide

## Goal
Create a comprehensive guide page at `/concepts/designing-your-scheme` that teaches publishers how to formalize their publication identifier scheme according to the PubID metaschema.

## Content Requirements

### 1. Publisher Identity
- Choosing a publisher abbreviation (ISO, NIST, IEEE)
- Copublishing conventions (ISO/IEC, ISO/ASTM)
- Namespace considerations for URN mapping

### 2. Document Types
- Enumerating your document types (Standard, Report, Guide, etc.)
- Type abbreviations and their conventions
- Open/closed principle: designing for new types

### 3. Numbering Scheme
- Sequential (ISO 9001), series-based (NIST SP 800), catalog-based
- Part numbering for multi-part documents
- Supplement numbering (Amd 1, Cor 2)

### 4. Editions & Revisions
- Edition-by-number (ed.1, ed.2) vs edition-by-year (2025ed)
- Revision tracking (Rev. 5)
- Reapproval dates (ASTM E2938-15(2023))

### 5. Development Stages & Drafts
- When to model stages (not all publishers have stages)
- Typed stages: combining stage + document type (DTR = Draft Technical Report)
- Harmonized stage codes (ISO stage codes: 00.00, 10.00, etc.)
- Draft versioning (IEEE D1-D9)

### 6. Supplements
- Amendments, Corrigenda, Addenda, Errata
- Standalone vs attached supplements
- Supplement versioning

### 7. Rendering Styles
- Human-readable (default citation form)
- Short form (abbreviated)
- Machine-readable (DOI-compatible)
- URN (interchange format)
- Full/long form (bibliographic)

### 8. Machine Interchange
- URN mapping design
- JSON serialization
- DOI compatibility

### 9. Citation & ISO 690
- How PubID maps to ISO 690 bibliographic references
- Citing standards correctly

### 10. Open/Closed Principle
- Designing schemas for extensibility
- Adding new document types without breaking existing parsers
- Versioning your schema

## Files to Create/Modify
| File | Action |
|------|--------|
| `concepts/designing-your-scheme.md` | New: main guide content |
| `.vitepress/config.ts` | Add to concepts sidebar |

## Implementation Notes
- Use real-world examples from existing publishers (ISO, NIST, IEEE, BSI)
- Include decision flowcharts where helpful
- Cross-reference existing concept pages (anatomy, metaschema, algebra, URN)
- Reference ISO 690 for citation format
