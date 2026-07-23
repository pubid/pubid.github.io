import type { Publisher } from '../types'

export const ashrae: Publisher = {
  flavor: "ashrae",
  logo: "/logos/ashrae-logo.svg",
  name: "ASHRAE",
  fullName: "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
  category: "industry",
  description: "ASHRAE is a global professional society advancing heating, ventilation, air conditioning, and refrigeration (HVAC&R) systems. ASHRAE Standards establish minimum requirements for energy efficiency, indoor air quality, and building systems. Bare \"ASHRAE [code]\" partial references are accepted.",
  website: "https://www.ashrae.org",
  syntaxNotes: "ASHRAE identifiers follow patterns like: ASHRAE Standard [Number]-[Year], ASHRAE Guideline [Number]-[Year], with addenda appended. Bare partial references (just \"ASHRAE 90.1\" with no \"Standard\" keyword or year) are accepted and normalised.",
  relatedFlavors: ["ansi", "amca"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: ["Standard"],
      description: "ASHRAE Standards define requirements for HVAC&R systems, energy efficiency, and indoor environmental quality.",
      examples: [
        { input: "ASHRAE Standard 15-2019" },
        { input: "ASHRAE Standard 90.1-2022" },
        { input: "ASHRAE Standard 62.1-2022" },
        { input: "ASHRAE Standard 55-2023" },
        { input: "ASHRAE 90.1" },
    ],
    },
    {
      key: "guideline",
      title: "Guideline",
      abbr: ["Guideline"],
      description: "ASHRAE Guidelines provide recommendations and best practices.",
      examples: [
        { input: "ASHRAE Guideline 0-2019" },
        { input: "ASHRAE Guideline 1.4-2019" },
        { input: "ASHRAE Guideline 10-2011" },
    ],
    },
    {
      key: "addendum",
      title: "Addendum",
      abbr: ["Addendum"],
      description: "Individual addenda to ASHRAE Standards or Guidelines.",
      examples: [
        { input: "ASHRAE Addendum a to Guideline 1.4-2019" },
        { input: "ASHRAE Guideline 10-2011 Addendum e" },
    ],
    },
    {
      key: "combined_addenda",
      title: "Combined Addenda",
      abbr: ["Addenda"],
      description: "Combined multiple addenda packages.",
      examples: [
        { input: "ASHRAE Guideline 0: Addenda a, b, c, d" },
    ],
    },
    {
      key: "addenda_package",
      title: "Addenda Package",
      abbr: ["Addenda Package"],
      description: "A package of multiple addenda.",
      examples: [
        { input: "ASHRAE Standard 15-2007 Addenda Supplement Package" },
    ],
    },
    {
      key: "errata",
      title: "Errata",
      abbr: ["Errata"],
      description: "Corrections to published ASHRAE documents.",
      examples: [
        { input: "ASHRAE Errata to Standard 90.1-2022" },
    ],
    },
    {
      key: "interpretation",
      title: "Interpretation",
      abbr: ["Interp"],
      description: "Official ASHRAE interpretations of standards requirements.",
      examples: [
        { input: "ASHRAE Interpretation IC 62.1-2016-1" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "ASHRAE",
      dataType: "enum",
      values: ["ASHRAE"],
      example: "ASHRAE",
    },
    {
      name: "Type",
      description: "Standard or Guideline",
      dataType: "enum",
      values: ["Standard", "Guideline"],
      example: "Standard",
    },
    {
      name: "Number",
      description: "The standard/guideline number",
      dataType: "string",
      format: "Alphanumeric. May include decimal (e.g., 90.1, 1.4).",
      example: "90.1",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "4-digit year, preceded by hyphen.",
      example: "2019",
    },
    {
      name: "Addendum Letter",
      description: "Letter designation for addenda",
    },
],
  algebra: [
    { type: "Addendum", description: "Individual modification to a standard", syntax: "ASHRAE Addendum [Letter] to [Type] [Number]-[Year]", example: "ASHRAE Addendum a to Guideline 1.4-2019" },
    { type: "Combined Addenda", description: "Multiple addenda combined", syntax: "ASHRAE [Type] [Number]: Addenda [Letters]", example: "ASHRAE Guideline 0: Addenda a, b, c, d" },
    { type: "Errata", description: "Correction", syntax: "ASHRAE Errata to [Type] [Number]-[Year]", example: "ASHRAE Errata to Standard 90.1-2022" },
],
}

export default ashrae
