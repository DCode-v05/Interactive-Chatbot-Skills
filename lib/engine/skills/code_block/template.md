# Code Block — Template

Copy the JSON, replace every `[bracketed placeholder]`, and emit. The validator rejects any unfilled placeholders.

```json
{
  "widget": "code-block",
  "version": "1.0",
  "filename": "[lowercase filename with the conventional extension, e.g. fetch_with_retry.py]",
  "language": "[lowercase-letters-only language slug, e.g. python]",
  "code": "[the literal source — preserve indentation and line breaks; escape JSON quotes/backslashes as needed]",
  "explainPrompt": "[full prompt fired when the user clicks the filename, e.g. Explain this fetch_with_retry.py code line by line]"
}
```

## Field reference

| Field | Required | Notes |
|---|---|---|
| `widget` | yes | Must be exactly `"code-block"` (hyphen, not underscore) |
| `version` | yes | Currently `"1.0"` |
| `filename` | yes | Non-empty. Lowercase, with extension. Doubles as the chat-continuation click target. |
| `language` | yes | Non-empty. Lowercase letters only (`/^[a-z]+$/`). Used for the small language badge. |
| `code` | yes | Non-empty. ≤ 8000 chars. Preserve indentation and line breaks exactly; React escapes the text. |
| `explainPrompt` | yes | Non-empty. Literal next-message string fired when the filename is clicked. |
