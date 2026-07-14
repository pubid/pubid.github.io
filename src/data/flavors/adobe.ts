import type { Publisher } from '../types'

export const adobe: Publisher = {
  flavor: "adobe",
  logo: "/logos/adobe-logo.svg",
  name: "Adobe",
  fullName: "Adobe Inc.",
  category: "industry",
  description: "Adobe publishes foundational technical specifications for digital typography, font formats, and document interchange — including the Adobe Glyph List, PostScript Language Reference, CIDFont specifications, and the Adobe-Japan/Korea/CJK character collections. These underpin modern text rendering engines and CJK font workflows.",
  website: "https://www.adobe.com",
  syntaxNotes: "Adobe identifiers use two shapes: slug-keyed publications (Adobe Glyph List, Adobe-Japan1-7) and numbered Technical Notes (Adobe Technical Note #5014, ATN5014).",
  relatedFlavors: ["iso"],
  docTypes: [
    {
      key: "publication",
      title: "Publication",
      abbr: [""],
      description: "Adobe named publications identified by a kebab-case slug, optionally versioned. Includes character collections (Adobe-Japan1), the Adobe Glyph List, and the PostScript Language Reference.",
      examples: [
        { input: "Adobe Glyph List" },
        { input: "Adobe-Japan1-7" },
        { input: "Adobe-Korea1-2" },
        { input: "Adobe-CNS1-0" },
        { input: "Adobe-GB1-5" },
    ],
    },
    {
      key: "tech_note",
      title: "Technical Note",
      abbr: ["ATN"],
      description: "Adobe Technical Notes are numbered 4-digit (typically 5xxx series) technical specifications such as AFM, CIDFont, and SFNT-Mask specifications. They have a formal citation form (Adobe Technical Note #5014) and a short alias (ATN5014) used in document anchors.",
      examples: [
        { input: "Adobe Technical Note #5014" },
        { input: "ATN5014" },
        { input: "Adobe Technical Note #5902" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "Adobe",
      dataType: "enum",
      values: ["Adobe"],
      example: "Adobe",
    },
    {
      name: "Slug",
      description: "Kebab-case slug for publications (adobe-glyph-list, adobe-japan1)",
      attribute: "slug",
      dataType: "string",
      format: "Kebab-case slug for named publications (adobe-glyph-list, adobe-japan1).",
      example: "adobe-japan1",
    },
    {
      name: "Number",
      description: "4-digit Technical Note number (5xxx series)",
      attribute: "number",
      dataType: "integer",
      format: "4-digit Technical Note number, typically 5xxx series.",
      example: "5014",
    },
    {
      name: "Version",
      description: "Collection version (Adobe-Japan1-7 → version 7)",
      attribute: "version",
      dataType: "integer",
      format: "Collection version (Adobe-Japan1-7 → version 7).",
      example: "7",
    },
],
  algebra: [
    { type: "Short Alias", description: "Anchor-id form used in cross-references", syntax: "ATN[Number]", example: "ATN5014" },
    { type: "Citation Form", description: "Formal citation form", syntax: "Adobe Technical Note #[Number]", example: "Adobe Technical Note #5014" },
    { type: "Collection Version", description: "Character collection with version", syntax: "Adobe-[Collection]-[Version]", example: "Adobe-Japan1-7" },
],
}

export default adobe
