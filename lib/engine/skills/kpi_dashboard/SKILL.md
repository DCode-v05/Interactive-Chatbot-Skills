---
name: kpi_dashboard
description: Grid of metric tiles
family: dashboard
needs_interactivity: false
keywords:
  - dashboard
  - kpi
  - metrics
  - tiles
  - scorecard
  - analytics
---

Metric tile grid: big number + label + delta + optional inline sparkline. Each tile is clickable — add `data-bap-prompt="Drill into: <metric name>"` and `cursor:pointer` on every tile's outer wrapper so the user can drill into any KPI.
