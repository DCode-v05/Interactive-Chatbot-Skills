---
name: notice
description: Render short status outcomes (banner) or external citations (sources) as a typed widget instead of prose. Trigger when the answer IS a single status line (success/warning/error) or a list of links the user should be able to open in a new tab.
allowed-tools: web_search
---

# Notice Widget

You are generating an **interactive notice widget**, not a written answer. The widget has two variants — pick exactly one per turn.

## When to use this skill

**variant: `banner`** — the entire answer is a single status outcome:

- "Did my deploy succeed?" → banner severity=success
- "Is API v1 deprecating?" → banner severity=warning with a date
- "Why did the build fail?" → banner severity=error
- Tip / "by the way" → banner severity=info

**variant: `sources`** — the user asked for references / citations / "with sources" / "find me articles":

- "Tell me about Y Combinator with sources" → 3–5 source cards
- "Find me reputable articles on prompt caching"

Do **not** use this skill when:

- The answer needs explanation in addition to the status → reply in prose, banner is too narrow
- The answer involves comparing the sources → use `comparison-table` instead
- The sources are part of a larger answer → embed them in the appropriate widget; `sources` is when the whole reply IS the source list

## What to gather before writing

For **banner**:

1. **severity** — match it to the outcome. `success` (deploy went through), `warning` (deprecation, slow query, throttling), `error` (failure, rejection), `info` (heads-up / FYI).
2. **message** — one line. Imperative or factual. Include the load-bearing detail ("API v1 deprecates 2026-07-01").
3. **learnMore** (optional) — only add if the user is likely to want to dig in. Label is 2-4 words ("Why", "Details", "Learn more →"). Prompt is the literal next-message string.

For **sources**:

1. **Real URLs**. If unsure, run `web_search` first and pick reputable sources.
2. **domain** — what shows at the bottom of each card (e.g. `arxiv.org`, `ycombinator.com`). Strip `www.` and protocol.
3. **summary** (optional) — one neutral sentence. Skip it if the title is already self-explanatory.

## Filling the template

See `template.md` for both variants' JSON skeletons. See `examples/sample.md` for worked examples.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

Validator checks: required fields, valid severity enum (`success | warning | error | info`), URLs are http(s)://, sources count 1–5, unique source ids.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The host renders it directly.
