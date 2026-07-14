const gen = require("../.vitepress/data/generated/website-data.json");
const fs = require("fs");
const path = require("path");
const pubTs = fs.readFileSync(path.join(__dirname, "..", ".vitepress", "data", "publishers.ts"), "utf8");

// Extract flavor positions
const flavors = {};
let pos = 0;
const flavorPattern = /flavor:\s*['"]([\w-]+)['"]/g;
let match;
const flavorPositions = [];

while ((match = flavorPattern.exec(pubTs)) !== null) {
  flavorPositions.push({ flavor: match[1], start: match.index });
}

for (let i = 0; i < flavorPositions.length; i++) {
  const { flavor, start } = flavorPositions[i];
  const end = i + 1 < flavorPositions.length ? flavorPositions[i + 1].start : pubTs.length;
  const section = pubTs.substring(start, end);

  // Only extract keys from docTypes array, not from styles/components
  const docTypeKeys = [];
  const docTypesMatch = section.match(/docTypes:\s*\[/);
  if (docTypesMatch) {
    const docTypesStart = section.indexOf(docTypesMatch[0]) + docTypesMatch[0].length;
    // Find matching closing bracket
    let depth = 1;
    let idx = docTypesStart;
    while (idx < section.length && depth > 0) {
      if (section[idx] === '[') depth++;
      else if (section[idx] === ']') depth--;
      idx++;
    }
    const docTypesSection = section.substring(docTypesStart, idx - 1);
    const keyPattern = /key:\s*['"]([\w-]+)['"]/g;
    let km;
    while ((km = keyPattern.exec(docTypesSection)) !== null) {
      docTypeKeys.push(km[1]);
    }
  }
  flavors[flavor] = docTypeKeys;
}

// Compare with normalized keys
// Library uses short keys (is, tr, amd) while website uses long keys (international_standard, amendment)
// Normalize by comparing titles and by converting library short keys to long form
function normalizeKey(key) {
  return key.replace(/-/g, "_").toLowerCase();
}

// Build a title-to-key map for fuzzy matching
function titleToNorm(title) {
  return (title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

let totalMissing = 0;
let totalExtra = 0;

for (const [flavor, genData] of Object.entries(gen)) {
  const genTypes = genData.identifier_types || [];
  // Try both underscore and hyphenated forms for flavor matching
  const webKeys = (flavors[flavor] || flavors[flavor.replace(/_/g, '-')] || []).map(normalizeKey);

  // Build maps for matching
  const genByKey = new Map(genTypes.map(t => [normalizeKey(t.key), t]));
  const genByTitle = new Map(genTypes.map(t => [titleToNorm(t.title), t]));

  // For each website key, try to match against library
  const matchedGenKeys = new Set();
  const unmatchedWeb = [];

  for (const wk of webKeys) {
    // Try direct key match
    if (genByKey.has(wk)) {
      matchedGenKeys.add(wk);
      continue;
    }
    // Try title-based match
    let found = false;
    for (const t of genTypes) {
      if (titleToNorm(t.title) === wk || wk.includes(titleToNorm(t.key)) || titleToNorm(t.title).includes(wk)) {
        matchedGenKeys.add(normalizeKey(t.key));
        found = true;
        break;
      }
    }
    if (!found) unmatchedWeb.push(wk);
  }

  const missing = genTypes.filter(t => !matchedGenKeys.has(normalizeKey(t.key)));

  if (missing.length > 0 || unmatchedWeb.length > 0) {
    console.log(`\n${flavor.toUpperCase()} (${genTypes.length} lib vs ${webKeys.length} web):`);
    missing.forEach(t => console.log("  MISSING from website: " + t.key + " (" + t.title + ")"));
    unmatchedWeb.forEach(k => console.log("  EXTRA in website (not in lib): " + k));
    totalMissing += missing.length;
    totalExtra += unmatchedWeb.length;
  } else {
    console.log(flavor.toUpperCase() + ": OK (" + genTypes.length + " types)");
  }
}

console.log("\n=== Summary: " + totalMissing + " missing from website, " + totalExtra + " extra in website ===");
