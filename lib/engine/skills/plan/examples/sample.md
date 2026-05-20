# Sample: onboarding steps · YC milestones · migration Gantt

One worked vignette per variant.

---

## Variant: `steps`

**User prompt:** "Walk me through onboarding a new backend engineer."

**What the skill emits:**

```json
{
  "widget": "plan",
  "variant": "steps",
  "version": "1.0",
  "title": "Backend onboarding",
  "items": [
    {
      "id": "accounts",
      "n": 1,
      "title": "Provision accounts & access",
      "body": "GitHub, AWS read-only, Linear, PagerDuty (silent), and the team Slack channels.",
      "current": false,
      "clickPrompt": "Tell me more about step 1: provision accounts and access"
    },
    {
      "id": "local-env",
      "n": 2,
      "title": "Set up the local dev environment",
      "body": "Clone the monorepo, run the bootstrap script, verify tests pass on main.",
      "current": false,
      "clickPrompt": "Tell me more about step 2: set up the local dev environment"
    },
    {
      "id": "first-pr",
      "n": 3,
      "title": "Ship a paper-cut PR",
      "body": "Pick a tagged 'good-first-issue', open a PR end-to-end. Goal: feel the full release loop.",
      "current": true,
      "clickPrompt": "Tell me more about step 3: ship a paper-cut PR"
    },
    {
      "id": "oncall-shadow",
      "n": 4,
      "title": "Shadow an on-call shift",
      "body": "Pair with the primary for one week; you stay silent on the pager but follow every page.",
      "current": false,
      "clickPrompt": "Tell me more about step 4: shadow an on-call shift"
    },
    {
      "id": "own-service",
      "n": 5,
      "title": "Take ownership of a service",
      "body": "Pick one mid-tier service. Write the runbook, fix two papercuts, present it at team review.",
      "current": false,
      "clickPrompt": "Tell me more about step 5: take ownership of a service"
    }
  ]
}
```

**What this looks like rendered:** vertical list of 5 rows. Each row has a numbered circle on the left — step 3's circle is filled BAP-red with white text (the `current` marker); the rest are outlined in the muted color. The whole row is the click target with a pointer cursor.

**What clicks do:** clicking the step-3 row fires `Tell me more about step 3: ship a paper-cut PR` as the next user message.

---

## Variant: `dated`

**User prompt:** "Show me the key milestones of Y Combinator."

**What the skill emits:**

```json
{
  "widget": "plan",
  "variant": "dated",
  "version": "1.0",
  "title": "Y Combinator — milestones",
  "events": [
    {
      "id": "founded",
      "date": "2005",
      "title": "Founded by Paul Graham & Jessica Livingston",
      "body": "First Summer Founders Program in Cambridge, MA.",
      "accent": false,
      "clickPrompt": "Tell me more about: YC founded in 2005"
    },
    {
      "id": "dropbox",
      "date": "2007",
      "title": "Dropbox accepted into the W07 batch",
      "body": "Becomes the first YC unicorn and a frequent reference point in pitch reviews.",
      "accent": false,
      "clickPrompt": "Tell me more about: Dropbox in YC W07"
    },
    {
      "id": "airbnb",
      "date": "2009",
      "title": "Airbnb accepted into the W09 batch",
      "body": "Cereal-box ramen story enters the YC canon; demo day shifts the bar for traction.",
      "accent": false,
      "clickPrompt": "Tell me more about: Airbnb in YC W09"
    },
    {
      "id": "stripe",
      "date": "2010",
      "title": "Stripe accepted into the S10 batch",
      "body": "Patrick & John Collison. YC starts seeing more infrastructure / dev-tools companies.",
      "accent": false,
      "clickPrompt": "Tell me more about: Stripe in YC S10"
    },
    {
      "id": "5000",
      "date": "2024",
      "title": "~5,000 companies funded in total",
      "body": "Cumulative across all batches; combined market cap is in the trillions.",
      "accent": true,
      "clickPrompt": "Tell me more about: YC's ~5,000 funded companies milestone"
    }
  ]
}
```

**What this looks like rendered:** 3-column layout — monospace right-aligned date column, a column with a dot + vertical line connecting all dots, then a content column with the title and 1-line body. The 2024 row uses BAP-red for the date text and the dot; all others use the muted color.

**What clicks do:** clicking the 2024 row fires `Tell me more about: YC's ~5,000 funded companies milestone` as the next user message.

---

## Variant: `schedule`

**User prompt:** "Give me a Gantt for the data-migration project from Jan through end of May 2026, with today's marker."

**What the skill emits:**

```json
{
  "widget": "plan",
  "variant": "schedule",
  "version": "1.0",
  "title": "Data migration — Jan to May 2026",
  "dateRange": {
    "startISO": "2026-01-01",
    "endISO": "2026-05-31"
  },
  "tasks": [
    {
      "id": "schema",
      "name": "Schema migration",
      "startISO": "2026-01-15",
      "endISO": "2026-02-28",
      "clickPrompt": "Show details for: schema migration"
    },
    {
      "id": "backfill",
      "name": "Backfill",
      "startISO": "2026-02-05",
      "endISO": "2026-03-20",
      "clickPrompt": "Show details for: backfill"
    },
    {
      "id": "cutover",
      "name": "Cutover",
      "startISO": "2026-03-22",
      "endISO": "2026-04-05",
      "clickPrompt": "Show details for: cutover"
    },
    {
      "id": "post-cutover-cleanup",
      "name": "Post-cutover cleanup",
      "startISO": "2026-04-06",
      "endISO": "2026-05-15",
      "clickPrompt": "Show details for: post-cutover cleanup"
    }
  ],
  "today": "2026-05-20"
}
```

**What this looks like rendered:** title at the top, then an inline SVG Gantt chart. Date axis along the top with month tick labels derived from `dateRange`. Each task is a rounded BAP-red horizontal bar; bar x-position and width are computed by the renderer from the ISO dates against the range (model never specifies pixels). A dotted light-blue vertical line marks `today` with a small "today" label.

**What clicks do:** clicking the `backfill` bar fires `Show details for: backfill` as the next user message. Hovering any bar shows a native tooltip with `Backfill · 2026-02-05 → 2026-03-20`.
