# Sample: refund-handling checklist + Lambda/Vercel/Workers table

## Variant: `checklist`

**User prompt:** "Give me a refund-handling checklist for support agents."

**What the skill emits:**

```json
{
  "widget": "list",
  "variant": "checklist",
  "version": "1.0",
  "title": "Refund-handling checklist",
  "items": [
    {
      "id": "confirm-eligibility",
      "label": "Confirm refund eligibility",
      "done": false,
      "note": "Check policy window, purchase type, and whether the item or service is refundable.",
      "clickPrompt": "Help me with: confirm refund eligibility"
    },
    {
      "id": "verify-order",
      "label": "Verify order and customer details",
      "done": false,
      "note": "Match the order ID, payment method, account name, and refund amount to the source record.",
      "clickPrompt": "Help me with: verify order and customer details"
    },
    {
      "id": "capture-reason",
      "label": "Capture the reason for the refund",
      "done": false,
      "note": "Document whether it is defect-related, duplicate purchase, service failure, or goodwill adjustment.",
      "clickPrompt": "Help me with: capture the reason for the refund"
    },
    {
      "id": "check-approvals",
      "label": "Check for required approvals",
      "done": false,
      "note": "Escalate large, unusual, or policy-exception refunds to the right manager or finance owner.",
      "clickPrompt": "Help me with: check for required approvals"
    },
    {
      "id": "issue-refund",
      "label": "Issue the refund in the payment system",
      "done": false,
      "note": "Trigger the refund, save the transaction id, and confirm the gateway accepted it.",
      "clickPrompt": "Help me with: issue the refund in the payment system"
    },
    {
      "id": "notify-customer",
      "label": "Notify the customer",
      "done": true,
      "clickPrompt": "Help me with: notify the customer"
    }
  ]
}
```

**What this looks like rendered:** vertical stack of cards. Each row has a **real SVG checkbox** on the left (filled with a checkmark when `done`, empty rounded square when not — no Unicode `□` rendering surprises). Click the row to fire its `clickPrompt`.

---

## Variant: `table`

**User prompt:** "Compare AWS Lambda, Vercel Functions, and Cloudflare Workers in a table."

**What the skill emits:**

```json
{
  "widget": "list",
  "variant": "table",
  "version": "1.0",
  "title": "Lambda vs Vercel Functions vs Workers",
  "columns": [
    { "id": "attribute", "label": "Attribute", "align": "left" },
    { "id": "lambda", "label": "AWS Lambda", "align": "left" },
    { "id": "vercel", "label": "Vercel Functions", "align": "left" },
    { "id": "workers", "label": "Cloudflare Workers", "align": "left" }
  ],
  "rows": [
    {
      "id": "runtime",
      "cells": {
        "attribute": "Runtime",
        "lambda": "Node, Python, Go, Java, custom",
        "vercel": "Node, Edge (V8)",
        "workers": "V8 isolates (JS / TS / WASM)"
      },
      "clickPrompt": "Tell me more about: runtime support"
    },
    {
      "id": "cold-start",
      "cells": {
        "attribute": "Cold-start",
        "lambda": "100–500ms",
        "vercel": "~0ms (Edge), 100–300ms (Node)",
        "workers": "<5ms"
      },
      "clickPrompt": "Tell me more about: cold-start behavior"
    },
    {
      "id": "pricing",
      "cells": {
        "attribute": "Pricing",
        "lambda": "$0.20 / 1M req + GB-s",
        "vercel": "Bundled in plan + overage",
        "workers": "$0.30 / 1M req (free tier 100k/day)"
      },
      "clickPrompt": "Tell me more about: pricing"
    }
  ]
}
```

**What this looks like rendered:** a real `<table>` with the column headers, the first cell of each row bolded as the row identifier, and the rest left-aligned. Hovering any row tints its background — the whole row is the click target.

**What clicks do:** clicking the "Cold-start" row fires `Tell me more about: cold-start behavior` as the next user message.
