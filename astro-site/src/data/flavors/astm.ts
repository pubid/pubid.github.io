import type { Publisher } from '../types'

export const astm: Publisher = {
  flavor: "astm",
  logo: "/logos/astm-logo.svg",
  name: "ASTM",
  fullName: "ASTM International",
  category: "industry",
  description: "ASTM International (formerly American Society for Testing and Materials) is one of the largest voluntary standards development organizations in the world. ASTM standards cover a wide range of materials, products, systems, and services.",
  website: "https://www.astm.org",
  syntaxNotes: "ASTM identifiers follow the pattern: ASTM [Type] [Number]-[Year]. Joint standards use ISO/ASTM prefix. Types include no prefix (Standard), TR (Technical Report), ADJ (Adjunct).",
  relatedFlavors: ["iso", "ansi"],
  docTypes: [
    {
      key: "standard",
      title: "Standard",
      abbr: [""],
      description: "ASTM Standards defining test methods, specifications, practices, guides, and terminologies.",
      examples: [
        { input: "ASTM A36/A36M-19" },
        { input: "ASTM C150/C150M-22" },
        { input: "ASTM D638-22" },
        { input: "ASTM E8/E8M-22" },
    ],
    },
    {
      key: "adjunct",
      title: "Adjunct",
      abbr: ["ADJ"],
      description: "ASTM Adjuncts provide supplementary material to standards.",
      examples: [
        { input: "ASTM ADJD2148" },
        { input: "ASTM ADJF3504-EA" },
    ],
    },
    {
      key: "monograph",
      title: "Monograph",
      abbr: ["MONO"],
      description: "ASTM Monographs are in-depth publications on specific topics.",
      examples: [
        { input: "ASTM MONO1-EB" },
        { input: "ASTM MONO2-EB" },
    ],
    },
    {
      key: "technical_report",
      title: "Technical Report",
      abbr: ["TR"],
      description: "ASTM Technical Reports.",
      examples: [
        { input: "ISO/ASTM TR 52916-EB" },
        { input: "ISO/ASTM TR 52952-EB" },
    ],
    },
    {
      key: "manual",
      title: "Manual",
      abbr: ["MAN"],
      description: "ASTM Manuals provide practical guidance.",
      examples: [
        { input: "ASTM MAN 1" },
    ],
    },
    {
      key: "research_report",
      title: "Research Report",
      abbr: ["RR"],
      description: "ASTM Research Reports documenting original research.",
      examples: [
        { input: "ASTM RR:C01-1001" },
    ],
    },
    {
      key: "data_series",
      title: "Data Series",
      abbr: ["DS"],
      description: "ASTM Data Series publications.",
      examples: [
        { input: "ASTM DS 1" },
    ],
    },
    {
      key: "iso_dual_published",
      title: "ISO/ASTM Dual-Published",
      abbr: ["ISO/ASTM"],
      description: "Standards jointly published by ISO and ASTM.",
      examples: [
        { input: "ISO/ASTM 52900:2021" },
        { input: "ISO/ASTM 52901:2017" },
    ],
    },
    {
      key: "work_in_progress",
      title: "Work in Progress",
      abbr: ["WIP"],
      description: "ASTM standards under development.",
      examples: [
        { input: "ASTM WK12345" },
    ],
    },
],
  components: [
    {
      name: "Publisher",
      description: "ASTM or ISO/ASTM",
      dataType: "enum",
      values: ["ASTM"],
      example: "ASTM",
    },
    {
      name: "Number",
      description: "The standard number",
      dataType: "string",
      format: "Letter prefix + number, optionally with /M for metric (e.g., C33/C33M).",
      example: "C33/C33M",
    },
    {
      name: "Year",
      description: "Publication year",
      dataType: "year",
      format: "2 or 4 digit year, preceded by hyphen.",
      example: "-18",
    },
    {
      name: "Designation",
      description: "Grade designation (e.g., A36M)",
      attribute: "designation",
    },
],
  algebra: [
    { type: "Dual Publication", description: "Joint ISO/ASTM standard", syntax: "ISO/ASTM [Number]:[Year]", example: "ISO/ASTM 52900:2021" },
],
}

export default astm
