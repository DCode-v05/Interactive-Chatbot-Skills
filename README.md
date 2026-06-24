# Skillet

**A chat where the AI answers in typed, clickable UI widgets — charts, tables, plans, diagrams — instead of a wall of markdown.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat&logo=react&logoColor=black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Anthropic](https://img.shields.io/badge/Anthropic-191919?style=flat&logo=anthropic&logoColor=white) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) ![Google Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat&logo=googlegemini&logoColor=white)

## Overview

Most AI chat hands you prose even when the right answer is a chart, a comparison matrix, or a step-by-step plan. Text is hard to scan, it isn't clickable, and it makes the reader rebuild structure the model already had in its head.

Skillet flips that. The model is given a catalog of 12 typed widget "skills" and a strict JSON contract for each one. An agentic tool-use loop drives the model to pick the right widget for the question, fill its schema, and submit it through a single terminal tool. The engine validates the JSON, streams it to the browser over Server-Sent Events, and a typed renderer registry turns it into a hand-written React component. Every widget ships with at least one click target whose prompt is baked into the JSON, so clicking a chart bar, a decision card, or a follow-up chip becomes your next message and the conversation drives itself.

I built this during my AI engineering internship at September AI as one of the agentic-UI prototypes for the company's Business Asset Platform. It is a self-contained Next.js app that runs against Anthropic, Google, or OpenAI models, tracks live token cost and prompt-cache hit rate per turn, and ships an eval harness that sweeps every model against a prompt set and ranks them by dollars-per-successful-render.

## Key Features

- **Typed widget output, not text.** The model answers by submitting a JSON object that conforms to one of 12 widget schemas. The renderer owns every pixel — axes, arrows, checkbox icons, color scales — and the model only supplies data.
- **Agentic tool-use loop** with a single terminal tool, `submit_widget_json(intent, widget, prose?)`, capped at 8 iterations. Invalid JSON is sent back to the model with the validator's issues so it can self-correct and retry.
- **12 widget skills:** comparison-table, chart, plan, diagram, dashboard, decision, interactive, list, map, code-block, notice, and chips — many with multiple variants (e.g. chart covers bar, pie, scatter, funnel, radar, heatmap).
- **Per-skill JSON-schema validation.** Each skill has its own `validate.ts` that rejects unfilled `[bracketed placeholders]`, missing required fields, out-of-range array counts, and wrong placeholder tokens before anything renders.
- **Seven models across three providers** behind one provider-agnostic interface — Anthropic Claude (Sonnet/Haiku), Google Gemini (two variants), and OpenAI GPT (three variants) — selectable from the UI.
- **SSE streaming** end to end: text deltas, tool calls, tool results, the final widget, and a usage summary all stream as named events.
- **Live cost and cache tracking.** Every turn reports input/output/cache tokens, cache-hit rate, and a computed dollar cost from a real per-million-token pricing table.
- **Agent-trace view** that shows each iteration of the tool loop — which tool was called, with what input summary, and what the validator said.
- **Self-driving interactivity.** Click prompts are pre-baked into widget JSON; the host fires them as the next user turn. Destructive actions get a `window.confirm()` gate; source cards open externally in a new tab.
- **Eval harness** (`npm run eval`) that runs every model × skill-on/off combination over a test-prompt set and prints a $/successful-render ranking.
- **One-click export** of a conversation to a standalone HTML page, plus single-widget export.

## How It Works

### Request flow

1. The user types a prompt in the composer, picks a model, and optionally toggles the frontend-design skill on.
2. The browser POSTs `{ message, history, providerId, useSkill }` to `app/api/engine/execute/route.ts`, which responds with a `text/event-stream`.
3. The route calls `runEngine(...)` and forwards each yielded event to the client as an SSE frame (`event: <type>` + `data: <json>`).
4. `lib/hooks/useChat.ts` consumes the stream and reduces it into a `ChatMessage`; `OutputSystem` walks the message blocks and dispatches the widget through the renderer registry to the matching React component.

### The engine loop

The core lives in `lib/engine/run-engine.ts`. It builds the system prompt (the freeform widget prompt, optionally prefixed with a vendored frontend-design skill), assembles the message history, and then runs up to `MAX_ITERATIONS = 8` turns against the selected provider:

- Each turn streams text deltas and tool calls. Text is yielded straight through as `text_delta` events so the UI can show the model thinking.
- When the model calls `submit_widget_json`, the executor looks up the skill in the JSON registry and runs that skill's validator.
- If the JSON is **valid**, the widget is captured as the final render and the loop ends. If **invalid**, the validator's issues are returned as a tool result and the model loops back with corrected JSON.
- Token usage is accumulated across every iteration (including prompt-cache reads and writes), and a final `usage` event carries the summed tokens, cache-hit rate, and computed cost.

The tool itself (`lib/engine/tools/schemas.ts`) is marked `terminal: true` and takes `{ intent, widget, prose? }`. The intent enum is generated from the skill registry, so there is exactly one source of truth for which widgets exist.

### Widget skills

Each widget is a self-contained skill folder under `lib/engine/skills/<intent>/`:

- `SKILL.md` — when and how to use the widget, with variant guidance.
- `template.md` — the JSON skeleton the model fills.
- `validate.ts` — the schema enforcer that gates rendering.
- `examples/sample.md` — worked examples.
- `scripts/validate.sh` — a CLI check that reads from the same registry.

`lib/engine/skills/json-registry.ts` is the single source of truth: adding a new widget is one registry line plus a schema, a validator, and a renderer-registry entry. The 12 widgets map to renderers like this:

| Intent | Renderer | What it shows |
|---|---|---|
| `comparison-table` | `ComparisonTableWidget` | Options × attributes matrix with per-attribute winner badges and per-cell tooltips |
| `chart` | `ChartWidget` | Bar, pie, scatter (with trend line), funnel, radar, heatmap |
| `plan` | `PlanWidget` | Numbered steps, dated timeline, or Gantt-style schedule |
| `diagram` | `DiagramWidget` | Flowchart, sequence, tree, mind-map, Venn |
| `dashboard` | `DashboardWidget` | KPI tiles, profile card, kanban board, pricing tiers |
| `decision` | `DecisionWidget` | Trade-off option cards or a destructive-action confirm gate |
| `interactive` | `InteractiveWidget` | Live calculators, quizzes, forms |
| `list` | `ListWidget` | Checklists with real SVG checkboxes, or multi-column tables |
| `map` | `MapWidget` | Stylized region SVG with clickable pins |
| `code-block` | `CodeBlockWidget` | Syntax-highlighted code with copy and explain |
| `notice` | `NoticeWidget` | Severity-mapped banners or citation/source cards |
| `chips` | `ChipsWidget` | Clickable follow-up prompt pills |

### Provider adapters

`lib/engine/providers/` keeps the engine model-agnostic. Each adapter (`anthropic.ts`, `google.ts`, `openai.ts`) implements the same `AgentTurnInvoker` shape: stream text and tool calls, then resolve a usage/stop-reason summary. The registry binds friendly IDs to concrete models:

- **Anthropic** — `sonnet` (Claude Sonnet 4.6), `haiku` (Claude Haiku 4.5). Uses the prompt-caching streaming endpoint with `cache_control: ephemeral` on the system prompt so it caches across loop iterations.
- **Google** — `gemini-3`, `gemini-3.1`.
- **OpenAI** — `gpt-5.4-mini`, `gpt-5.4`, `gpt-5.5`.

### Cost model

`lib/engine/pricing.ts` holds a per-million-token rate table (standard input, cached input, and output) for all seven models and computes real cost per turn — separating standard input tokens from cache reads, and charging Anthropic cache writes at 1.25× the input rate. The `CostCalculator` surfaces it live in the UI.

## Results / Highlights

- **12 widget skills** and **7 models** across **3 providers**, all behind one interface.
- **8-iteration** self-correcting tool loop with per-skill JSON validation that gates rendering.
- **Eval harness** runs **2 trials** over every `model × skill-on/off` combination (14 combos), records cost, tokens, cache-hit rate, latency, and widget size per trial, and ranks by **dollars per successful render** with a 0.8 pass threshold.
- Real per-model pricing baked in, from `0.025` $/MTok cached input (Gemini 3.1) up to `30.00` $/MTok output (GPT-5.5), so cost comparisons are concrete rather than estimated.
- End-to-end **SSE streaming** with named events for text, tool calls, tool results, widget, and usage.

## Tech Stack

- **Language:** TypeScript 5
- **Framework:** Next.js 15 (App Router), React 19, Node.js runtime
- **Styling:** Tailwind CSS 3, custom global CSS
- **AI / LLM SDKs:** `@anthropic-ai/sdk`, `@google/generative-ai`, `openai`
- **Streaming / transport:** Server-Sent Events
- **UI / rendering:** `react-markdown`, `remark-gfm`, `react-syntax-highlighter`, `lucide-react`, `class-variance-authority`, `tailwind-merge`
- **Tooling:** `tsx` (eval runner), TypeScript, PostCSS, Autoprefixer

## Getting Started

### Prerequisites

- Node.js 18+ (the eval harness needs Node 20.12+ for `process.loadEnvFile`)
- An API key for at least one of the three providers — you only need keys for the models you plan to run.

### Installation

```bash
git clone https://github.com/DCode-v05/Skillet.git
cd Skillet
npm install
```

### Configure environment

```bash
cp .env.local.example .env.local
```

Then add the key(s) you need:

| Variable | Used for |
|---|---|
| `ANTHROPIC_API_KEY` | Claude Sonnet / Haiku |
| `GOOGLE_API_KEY` | Gemini 3 / 3.1 |
| `OPENAI_API_KEY` | GPT-5.4-mini / 5.4 / 5.5 |

### Running

```bash
npm run dev
```

Open http://localhost:3000.

To run the cost-efficiency sweep across all models and prompts:

```bash
npm run eval
```

## Usage

- Type any prompt, or pick one from the prompt library, and choose a model from the selector.
- Skillet streams its tool-loop trace, then renders a typed widget answer with an optional one-sentence preamble.
- Click any interactive element — a chip, a decision CTA, a chart bar, a map pin — and its baked-in prompt becomes your next turn. Destructive decisions ask for confirmation first; source cards open in a new tab.
- Watch the live token and cost readout for each turn, including cache-hit rate.
- Toggle the frontend-design skill to prepend extra design guidance to the system prompt.
- Export the whole conversation to a standalone HTML file whenever you want.

## Project Structure

```
Skillet/
├── app/
│   ├── api/engine/execute/route.ts     # SSE endpoint — runs the engine, streams events
│   ├── layout.tsx                      # Root layout + metadata
│   ├── page.tsx                        # Chat page
│   └── globals.css                     # Global styles
├── components/
│   ├── chat/                           # Shell, input, message list, mode selector,
│   │                                   #   prompt library, cost calculator
│   └── output/
│       ├── OutputSystem.tsx            # Walks message blocks, dispatches widgets
│       ├── AgentTrace.tsx              # Tool-loop iteration trace
│       └── widgets/                    # One React renderer per widget + registry.tsx
├── lib/
│   ├── engine/
│   │   ├── run-engine.ts               # Agentic tool-use loop (max 8 iterations)
│   │   ├── providers/                  # Anthropic · Google · OpenAI adapters + registry
│   │   ├── tools/                      # submit_widget_json definition + executor
│   │   ├── skills/                     # One folder per widget skill
│   │   │   ├── json-registry.ts        # Single source of truth for intents + validators
│   │   │   └── <skill>/                # SKILL.md, template.md, validate.ts, examples/
│   │   ├── system-prompt-freeform.ts   # Base system prompt (skill catalog + contract)
│   │   ├── frontend-design-skill.ts    # Optional vendored design skill
│   │   └── pricing.ts                  # Per-model cost computation
│   ├── hooks/useChat.ts                # SSE consumer + chat-state reducer
│   ├── types/                          # Widget + engine type definitions
│   ├── download-page.ts                # HTML conversation export
│   └── download-widget.ts              # Single-widget export
├── eval/                               # Cost-per-successful-render sweep harness
├── sample/                             # Reference skill scaffold
├── package.json
└── README.md
```

---

## Contact

<table>
  <tr><td><b>Portfolio:</b> <a href="https://www.denistan.me">Denistan</a></td><td><b>LinkedIn:</b> <a href="https://www.linkedin.com/in/denistanb">denistanb</a></td></tr>
  <tr><td><b>GitHub:</b> <a href="https://github.com/DCode-v05">DCode-v05</a></td><td><b>LeetCode:</b> <a href="https://leetcode.com/u/Denistan_B">Denistan_B</a></td></tr>
  <tr><td colspan="2" align="center"><b>Email:</b> <a href="mailto:denistanb05@gmail.com">denistanb05@gmail.com</a></td></tr>
</table>

Made with ❤️ by **Denistan B**
