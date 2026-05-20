---
name: interactive
description: Render a live calculator, a scored quiz, or a visual form as a typed JSON widget. Trigger when the answer should let the user manipulate inputs (calculator), test their knowledge (quiz), or collect structured input (signup / contact / settings form). The React renderer owns runtime behavior — model provides DATA only, never scripts.
allowed-tools:
---

# Interactive Widget

You are generating an **interactive widget**, not a written answer and not raw HTML. The widget has three variants — pick exactly one per turn.

The renderer is a typed React component. **Do not emit `<script>` tags. Do not emit `<form action>` or `<input onchange>`. Do not write JavaScript.** Calculator math, quiz scoring, form submission — all of it lives in the React component. You only ship the data shape below.

## When to use this skill

**variant: `calculator`** — the answer is a live numeric tool the user manipulates:

- "Tip calculator with a slider for the tip percentage"
- "BMI calculator (height + weight → BMI)"
- "Monthly mortgage payment from principal, rate, term"
- "Convert miles to kilometers / Fahrenheit to Celsius"

**variant: `quiz`** — the answer is multiple-choice questions the user answers and gets a score:

- "Quiz me on JavaScript closures (5 questions)"
- "Trivia: SQL window functions"
- "Test my React state management knowledge"

**variant: `form`** — the answer is a visual structured-input collection. The form does NOT actually save anything — clicking submit fires `submitPrompt` as the next user message:

- "Signup form for a beta waitlist"
- "Contact form with name / email / message"
- "Onboarding settings: name + role + notifications preference"

Do **not** use this skill when:

- The user wants a clickable suggestion strip → use `chips` instead
- The list of options is open-ended / not multiple-choice → use `chips` or prose
- The answer is one piece of information the user can't change → prose, or `notice` if it's a status

## What to gather before writing

For **calculator**:

1. **2–5 inputs**. Each has a unique `id`, a `label`, a `kind` (`"number"` or `"range"`), and a `defaultValue`. Add `min`/`max`/`step` for ranges. Add a `unit` if the value isn't dimensionless ("$", "%", "kg").
2. **`formula`** — an arithmetic expression in the input ids using `+ - * /` and parens only. Numeric literals are allowed. Example: `"bill * (1 + tipPct / 100)"`. **Use plain identifiers** (`[A-Za-z_][A-Za-z0-9_]*`) — the parser doesn't understand kebab-case in formulas. If your input ids are kebab-case, switch them to camelCase or snake_case before referencing them in the formula.
3. **`outputLabel`**, **`outputFormat`** (`"currency"` | `"number"` | `"percent"`), optional **`outputUnit`**.
4. **`explainPrompt`** — what fires when the user clicks the "Explain this calculation" chip below the result. Write it as the user would type it.

For **quiz**:

1. **3–5 questions** with unique ids.
2. Each question has **2–4 options** with unique ids. **Exactly one** option per question has `correct: true`.
3. **`reviewPrompt`** — fires when the user clicks "Walk me through each answer" after submit.

For **form**:

1. **2–7 fields** with unique ids.
2. Field `kind` is one of `"text"`, `"email"`, `"textarea"`, `"select"`. For `"select"`, supply `options: string[]` with at least 2 entries.
3. Optional `placeholder` per field. Optional one-line `description` under the title.
4. **`submitLabel`** ("Sign up", "Send") and **`submitPrompt`** (the literal next-message string).

## Filling the template

See `template.md` for all three variants' JSON skeletons. See `examples/sample.md` for a worked vignette per variant.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

Validator checks: required fields, variant enum, ids unique, counts in range (calculator 2–5 inputs / quiz 3–5 questions × 2–4 options / form 2–7 fields), exactly one correct option per quiz question, formula references only input ids + numeric literals + `+ - * /` + parens (no semicolons, no unknown identifiers, no `=`), select fields have ≥ 2 options.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. No `<script>` tags. The React host renders it directly and owns all interactivity.
