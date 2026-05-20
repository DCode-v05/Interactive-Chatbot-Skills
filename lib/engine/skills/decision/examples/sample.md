# Sample: REST vs GraphQL · delete-staging confirm

## Variant: `tradeoff`

**User prompt:** "Should I use REST or GraphQL for my new API?"

**What the skill emits:**

```json
{
  "widget": "decision",
  "variant": "tradeoff",
  "version": "1.0",
  "heading": "REST vs GraphQL — which for the new API?",
  "options": [
    {
      "id": "rest",
      "label": "REST",
      "blurb": "Boring tech with proven tooling. Easier to cache, easier to debug, easier to onboard juniors. Fine if your endpoints are stable.",
      "recommended": true,
      "chooseLabel": "Go with REST",
      "choosePrompt": "Walk me through scaffolding a REST API for this use case"
    },
    {
      "id": "graphql",
      "label": "GraphQL",
      "blurb": "Single endpoint, client picks fields. Excellent for many heterogeneous clients (web + mobile + 3rd-party). Costs more in caching + ops complexity.",
      "recommended": false,
      "chooseLabel": "Go with GraphQL",
      "choosePrompt": "Walk me through scaffolding a GraphQL API for this use case"
    }
  ]
}
```

**What this looks like rendered:** a header with the decision question above two side-by-side option cards. The REST card has a filled BAP-red "Go with REST" CTA; the GraphQL card has an outlined CTA in the same accent. Hovering a card subtly tints its background.

**What clicks do:** clicking "Go with REST" fires `Walk me through scaffolding a REST API for this use case`. Clicking "Go with GraphQL" fires the corresponding GraphQL prompt.

---

## Variant: `destructive`

**User prompt:** "Delete the staging database — all rows."

**What the skill emits:**

```json
{
  "widget": "decision",
  "variant": "destructive",
  "version": "1.0",
  "question": "Delete the staging database?",
  "irreversibleNote": "All 312 rows will be permanently removed. This cannot be undone.",
  "actionLabel": "Delete database",
  "confirmedPrompt": "Confirmed — delete the staging database and report when done"
}
```

**What this looks like rendered:** a red-accented bar with the question, the irreversibleNote in muted text below it, a red "Delete database" button, and a Cancel button beside it.

**What clicks do:** clicking "Delete database" pops a native browser `window.confirm()` dialog (handled by the host's click delegator). If the user confirms, the `confirmedPrompt` fires as the next user message. Cancel (or dismissing the dialog) does nothing.
