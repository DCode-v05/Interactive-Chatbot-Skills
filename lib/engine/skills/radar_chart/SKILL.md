---
name: radar_chart
description: Multi-dimensional comparison across 3–6 axes (1–3 entities)
family: chart
needs_interactivity: false
keywords:
  - radar
  - radar chart
  - spider chart
  - polar chart
  - multi-dimensional
  - profile comparison
---

Circular/polygonal axis system. Inline SVG, viewBox `0 0 360 360`, centered axes. 4–6 axes radiating from center (one per trait), with trait labels at the tips. Light gray concentric guide polygons + axis `<line>`s. 1–3 entities each drawn as a closed `<polygon>` connecting their values along each axis (semi-transparent fill + colored stroke). Legend at the bottom. Each entity's polygon is clickable — add `data-bap-prompt="Compare: <entity name>"` and `style="cursor:pointer"`. Distinct from `chart` (one-dimensional), `table` (no visual shape).
