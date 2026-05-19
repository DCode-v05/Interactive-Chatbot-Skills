---
name: sequence_diagram
description: Actor-to-actor message flow over time (request/response trace)
family: diagram
needs_interactivity: false
keywords:
  - sequence
  - sequence diagram
  - actors
  - message flow
  - lifeline
  - request flow
  - trace
  - handshake
---

Vertical lifelines per actor (2–5) running top-to-bottom, with horizontal arrows between them showing time-ordered messages. Inline SVG (viewBox `0 0 600 400`). BAP red `#EC3B4A` for the primary request path, gray (or dashed gray) for responses. Each message arrow `<g>` wrapping the `<line>` + label `<text>` is clickable — add `data-bap-prompt="Explain: <message label>"` and `style="cursor:pointer"`. Distinct from `flowchart` (decision branches, no time axis) and `timeline` (single column, no actors).
