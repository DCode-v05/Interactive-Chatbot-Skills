---
name: gantt_chart
description: Project schedule with overlapping tasks and durations
family: diagram
needs_interactivity: false
keywords:
  - gantt
  - gantt chart
  - schedule
  - project plan
  - milestones
  - task overlap
  - roadmap weeks
---

Horizontal bar per task across a date axis. Two-column layout: task names on the left, bar chart on the right. Inline SVG for the bar area (viewBox `0 0 600 320`; height scales with task count). Date headers across the top (months or weeks); optional dotted vertical "today" `<line>` marker. Each task's bar `<rect>` is clickable — add `data-bap-prompt="Show details for: <task name>"` and `style="cursor:pointer"`. Distinct from `stepper` (no durations), `timeline` (events not durations) and `kanban_board` (state not time).
