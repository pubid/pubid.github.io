---
title: "Stage Words"
description: "How the word \"Draft\" and the stage vocabulary behave in a rendered identifier."
---

# Stage Words

A rendered identifier says how far a document has progressed. The
vocabulary is organization-specific — `CD`, `DIS`, `FDIS` for ISO/IEC;
`Draft`, `Unapproved`, `Redline` for IEEE — and the same identity can
have a stage word in one face and a designator in another.

## The draft word

When a rendered face says a document is a draft, it says **`Draft`
alone**. It does not prepend the type (`Draft Standard`), repeat the
status (`Draft Unapproved Draft`), or invent a stage.

The exception is a **project-stage draft**: when the draft belongs to a
project whose stage is itself the identity (an IEEE `P` project), the
type word is suppressed rather than embellished. A date-only draft
whose parsed designator carries no version takes the fabricated first
stage (`D1`); a designator that names an ISO stage token takes that
stage.

## Stage words and designators

When a joint publication is led by ISO, the stage prints as a word in
the ISO position. When IEEE leads, the stage prints as the `D=`
designator (see [The D= Designator](/concepts/draft-designator)). The
underlying stage is the same; the face follows the perspective.

The stage also has a **harmonized code** — the numeric ladder ISO and
IEC share — which is what queries use when they ask "show me everything
at the enquiry stage" rather than "show me this token". Typed stages
carry both: the abbreviation the source printed and the harmonized
code(s) it maps to. A query by code must never miss a document because
its face printed a word instead.

## What stage words must not do

- They must not be dropped to make a render parseable; a face that
  cannot re-parse is a corpus defect, not a licence to elide the stage.
- They must not be guessed from context when the source did not spell
  them. A missing stage is missing; the library does not infer one from
  a year or a project number.
- They must not be conjugated across faces. `FDIS` stays `FDIS`; the
  alias `DFDIS` canonicalizes to it rather than becoming a new stage.
