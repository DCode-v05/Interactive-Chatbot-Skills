---
name: map
description: Geographic locations, itinerary, or region highlight
family: diagram
needs_interactivity: false
keywords:
  - map
  - locations
  - pins
  - geo
  - region
  - route
  - itinerary
  - cities
reminders:
  - Pin coordinates are APPROXIMATE — based on training-time knowledge of city locations, not live geo data. State the limitation in a small footer caption if precision matters.
---

Stylized SVG region with location pins. Inline SVG sized to the region (viewBox `0 0 600 360` for a world or continent; tighter for a country/state). Sketch the region as a single `<path>` (or a couple of paths) — a recognizable outline, not cartographically accurate. Pins are `<circle>`s with a small label `<text>` placed at the approximate (x, y) mapping of each location. For itineraries: a connecting `<polyline>` between the pins. Each pin `<g>` is clickable — add `data-bap-prompt="Tell me more about: <location>"` and `style="cursor:pointer"`. Best for "here are N cities" / "show me the route" — not for precise geographic analysis.
