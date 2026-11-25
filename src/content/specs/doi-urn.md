---
title: "DOI URN scheme (urn:doi)"
description: "The URN namespace of the International DOI Foundation — the formal doi namespace in the IANA registry, carrying a DOI's handle syntax as its NSS. The PubID doi flavor has no urn_generator; its pubid scheme covers it."
---

# DOI URN scheme (urn:doi)

The International DOI Foundation (IDF) is the assigning authority of the
`doi` URN namespace, registered with IANA under the formal URN namespace
template. The namespace names DOI objects by their DOI: the
namespace-specific string is the DOI syntax itself — the `10.` prefix,
the registrant prefix and the suffix joined with `/`. The PubID `doi`
flavor parses and renders DOIs; it has no `urn_generator`, so this page
documents the registered scheme only — [the universal PubID URN
scheme](#status-in-pubid) covers the flavor's own emission.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `doi` (IANA-registered, formal URN namespace template) |
| Assigning authority | International DOI Foundation (IDF); registrant prefixes delegated to DOI registration agencies |
| Governing guidance | the formal template registration; URN syntax RFC 2141 / RFC 8141 |
| Registry context | IANA URN namespace registry (formal namespaces); DOIs resolve through the Handle System |

## Scheme structure

The namespace-specific string is the DOI, prefix and suffix verbatim:

```
urn:doi:<doi>
```

| Segment | Content | Notes |
|---|---|---|
| `<doi>` | the DOI syntax | `10.` followed by the registrant prefix, `/`, then the suffix: `10.1000/182`, `10.6028/NIST.2022-04-15.001` |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:doi:10.1000/182` | doi:10.1000/182 | the registered form (the DOI syntax as NSS); the DOI is row `doi.resource.0001` of the pubid testsuite |
| `urn:doi:10.1006/jmbi.1998.2354` | doi:10.1006/jmbi.1998.2354 | the registered form applied to row `doi.resource.0002` of the pubid testsuite |
| `urn:doi:10.6028/NIST.2022-04-15.001` | doi:10.6028/NIST.2022-04-15.001 | the registered form applied to row `doi.resource.0003` of the pubid testsuite |

The pubid testsuite attests this flavor with only three rows — the three
DOIs above — a deliberately small corpus for a namespace whose NSS is an
opaque handle string assigned by DOI registration agencies.

## Rules that apply to every DOI URN

- **The NSS is the DOI.** The `10.` prefix, the registrant prefix and the
  suffix ride the URN verbatim; a DOI is the whole identity.
- **The suffix is opaque.** Registration agencies assign suffixes by
  their own rules — numeric (`182`), dotted (`jmbi.1998.2354`) or
  compound (`NIST.2022-04-15.001`) — and the URN carries whatever they
  assign.
- **One DOI, one URN.** No flavor, series or edition facet rides the
  URN; alternate display spellings (`DOI:10.1000/182`,
  `https://doi.org/10.1000/182`) are the same identity.

## Status in PubID

The PubID `doi` flavor has no `urn_generator`: its `to_urn` falls back
to the namespace-only form `urn:doi` — no namespace-specific string —
which is attested as the `urn` representation of all three testsuite
rows. The scheme audit over the sampled pass ids gives 4 ids, 0
round-trip, 4 that do not re-parse, and 1 colliding URN — the collision
is that degenerate emission, which is not a usable URN of the registered
scheme.

The universal `urn:pubid:doi:` scheme is what covers the flavor: the
prefix and suffix are atoms beside a type with no positional core, so
`doi:10.1000/182` emits `urn:pubid:doi:resource:prefix-10.1000:suffix-182`.
All corpus rows emit.

**The doi_pfs dev alias.** The PFS-compiled dev alias of the flavor
(`doi_pfs`, compiled from pubid-grammar's `definitions/doi.pfs`,
pubid#706) registers beside the coded flavor so the compiled pipeline
can be proven without cutover. Its definition declares the scheme's
canonical wire tag (`pubid:doi:resource`) and the scheme's `to_urn`
namespace (`doi`), so a doi_pfs identifier's pubid-scheme URN is
byte-identical with the coded flavor's — it encodes through the doi
schema above, and a future cutover changes no URN.

See [the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISBN URN scheme (urn:isbn)](/specs/isbn-urn) — the sibling number-namespace page
- [ISO URN Specification](/specs/iso-urn) and [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [DOI publisher page](/publishers/doi)
