import type { Publisher } from '../types'

export const bipm: Publisher = {
  flavor: "bipm",
  logo: "/logos/bipm-logo.svg",
  logoLight: "/logos/bipm-logo.svg",
  logoDark: "/logos/bipm-logo-dark.svg",
  name: "BIPM",
  fullName: "Bureau International des Poids et Mesures (International Bureau of Weights and Measures)",
  category: "international",
  description: "The BIPM is the intergovernmental organization established by the Metre Convention in 1875, through which Member States act together on matters related to measurement science and measurement standards. The BIPM provides the basis for a single, coherent system of measurements throughout the world, traceable to the International System of Units (SI). It operates under the authority of the General Conference on Weights and Measures (CGPM) and the supervision of the International Committee for Weights and Measures (CIPM). The BIPM identifier schema covers four unrelated document families: committee documents (CIPM/CGPM recommendations and resolutions), meeting reports, articles in the Metrologia journal, and editions of the SI Brochure.",
  website: "https://www.bipm.org",
  syntaxNotes: "BIPM identifiers come in four families with distinct shapes: Committee Document — '<Group> <Type> [N] (<Year>[, <Lang>])' (e.g., 'CIPM REC 1 (1927, F)'); Meeting — 'Meeting of the <Committee> (<Year>, <Place>)'; Metrologia article — 'Metrologia, <Volume>, <Page>'; SI Brochure — 'SI Brochure <Edition>' or 'SI Brochure <Edition>, Appendix <N>'.",
  urnPattern: "urn:bipm:[type]:[number]:[year]",
  relatedFlavors: ["iso", "jcgm", "oiml"],
  docTypes: [
    {
      key: "committee_document",
      title: "Committee Document",
      abbr: ["REC", "RES", "DECN", "ACT", "DECL"],
      description: "CIPM and CGPM formal documents. Type codes: REC (Recommendation), RES (Resolution), DECN (Decision), ACT (Act), DECL (Statement). Each is owned by a committee group (CIPM, CGPM, JCRB, CCTF, CCQM, CCT, CCL, CCAUV, CCU, CCM, CCEM, CCPR, CCRI). The short form uses the abbreviated key; the long form spells out the type name in English or French.",
      examples: [
        { input: "CIPM REC 1 (1927)" },
        { input: "CGPM RES 1 (1889)" },
        { input: "CIPM REC 1 (1927, F)" },
        { input: "CGPM DECL (1983)" },
      ],
    },
    {
      key: "meeting",
      title: "Meeting Report",
      abbr: ["Meeting"],
      description: "Reports from meetings of consultative committees and other BIPM-convened bodies. Identified by the committee, year, and meeting place. Examples include the annual meeting of the Consultative Committee for Length (CCL) and others.",
      examples: [
        { input: "Meeting of the CCTF (2015, Geneva)" },
        { input: "Meeting of the CCQM (2018, Sèvres)" },
      ],
    },
    {
      key: "metrologia_article",
      title: "Metrologia Article",
      abbr: ["Metrologia"],
      description: "Articles published in Metrologia, the BIPM's peer-reviewed journal covering fundamental advances in measurement science. Indexed by volume and starting page number. Published by IOP Publishing on behalf of the BIPM since 1965.",
      examples: [
        { input: "Metrologia, 37, 87" },
        { input: "Metrologia, 56, 032001" },
      ],
    },
    {
      key: "si_brochure",
      title: "SI Brochure",
      abbr: ["SI"],
      description: "The defining reference for the International System of Units (SI), published by the BIPM. Each edition is the authoritative statement of the SI definitions in force. Appendices cover specific topics (mises en pratique, unit conversions, historical context). The 9th edition (2019) implemented the revised SI definitions based on fixed values of the defining constants.",
      examples: [
        { input: "SI Brochure 9" },
        { input: "SI Brochure 9, Appendix 1" },
        { input: "SI Brochure 8" },
      ],
    },
  ],
  components: [
    { name: "Publisher", description: "BIPM", example: "BIPM" },
    { name: "Committee Group", description: "Owning committee acronym: CIPM, CGPM, JCRB, CCTF, CCQM, CCT, CCL, CCAUV, CCU, CCM, CCEM, CCPR, CCRI", attribute: "group", example: "CIPM" },
    { name: "Type Code", description: "REC, RES, DECN, ACT, or DECL", attribute: "type_code", example: "REC" },
    { name: "Number", description: "Sequential document number within year and committee", attribute: "number", example: "1" },
    { name: "Year", description: "Adoption year, in parentheses", attribute: "year", example: "1927" },
    { name: "Language", description: "F for French, omitted for English (default)", attribute: "language", example: "F" },
  ],
  algebra: [
    { type: "Committee Document", description: "Short abbreviated form", syntax: "<Group> <Type> [N] (<Year>[, <Lang>])", example: "CIPM REC 1 (1927, F)" },
    { type: "Long Form", description: "Spelled-out type name in English or French", syntax: "<TypeName> [N] <Group> (<Year>)", example: "Recommendation 1 CIPM (1927)" },
    { type: "SI Brochure", description: "Edition-based reference", syntax: "SI Brochure <Edition>[, Appendix <N>]", example: "SI Brochure 9, Appendix 1" },
  ],
}

export default bipm
