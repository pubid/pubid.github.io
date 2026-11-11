import type { Publisher } from '../types'

export const plateau: Publisher = {
  flavor: "plateau",
  logo: "/logos/plateau-logo.svg",
  name: "PLATEAU",
  fullName: "PLATEAU (MLIT Japan)",
  category: "national",
  description: "PLATEAU is a project by Japan's Ministry of Land, Infrastructure, Transport and Tourism (MLIT) that promotes the use of 3D city models for urban planning and management. Editions are cited in the Japanese form (第X.X版); Handbook #00 edition 5.0 was published twice on one date — as 本編 (main volume) and 本編＋付録 (main volume and appendix, one PDF) — and the volume label after the edition distinguishes the two.",
  website: "https://www.mlit.go.jp/plateau",
  syntaxNotes: "PLATEAU identifiers follow: PLATEAU [Type] #[Number][-Annex] 第X.X版 [本編|本編＋付録]. Types include Handbook, Technical Report, Annex. The Handbook volume label rides after the edition, separated by an ASCII or full-width (U+3000) space, with ＋ or ASCII + (the builder normalizes + to ＋, and to_s writes one ASCII space before it); the label prints only after an edition, so excluding the edition still renders a parseable string. A \"Handbook #11\" reference with edition 1–3 and a part suffix (（民間活用編） / （公共活用編）) is rewritten to the handbook that actually existed for those editions: #06 and #04 respectively.",
  relatedFlavors: ["jis"],
  docTypes: [
    {
      key: "handbook",
      title: "Handbook",
      abbr: ["Handbook"],
      description: "PLATEAU Handbooks providing guidance on 3D city model usage. Editions are the Japanese 第X.X版 form. Since edition 5.0, Handbook #00 ships in two same-date publications distinguished by the volume label after the edition — 本編 (main volume) and 本編＋付録 (main volume and appendix, one PDF; edition 6.0 ships only in that form). The label is identity-bearing: it rides in the volume component, the pubid-scheme URN carries it as the vol- atom, and #00 第5.0版 matches neither labelled publication. Handbook #11 combined two earlier handbooks: for editions 1–3, （民間活用編） was Handbook #06 and （公共活用編） was Handbook #04 — only from edition 4 (第4.0版) do the two combine into #11, so an edition-1–3 \"#11\" reference with a part suffix parses as the #06/#04 document.",
      examples: [
        { input: "PLATEAU Handbook #00 第1.0版" },
        { input: "PLATEAU Handbook #00 第5.0版 本編" },
        { input: "PLATEAU Handbook #00 第5.0版 本編＋付録" },
        { input: "PLATEAU Handbook #00 第5.0版 本編+付録", output: "PLATEAU Handbook #00 第5.0版 本編＋付録" },
        { input: "PLATEAU Handbook #11 第1.0版（民間活用編）", output: "PLATEAU Handbook #06 第1.0版" },
        { input: "PLATEAU Handbook #11 第1.0版（公共活用編）", output: "PLATEAU Handbook #04 第1.0版" },
        { input: "PLATEAU Handbook #11 第4.0版" },
    ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["Technical Report"],
      description: "PLATEAU Technical Reports.",
      examples: [
        { input: "PLATEAU Technical Report #00" },
        { input: "PLATEAU Technical Report #01" },
    ],
    },
    {
      key: "annex",
      title: "Annex",
      abbr: ["Annex"],
      description: "Annexes to PLATEAU Handbooks and Technical Reports, cited with a letter suffix after the document ('PLATEAU Handbook #00 第1.0版 Annex A'). The Annex type has no number of its own — its document comes first as the base.",
      examples: [
        { input: "PLATEAU Handbook #00 第1.0版 Annex A" },
        { input: "PLATEAU Technical Report #01 Annex B" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "PLATEAU",
      dataType: "enum",
      values: ["Plateau"],
      example: "Plateau",
    },
    {
      name: "Number",
      description: "Document number with # prefix",
      dataType: "integer",
      format: "1–3 digit number.",
      example: "1",
    },
    {
      name: "Edition",
      description: "Edition in Japanese format (第X.X版)",
    },
    {
      name: "Volume",
      description: "Handbook volume label after the edition — 本編 (main volume) or 本編＋付録 (main volume and appendix); + normalizes to ＋",
      attribute: "volume",
      dataType: "string",
      format: "After the edition, one space (ASCII or full-width) before the label.",
      example: "本編＋付録",
    },
],
  algebra: [
    { type: "Handbook with volume label", description: "The two same-date edition-5.0 publications of Handbook #00", syntax: "PLATEAU Handbook #[N] 第X.X版 [本編|本編＋付録]", example: "PLATEAU Handbook #00 第5.0版 本編＋付録" },
],
}

export default plateau
