# Notice — Template

Pick exactly one variant. Replace every `[bracketed placeholder]`.

## Variant: `banner`

```json
{
  "widget": "notice",
  "variant": "banner",
  "version": "1.0",
  "severity": "[success | warning | error | info]",
  "message": "[One-line status / outcome with the load-bearing detail]",
  "learnMore": {
    "label": "[2-4 word affordance, e.g. 'Learn more' or 'Why']",
    "prompt": "[Full prompt fired when the user clicks the affordance]"
  }
}
```

## Variant: `sources`

```json
{
  "widget": "notice",
  "variant": "sources",
  "version": "1.0",
  "title": "[Optional 2-4 word header above the source list. Omit if none.]",
  "sources": [
    {
      "id": "[kebab-case-source-id]",
      "url": "https://[real http or https URL]",
      "title": "[Source title]",
      "summary": "[Optional one-sentence summary. Omit if title is self-explanatory.]",
      "domain": "[Visible domain, e.g. arxiv.org]"
    }
  ]
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | both | yes | `"notice"` |
| `version` | both | yes | `"1.0"` |
| `variant` | both | yes | `"banner"` or `"sources"` |
| `severity` | banner | yes | One of `success`, `warning`, `error`, `info` |
| `message` | banner | yes | Non-empty single line |
| `learnMore` | banner | no | If present, both `label` and `prompt` must be non-empty |
| `sources` | sources | yes | 1–5 items, unique ids |
| `sources[].url` | sources | yes | Valid http(s) URL |
| `sources[].domain` | sources | yes | Strip `www.` and protocol |
