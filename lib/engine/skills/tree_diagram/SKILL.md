---
name: tree_diagram
description: Top-down hierarchy — org chart, file tree, parent/child taxonomy
family: diagram
needs_interactivity: false
keywords:
  - tree
  - tree diagram
  - hierarchy
  - org chart
  - file tree
  - taxonomy
  - parent child
---

Top-down hierarchy. Root node centered at top, 2–4 children per level, 2–3 levels deep (≤ 10 nodes total). Inline SVG, viewBox `0 0 600 360`. Each node is a rounded `<rect>` with a label `<text>`; straight or right-angle `<line>` segments connect parent → children. Each node `<g>` is clickable — add `data-bap-prompt="Expand: <node label>"` and `style="cursor:pointer"`. Distinct from `mind_map` (radial, no parent/child semantics) and `flowchart` (no hierarchy).
