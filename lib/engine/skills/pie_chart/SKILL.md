---
name: pie_chart
description: Part-to-whole breakdown
family: chart
needs_interactivity: false
keywords:
  - pie
  - pie chart
  - donut
  - breakdown
  - share
  - percentage
  - split
---

Inline SVG `<path>` arcs (compute with sin/cos per slice). ≤ 6 slices. Each slice `<path>` is clickable AND hoverable — add `data-bap-prompt="Show details for: <slice label>"` and `style="cursor:pointer"` on the path, AND wrap a `<title>` child element inside the path so the browser shows a native tooltip on hover (e.g. `<path ...><title>Engineering · 42%</title></path>`). The `<title>` content should pack the slice label + value/percent.
