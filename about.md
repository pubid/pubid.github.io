---
title: About PubID
description: The story behind PubID — a universal, machine-readable system for publication identifiers, grounded in the philosophy that meaning precedes form.
---

# About PubID

<div class="about-hero">
  <p class="about-tagline">The meaning of a document lives before its name is written</p>
</div>

## Origin Story

At [Ribose](https://www.ribose.com/), we build systems that manage standards documents — and we kept running into the same wall. Every publisher identifies documents differently. ISO uses `ISO 9001:2015`. IEEE writes `IEEE Std 802.3-2018`. NIST has `NIST SP 800-53 Rev. 5`. These identifiers carry rich semantic meaning — publisher, document type, number, year, stage, part — but that meaning is locked inside conventions that only humans can parse, and only imperfectly.

There was no universal way to:

- **Parse** an identifier into its semantic components
- **Exchange** identifiers between systems without loss
- **Render** the same identifier in multiple formats
- **Compare** identifiers across different publishers

**PubID was born** from a conviction that the meaning of an identifier should be separate from any single representation of it. We needed a metaschema — a shared grammar — that could capture the full semantic depth of any publication identifier and express it in whatever form the situation demands.

Since then, PubID has grown to cover **26+ publishers** across international, regional, national, and industry standards, with a Ruby reference implementation that parses, renders, and interchanges identifiers with round-trip fidelity.

## The Metaschema

The PubID metaschema defines the common elements that make up any publication identifier:

| Element | Required | Description |
|---------|----------|-------------|
| Publisher | Yes | The issuing organization (ISO, IEC, IEEE, etc.) |
| Document Type | Yes | The type of deliverable (Standard, Report, Guide, etc.) |
| Document Number | Yes | The unique identifier number |
| Year | Optional | Publication or revision year |
| Part | Optional | Part number for multi-part standards |
| Edition | Optional | Edition number |
| Stage | Optional | Development stage (Draft, CD, DIS, FDIS, etc.) |
| Language | Optional | Language code (en, fr, ru, etc.) |
| Supplement | Optional | Amendment, Corrigendum, Addendum |

Each publisher's schema specifies which elements are used, their allowed values, and how they combine syntactically.

## Identifier Composition

Identifiers compose through algebraic relationships. A supplement identifier **embeds** a base identifier — the supplement carries its own type, number, and year, while the base remains intact inside it:

| Composition | Example |
|-------------|---------|
| **Base** | `ISO 9001:2015` — publisher, number, year |
| **Supplement embeds Base** | `ISO 9001:2015/Amd 1:2023` — amendment identifier contains the base |
| **With Copublisher** | `ISO/IEC 17031-1:2020` — joint publication |
| **Composite** | `ISO/IEC 17031-1:2020/Amd 1:2022` — amendment embeds copublished base |
| **Adoption** | `BS ISO 9001:2015` — national body adopts international standard |
| **Dual Published** | `IEC 60255-24 Ed. 2.0 2013-04 and IEEE Std C37.111-2013` — two equivalent identifiers from different publishers for the same document |
| **With Reaffirmation** | `ANSI C57.12.22-1993 (R1998)` — standard reaffirmed without change |

Each layer is a complete identifier in its own right. A supplement identifier does not modify the base — it wraps it, adding its own type (Amendment, Corrigendum), number, and year.

## Multi-Style Rendering

A key innovation in PubID is the ability to render the same identifier in multiple styles without information loss. A single identifier is parsed into structured components, then re-rendered in any output format:

<FormatDiagram />

This pattern extends across all supported publishers: every PubID can render as a human-readable string, a URN, or structured JSON. Parse any style, and you can re-render it in any other — the interchange is lossless.

## The Ecosystem

| Component | Description |
|-----------|-------------|
| **Metaschema** | Formal definition of identifier elements and their relationships |
| **Publisher Schemas** | 26+ publisher-specific schema definitions |
| **Reference Library** | Ruby gem implementing all schemas with parse/render/URN support |
| **This Website** | Documentation, interactive playground, and schema registry |

<script setup>
import VersionBadge from './.vitepress/theme/components/VersionBadge.vue'
</script>

**Data pipeline:** Publisher schema data on this site is exported directly from the [pubid-ruby](https://github.com/metanorma/pubid) reference implementation. The export version is:

<div style="margin:0.5rem 0;">
  <VersionBadge />
</div>

## What We Believe

<div class="mission-statement">

**PubID exists to preserve the integrity of meaning across every form a publication identifier can take — human or machine, verbose or terse, printed or digital.**

</div>

- The **meaning** of an identifier is prior to and independent of any particular rendering
- **Human-readable** and **machine-readable** forms are equally valid expressions of the same reality
- **Round-trip fidelity** — parse any form, recover the original — is not just a feature but a philosophical commitment
- Every identifier carries **depth** that no single surface representation exhausts

## The Name & Logo

**PubID** stands for **Publication Identifier**. It is both a noun and a mission: to give every publication an identifier that is universally parsable, unambiguously structured, and faithful to the original meaning it represents.

The logo is not decoration — it is a statement of philosophy:

<div class="logo-centered">
  <img src="/pubid-logo.svg" alt="PubID Logo" class="logo-image" />
</div>

<div class="logo-epigraph">
  <p class="logo-epigraph-zh">道可道，非常道；名可名，非常名</p>
  <p class="logo-epigraph-en">The Way that can be spoken is not the eternal Way;<br>the name that can be named is not the eternal name.</p>
</div>

Every element encodes a layer of meaning:

<div class="logo-cards">

<div class="logo-card">
<div class="logo-card-glyph">道</div>
<h4>The Pool</h4>
<p>The pool is the Way: the original, complete meaning of a publication identifier. It is the source — the semantic model from which all representations emerge and to which they return. Its depths are profound and unfathomable; meaning exists there in its purest form, beyond any particular expression, the deep structure that no single rendering can fully capture. Every identifier, in every format, points back to the same underlying reality in this pool.</p>
</div>

<div class="logo-card">
<div class="logo-card-glyph">名</div>
<h4>The Surface</h4>
<p>The surface of the pool is where meaning begins to take name and form. It is the boundary between the unnameable and the named — where depth rises toward expression, where semantic models crystallize into identifiable structure. A name is real and necessary, yet it is never the thing itself.</p>
</div>

<div class="logo-card">
<div class="logo-card-glyph">有</div>
<h4>Waves &amp; Particles</h4>
<p>The waves (human-readable identifiers) and particles (machine-readable forms) are 有 — being, manifest existence. Every representation is real and functional, yet no single form is constant. Human-readable strings and machine-readable URNs are two modes of the same 有 — both arising from the same source, both legitimate, neither permanent.</p>
</div>

<div class="logo-card">
<div class="logo-card-glyph">無</div>
<h4>The Space Between</h4>
<p>The emptiness between the waves and particles is 無 — non-being, the void. It is not absence but potential: the space that gives each form its meaning. Without the gaps, there is no structure; without 無, 有 has no shape. The void is what makes the identifier parsable — the delimiters, the spaces, the structure that separates one component from another.</p>
</div>

</div>

## Open Source

PubID is proudly open source.

- **GitHub**: [github.com/pubid](https://github.com/pubid)
- **Reference Implementation**: [github.com/metanorma/pubid](https://github.com/metanorma/pubid)
- **This Site**: [github.com/pubid/pubid.github.io](https://github.com/pubid/pubid.github.io)
- **Contributing**: New publisher schemas and features welcome

*An open source project maintained by [Ribose](https://www.ribose.com)*

<style>
.about-hero {
  margin: 2rem 0;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.about-tagline {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0;
  font-style: italic;
}

.vp-doc h2 {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.vp-doc h3 {
  margin-top: 1.5rem;
}

.vp-doc code {
  background: var(--vp-c-bg-soft);
}

.vp-doc hr {
  display: none;
}

/* Logo Section */
.logo-centered {
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem;
}

.logo-centered .logo-image {
  width: 220px;
  height: auto;
}

/* Logo Epigraph */
.logo-epigraph {
  text-align: center;
  margin: 0 auto 2rem;
  max-width: 560px;
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.logo-epigraph-zh {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  letter-spacing: 0.05em;
}

.logo-epigraph-en {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}

/* Logo Cards */
.logo-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0 2rem;
}

.logo-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s;
}

.logo-card:hover {
  border-color: var(--vp-c-brand-1);
}

.logo-card-glyph {
  font-size: 2rem;
  line-height: 1;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.logo-card h4 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.logo-card p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

/* Mission Statement */
.mission-statement {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, transparent 100%);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 0 12px 12px 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 1.5rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .logo-cards {
    grid-template-columns: 1fr;
  }

  .logo-centered .logo-image {
    width: 160px;
  }
}
</style>
