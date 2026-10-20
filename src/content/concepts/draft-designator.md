---
title: "The D= Designator"
description: "How IEEE project drafts spell their stage."
---

# The D= Designator

An IEEE draft has two kinds of information that are easy to conflate:
the **project** it belongs to and the **stage** it has reached. The
project is spelled with a leading `P` (`P42010`), and the stage is
spelled with the `D=` designator (`D=CD`, `D=DIS`, `D=FDIS`).

## What the designator carries

- The stage token itself, in the organization's own vocabulary:
  `D=CD`, `D=DIS`, `D=FDIS`.
- An iteration, glued to the stage with a dot: `D=CD.2` is the second
  committee-draft iteration. The iteration is part of the designator,
  not a separate suffix.
- A year, joined in IEEE's own format. The canonical face is a dash:
  `P42010/D=CD-2020`. A colon spelling is accepted as an alias and
  canonicalizes to the dash face.

## What it does not mean

- `P` is not "proposed". It marks the project; it is identity-bearing
  and is never added or dropped by a renderer.
- A doubled `D` (`DDIS`) is not a stage. It is an alias spelling of
  `DIS`; the canonical face is the single designator `D=DIS`.
- The designator is not a free-form suffix. A stage word outside the
  vocabulary is a different construct, not a D= tail.

## Two faces, one identity

When a joint publication is led by ISO, the rendered face uses the
stage word in the ISO position (`IEEE/ISO/IEC CD 42010:2020`); the
IEEE face uses the designator. Both express the same stage, and both
re-parse to the same identity. Which face a catalogue prints follows
the perspective of the catalogue (see [Dual
Perspectives](/concepts/dual-perspectives)), not a preference of the
library.

The invariant is round-tripping: a designator face must re-parse to the
same stage, iteration and year it printed. If it cannot, it is a
reference defect recorded in the corpus, not a spelling to normalize
away.
