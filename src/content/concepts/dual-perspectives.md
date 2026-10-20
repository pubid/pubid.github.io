---
title: "Dual Perspectives"
description: "When two organizations assign one document two identifiers."
---

# Dual Perspectives

Standards are often published jointly. `ISO/IEEE 11073-10101` and
`IEEE/ISO 11073-10101` name the same document, and the difference is
not a spelling preference: each organization assigns the identifier
from **its own perspective**, with its own lead publisher and its own
catalogue key. `ISO|IDF` and `IDF|ISO` are the same situation.

## The rule

Neither form is a canonicalization of the other. There is no "true"
order of the publishers, no hint that says which one a caller meant,
and no routing that silently converts one into the other. A dual
perspective is identity-bearing: the printed order is the assignment.

This matters because the two organizations file the document under
different keys. A lookup performed against the ISO catalogue must use
the ISO-perspective identifier; a lookup against the IEEE catalogue
must use the IEEE-perspective one. Collapsing them would make one
catalogue answer for the other's key.

## What follows for consumers

- Parse the printed face and record which perspective it is.
- Route to the catalogue that owns that perspective — the printed
  perspective *is* the routing information.
- If that catalogue does not hold the document, fall through to the
  other publishers the parsed identifier names; do not rewrite the
  identifier to force a match.

## What does not exist

- No canonical form that both sides normalize to.
- No "hint" parameter that selects a perspective out of band.
- No automatic conversion between perspectives during parse, render,
  or URN generation.

The two faces are peers. A library that makes one subordinate to the
other has quietly decided an ownership question that belongs to the
organizations.
