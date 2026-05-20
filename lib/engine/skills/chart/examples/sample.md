# Sample: six chart variants

One worked vignette per variant. Each is the literal JSON the skill should emit — no prose, no fences, no HTML.

---

## Variant: `bar`

**User prompt:** "Show me revenue by quarter for 2024."

**What the skill emits:**

```json
{
  "widget": "chart",
  "variant": "bar",
  "version": "1.0",
  "title": "Revenue by quarter — 2024",
  "subtitle": "Net of refunds, USD thousands",
  "yUnits": "$K",
  "bars": [
    { "id": "q1", "label": "Q1", "value": 142, "clickPrompt": "Break Q1 2024 revenue down by month and product line" },
    { "id": "q2", "label": "Q2", "value": 168, "clickPrompt": "Break Q2 2024 revenue down by month and product line" },
    { "id": "q3", "label": "Q3", "value": 191, "clickPrompt": "Break Q3 2024 revenue down by month and product line" },
    { "id": "q4", "label": "Q4", "value": 234, "clickPrompt": "Break Q4 2024 revenue down by month and product line" }
  ]
}
```

**What this looks like rendered:** A 4-bar column chart. Y-axis ticks computed by the renderer from the max (234), gridlines drawn at each tick. Each bar is BAP red with the value labeled above it. Hovering any bar shows the native tooltip `Q1 · 142 $K`; clicking fires the per-bar prompt.

---

## Variant: `pie`

**User prompt:** "How is headcount split across departments?"

**What the skill emits:**

```json
{
  "widget": "chart",
  "variant": "pie",
  "version": "1.0",
  "title": "Headcount by department",
  "slices": [
    { "id": "eng", "label": "Engineering", "value": 42, "clickPrompt": "Show the org chart for the Engineering department" },
    { "id": "sales", "label": "Sales", "value": 18, "clickPrompt": "Show the org chart for the Sales department" },
    { "id": "design", "label": "Design", "value": 9, "clickPrompt": "Show the org chart for the Design department" },
    { "id": "ops", "label": "Operations", "value": 7, "clickPrompt": "Show the org chart for the Operations department" },
    { "id": "exec", "label": "Executive", "value": 4, "clickPrompt": "Show the org chart for the Executive team" }
  ]
}
```

**What this looks like rendered:** A 240×240 pie with 5 slices, largest (Engineering, 52.5%) in BAP red, the rest fading through pinks toward neutral gray for the smallest. Legend swatch row below the pie. Hover any slice for `Engineering · 52.5%`; click for the per-slice drill prompt.

---

## Variant: `scatter`

**User prompt:** "Plot ad spend vs revenue for each campaign last quarter."

**What the skill emits:**

```json
{
  "widget": "chart",
  "variant": "scatter",
  "version": "1.0",
  "title": "Ad spend vs revenue (Q3 2024)",
  "xLabel": "Ad spend ($K)",
  "yLabel": "Revenue ($K)",
  "units": "$K",
  "trendLine": true,
  "points": [
    { "id": "alpha", "label": "Alpha", "x": 8, "y": 24, "clickPrompt": "Show the daily breakdown for the Alpha campaign" },
    { "id": "beta", "label": "Beta", "x": 12, "y": 48, "clickPrompt": "Show the daily breakdown for the Beta campaign" },
    { "id": "gamma", "label": "Gamma", "x": 22, "y": 96, "clickPrompt": "Show the daily breakdown for the Gamma campaign" },
    { "id": "delta", "label": "Delta", "x": 30, "y": 110, "clickPrompt": "Show the daily breakdown for the Delta campaign" },
    { "id": "epsilon", "label": "Epsilon", "x": 6, "y": 18, "clickPrompt": "Show the daily breakdown for the Epsilon campaign" },
    { "id": "zeta", "label": "Zeta", "x": 18, "y": 62, "clickPrompt": "Show the daily breakdown for the Zeta campaign" }
  ]
}
```

**What this looks like rendered:** A 400×280 XY scatter. Renderer computes tick values from the min/max of x and y. Six BAP-red points, each `r=5`. A dashed gray linear-regression line is overlaid because `trendLine: true`. Hover any dot for `Gamma · (22, 96)`; click for the per-point drill prompt.

---

## Variant: `funnel`

**User prompt:** "Walk me through our signup-to-paid funnel."

**What the skill emits:**

```json
{
  "widget": "chart",
  "variant": "funnel",
  "version": "1.0",
  "title": "Signup → paid funnel (last 30 days)",
  "stages": [
    { "id": "signups", "name": "Signups", "count": 10000, "clickPrompt": "Where did the 10,000 signups come from? Break down by source." },
    { "id": "activated", "name": "Activated", "count": 4200, "clickPrompt": "What does 'activated' mean and why did 58% of signups drop off?" },
    { "id": "trial", "name": "Trial started", "count": 2100, "clickPrompt": "Why did half the activated users not start a trial?" },
    { "id": "paid", "name": "Paid", "count": 480, "clickPrompt": "What's the median time from trial start to paid conversion?" }
  ]
}
```

**What this looks like rendered:** Four stacked trapezoids in a 480×320 SVG, each narrower than the one above. Top stage BAP red, the rest fading through pinks to gray. Each stage labels itself with name + count + percent-of-top (Signups 100%, Activated 42%, Trial 21%, Paid 4.8%). Click any stage for the per-stage drill prompt.

---

## Variant: `radar`

**User prompt:** "Compare Slack vs Teams across the 5 collab traits we care about."

**What the skill emits:**

```json
{
  "widget": "chart",
  "variant": "radar",
  "version": "1.0",
  "title": "Slack vs Teams — collaboration traits",
  "axes": ["Usability", "Integrations", "Search", "Notifications", "Admin controls"],
  "maxValue": 5,
  "entities": [
    {
      "id": "slack",
      "name": "Slack",
      "color": "red",
      "values": [5, 5, 4, 3, 3],
      "clickPrompt": "Where does Slack score worst and what does the bottom-quartile feedback say?"
    },
    {
      "id": "teams",
      "name": "Teams",
      "color": "blue",
      "values": [3, 4, 3, 4, 5],
      "clickPrompt": "Where does Teams beat Slack and why?"
    }
  ]
}
```

**What this looks like rendered:** A 360×360 radar centered at (180,180). Five axes radiate from center with trait labels just past the tips. Light gray concentric guide pentagons at 25/50/75/100% of the radius. Slack drawn as a semi-transparent BAP-red polygon, Teams as a cool blue polygon. Legend at the bottom; click either polygon for the per-entity prompt.

---

## Variant: `heatmap`

**User prompt:** "Show me signups by weekday and hour-of-day."

**What the skill emits:**

```json
{
  "widget": "chart",
  "variant": "heatmap",
  "version": "1.0",
  "title": "Signups by weekday × hour-of-day",
  "xLabels": ["00", "03", "06", "09", "12", "15", "18", "21"],
  "yLabels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "maxValue": 80,
  "cells": [
    { "xIdx": 3, "yIdx": 0, "value": 42, "clickPrompt": "Why do Mondays at 09:00 spike? Show the 9–10am Monday cohort." },
    { "xIdx": 4, "yIdx": 0, "value": 56, "clickPrompt": "Investigate the Monday noon traffic" },
    { "xIdx": 3, "yIdx": 1, "value": 38, "clickPrompt": "Investigate Tuesday 09:00 traffic" },
    { "xIdx": 4, "yIdx": 1, "value": 48, "clickPrompt": "Investigate Tuesday 12:00 traffic" },
    { "xIdx": 5, "yIdx": 2, "value": 64, "clickPrompt": "Investigate Wednesday 15:00 traffic" },
    { "xIdx": 6, "yIdx": 2, "value": 72, "clickPrompt": "Why is Wednesday 18:00 the global peak?" },
    { "xIdx": 5, "yIdx": 3, "value": 58, "clickPrompt": "Investigate Thursday 15:00 traffic" },
    { "xIdx": 6, "yIdx": 4, "value": 80, "clickPrompt": "Investigate the Friday 18:00 peak" },
    { "xIdx": 7, "yIdx": 5, "value": 22, "clickPrompt": "Show the Saturday late-night cohort" },
    { "xIdx": 0, "yIdx": 6, "value": 8, "clickPrompt": "Show the Sunday post-midnight cohort" }
  ]
}
```

**What this looks like rendered:** A 7-row × 8-column HTML table. Each cell's background is `rgba(236,59,74, value/maxValue)` — so empty positions are transparent and the global peak (Friday 18:00 = 80) is full BAP red. Column headers across the top show the hours; row labels down the left show the weekdays. Every populated cell carries a click prompt; hovering any cell shows the native browser tooltip with its value.
