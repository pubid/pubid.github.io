# Anatomy of a PubID

Every publication identifier can be decomposed into structured components. Let's break down how PubIDs work.

<AnatomyDiagram />

## Common Structure

Most PubIDs follow a pattern of: **Publisher [Type] Number[-Part]:Year [/Supplement]**

But each publisher has unique variations. The PubID metaschema accommodates these differences while maintaining a shared foundation.

## Component Reference

### Publisher
The organization that published the document. Can be a single publisher (ISO) or joint publishers (ISO/IEC).

### Document Type
The kind of document: International Standard, Technical Report, Guide, Specification, etc.

### Number
A unique numeric identifier assigned by the publisher.

### Part
Many standards are published in multiple parts (e.g., ISO 9001-1, ISO 9001-2).

### Year
The year of publication or most recent revision.

### Edition
Some publishers track editions explicitly (e.g., Ed 5, Edition 2007).

### Stage
Where the document is in its development lifecycle: Working Draft (WD), Committee Draft (CD), Draft International Standard (DIS), etc.

### Language
Some identifiers include a language code (e.g., `(en)` for English).

### Supplement
Amendments, corrigenda, addenda, and other supplements that modify a base document.

## Next Steps

- Learn about the [Metaschema](/concepts/metaschema) that defines these elements
- Explore [Common Elements](/concepts/components) across publishers
- See [PubID Algebra](/concepts/algebra) for identifier relationships
