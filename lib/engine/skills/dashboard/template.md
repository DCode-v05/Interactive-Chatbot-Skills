# Dashboard — Template

Pick exactly one variant. Copy the JSON skeleton, replace every `[bracketed placeholder]`, and emit. The validator rejects any unfilled placeholders.

## Variant: `kpi`

```json
{
  "widget": "dashboard",
  "variant": "kpi",
  "version": "1.0",
  "title": "[Optional 2-4 word header. Omit if none.]",
  "tiles": [
    {
      "id": "[kebab-case-tile-id]",
      "metric": "[Short uppercase label, e.g. MRR]",
      "value": "[Big display value, e.g. $42K]",
      "deltaText": "[Optional delta caption, e.g. +12% MoM]",
      "deltaDirection": "[up | down | flat]",
      "clickPrompt": "[Full prompt fired when this tile is clicked]"
    }
  ]
}
```

## Variant: `profile`

```json
{
  "widget": "dashboard",
  "variant": "profile",
  "version": "1.0",
  "name": "[Display name]",
  "initials": "[1-3 letters shown inside the avatar]",
  "role": "[Optional role / title. Omit if none.]",
  "stats": [
    { "label": "[UPPERCASE STAT LABEL]", "value": "[Bold value]" }
  ],
  "action": {
    "label": "[Primary CTA button label]",
    "prompt": "[Full prompt fired when the CTA is clicked]"
  }
}
```

## Variant: `kanban`

```json
{
  "widget": "dashboard",
  "variant": "kanban",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "columns": [
    {
      "id": "[kebab-case-column-id]",
      "name": "[Column header, e.g. Backlog]",
      "cards": [
        {
          "id": "[kebab-case-card-id-unique-globally]",
          "title": "[Card title]",
          "meta": "[Optional meta line, e.g. Due Fri or P1]",
          "clickPrompt": "[Full prompt fired when this card is clicked]"
        }
      ]
    }
  ]
}
```

## Variant: `pricing`

```json
{
  "widget": "dashboard",
  "variant": "pricing",
  "version": "1.0",
  "heading": "[Heading above the tier grid]",
  "tiers": [
    {
      "id": "[kebab-case-tier-id]",
      "name": "[UPPERCASE TIER NAME, e.g. FREE]",
      "price": "[Big price, e.g. $0 or Custom]",
      "priceSuffix": "[Optional suffix, e.g. /mo]",
      "features": [
        { "text": "[Feature description]", "included": true }
      ],
      "cta": {
        "label": "[CTA button label]",
        "prompt": "[Full prompt fired when the CTA is clicked]"
      },
      "recommended": false
    }
  ]
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | all | yes | Must be exactly `"dashboard"` |
| `version` | all | yes | Currently `"1.0"` |
| `variant` | all | yes | `"kpi"` / `"profile"` / `"kanban"` / `"pricing"` |
| `title` | kpi, kanban | no | Optional short header |
| `tiles` | kpi | yes | 3–6 entries, unique ids |
| `tiles[].metric` | kpi | yes | Short uppercase label |
| `tiles[].value` | kpi | yes | Big display value |
| `tiles[].deltaText` | kpi | no | Caption next to the arrow icon |
| `tiles[].deltaDirection` | kpi | no | `"up"` / `"down"` / `"flat"` — drives icon + color |
| `tiles[].clickPrompt` | kpi | yes | Non-empty |
| `name` | profile | yes | Display name |
| `initials` | profile | yes | 1–3 characters |
| `role` | profile | no | Title / role line |
| `stats` | profile | no | 0–4 `{ label, value }` pairs |
| `action.label` | profile | yes | CTA button label |
| `action.prompt` | profile | yes | Non-empty |
| `columns` | kanban | yes | 2–4 columns, unique ids |
| `columns[].cards` | kanban | yes | 1–6 cards per column |
| `columns[].cards[].id` | kanban | yes | Unique GLOBALLY across all columns |
| `columns[].cards[].meta` | kanban | no | Short meta line |
| `columns[].cards[].clickPrompt` | kanban | yes | Non-empty |
| `heading` | pricing | yes | Non-empty heading above the tier grid |
| `tiers` | pricing | yes | 3 or 4 tiers, unique ids |
| `tiers[].name` | pricing | yes | Uppercase tier label |
| `tiers[].price` | pricing | yes | Display price ("$0", "Custom") |
| `tiers[].priceSuffix` | pricing | no | Suffix shown next to the price |
| `tiers[].features` | pricing | yes | 2–8 features, each with boolean `included` |
| `tiers[].cta` | pricing | yes | `{ label, prompt }` — both non-empty |
| `tiers[].recommended` | pricing | yes | Boolean; exactly ONE tier in the widget is `true` |
