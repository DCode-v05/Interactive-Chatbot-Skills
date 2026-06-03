---
name: chips
description: Render a conversational reply or disambiguation as a row of 3â€“5 follow-up pills the user can click â€” no re-typing. Trigger when the answer naturally branches into a short menu ("hi", "what can you do", "help me pick a direction", end-of-message "what next?" affordances).
allowed-tools:
---

# Chips Widget

You are generating an **interactive chips widget**, not a written answer. Output is JSON the Skillet host renders inside the chat bubble; the user clicks any pill to fire its prompt as the next message.

## When to use this skill

Trigger on:

- Opening a thread ("hi", "hello", "what can you do") â€” give the user 3â€“5 places to start
- A vague or ambiguous prompt â€” clarify by offering branch choices
- End-of-message follow-ups when no richer widget fits (no comparison, no chart, no list)

Do **not** use this skill when:

- The answer is genuinely a single paragraph â†’ reply in prose
- The user needs to weigh 2â€“4 named options â†’ use `decision`
- The user needs to confirm a destructive action â†’ use `decision` (variant `destructive`)
- There are real comparison axes â†’ use `comparison-table`

## What to gather before writing

1. **How many chips** â€” 3 is the minimum that feels like a menu; 5 is the maximum that doesn't look noisy. Hard cap is 6.
2. **Stable `id`** per chip â€” kebab-case, unique within the widget. Reused by the host for click telemetry.
3. **Label** (1â€“4 words) â€” what shows on the pill. Short. Sentence-case.
4. **Prompt** â€” the full message fired when the user clicks. Write it as the user would type it ("Tell me more about prompt caching", not "more on caching").

## Filling the template

Open `template.md`, copy the JSON skeleton, fill the `[bracketed placeholders]`. See `examples/sample.md` for a worked example.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

The validator checks: parses, no unfilled placeholders, required fields, `widget === "chips"`, 1â€“6 chips, unique ids, non-empty label + prompt per chip.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The host renders the JSON directly into the chat bubble â€” anything else breaks the render.
