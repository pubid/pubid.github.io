---
title: "CIE URN scheme (urn:cie)"
description: "The PubID-invented URN form the CIE flavor emits on to_urn — the CIE has no URN namespace in the IANA registry, so the fleet mints these itself; a type-lead scheme with labelled segments, attested across the 365-row corpus."
---

# CIE URN scheme (urn:cie)

The CIE (International Commission on Illumination) has no URN namespace
in the IANA registry and publishes no URN rule for its standards,
conference papers, proceedings and tutorials. The `urn:cie:` form
documented here is therefore the PubID fleet's own: the emission of the
`cie` flavor's `to_urn`, carrying no round-trip promise. It leads with a
special type segment for the wrapped classes (dual publications,
identical adoptions, joint publications, bundles), prints the publisher
(and any co-publisher) as its own segment, and labels every qualifier
after the year. The fleet's lossless form for the same documents is the
universal `urn:pubid:cie:` scheme.

## Namespace ID

| Element | Value |
|---|---|
| Namespace ID (NID) | `cie` — **not IANA-registered**; the PubID `cie` flavor's private namespace |
| Assigning authority | none — the form is the fleet's emission, not a CIE assignment |
| Governing guidance | none published; RFC 8141 URN syntax is the only external constraint, and the emission does not always meet it (see the rules below) |
| Registry context | none; CIE publications carry the numbered series (`CIE 001…`), the `S`/`DS` standards and drafts, the `x`-prefixed conference papers and the tutorials |

## Scheme structure

Every URN carries the `urn:cie:` lead, an optional special type
segment, the optional `s` marker for the `S`-series, the publisher
segment (co-publishers dash-join it), the code, the year, then the
labelled segments — each only when present:

```
urn:cie:[:<special-type>:][s:]<publisher>[:<code>][:<year>][:<language>[:<format>]][:<stage>][:sep.<style>][:iec.<id>][:iso.<ref>][:doctype.<t>][:bundle.<ids>][:tut-bundle.<n>][:<languages>]
```

| Segment | Content | Notes |
|---|---|---|
| `<special-type>` | the wrapped class lead | `dual-pub` (a CIE/IEC dual publication), `identical` (an ISO identical adoption), `joint-pub` (a joint CIE ISO/IEC publication), `bundle` (a comma-joined set), `tut-bundle` (the tutorials bundle) |
| `s` | the `S`-series marker | `CIE S 009:2002` emits `s` |
| `<publisher>` | the publisher, downcased, co-publishers dash-joined | `cie`, `cie-iec`, `cie-iso` |
| `<code>` | the code string, as printed | `001`, `015`, `017/4` (the joint `CIE IEC 017.4-1987`) |
| `<year>` | the year | `1980`, `2018` |
| `<language>` | the language code + format, downcased | `e`, `slash_colon` (the `/E:` face) |
| `<stage>` | the draft stage, downcased | `dis` |
| `sep.<style>` | the separator style, printed whenever a year is | `sep.legacy` (the `-1980` dash face), `sep.current` (the `:2018` colon face), `sep.slash` |
| `iec.<id>`, `iso.<ref>` | the wrapped document of a dual/identical publication | `iec.62471:2006`, `iso.16508:1999` |
| `bundle.<ids>`, `tut-bundle.<n>` | the bundle members | raw, unescaped member strings |

### Examples

| URN | Names | Attestation |
|---|---|---|
| `urn:cie:cie:001:1980:sep.legacy` | CIE 001-1980 | attested in the pubid corpus (365 rows) |
| `urn:cie:cie:015:2018:sep.current` | CIE 015:2018 | attested in the pubid corpus |
| `urn:cie:cie:1992:sep.legacy` | CIE x005-1992 | attested in the pubid corpus — the `x005` conference number is lost, only the year prints |
| `urn:cie:dual-pub:s:cie:009:2002:sep.current:iec.62471:2006` | CIE S 009:2002/IEC 62471:2006 | attested in the pubid corpus — the `dual-pub` lead and the wrapped IEC document |
| `urn:cie:identical:s:cie:006.1:1998:sep.slash:iso.16508:1999` | CIE S 006.1/1998 (ISO 16508:1999) | attested in the pubid corpus — the `identical` lead and the ISO reference |
| `urn:cie:joint-pub:cie-iso:10916:2024:sep.current` | CIE ISO 10916:2024 | attested in the pubid corpus — the `joint-pub` lead, the co-publisher in the publisher segment |
| `urn:cie:joint-pub:cie-iso:23539:2021:dis:sep.current` | CIE ISO DIS 23539:2021 | attested in the pubid corpus — the draft stage rides its own segment |
| `urn:cie:identical:s:cie:008:2001:e:slash_colon:sep.legacy:iso.8995-1:2002(E)` | CIE S 008/E:2001 (ISO 8995-1:2002(E)) | attested in the pubid corpus — the language pair and a parenthesised ISO reference |
| `urn:cie:joint-pub:cie-iec:017/4:1987:sep.legacy` | CIE IEC 017.4-1987 | attested in the pubid corpus — the code keeps its slash |
| `urn:cie:cie` | CIE IP04 10-16 (also CIE OP02 1-5, CIE 121-SP1:2009) | attested in the pubid corpus — proceedings and supplements collapse onto the bare lead |
| `urn:cie:bundle:cie:tut-bundle.1` | CIE Tutorials Bundle 1 | attested in the pubid corpus — the `tut-bundle` label |
| `urn:cie:bundle:cie:bundle.CIE 198-SP1.1:2011,198-SP1.2:2011,198-SP1.3:2011,198-SP1.4:2011` | CIE 198-SP1.1:2011,198-SP1.2:2011,198-SP1.3:2011,198-SP1.4:2011 | attested in the pubid corpus — the member string rides verbatim, raw commas and spaces included |

## Rules that apply to every CIE URN

- **The lead is fixed.** `urn:cie:` carries the private namespace; the
  special type, when the record is a wrapped class, comes first.
- **The publisher is its own segment.** `cie` downcasts from the record,
  and a co-publisher dash-joins it (`cie-iec`, `cie-iso`) — the NID
  position never carries it.
- **`sep.<style>` prints with every year.** The style is the sole
  separator field: `sep.legacy` for the dash face, `sep.current` for the
  colon face, `sep.slash` for the slash face — two spellings of one
  document get two URNs.
- **Every qualifier after the year is labelled.** The language (plus its
  format), the stage, the wrapped document (`iec.`, `iso.`), the
  doctype and the bundle members each carry their own dot prefix, so
  the inverse can probe them.
- **The conference and supplement numbers are lost.** The generator
  emits the year but not the `x`-prefixed conference code or the
  supplement marker, so `CIE x005-1992` is `urn:cie:cie:1992:sep.legacy`
  and proceedings, supplements and corrigenda collapse onto
  `urn:cie:cie` or the base year's URN — 13 attested colliding URNs.
- **No escaping.** Values pass through verbatim, so raw spaces and
  parentheses reach the NSS (the bundle member string, the
  `2002(E)` ISO reference). A space is not in RFC 8141's `unreserved`
  set, so the bundle URNs are not RFC 8141-legal; the form never
  percent-encodes.

## Status in PubID

The PubID `cie` flavor emits this `urn:cie:` scheme on `to_urn` today.
The URN-scheme audit over ≤400 sampled pass ids gives 264 ids, 126
round-trip, 68 reshape, 70 that do not re-parse, 0 raise, 0 empty, and
13 colliding URNs; the corpus is 365 rows, every one parses and every
one emits.

The universal `urn:pubid:cie:` scheme is the fleet's lossless form: the
positional core is the number, the `_type` tokens are `std` (standard),
`c` (conference), `p` (proceedings), `cor`, `sup`, `dp` (dual), `i`
(identical), `jp` (joint), `bundle` and `tb` (tutorial bundle), and the
atoms carry the copublisher, part, year, stage, language pair,
amendment number, conference, doctype, IEC identifier, ISO reference,
iteration, page, style and variant — with the wrapped documents riding
`ids-(…)`. Landed with issue #670. See
[the universal PubID URN scheme](/library/pubid-urn-scheme) for the
`urn:pubid:` codec itself.

## See Also

- [ISO URN Specification (RFC 5141-bis)](/specs/iso-urn), [IEC URN Specification](/specs/iec-urn)
- [URN Mapping Overview](/concepts/urn)
- [CIE publisher page](/publishers/cie)
