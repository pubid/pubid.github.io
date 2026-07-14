---
title: Identifier Relationships
description: How PubID models relationships between identifiers — revision, reaffirmation, supersession, incorporation, adoption, and redesignation.
---

# Identifier Relationships

Beyond composition (one identifier containing another), PubID models **relationships** between separate identifiers. These capture how documents relate to each other across their lifecycle.

## Overview

Relationships are expressed in parenthetical annotations on the identifier. A single document may have multiple relationships:

```
ANSI N42.18-2004 (Reaffirmation of ANSI N42.18-1980; Redesignation of ANSI N13.10-1974)
```

## Relationship Types

### Revision Of

A new edition that replaces a previous version of the same document.

| Example | Meaning |
|---------|---------|
| `IEEE Std 802.3-2018 (Revision of IEEE Std 802.3-2015)` | 2018 edition revises the 2015 edition |

### Reaffirmation Of

A document confirmed as current without technical change.

| Example | Meaning |
|---------|---------|
| `ANSI N42.18-2004 (Reaffirmation of ANSI N42.18-1980)` | 2004 edition reaffirms the 1980 edition |
| `ANSI C57.12.22-1993 (R1998)` | 1993 edition reaffirmed in 1998 |

### Supersedes

A document that replaces a previous, possibly differently-numbered document.

| Example | Meaning |
|---------|---------|
| `IEEE Std X-2020 (Supersedes IEEE Std Y-2010)` | New document replaces the old one entirely |

### Incorporates

A document that includes the content of another standard.

| Example | Meaning |
|---------|---------|
| `IEEE Std 1234-2020 (Incorporates IEEE Std 5678-2015)` | Standard includes content from another |

### Adoption Of

A publisher's version of another organization's standard.

| Example | Meaning |
|---------|---------|
| `IEEE Std C37.60-2005 (Adoption of IEC 62271-111)` | IEEE adopts the IEC standard |

### Redesignation Of

A document renumbered under a new identifier.

| Example | Meaning |
|---------|---------|
| `ANSI N42.18-2004 (Redesignation of ANSI N13.10-1974)` | Same content, new number |

### Previously Designated As

The inverse of redesignation — the old name for a renamed document.

| Example | Meaning |
|---------|---------|
| `IEEE Std X-2020 (Previously designated as IEEE Std Y-2010)` | Formerly known by a different number |

## Multiple Relationships

A single identifier can carry multiple relationships, separated by semicolons:

```
ANSI N42.18-2004 (Reaffirmation of ANSI N42.18-1980; Redesignation of ANSI N13.10-1974)
```

This document is simultaneously a reaffirmation of one standard and a redesignation of another.

## Publisher Support

| Publisher | Revision | Reaffirmation | Supersedes | Incorporates | Adoption | Redesignation |
|-----------|----------|---------------|------------|-------------|----------|--------------|
| IEEE/ANSI | Yes | Yes | Yes | Yes | Yes | Yes |
| ISO | Via edition tracking | — | — | — | — | — |
| IEC | Via edition tracking | — | — | — | — | — |

IEEE maintains the richest set of explicit relationships, tracked as structured data in the PubID model.

## See Also

- [PubID Algebra](/concepts/algebra) — How identifiers compose
- [Components](/concepts/components) — The building blocks of identifiers
- [URN Mapping](/concepts/urn) — Machine-readable canonical forms
