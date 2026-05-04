# PubID Algebra

PubIDs are not isolated — they have relationships with other identifiers. PubID algebra describes these relationships, allowing machines to understand how documents relate to each other.

## Amendment

An **amendment** modifies a base standard by adding, changing, or deleting specified elements.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| ISO | `[Base]/Amd [N]:[Year]` | `ISO 9001:2015/Amd 1:2024` |
| IEC | `[Base]/AMD[N]:[Year]` | `IEC 61131-3:2013/AMD1:2019` |
| CEN | `[Base]+A[N]:[Year]` | `EN 196-3:2005+A1:2008` |
| BSI | `[Base]+A[N]:[Year]` | `BS 476-22:1987+A1:2019` |
| IDF | `[Base]/AMD [N]:[Year]` | `IDF 146:2003/AMD 1:2023` |

## Corrigendum

A **corrigendum** corrects technical or editorial errors without adding new content.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| ISO | `[Base]/Cor [N]:[Year]` | `ISO 9001:2015/Cor 1:2016` |
| IEC | `[Base]/COR[N]:[Year]` | `CISPR 16-1-3:2004/COR1:2006` |
| CIE | `[Base]/Cor[N]:[Year]` | `CIE 232:2019/Cor1:2020` |
| IDF | `[Base]/COR [N]:[Year]` | `IDF 148-1:2008/COR 1:2009` |
| CCSDS | `[Base] Cor. [N]` | `CCSDS 121.0-B-1-S Cor. 1` |
| ETSI | `[Base]/C[N] ed.[N]` | `ETSI ETR 053/C1 ed.2` |

## Addendum

An **addendum** is a legacy supplement type (primarily used in older ISO and ASHRAE documents).

| Publisher | Syntax | Example |
|-----------|--------|---------|
| ISO | `[Base]/Add [N]:[Year]` | `ISO 2789:2006/Add 1:2008` |
| ASHRAE | `Addendum [Letter] to [Base]` | `ASHRAE Addendum a to Guideline 1.4-2019` |

## Value-Added Publication

A **value-added publication** wraps a base identifier with a delivery format or compilation suffix. These are not separate document types but represent different product forms of the same document.

### IEC — VAP Identifiers

IEC offers consolidated, redline, and serial versions of its standards using a suffix pattern.

| Suffix | Meaning | Example |
|--------|---------|---------|
| `CSV` | Consolidated version (with all supplements incorporated) | `IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV` |
| `CMV` | Compiled Maintenance Version | `IEC 61666:2010+AMD1:2021 CMV` |
| `RLV` | Redline Version (shows changes from previous edition) | `IEC 61131-3:2013 RLV` |
| `SER` | Serial version | `IEC 61850-6:2009+AMD1:2018 SER` |

The VAP suffix follows the base identifier (including any supplements) with a space.

### IEEE — Redline

IEEE offers redline versions that show additions and deletions between editions with markup.

| Syntax | Example |
|--------|---------|
| `[Base] (Revision of [Old]) - Redline` | `IEEE Std 1018-2013 (Revision of IEEE Std 1018-2004) - Redline` |
| `[Base] - Redline` | `IEEE Std 802.3-2018 - Redline` |

### BSI — Value-Added Formats

BSI wraps identifiers with delivery format suffixes.

| Suffix | Meaning | Example |
|--------|---------|---------|
| `PDF` | PDF format | `PD 5500:2018+A3:2020 PDF` |
| `TC` | Tracked Changes | `PAS 96:2017 - TC` |
| `BOOK` | Printed book | `PP 7722:2006 BOOK` |

## Part Relationship

Standards often span multiple **parts**.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| ISO/IEC | `[Number]-[Part]:[Year]` | `ISO/IEC 17031-1:2020` |
| NIST | `[Number]-[Part]` | `NIST SP 800-53` |
| IEEE | `[Number].[Subpart]-[Year]` | `IEEE Std 802.3-2018` |
| JIS | `[Class] [Number]-[Part]:[Year]` | `JIS B 0205-2:2019` |
| OIML | `[Type] [Number]-[Part]:[Year]` | `OIML R 76-1:2006` |

## Series / All Parts

A reference to **all parts** of a multi-part standard.

| Syntax | Example |
|--------|---------|
| `[Number] (all parts)` | `ISO 9001 (all parts)` |
| `[Number] SERIES` | `CSA N285.6 SERIES:23` |

## Document Bundle

Multiple documents **bundled** together.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| BSI | `[ID] + [ID]` | `BS A 242-A 245:1974+A1:2017` |
| CSA | `[ID] + A[N]:[Year]` | `CAN/CSA-C22.2 NO. 60601-1-6:11 + A1:15 + A2:21` |
| CIE | `[ID],[ID],...` | `CIE 198-SP1.1:2011,198-SP1.2:2011` |

## Consolidated Version

A base standard **with all amendments incorporated**. IEC uses the `CSV` suffix to mark these (see [Value-Added Publication](#value-added-publication)).

| Publisher | Syntax | Example |
|-----------|--------|---------|
| IEC | `[Base]+AMD1:[Year]+AMD2:[Year] CSV` | `IEC 60950-1:2005+AMD1:2009+AMD2:2013 CSV` |
| CEN | `[Base]+A[N]:[Year]` | `EN 196-3:2005+A1:2008` |
| BSI | `[Base]+A[N]:[Year]` | `BS 476-22:1987+A1:2019` |

## Adoption

An **adoption** of another publisher's standard.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| BSI | `BS [Source] [ID]` | `BS ISO 9001:2015`, `BS EN 1090-2:2018` |
| CSA | `CAN/CSA-[Source] [ID]` | `CAN/CSA-ISO 9001:2016` |
| CEN | `EN [Source] [ID]` | `EN ISO 13485:2016` |

## Draft

A document in **draft** stage of development.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| ISO | `[Stage] [Type] [Number]` | `ISO/DIS 45001`, `ISO/CD 26000` |
| IEC | `[Stage] [Number]` | `IEC 2/2102/CDV` |
| IEEE | `P[Number]/D[Version]` | `IEEE P802.3bf/D3.0` |
| NIST | `[Type] [Number] (Draft)` | `NIST SP 800-53 Rev. 5 (Draft)` |

## Internal Documents

Working documents for **internal committee use**.

| Publisher | Syntax | Example |
|-----------|--------|---------|
| ISO | `ISO/TC [N] [DocNumber]` | `ISO/TC 176 N 1000` |
| BSI | `[Number] DC` | `14/30300822 DC` |

## See Also

- [Anatomy of a PubID](/concepts/anatomy)
- [Common Elements](/concepts/components)
- [URN Mapping](/concepts/urn)
