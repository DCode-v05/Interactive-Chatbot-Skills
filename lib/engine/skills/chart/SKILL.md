---
name: chart
description: Numeric trend — bar / line / area
family: chart
needs_interactivity: false
keywords:
  - chart
  - graph
  - trend
  - growth
  - bar chart
  - line chart
  - metrics
---

Inline SVG only. 400×220 viewBox. BAP red #EC3B4A primary. Label data points. Each bar / data-point group is clickable AND hoverable — add `data-bap-prompt="What's the data for <label>?"` and `style="cursor:pointer"` on every `<rect>` (bars) or wrapping `<g>` (line/area data points), AND wrap a `<title>` child element inside the bar/group so the browser shows a native tooltip on hover (e.g. `<rect ...><title>Jan · $42K (+12%)</title></rect>`). The `<title>` should pack the data-point label + value (+ delta when relevant).
