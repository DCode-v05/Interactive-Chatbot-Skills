# Decision — Template

Pick exactly one variant.

## Variant: `tradeoff`

```json
{
  "widget": "decision",
  "variant": "tradeoff",
  "version": "1.0",
  "heading": "[The decision being made, e.g. 'REST vs GraphQL for the new API']",
  "options": [
    {
      "id": "[kebab-case-option-id]",
      "label": "[Display name]",
      "blurb": "[1-2 sentence summary]",
      "recommended": true,
      "chooseLabel": "[Verb on the CTA, e.g. 'Pick REST']",
      "choosePrompt": "[Full prompt fired when this option's CTA is clicked]"
    },
    {
      "id": "[second-option-id]",
      "label": "[Display name]",
      "blurb": "[1-2 sentence summary]",
      "recommended": false,
      "chooseLabel": "[Verb on the CTA]",
      "choosePrompt": "[Full prompt fired when this option's CTA is clicked]"
    }
  ]
}
```

## Variant: `destructive`

```json
{
  "widget": "decision",
  "variant": "destructive",
  "version": "1.0",
  "question": "[The action being confirmed, ending with '?']",
  "irreversibleNote": "[Optional 'Cannot be undone.' or similar. Omit if redundant.]",
  "actionLabel": "[Destructive verb on the red button, e.g. 'Delete']",
  "confirmedPrompt": "[Full prompt fired AFTER the user confirms through window.confirm()]"
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | both | yes | `"decision"` |
| `version` | both | yes | `"1.0"` |
| `variant` | both | yes | `"tradeoff"` or `"destructive"` |
| `heading` | tradeoff | yes | Non-empty |
| `options` | tradeoff | yes | 2–4 entries, unique ids, exactly one `recommended: true` |
| `options[].recommended` | tradeoff | yes | Boolean; exactly one option per widget true |
| `question` | destructive | yes | Non-empty, typically ends with `?` |
| `irreversibleNote` | destructive | no | Optional |
| `actionLabel` | destructive | yes | Destructive verb (Delete / Send / Publish) |
| `confirmedPrompt` | destructive | yes | Fires AFTER `window.confirm()` returns true |
