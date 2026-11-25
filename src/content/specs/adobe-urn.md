---
title: "Adobe URN scheme (urn:adobe)"
description: "The PubID-invented URN form the Adobe flavor emits on to_urn — Adobe has no URN namespace in the IANA registry, so the fleet mints these itself; a two-shape scheme for the Technical Notes and the slug-keyed publications, attested across the 3-row corpus (the flavor was audited from a literal list, not a fixture corpus)."
---

# Adobe URN scheme (urn:adobe)

Adobe has no URN namespace in the IANA registry and publishes no URN
rule for its technical specifications. The `urn:adobe:` form documented
here is therefore the PubID fleet's own: the emission of the `adobe`
flavor's `to_urn`, carrying no round-trip promise. It is a two-shape
scheme — the numbered Technical Notes (`urn:adobe:tech-note:<number>`)
and the slug-keyed publications
(`urn:adobe:publication:<slug>[:v<version>]`). Like SAE, Adobe was
never audited against a fixture corpus: it has no fixture directory,
so the scheme is attested by the 3-row pubid-testsuite corpus and, on
the pubid side, by a contract spec that parses a fixed literal list.
The fleet's lossless form for the same documents is the universal
`urn:pubid:adobe:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `adobe` — **not IANA-registered**; the PubID `adobe` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not an Adobe assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission meets it |
| Registry context | none; Adobe identifiers are the numbered Technical Notes (`Adobe Technical Note #5014`, `ATN5014`) and the kebab-case slug publications (`Adobe Glyph List`, `Adobe-Japan1-7`) |

## Scheme structure

A Technical Note carries its number; a publication carries its slug
and, when versioned, its version:

```
urn:adobe:tech-note:<number>
urn:adobe:publication:<slug>[:v<version>]
```

| Segment | Content | Notes |
|---|---|---|
| `tech-note` / `publication` | the shape token | the two identifier classes |
| `<number>` | the Technical Note number | `5014`, `12` |
| `<slug>` | the publication's kebab-case slug | `adobe-glyph-list`, `adobe-japan1` |
| `v<version>` | the version, `v`-prefixed | `v7` of `Adobe-Japan1-7`; a version-less publication omits it |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:adobe:tech-note:12` | Adobe TN 12 | attested in the pubid corpus (3 rows) |
| `urn:adobe:tech-note:15` | Adobe TN 15 | attested in the pubid corpus |
| `urn:adobe:tech-note:30` | Adobe TN 30 | attested in the pubid corpus |

The corpus carries Technical Notes only — no publication row exists to
attest the `urn:adobe:publication:` shape, which is documented from the
generator alone.

## Rules that apply to every Adobe URN

- **The lead is fixed.** `urn:adobe:` carries the private namespace.
- **The shape token splits the two classes.** `tech-note` and
  `publication` are the identifier classes themselves; a URN carries
  exactly one.
- **The slug is verbatim.** `adobe-glyph-list` rides whole; the
  emission never decomposes a slug that ends in a version number.
- **The version is `v`-prefixed in one segment.** `v7`, appended after
  the slug.
- **The scheme was attested without a fixture corpus.** Adobe has no
  fixture directory; the 3-row corpus above and the pubid contract
  spec's literal list (`LITERALS`) are the attestation, and the pubid
  leaf spec pins five URNs so the schema has a net without fixtures.

## Status in PubID

The PubID `adobe` flavor emits this `urn:adobe:` scheme on `to_urn`
today. The corpus is 3 rows, every one parses and every one emits —
the fleet's smallest attestation, and honest about it.

The universal `urn:pubid:adobe:` scheme is the fleet's lossless form:
a named publication has no positional core — its slug names it — so
the `_type` tokens are `id`, `pub` (no core) and `technote`, and the
atoms carry the slug (`slug-`) and the version (`v-`):
`Adobe Technical Note #5014` is `urn:pubid:adobe:technote:5014`.
Landed with issue #670 as drafted (`slug-`/`v-` atoms; the publication
has no core). See [the universal PubID URN
scheme](/library/pubid-urn-scheme) for the `urn:pubid:` codec itself.

## See Also

- [URN Mapping Overview](/concepts/urn)
- [Adobe publisher page](/publishers/adobe)
