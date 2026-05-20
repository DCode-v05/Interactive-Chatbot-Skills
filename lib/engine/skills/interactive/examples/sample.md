# Sample: tip calculator, JS-closures quiz, beta signup form

Three worked examples — one per variant.

---

## Variant: `calculator`

**User prompt:** "Give me a tip calculator I can play with."

**What the skill emits:**

```json
{
  "widget": "interactive",
  "variant": "calculator",
  "version": "1.0",
  "title": "Tip calculator",
  "inputs": [
    {
      "id": "bill",
      "label": "Bill amount",
      "kind": "number",
      "defaultValue": 50,
      "min": 0,
      "step": 1,
      "unit": "$"
    },
    {
      "id": "tipPct",
      "label": "Tip percentage",
      "kind": "range",
      "defaultValue": 18,
      "min": 0,
      "max": 40,
      "step": 1,
      "unit": "%"
    }
  ],
  "formula": "bill * (1 + tipPct / 100)",
  "outputLabel": "Total",
  "outputFormat": "currency",
  "explainPrompt": "Explain how this tip total is computed from the bill and tip percentage"
}
```

**What this looks like rendered:** the title sits above two labeled controls — a number input pre-filled with `50` and a range slider parked at `18%`. The "Total" panel below shows `$59.00` in big BAP-red type and recomputes on every keystroke / slider drag. An "Explain this calculation" chip sits underneath.

**What clicks do:** dragging the slider or editing the bill recomputes the output in-place — no chat continuation. Clicking the "Explain this calculation" chip fires `explainPrompt` as the next user message.

---

## Variant: `quiz`

**User prompt:** "Quiz me on JavaScript closures with 3 questions."

**What the skill emits:**

```json
{
  "widget": "interactive",
  "variant": "quiz",
  "version": "1.0",
  "title": "JavaScript closures — quick check",
  "questions": [
    {
      "id": "q1",
      "prompt": "What is a closure in JavaScript?",
      "options": [
        { "id": "a", "label": "A function bundled with references to its lexical scope", "correct": true },
        { "id": "b", "label": "A way to close the browser tab", "correct": false },
        { "id": "c", "label": "A type of object literal", "correct": false }
      ]
    },
    {
      "id": "q2",
      "prompt": "Which keyword does NOT create a new lexical scope inside a function?",
      "options": [
        { "id": "a", "label": "let", "correct": false },
        { "id": "b", "label": "const", "correct": false },
        { "id": "c", "label": "var", "correct": true }
      ]
    },
    {
      "id": "q3",
      "prompt": "What does this return? `const fn = (x => () => x)(5); fn();`",
      "options": [
        { "id": "a", "label": "undefined", "correct": false },
        { "id": "b", "label": "5", "correct": true },
        { "id": "c", "label": "ReferenceError", "correct": false }
      ]
    }
  ],
  "reviewPrompt": "Walk me through each closures-quiz answer and explain why the right ones are right"
}
```

**What this looks like rendered:** three fieldsets stacked vertically, each with the question text and a column of real radio buttons. A primary "Submit" button sits at the bottom. After submit, a "Score: 2 / 3" panel appears in large BAP-red type, each question gains a ✓ (green) or ✗ (red) SVG icon, and a "Walk me through each answer" chip is revealed.

**What clicks do:** selecting a radio updates local state only. Clicking "Submit" runs scoring in React and reveals the score + per-question feedback. Clicking the review chip fires `reviewPrompt` as the next user message.

---

## Variant: `form`

**User prompt:** "Build me a beta-signup form — email, name, role (designer/engineer/PM)."

**What the skill emits:**

```json
{
  "widget": "interactive",
  "variant": "form",
  "version": "1.0",
  "title": "Join the beta",
  "description": "We'll email you when your invite is ready.",
  "fields": [
    {
      "id": "name",
      "label": "Full name",
      "kind": "text",
      "placeholder": "Jane Doe"
    },
    {
      "id": "email",
      "label": "Work email",
      "kind": "email",
      "placeholder": "jane@example.com"
    },
    {
      "id": "role",
      "label": "Role",
      "kind": "select",
      "options": ["Designer", "Engineer", "Product manager"]
    },
    {
      "id": "context",
      "label": "What do you want to use it for?",
      "kind": "textarea",
      "placeholder": "Optional — one or two sentences"
    }
  ],
  "submitLabel": "Request invite",
  "submitPrompt": "I just filled out the beta signup form — confirm my place on the waitlist and explain next steps"
}
```

**What this looks like rendered:** the title and one-line description sit above a stack of four labeled controls — two text inputs, a `<select>`, and a textarea. The "Request invite" button is BAP-red at the bottom.

**What clicks do:** typing into fields is purely visual — no state is collected. Clicking "Request invite" fires `submitPrompt` as the next user message (the chat then continues from there). No page reload, no real `<form>` submission.
