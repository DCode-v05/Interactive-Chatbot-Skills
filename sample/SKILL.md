---
name: comparison-table
description: Render a vs-question as an interactive comparison table widget instead of a paragraph of prose. Trigger when the user asks to compare 2 or more options, frameworks, tools, products, plans, or approaches, or uses phrases like "vs", "versus", "compare", "which is better", "differences between", or "X or Y for [use case]". Each row, column header, and cell is a click target that fires a contextual follow-up â€” no re-typing required.
allowed-tools: web_search
---

# Comparison Table Widget

You are generating an **interactive comparison-table widget**, not a written answer. The output is JSON that the Skillet host renders inside the chat bubble. The user will then click rows, columns, or cells to drill in. Your job is to pick the right options and attributes, fill the template, validate it, and emit it.

## When to use this skill

Trigger on vs-questions:

- "Compare X vs Y" / "X versus Y" / "X or Y?"
- "Differences between X and Y"
- "Which is better, X or Y?"
- "Pros and cons of X vs Y"
- Implicit: "Should I pick X or Y for [use case]?"

Do **not** use this skill when:

- The user wants a single recommendation in prose â†’ defer to the default reply path
- Only one option is on the table â†’ use the `decision-card` skill
- The comparison is across time (trend) â†’ use the `chart` skill
- More than 6 options are involved â†’ narrow to a top-N first, then use this skill

## What to gather before writing

1. **Options to compare** â€” 2 to 6. More than 6 won't render; cluster or shortlist first.
2. **Attributes (rows)** â€” 4 to 10. Pick attributes that matter *for the user's stated use case*. If they asked "which DB for a hobby project," `free tier` matters more than `max throughput`. Do not pad with generic specs.
3. **Cell values** â€” if pricing, versions, or feature support could be stale, run `web_search` before filling cells. Do not guess current numbers.
4. **Per-attribute winner** â€” set `isWinner: true` on the cell that wins that row. If subjective or tied, leave all `false`.

## Filling the template

Open `template.md`, copy the JSON skeleton, fill it in. See `examples/sample.md` for a fully worked example.

Rules:

- Every `id` is kebab-case, stable, unique within its section.
- Every cell exists for every option â€” no missing keys. Use `value: "N/A"` if unknown.
- `format` controls how the cell renders. Pick one: `text`, `number`, `currency`, `boolean`, `rating` (1â€“5).
- `summary` is 2â€“3 sentences of neutral takeaway. Do not recommend an option unless the user explicitly asked "which should I pick."
- `followUps` are 3 question strings the host shows as chips below the table.

## Wiring click targets

The `clickPromptTemplate` on each element is the prompt the chat fires when the user clicks it. Use these placeholders, which the host substitutes at click time:

- `{option}` â†’ the option's `label`
- `{attribute}` â†’ the attribute's `label`
- `{value}` â†’ the cell's `value`
- `{options}` â†’ comma-joined list of all option labels

Standard templates (use these verbatim unless you have a reason to deviate):

- **Option header**: `Why might I choose {option} overall?`
- **Attribute row**: `How do {options} compare on {attribute}?`
- **Cell**: `Explain {option}'s {attribute}: {value}`

## Validate before emitting

After filling the template, write the JSON to a file and run:

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

The validator checks: parses as JSON, required fields present, IDs unique, every option has a cell in every attribute, no `[placeholder]` strings left behind. The widget will not render if validation fails â€” fix and re-validate before sending.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences around it. No "Here's the comparison:" lead-in. The host renders the JSON directly into the chat bubble â€” anything else breaks the render.
