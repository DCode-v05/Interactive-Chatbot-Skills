# Chart — Template

Pick exactly one variant. Replace every `[bracketed placeholder]`. Provide DATA ONLY — the renderer handles all geometry.

## Variant: `bar`

```json
{
  "widget": "chart",
  "variant": "bar",
  "version": "1.0",
  "title": "[Chart title, e.g. Revenue by quarter]",
  "subtitle": "[Optional 1-line context. Omit field if none.]",
  "yUnits": "[Optional y-axis units, e.g. $K. Omit field if none.]",
  "bars": [
    {
      "id": "[kebab-case-id]",
      "label": "[Short label under the bar, e.g. Q1]",
      "value": 0,
      "clickPrompt": "[Full prompt fired when the bar is clicked]",
      "tooltipExtra": "[Optional extra hover detail. Omit field if none.]"
    }
  ]
}
```

## Variant: `pie`

```json
{
  "widget": "chart",
  "variant": "pie",
  "version": "1.0",
  "title": "[Chart title, e.g. Headcount by department]",
  "slices": [
    {
      "id": "[kebab-case-id]",
      "label": "[Slice label, e.g. Engineering]",
      "value": 0,
      "clickPrompt": "[Full prompt fired when this slice is clicked]"
    }
  ]
}
```

## Variant: `scatter`

```json
{
  "widget": "chart",
  "variant": "scatter",
  "version": "1.0",
  "title": "[Chart title, e.g. Ad spend vs revenue]",
  "xLabel": "[X-axis label, e.g. Ad spend ($K)]",
  "yLabel": "[Y-axis label, e.g. Revenue ($K)]",
  "units": "[Optional shared tick unit suffix. Omit field if none.]",
  "trendLine": false,
  "points": [
    {
      "id": "[kebab-case-id]",
      "label": "[Point label, e.g. Campaign A]",
      "x": 0,
      "y": 0,
      "clickPrompt": "[Full prompt fired when this point is clicked]"
    }
  ]
}
```

## Variant: `funnel`

```json
{
  "widget": "chart",
  "variant": "funnel",
  "version": "1.0",
  "title": "[Funnel title, e.g. Signup → paid funnel]",
  "stages": [
    {
      "id": "[kebab-case-id]",
      "name": "[Stage name, e.g. Signups]",
      "count": 0,
      "clickPrompt": "[Full prompt fired when this stage is clicked]"
    }
  ]
}
```

## Variant: `radar`

```json
{
  "widget": "chart",
  "variant": "radar",
  "version": "1.0",
  "title": "[Chart title, e.g. Slack vs Teams]",
  "axes": ["[Trait 1]", "[Trait 2]", "[Trait 3]"],
  "maxValue": 5,
  "entities": [
    {
      "id": "[kebab-case-id]",
      "name": "[Entity name, e.g. Slack]",
      "color": "red",
      "values": [0, 0, 0],
      "clickPrompt": "[Full prompt fired when this entity is clicked]"
    }
  ]
}
```

## Variant: `heatmap`

```json
{
  "widget": "chart",
  "variant": "heatmap",
  "version": "1.0",
  "title": "[Heatmap title, e.g. Signups by weekday and hour]",
  "xLabels": ["[col 0]", "[col 1]", "[col 2]"],
  "yLabels": ["[row 0]", "[row 1]"],
  "maxValue": 100,
  "cells": [
    {
      "xIdx": 0,
      "yIdx": 0,
      "value": 0,
      "clickPrompt": "[Full prompt fired when this cell is clicked]"
    }
  ]
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | all | yes | `"chart"` |
| `version` | all | yes | `"1.0"` |
| `variant` | all | yes | One of `bar`, `pie`, `scatter`, `funnel`, `radar`, `heatmap` |
| `title` | all | yes | Non-empty string |
| `subtitle` | bar | no | 1-line context shown under the title |
| `yUnits` | bar | no | Short y-axis unit suffix |
| `bars` | bar | yes | 2–12 items; unique ids; `value ≥ 0` |
| `slices` | pie | yes | 2–6 items; unique ids; `value > 0`; renderer computes percent |
| `xLabel` / `yLabel` | scatter | yes | Non-empty axis labels |
| `units` | scatter | no | Optional shared tick suffix |
| `points` | scatter | yes | 4–30 items; unique ids; numeric `x` and `y` |
| `trendLine` | scatter | no | If `true`, renderer draws linear fit as dashed gray line |
| `stages` | funnel | yes | 3–6 items; unique ids; `count > 0` AND non-increasing |
| `axes` | radar | yes | 3–7 non-empty trait names |
| `maxValue` | radar / heatmap | yes | `> 0`; ceiling for value range |
| `entities` | radar | yes | 1–3 items; unique ids; `values.length === axes.length`; each value in `[0..maxValue]` |
| `entities[].color` | radar | yes | `"red"` \| `"blue"` \| `"gray"` |
| `xLabels` / `yLabels` | heatmap | yes | Header arrays (≥ 2 each) |
| `cells` | heatmap | yes | Sparse; `xIdx`/`yIdx` integer indexes into the label arrays; `value` in `[0..maxValue]`; missing positions render as 0 |
| `clickPrompt` | all data elements | yes | Full follow-up prompt the user sends by clicking |
