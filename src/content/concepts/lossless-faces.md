---
title: "Lossless Faces"
description: "Why a printed identifier keeps the form it was printed in."
---

# Lossless Faces

A publication identifier is not a string that happens to spell a
document — the spelling *is* part of the identity. A catalogue prints
`IEEE P61850-9-3/D=FDIS-2016`, a citation prints
`IEC/IEEE P61850-9-3_FDIS, February 2016`, and both name the same
project draft. PubID treats each printed form as a **face**: it parses
the spelling it was given, records what each token meant, and renders a
canonical face that carries the same information.

## The rule

A transformation may not silently discard a token the source spelled.
When two spellings name one document, they are **aliases**, and the
canonical face is the one the reference's own renderer produces. An
alias is allowed to be lossy in its *surface* only if re-parsing the
canonical recovers the identity — which is what the corpus checks.

This is why aliases can need more than one round trip. A spelling can
normalize into another alias rather than straight into the canonical;
the corpus records how many render/parse rounds each alias needs (its
`rounds` value), and both the exporter and the mirror walk them.

## When the canonical cannot re-parse

Some reference renders are themselves lossy — a narrative tail or a
joint render can produce a human face that the reference's own grammar
rejects. Those rows are not "bad data" to be re-spelled; they are
recorded as a **quarantine class** (`render_unreparseable`) with the
exact count, so the defect is visible and a fix trips the ledger. A
quarantine is a documented reference defect, never a silent skip.

## The tests that keep it honest

- Every corpus case's canonical must re-parse to itself.
- Every alias must reach the canonical within its recorded rounds.
- Every quarantine row must stay counted at the same number.
- A run that changes any of these numbers is a corpus round, with a
  provenance receipt and an explanation — not an edit to make CI green.

The faces are lossless in the only sense that matters: no consumer has
to guess which document was meant, and no authority's spelling is
overwritten by another's.
