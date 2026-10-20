---
title: "The Corpus Contract"
description: "The shared, versioned record every implementation must reproduce."
---

# The Corpus Contract

The corpus is the **single source of truth** for what an identifier
means and how it renders. The Ruby reference produces it; every mirror
consumes it. When the reference and a mirror disagree, the corpus — not
either implementation's memory — decides which row is wrong.

## What a case records

Each case names one document with its typed identity (the attributes,
not a string), and the forms that identity must produce: the human
canonical, the URN, and the serialized hash. Aliases are listed
separately, with the number of render/parse rounds they need to reach
the canonical. A case may also be a **negative** — an input that every
implementation must reject.

Around the cases sit the gates that keep the record honest:

- a **schema** the cases are validated against, so a missing field or a
  wrong type fails before a human reads the diff;
- a **provenance manifest** pinning the reference commit, the grammar
  commit and every payload's checksum — a changed payload without a
  provenance receipt is treated as tampering;
- a **ledger** of known-pending cases, each with a reason and a
  reference, and an alarm when a pending case starts passing;
- a **quarantine class** for rows the reference itself cannot
  reproduce (see [Lossless Faces](/concepts/lossless-faces)), counted
  so it can neither grow silently nor be forgotten.

## The three-layer rhythm

A change travels in one direction, with a receipt at every step:

1. the **reference** changes and its corpus is regenerated, with
   provenance;
2. the **mirror** pins the new corpus revision and re-derives its
   ledger from a fresh run — never from the previous ledger;
3. the **package** is released and downstream consumers pin the
   release.

Skipping a receipt is the failure mode the contract exists to prevent:
a mirror that quietly kept an old corpus, or a ledger that recorded a
count instead of the failing identifiers, looks green while testing
something else.

## Why it is the contract

Because it is shared and executable. A doctrine ruling is not real
until a corpus row records its consequence; a grammar change is not
landed until the corpus regenerates byte-identically or the diff is
explained; a mirror is not at parity until it reproduces every row
except the documented, referenced exceptions. The corpus is how the
project turns prose rulings into something CI can refuse to merge
against.
