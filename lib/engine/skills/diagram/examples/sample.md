# Sample: one worked vignette per diagram variant

Each example below is what the model emits — the host renders the JSON into SVG with the renderer computing every pixel coordinate.

---

## Variant: `flow`

**User prompt:** "Show the sign-up flow with email verification and a duplicate-account branch."

**What the skill emits:**

```json
{
  "widget": "diagram",
  "variant": "flow",
  "version": "1.0",
  "title": "Sign-up flow",
  "nodes": [
    { "id": "start", "label": "Start", "row": 0, "col": 0, "accent": true, "clickPrompt": "Explain the entry point of the sign-up flow" },
    { "id": "submit", "label": "Submit form", "row": 0, "col": 1, "clickPrompt": "Explain the submit-form step of sign-up" },
    { "id": "check", "label": "Email taken?", "row": 0, "col": 2, "clickPrompt": "Explain the duplicate-email check" },
    { "id": "verify", "label": "Send verify", "row": 1, "col": 2, "clickPrompt": "Explain the email-verification step" },
    { "id": "reject", "label": "Reject", "row": 0, "col": 3, "clickPrompt": "Explain what happens on a duplicate email" },
    { "id": "done", "label": "Account live", "row": 1, "col": 3, "clickPrompt": "Explain the account-active state" }
  ],
  "edges": [
    { "from": "start", "to": "submit" },
    { "from": "submit", "to": "check" },
    { "from": "check", "to": "reject", "label": "yes" },
    { "from": "check", "to": "verify", "label": "no" },
    { "from": "verify", "to": "done" }
  ]
}
```

**What this looks like rendered:** six rounded boxes laid out on a 2-row × 4-col grid. "Start" has a BAP-red outline (accent). Each edge is a one-bend polyline that touches the source box's right or bottom edge midpoint and the target box's left or top edge midpoint — the renderer clips endpoints to box edges so no arrow head ever lands inside a box. Edge labels ("yes" / "no") sit at the midpoint of each polyline.

**What clicks do:** clicking a box fires its `clickPrompt` as the next user message.

---

## Variant: `sequence`

**User prompt:** "Trace the OAuth handshake between browser, app, and identity provider."

**What the skill emits:**

```json
{
  "widget": "diagram",
  "variant": "sequence",
  "version": "1.0",
  "title": "OAuth handshake",
  "actors": ["Browser", "App", "IdP"],
  "messages": [
    { "id": "login-click",   "fromIdx": 0, "toIdx": 1, "label": "GET /login",        "kind": "request",  "clickPrompt": "Explain the GET /login step" },
    { "id": "redirect",      "fromIdx": 1, "toIdx": 0, "label": "302 → IdP",         "kind": "response", "clickPrompt": "Explain the redirect to the identity provider" },
    { "id": "auth-request",  "fromIdx": 0, "toIdx": 2, "label": "GET /authorize",    "kind": "request",  "clickPrompt": "Explain the authorize request to the IdP" },
    { "id": "code-back",     "fromIdx": 2, "toIdx": 0, "label": "302 ?code=...",     "kind": "response", "clickPrompt": "Explain the auth code redirect" },
    { "id": "callback",      "fromIdx": 0, "toIdx": 1, "label": "GET /callback",     "kind": "request",  "clickPrompt": "Explain the callback step" },
    { "id": "token-swap",    "fromIdx": 1, "toIdx": 2, "label": "POST /token",       "kind": "request",  "clickPrompt": "Explain the token exchange" },
    { "id": "token-back",    "fromIdx": 2, "toIdx": 1, "label": "access_token",      "kind": "response", "clickPrompt": "Explain the access-token response" }
  ]
}
```

**What this looks like rendered:** three column headers at the top ("Browser", "App", "IdP"), each with a vertical gray lifeline running down. Seven horizontal message arrows top-to-bottom — request arrows are BAP red solid, response arrows are gray dashed. The renderer computes actor x positions (evenly spaced), message y positions (60 + i\*40), and arrowhead direction (left or right) automatically from `fromIdx` / `toIdx`.

**What clicks do:** clicking any message arrow (the line or its label) fires its `clickPrompt`.

---

## Variant: `tree`

**User prompt:** "Show the engineering org under the CTO."

**What the skill emits:**

```json
{
  "widget": "diagram",
  "variant": "tree",
  "version": "1.0",
  "title": "Engineering org",
  "root": {
    "id": "cto",
    "label": "CTO",
    "accent": true,
    "clickPrompt": "Tell me about the CTO role",
    "children": [
      {
        "id": "platform",
        "label": "Platform",
        "clickPrompt": "Tell me about the Platform team",
        "children": [
          { "id": "infra",   "label": "Infra",   "clickPrompt": "Tell me about the Infra sub-team" },
          { "id": "devex",   "label": "DevEx",   "clickPrompt": "Tell me about the DevEx sub-team" }
        ]
      },
      {
        "id": "product",
        "label": "Product",
        "clickPrompt": "Tell me about the Product engineering team",
        "children": [
          { "id": "web",    "label": "Web",    "clickPrompt": "Tell me about the Web team" },
          { "id": "mobile", "label": "Mobile", "clickPrompt": "Tell me about the Mobile team" }
        ]
      },
      { "id": "research", "label": "Research", "clickPrompt": "Tell me about the Research team" }
    ]
  }
}
```

**What this looks like rendered:** the CTO box sits centered at the top in BAP red with white text. Three children sit below ("Platform", "Product", "Research") and two of those have their own children. The renderer runs a post-order traversal — leaves get sequential x slots (0, 1, 2, 3, 4 for Infra/DevEx/Web/Mobile/Research) and each parent's x is the mean of its children's x, so subtrees never overlap.

**What clicks do:** clicking any node fires its `clickPrompt`.

---

## Variant: `mind`

**User prompt:** "Brainstorm angles for our launch positioning."

**What the skill emits:**

```json
{
  "widget": "diagram",
  "variant": "mind",
  "version": "1.0",
  "title": "Launch positioning",
  "central": "Launch",
  "branches": [
    { "id": "audience",     "label": "Audience",     "clickPrompt": "Drill into the audience angle of the launch" },
    { "id": "pain",         "label": "Pain point",   "clickPrompt": "Drill into the pain-point angle of the launch" },
    { "id": "alternatives", "label": "Alternatives", "clickPrompt": "Drill into how we compare to alternatives" },
    { "id": "wedge",        "label": "Wedge",        "clickPrompt": "Drill into our wedge / hook for the launch" },
    { "id": "proof",        "label": "Proof",        "clickPrompt": "Drill into our proof / social-proof angle" }
  ]
}
```

**What this looks like rendered:** a BAP-red filled circle in the center showing "Launch", with five branch nodes arranged at 360°/5 = 72° intervals around it. The renderer computes each branch's x/y from `cos`/`sin` of its angle at a radius of ~170 from the center — you do not specify angles.

**What clicks do:** clicking any branch (the circle + its label as one group) fires its `clickPrompt`.

---

## Variant: `venn`

**User prompt:** "Compare OKRs, KPIs, and metrics — where do they overlap?"

**What the skill emits:**

```json
{
  "widget": "diagram",
  "variant": "venn",
  "version": "1.0",
  "title": "OKRs vs KPIs vs metrics",
  "sets": [
    { "id": "okr",    "label": "OKRs" },
    { "id": "kpi",    "label": "KPIs" },
    { "id": "metric", "label": "Metrics" }
  ],
  "regions": [
    { "id": "okr-only",        "label": "Ambition",      "setIds": ["okr"],                  "clickPrompt": "Show me what is unique to OKRs" },
    { "id": "kpi-only",        "label": "Targets",       "setIds": ["kpi"],                  "clickPrompt": "Show me what is unique to KPIs" },
    { "id": "metric-only",     "label": "Raw counts",    "setIds": ["metric"],               "clickPrompt": "Show me what is unique to plain metrics" },
    { "id": "okr-kpi",         "label": "Goal-aligned",  "setIds": ["okr", "kpi"],           "clickPrompt": "Show me what OKRs and KPIs share" },
    { "id": "okr-metric",      "label": "Observable",    "setIds": ["okr", "metric"],        "clickPrompt": "Show me what OKRs and metrics share" },
    { "id": "kpi-metric",      "label": "Measured",      "setIds": ["kpi", "metric"],        "clickPrompt": "Show me what KPIs and metrics share" },
    { "id": "all",             "label": "Steerable",     "setIds": ["okr", "kpi", "metric"], "clickPrompt": "Show me the OKR ∩ KPI ∩ metric overlap" }
  ]
}
```

**What this looks like rendered:** three semi-transparent overlapping circles (BAP red, light blue, light amber). The renderer drops each region label at the hardcoded centroid for its set combination — `["okr"]` goes top-left, `["kpi","metric"]` goes bottom-center, etc. You do not specify positions.

**What clicks do:** clicking any region label fires its `clickPrompt`.
