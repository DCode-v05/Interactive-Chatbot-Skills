---
name: plan
description: Render sequential or temporal layouts as a typed widget instead of prose. Trigger on "walk me through", "give me steps", "show the milestones / history of X", "show a roadmap / project plan / Gantt with overlapping tasks", or any answer whose shape IS an ordered list of steps, dated events, or scheduled tasks.
allowed-tools:
---

# Plan Widget

You are generating an **interactive plan widget**, not a written answer. The widget has three variants â€” pick exactly one per turn. Output is JSON the Skillet host renders; you provide the data, the renderer controls every pixel (arrow alignment, dot centering, bar positioning).

## When to use this skill

**variant: `steps`** â€” numbered process where the *order* is the story (no real dates):

- "Walk me through onboarding a new engineer"
- "What are the steps to migrate from Pages Router to App Router?"
- "How do I rotate a production secret?"

**variant: `dated`** â€” historical or future events tied to specific dates (no status / no overlap):

- "Show me the milestones of Y Combinator"
- "Roadmap of GPT model releases since 2018"
- "Key launch dates for Project Phoenix"

**variant: `schedule`** â€” overlapping work with start/end durations on a date axis (Gantt):

- "Give me a project plan for the migration with overlapping workstreams"
- "Show the next 3 months of releases as a Gantt"
- "When does each phase of onboarding overlap?"

Do **not** use this skill when:

- The answer is a single status outcome â†’ use `notice` variant `banner`
- The items are unordered (tick them off in any order) â†’ use `list` variant `checklist`
- The user wants a Kanban board (todo / doing / done columns) â†’ use `dashboard` variant `kanban`
- Only 1â€“2 items exist â†’ reply in prose

## What to gather before writing

For **steps**:

1. **3â€“6 items.** Fewer feels too thin; more is fatigue. Each item has an `n` (the display number, increasing monotonically) and a stable kebab-case `id`.
2. **At most one `current: true`** â€” marks the "you-are-here" step. Renderer fills its circle in BAP red. If the user hasn't started yet or has finished, omit the current marker (all `current: false`).
3. **`clickPrompt`** per step â€” write it as the user would type ("Tell me more about step 3: rotate the secret in production").

For **dated**:

1. **3â€“8 events in chronological order.** Don't sort backwards â€” the renderer trusts your order.
2. **`date`** is display-only (e.g. `"2005"`, `"Jan 2026"`, `"2026-05-20"`). Pick a granularity that matches the timeline (year-only for a decade, month-day for a quarter).
3. **At most one `accent: true`** â€” the key / most-recent / current milestone, rendered with BAP-red date + dot.

For **schedule**:

1. **`dateRange`** â€” the x-axis bounds (`startISO`, `endISO`, both `YYYY-MM-DD`). Pick a range that comfortably contains all task spans.
2. **2â€“8 `tasks`** â€” each with `startISO`, `endISO`, both inside `dateRange`. Tasks may overlap (that's the whole point).
3. **`today`** (optional) â€” `YYYY-MM-DD`. If present, must fall inside `dateRange`. The renderer draws a dotted vertical line at that x.
4. Never include pixel coordinates. The renderer derives every `x`, `width`, and tick position from the ISO dates.

## Filling the template

Open `template.md`, copy the skeleton for your chosen variant, and replace every `[bracketed placeholder]`. See `examples/sample.md` for worked vignettes per variant.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

Validator checks: required fields per variant, item / event / task counts within bounds, unique ids, monotonically-increasing `n` (steps), at most one `current` (steps), at most one `accent` (dated), every task's start/end (and `today`, if present) inside `dateRange` (schedule), ISO date round-trip (no Feb 31).

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The host renders it directly.
