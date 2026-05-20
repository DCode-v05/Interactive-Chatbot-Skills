# Sample: opening-message chips

**User prompt:** "Hi — what can you do?"

**Why this is a chips case:** open-ended hello, no specific question. Offer a small menu of starting points instead of a wall of capabilities prose.

**What the skill emits:**

```json
{
  "widget": "chips",
  "version": "1.0",
  "title": "Try one of these",

  "chips": [
    {
      "id": "compare-tools",
      "label": "Compare tools",
      "prompt": "Compare PostgreSQL, MongoDB, and SQLite for a hobby blog"
    },
    {
      "id": "plan-launch",
      "label": "Plan a launch",
      "prompt": "Plan a product launch in 5 steps"
    },
    {
      "id": "show-dashboard",
      "label": "Show a KPI dashboard",
      "prompt": "Build a SaaS KPI dashboard: MRR, churn, ARPU, NPS"
    },
    {
      "id": "quick-quiz",
      "label": "Quick quiz",
      "prompt": "Make a 3-question quiz about HTTP status codes"
    }
  ]
}
```

## What this looks like rendered

A small header "Try one of these" above a row of 4 rounded pills. Each pill is a single button — hover lifts the border to BAP red.

## What clicks do

- User clicks **"Compare tools"** → chat fires "Compare PostgreSQL, MongoDB, and SQLite for a hobby blog" as the next user message
- User clicks **"Plan a launch"** → chat fires "Plan a product launch in 5 steps"

No re-typing. The prompt fires verbatim.
