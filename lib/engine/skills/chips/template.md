# Chips — Template

Copy the JSON, replace every `[bracketed placeholder]`, and emit. The validator rejects any unfilled placeholders.

```json
{
  "widget": "chips",
  "version": "1.0",
  "title": "[Optional 2-4 word header above the pills. Empty string or omit if none.]",

  "chips": [
    {
      "id": "[kebab-case-chip-id]",
      "label": "[1-4 words shown on the pill]",
      "prompt": "[Full prompt fired when this pill is clicked]"
    }
  ]
}
```

## Field reference

| Field | Required | Notes |
|---|---|---|
| `widget` | yes | Must be exactly `"chips"` |
| `version` | yes | Currently `"1.0"` |
| `title` | no | Optional short header |
| `chips` | yes | 1–6 items |
| `chips[].id` | yes | Kebab-case, unique within widget |
| `chips[].label` | yes | 1–4 words, sentence-case |
| `chips[].prompt` | yes | Non-empty; the literal next-message string |
