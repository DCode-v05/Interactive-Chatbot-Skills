# Interactive — Template

Pick exactly one variant. Replace every `[bracketed placeholder]`.

## Variant: `calculator`

```json
{
  "widget": "interactive",
  "variant": "calculator",
  "version": "1.0",
  "title": "[Calculator title, e.g. 'Tip calculator']",
  "inputs": [
    {
      "id": "[identifier — must match the name used in formula]",
      "label": "[Visible label above the control]",
      "kind": "number",
      "defaultValue": 0,
      "min": 0,
      "max": 1000,
      "step": 1,
      "unit": "[Optional suffix, e.g. '$', '%', 'kg'. Omit if none.]"
    },
    {
      "id": "[second identifier]",
      "label": "[Label]",
      "kind": "range",
      "defaultValue": 18,
      "min": 0,
      "max": 40,
      "step": 1,
      "unit": "%"
    }
  ],
  "formula": "[Arithmetic in input ids only, e.g. 'bill * (1 + tipPct / 100)']",
  "outputLabel": "[Label above the output panel]",
  "outputFormat": "currency",
  "outputUnit": "[Optional suffix appended to the formatted number. Omit if none.]",
  "explainPrompt": "[Full prompt fired when user clicks 'Explain this calculation']"
}
```

## Variant: `quiz`

```json
{
  "widget": "interactive",
  "variant": "quiz",
  "version": "1.0",
  "title": "[Quiz title, e.g. 'JavaScript closures quiz']",
  "questions": [
    {
      "id": "[kebab-case-question-id]",
      "prompt": "[Question text]",
      "options": [
        { "id": "a", "label": "[Option A]", "correct": true },
        { "id": "b", "label": "[Option B]", "correct": false },
        { "id": "c", "label": "[Option C]", "correct": false }
      ]
    }
  ],
  "reviewPrompt": "[Full prompt fired when user clicks 'Walk me through each answer' after submit]"
}
```

## Variant: `form`

```json
{
  "widget": "interactive",
  "variant": "form",
  "version": "1.0",
  "title": "[Form title, e.g. 'Sign up for the beta']",
  "description": "[Optional one-line subtitle. Omit if redundant.]",
  "fields": [
    {
      "id": "[kebab-case-field-id]",
      "label": "[Field label]",
      "kind": "text",
      "placeholder": "[Optional placeholder. Omit if none.]"
    },
    {
      "id": "[second-field-id]",
      "label": "[Label]",
      "kind": "select",
      "options": ["[Option 1]", "[Option 2]"]
    }
  ],
  "submitLabel": "[Button label, e.g. 'Sign up' or 'Send']",
  "submitPrompt": "[Full prompt fired as the next user message when submit is clicked]"
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | all | yes | `"interactive"` |
| `version` | all | yes | `"1.0"` |
| `variant` | all | yes | `"calculator"`, `"quiz"`, or `"form"` |
| `title` | all | yes | Non-empty |
| `inputs` | calculator | yes | 2–5 entries, unique ids |
| `inputs[].kind` | calculator | yes | `"number"` or `"range"` |
| `inputs[].defaultValue` | calculator | yes | Finite number |
| `inputs[].min` / `max` / `step` | calculator | no | Numbers; `min` ≤ `max` |
| `inputs[].unit` | calculator | no | Suffix shown next to the value |
| `formula` | calculator | yes | Arithmetic in input ids only: `+ - * /` + parens + numeric literals. No `=`, no `;`, no unknown identifiers. Formula identifiers are `[A-Za-z_][A-Za-z0-9_]*` — no hyphens. |
| `outputLabel` | calculator | yes | Non-empty |
| `outputFormat` | calculator | yes | `"currency"` \| `"number"` \| `"percent"` |
| `outputUnit` | calculator | no | Optional suffix appended after the formatted number |
| `explainPrompt` | calculator | yes | Non-empty |
| `questions` | quiz | yes | 3–5 entries, unique ids |
| `questions[].options` | quiz | yes | 2–4 entries, unique ids, **exactly 1** with `correct: true` |
| `reviewPrompt` | quiz | yes | Non-empty |
| `description` | form | no | Optional subtitle |
| `fields` | form | yes | 2–7 entries, unique ids |
| `fields[].kind` | form | yes | `"text"` \| `"email"` \| `"textarea"` \| `"select"` |
| `fields[].options` | form | required if `kind: "select"` | ≥ 2 non-empty strings |
| `submitLabel` | form | yes | Non-empty |
| `submitPrompt` | form | yes | Non-empty — fires as the next user message on submit click |
