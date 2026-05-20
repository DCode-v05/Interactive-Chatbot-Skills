# Comparison Table — Template

Copy the JSON below, replace every `[bracketed placeholder]`, and emit. The
`scripts/validate.sh` script will reject any unfilled placeholders.

```json
{
  "widget": "comparison-table",
  "version": "1.0",
  "title": "[One-line title summarizing the comparison]",
  "subtitle": "[Optional one-line context — what dimensions, what use case. Empty string if none.]",

  "options": [
    {
      "id": "[kebab-case-option-id]",
      "label": "[Display name shown in column header]",
      "tagline": "[Optional 5-8 word descriptor under the label]",
      "clickPromptTemplate": "Why might I choose {option} overall?"
    }
  ],

  "attributes": [
    {
      "id": "[kebab-case-attribute-id]",
      "label": "[Row label, e.g. 'Free tier', 'Learning curve']",
      "format": "[text | number | currency | boolean | rating]",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "[option-id-1]": {
          "value": "[The actual value for this option on this attribute]",
          "note": "[Optional short qualifier, e.g. '500MB only' or 'since v3.0'. Empty string if none.]",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "[option-id-2]": {
          "value": "[...]",
          "note": "",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    }
  ],

  "summary": "[2-3 sentences. Neutral takeaway. State the main tradeoff, not a recommendation, unless the user explicitly asked which to pick.]",

  "followUps": [
    "[Suggested follow-up 1]",
    "[Suggested follow-up 2]",
    "[Suggested follow-up 3]"
  ]
}
```

## Field reference

| Field | Required | Notes |
|---|---|---|
| `widget` | yes | Must be exactly `"comparison-table"` |
| `version` | yes | Schema version. Currently `"1.0"` |
| `title` | yes | Max 80 chars |
| `subtitle` | no | Empty string `""` is valid |
| `options` | yes | 2–6 items |
| `options[].id` | yes | Kebab-case, unique, used as key in `cells` |
| `options[].tagline` | no | Empty string `""` is valid |
| `attributes` | yes | 4–10 items |
| `attributes[].format` | yes | One of: text, number, currency, boolean, rating |
| `attributes[].cells` | yes | Must contain a key for **every** option's `id` |
| `cells[].isWinner` | yes | Boolean. At most one `true` per attribute row |
| `summary` | yes | 2–3 sentences |
| `followUps` | yes | Exactly 3 strings |
