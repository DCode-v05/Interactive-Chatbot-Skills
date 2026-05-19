---
name: scatter_plot
description: Two-variable correlation or point-cloud distribution
family: chart
needs_interactivity: false
keywords:
  - scatter
  - scatter plot
  - correlation
  - point cloud
  - xy plot
  - regression
---

XY plane with dots. Inline SVG, viewBox `0 0 400 280`. X-axis bottom, Y-axis left, both with tick labels and a unit caption. 8–30 data points as small `<circle>`s in BAP red. Optional trend line as a dashed gray `<line>`. Each data-point `<circle>` is clickable — add `data-bap-prompt="Show details for point: <label>"` and `style="cursor:pointer"`. Distinct from `chart` (bar/line/area only — no scatter).
