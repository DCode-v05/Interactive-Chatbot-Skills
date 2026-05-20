# Sample: SaaS scorecard, profile card, sprint board, pricing plans

One worked vignette per variant. The validator extracts the **first** ```json fence below — keep `kpi` first so that fence is the one tested.

---

## Variant: `kpi`

**User prompt:** "Build a SaaS scorecard for this quarter — MRR, churn, ARPU, NPS."

**Why this is a kpi case:** the whole answer IS a small grid of metric tiles, no prose explanation needed. 4 tiles is the sweet spot.

**What the skill emits:**

```json
{
  "widget": "dashboard",
  "variant": "kpi",
  "version": "1.0",
  "title": "Q3 scorecard",
  "tiles": [
    {
      "id": "mrr",
      "metric": "MRR",
      "value": "$42K",
      "deltaText": "+12% MoM",
      "deltaDirection": "up",
      "clickPrompt": "Drill into: MRR"
    },
    {
      "id": "churn",
      "metric": "CHURN",
      "value": "4.2%",
      "deltaText": "−0.6% MoM",
      "deltaDirection": "down",
      "clickPrompt": "Drill into: churn"
    },
    {
      "id": "arpu",
      "metric": "ARPU",
      "value": "$87",
      "deltaText": "Flat",
      "deltaDirection": "flat",
      "clickPrompt": "Drill into: ARPU"
    },
    {
      "id": "nps",
      "metric": "NPS",
      "value": "+38",
      "deltaText": "+4 QoQ",
      "deltaDirection": "up",
      "clickPrompt": "Drill into: NPS"
    }
  ]
}
```

**What this looks like rendered:** a 3-column grid of bordered tiles. Each tile shows the small uppercase metric label, the big bold value (24px+), and a delta row with a real SVG arrow icon — green up-arrow for `up`, red down-arrow for `down`, gray horizontal line for `flat`. The whole tile has `cursor:pointer`.

**What clicks do:** clicking the "MRR" tile fires `Drill into: MRR` as the next user message.

---

## Variant: `profile`

**User prompt:** "Render a profile card for Jane Doe — Eng Lead, 3 years tenure, 12 reports."

**What the skill emits:**

```json
{
  "widget": "dashboard",
  "variant": "profile",
  "version": "1.0",
  "name": "Jane Doe",
  "initials": "JD",
  "role": "Engineering Lead",
  "stats": [
    { "label": "TENURE", "value": "3 yr" },
    { "label": "REPORTS", "value": "12" },
    { "label": "TEAM", "value": "Platform" }
  ],
  "action": {
    "label": "Message",
    "prompt": "Draft a message to Jane Doe"
  }
}
```

**What this looks like rendered:** a flex row — circular BAP-red avatar with "JD" centered in white, name + role stacked next to it, three small stats inline (uppercase label above bold value), and a BAP-red primary CTA button on the right.

**What clicks do:** clicking "Message" fires `Draft a message to Jane Doe` as the next user message. The avatar and stats themselves are not clickable — only the CTA.

---

## Variant: `kanban`

**User prompt:** "Show our sprint as a kanban — Backlog / In progress / Done."

**What the skill emits:**

```json
{
  "widget": "dashboard",
  "variant": "kanban",
  "version": "1.0",
  "title": "Sprint 14",
  "columns": [
    {
      "id": "backlog",
      "name": "Backlog",
      "cards": [
        {
          "id": "card-rate-limit",
          "title": "Add request rate limiting",
          "meta": "P2 · API",
          "clickPrompt": "Show details for: Add request rate limiting"
        },
        {
          "id": "card-audit-log",
          "title": "Audit log retention policy",
          "meta": "P3 · Compliance",
          "clickPrompt": "Show details for: Audit log retention policy"
        }
      ]
    },
    {
      "id": "in-progress",
      "name": "In progress",
      "cards": [
        {
          "id": "card-sso-okta",
          "title": "SSO with Okta",
          "meta": "Due Fri · @maya",
          "clickPrompt": "Show details for: SSO with Okta"
        },
        {
          "id": "card-billing-portal",
          "title": "Self-serve billing portal",
          "meta": "@diego",
          "clickPrompt": "Show details for: Self-serve billing portal"
        }
      ]
    },
    {
      "id": "done",
      "name": "Done",
      "cards": [
        {
          "id": "card-export-csv",
          "title": "Export dashboards as CSV",
          "meta": "Shipped Mon",
          "clickPrompt": "Show details for: Export dashboards as CSV"
        }
      ]
    }
  ]
}
```

**What this looks like rendered:** a 3-column grid (one column per `columns[]`). Each column header shows the name plus a small card count badge ("Backlog · 2"). Cards are bordered rectangles with the title in bold and the optional meta line in muted monospace. Every card has `cursor:pointer`.

**What clicks do:** clicking the "SSO with Okta" card fires `Show details for: SSO with Okta`.

---

## Variant: `pricing`

**User prompt:** "Render a 3-tier pricing plan: Free, Pro (recommended), Enterprise."

**What the skill emits:**

```json
{
  "widget": "dashboard",
  "variant": "pricing",
  "version": "1.0",
  "heading": "Choose your plan",
  "tiers": [
    {
      "id": "free",
      "name": "FREE",
      "price": "$0",
      "priceSuffix": "/mo",
      "features": [
        { "text": "Up to 3 seats", "included": true },
        { "text": "Community support", "included": true },
        { "text": "SSO / SCIM", "included": false },
        { "text": "Priority queue", "included": false }
      ],
      "cta": {
        "label": "Start free",
        "prompt": "Sign me up for the Free plan"
      },
      "recommended": false
    },
    {
      "id": "pro",
      "name": "PRO",
      "price": "$29",
      "priceSuffix": "/seat/mo",
      "features": [
        { "text": "Unlimited seats", "included": true },
        { "text": "Email + chat support", "included": true },
        { "text": "SSO / SCIM", "included": true },
        { "text": "Audit log export", "included": false }
      ],
      "cta": {
        "label": "Start Pro",
        "prompt": "Sign me up for the Pro plan"
      },
      "recommended": true
    },
    {
      "id": "enterprise",
      "name": "ENTERPRISE",
      "price": "Custom",
      "features": [
        { "text": "Everything in Pro", "included": true },
        { "text": "Dedicated CSM", "included": true },
        { "text": "Custom SLAs + DPA", "included": true },
        { "text": "On-prem deployment", "included": true }
      ],
      "cta": {
        "label": "Contact sales",
        "prompt": "Contact sales about the Enterprise plan"
      },
      "recommended": false
    }
  ]
}
```

**What this looks like rendered:** a 3-column grid of tier cards. Each card shows the small uppercase tier name, the big price + suffix, and a vertical feature list — included features get a real SVG check icon (BAP red), excluded features get an SVG × icon in muted gray. The Pro tier has a 2px BAP-red border and an absolutely-positioned "Recommended" ribbon centered above the card top edge.

**What clicks do:** clicking "Start Pro" fires `Sign me up for the Pro plan`. Clicking "Contact sales" fires `Contact sales about the Enterprise plan`.
