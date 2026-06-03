---
name: code_block
description: Render a single code snippet as a typed widget â€” filename header strip with an "Explain this code" click target on the filename plus a Copy button, and a monospace dark code body. Trigger when the answer IS a code snippet (a function, a query, a script) the user is meant to read, copy, and possibly ask about.
allowed-tools:
---

# Code Block Widget

You are generating an **interactive code-block widget**, not a written answer. Output is JSON the Skillet host renders inside the chat bubble; the renderer controls every pixel (header strip, language badge, Copy button, monospace body).

## When to use this skill

Trigger when the whole reply is a single code snippet the user wants to read and copy:

- "Write me a Python function that retries with backoff"
- "Show me the SQL to deduplicate emails"
- "Give me a TypeScript debounce"
- "Paste me a fetch wrapper"

Do **not** use this skill when:

- The reply is a multi-file project â€” split into a follow-up, or describe in prose
- The answer is explanation + a short inline snippet â†’ reply in prose with a fenced block
- The user wants a side-by-side comparison of two snippets â†’ use `comparison-table`
- The user wants an interactive editable cell â†’ that's a different (future) skill

## What to gather before writing

1. **filename** â€” a sensible filename that hints at the language and purpose (e.g. `fetch_with_retry.py`, `deduplicate-emails.sql`, `debounce.ts`). Lowercase, snake_case or kebab-case, with the conventional extension. This text is the chat-continuation click target.
2. **language** â€” a lowercase letters-only slug (`python`, `sql`, `ts`, `go`, `rust`, `bash`). Used by the renderer for the small language badge. No version suffixes, no dots â€” letters only.
3. **code** â€” the literal source. Preserve indentation and line breaks exactly. Tabs or spaces â€” be consistent. May contain any characters; the renderer escapes via React text-node escaping. Capped at 8000 characters.
4. **explainPrompt** â€” the literal next-message string fired when the user clicks the filename. Phrase it as the user would type ("Explain this fetch_with_retry.py code line by line", not "explain code").

## Filling the template

Open `template.md`, copy the JSON skeleton, fill the `[bracketed placeholders]`. See `examples/sample.md` for a worked example.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

The validator checks: parses, no unfilled placeholders, required fields, `widget === "code-block"`, non-empty `filename` / `language` / `code` / `explainPrompt`, `code` length â‰¤ 8000, `language` matches `/^[a-z]+$/`.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. The host renders the JSON directly into the chat bubble â€” anything else breaks the render.
