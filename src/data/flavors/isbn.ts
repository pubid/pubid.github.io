import type { Publisher } from '../types'

export const isbn: Publisher = {
  flavor: "isbn",
  name: "ISBN",
  fullName: "International Standard Book Number",
  category: "international",
  description: "The ISBN identifies monographic publications (books). PubID parses both the legacy 10-digit form (with its check digit) and the current 13-digit form (EAN-13, prefixed 978 or 979), validating the check digit on parse.",
  website: "https://www.isbn-international.org",
  syntaxNotes: "ISBN identifiers follow: ISBN[][: ]{digits} with hyphens optional. The 10-digit form ends with a check character (0–9 or X); the 13-digit form (978/979 prefix) ends with a numeric check digit. At the flavor entry point (Pubid::Isbn.parse) a bare digit string parses without the \"ISBN\" token; global prefix routing requires the token.",
  relatedFlavors: ["doi"],
  docTypes: [
    {
      key: "book",
      title: "ISBN-10 (legacy)",
      abbr: ["ISBN"],
      description: "The 10-digit legacy form: group – registrant – publication – check character (0–9 or X). The check digit is validated on parse; a wrong one fails to parse.",
      examples: [
        { input: "ISBN 0-306-40615-2" },
        { input: "ISBN: 0-306-40615-2" },
        { input: "0-306-40615-2", output: "ISBN 0-306-40615-2" },
    ],
    },
    {
      key: "book13",
      title: "ISBN-13",
      abbr: ["ISBN"],
      description: "The current 13-digit form (EAN-13): 978/979 Bookland prefix – group – registrant – publication – numeric check digit. Bare 13-digit strings are accepted; hyphenation is preserved as given.",
      examples: [
        { input: "ISBN 978-3-16-148410-0" },
        { input: "9783161484100", output: "ISBN 9783161484100" },
    ],
    },
],
  components: [
    {
      name: "Scheme",
      description: "The \"ISBN\" token, optionally followed by a colon",
      dataType: "enum",
      values: ["ISBN", "ISBN:"],
      format: "Optional for a bare 13-digit string",
      example: "ISBN",
    },
    {
      name: "Group",
      description: "The registration group (language area / country)",
      dataType: "string",
      format: "0, 1 (English); 3 (German); 978-… prefixes carry it after the Bookland prefix",
      example: "978-3",
    },
    {
      name: "Registrant / Publication",
      description: "The publisher and title allocations",
      dataType: "string",
      format: "Variable width; hyphenation is optional and preserved",
      example: "16-148410",
    },
    {
      name: "Check character",
      description: "The final check digit or letter",
      dataType: "string",
      format: "0–9 or X for ISBN-10; 0–9 for ISBN-13. Validated on parse",
      example: "0",
    },
],
  algebra: [
    { type: "Bare form", description: "A bare digit string parses as an ISBN (13 digits → ISBN-13)", syntax: "{13 digits}", example: "9783161484100" },
],
}

export default isbn
