---
name: timeline
description: Chronological dated events — history, roadmap, or milestone sequence (forward- or backward-looking)
family: static
needs_interactivity: false
keywords:
  - timeline
  - history
  - milestones
  - roadmap
  - chronological
  - year
  - events over time
  - story of
---

Vertical dated-event list. Layout: date column (left, monospace, right-aligned) + dot marker (middle, with a thin vertical line connecting all dots) + content (right: title + 1-line body). 3–8 events in chronological order. ONE event may be tone:'accent' — highlight with BAP red date + BAP red dot to mark the current / most-recent / key milestone. Distinct from `stepper` (process with todo/doing/done status) — timeline is DATED historical (or future) events with no status concept. Each event container is clickable — add `data-bap-prompt="Tell me more about: <event title>"` and `cursor:pointer` on every event's outer wrapper.
