#!/usr/bin/env node
// Fetches the generated API references from the pubid repos (pubid#577)
// into the content collection at build time, so the website assembles
// the library reference without committing generated files. Pinned to
// each repo's main; raw.githubusercontent serves the branch head.
import { writeFileSync, mkdirSync } from "node:fs";

const SOURCES = [
  {
    repo: "pubid/pubid",
    file: "docs/api-reference.md",
    out: "src/content/library/api-reference-ruby.md",
    title: "API Reference — Ruby (pubid)",
    description: "Generated from YARD over the pubid gem sources.",
  },
  {
    repo: "pubid/pubid-ts",
    file: "docs/api-reference.md",
    out: "src/content/library/api-reference-ts.md",
    title: "API Reference — TypeScript (pubid-ts)",
    description: "Generated from TypeDoc over the pubid-ts sources.",
  },
];

const frontmatter = (title, description) => `---
title: "${title}"
description: "${description}"
---

`;

mkdirSync("src/content/library", { recursive: true });
for (const { repo, file, out, title, description } of SOURCES) {
  const url = `https://raw.githubusercontent.com/${repo}/main/${file}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`${url}: ${res.status}`);
    process.exit(1);
  }
  const body = await res.text();
  writeFileSync(out, frontmatter(title, description) + body);
  console.log(`${out}: ${body.split("\n").length} lines from ${repo}@main`);
}
