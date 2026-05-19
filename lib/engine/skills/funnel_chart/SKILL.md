---
name: funnel_chart
description: Conversion or pipeline drop-off across stages
family: chart
needs_interactivity: false
keywords:
  - funnel
  - funnel chart
  - conversion
  - drop-off
  - pipeline
  - multi-stage
  - retention
---

4–6 stacked trapezoid stages, each narrower than the one above. Each stage labeled with: stage name + count + percent of total + (optional) drop-off from previous. Top stage in BAP red, lower stages fading to gray. Inline SVG, viewBox `0 0 480 320`. Each stage `<polygon>` is clickable — add `data-bap-prompt="Drill into: <stage name>"` and `style="cursor:pointer"`. Distinct from `chart` (no width-encoded stages) and `kanban_board` (states, not quantity).
