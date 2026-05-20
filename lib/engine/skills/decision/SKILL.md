---
name: decision
description: Render an option-pick or a destructive-action confirmation as a typed widget. Trigger when the user faces a choice between 2–4 named options with tradeoffs (`tradeoff`) or needs to confirm an irreversible action like delete / send / publish (`destructive`).
allowed-tools:
---

# Decision Widget

You are generating an **interactive decision widget**, not a written answer. Two variants — pick exactly one per turn.

## When to use this skill

**variant: `tradeoff`** — 2–4 named options with comparable merit:

- "Should I use REST or GraphQL for my new API?"
- "TypeScript or Python for a new microservice?"
- "Postgres vs MySQL for the order system"

**variant: `destructive`** — a single irreversible action the user is about to take:

- "Delete the staging database"
- "Send a cold email to 200 prospects"
- "Publish this draft to production"

Do **not** use this skill when:

- The comparison has structured attributes / per-row winners → use `comparison-table`
- The choice is open-ended ("what should I do next?") → use `chips`
- The "decision" is really just acknowledging a status → use `notice` variant `banner`

## What to gather before writing

For **tradeoff**:

1. **2–4 options**, each with `id` (kebab-case), `label`, a 1–2 sentence `blurb`, a `chooseLabel` (verb on the CTA), and `choosePrompt` (the literal next-message string).
2. **Exactly one** option has `recommended: true` — that one gets the filled BAP-red CTA; the others get outlined CTAs.

For **destructive**:

1. **`question`** — the action being confirmed, ending with `?` (e.g. "Delete the staging database?").
2. **`irreversibleNote`** (optional) — a short note like "Cannot be undone." or "All 312 rows will be permanently removed."
3. **`actionLabel`** — the destructive verb shown on the red button ("Delete", "Send", "Publish").
4. **`confirmedPrompt`** — fires AFTER the user confirms through the host's `window.confirm()` gate.

## Filling the template

See `template.md` for both variants. See `examples/sample.md` for worked vignettes.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

Validator checks: required fields, variant enum, tradeoff 2–4 options with unique ids and exactly one `recommended: true`, destructive non-empty `question`/`actionLabel`/`confirmedPrompt`.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The React host renders it and owns the confirmation gate for destructive actions.
