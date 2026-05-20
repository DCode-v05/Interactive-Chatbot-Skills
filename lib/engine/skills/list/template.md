# List — Template

Pick exactly one variant.

## Variant: `checklist`

```json
{
  "widget": "list",
  "variant": "checklist",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "items": [
    {
      "id": "[kebab-case-item-id]",
      "label": "[The thing to check off]",
      "done": false,
      "note": "[Optional 1-line elaboration. Omit if redundant.]",
      "clickPrompt": "[Full prompt fired when this row is clicked]"
    }
  ]
}
```

## Variant: `table`

```json
{
  "widget": "list",
  "variant": "table",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "columns": [
    { "id": "[col-id-1]", "label": "[Column header]", "align": "left" },
    { "id": "[col-id-2]", "label": "[Column header]", "align": "left" }
  ],
  "rows": [
    {
      "id": "[kebab-case-row-id]",
      "cells": {
        "[col-id-1]": "[cell value]",
        "[col-id-2]": "[cell value]"
      },
      "clickPrompt": "[Full prompt fired when this row is clicked]"
    }
  ]
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | both | yes | `"list"` |
| `version` | both | yes | `"1.0"` |
| `variant` | both | yes | `"checklist"` or `"table"` |
| `items` | checklist | yes | 3–12 items, unique ids |
| `items[].done` | checklist | yes | Boolean — drives the SVG checkbox state |
| `items[].clickPrompt` | checklist | yes | Non-empty |
| `columns` | table | yes | 2–4 columns, unique ids |
| `columns[].align` | table | no | `"left"` (default) / `"center"` / `"right"` |
| `rows` | table | yes | 2–10 rows, unique ids |
| `rows[].cells` | table | yes | Must have a key for every column id |
| `rows[].clickPrompt` | table | yes | Non-empty |
