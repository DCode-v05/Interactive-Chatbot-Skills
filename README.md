# Skillet

## Project Description
Skillet is a self-contained Next.js application that reimagines the chat interface: instead of replying with plain markdown text, the AI composes its answer out of **typed, interactive UI widgets** — charts, comparison tables, decision cards, diagrams, plans, maps, dashboards, code blocks, and clickable chips. An agentic tool-use loop drives a Large Language Model to pick the right widget for each question, fill a validated JSON schema, and stream it back to the browser, where a typed renderer registry turns it into a real React component. The result is a chat that *shows* its answers and lets you click into them to drive the next turn.

---

## Project Details

### Problem Statement
Conventional AI chat returns a wall of markdown text, even when the best answer is a chart, a table, or a step-by-step plan. Plain prose is hard to scan, not interactive, and forces the user to mentally reconstruct structure that the model already understands. Skillet solves this by giving the model a catalog of typed widgets and a strict JSON contract for each, so quantitative, comparative, and procedural answers render as purpose-built, clickable UI instead of text.

### How It Works
1. The user types a prompt in the composer and picks a model.
2. The browser POSTs `{ message, history }` to `/api/engine/execute`, which streams **Server-Sent Events** back.
3. The engine ([`lib/engine/run-engine.ts`](lib/engine/run-engine.ts)) runs an **agentic tool-use loop** (up to 8 iterations) against the selected provider.
4. The model is instructed via progressive-disclosure **skills** and must call the terminal `submit_widget_json` tool with a `{ intent, widget, prose }` payload.
5. The engine **validates** the JSON against the skill's schema. If invalid, the issues are fed back and the model retries; if valid, the widget is emitted and the loop ends.
6. The frontend's `useChat` hook reduces the SSE stream into a `ChatMessage`; `OutputSystem` dispatches the widget through a typed **renderer registry** to a dedicated React component.
7. Every interactive element (chip, decision CTA, chart bar, map pin) carries a pre-baked click prompt that fires as the next user turn — so the conversation drives itself.

### The Widget Skills
Each widget is a self-contained "skill" with its own `SKILL.md` (when/how to use it), `template.md` (JSON skeleton), worked `examples/`, and a `validate.ts` schema enforcer.

| Intent | Renderer | What it shows |
|---|---|---|
| `comparison-table` | [ComparisonTableWidget](components/output/widgets/ComparisonTableWidget.tsx) | Options × attributes matrix with drill-in cells |
| `chart` | [ChartWidget](components/output/widgets/ChartWidget.tsx) | Bar, pie, scatter, funnel, radar, heatmap |
| `plan` | [PlanWidget](components/output/widgets/PlanWidget.tsx) | Stepper, timeline, Gantt |
| `diagram` | [DiagramWidget](components/output/widgets/DiagramWidget.tsx) | Flowchart, sequence, tree, mind-map, Venn |
| `dashboard` | [DashboardWidget](components/output/widgets/DashboardWidget.tsx) | Stat tiles, profile, pricing cards |
| `decision` | [DecisionWidget](components/output/widgets/DecisionWidget.tsx) | Side-by-side option cards with a recommendation |
| `interactive` | [InteractiveWidget](components/output/widgets/InteractiveWidget.tsx) | Live calculators, quizzes, forms |
| `list` | [ListWidget](components/output/widgets/ListWidget.tsx) | Tables and checklists |
| `map` | [MapWidget](components/output/widgets/MapWidget.tsx) | Pinned locations with click prompts |
| `code-block` | [CodeBlockWidget](components/output/widgets/CodeBlockWidget.tsx) | Syntax-highlighted code with copy |
| `notice` | [NoticeWidget](components/output/widgets/NoticeWidget.tsx) | Status / banner callouts |
| `chips` | [ChipsWidget](components/output/widgets/ChipsWidget.tsx) | Clickable follow-up prompt pills |

### Multi-Provider Support
The engine is provider-agnostic ([`lib/engine/providers/`](lib/engine/providers/)). Pick any model from the UI's mode selector:
- **Anthropic** — `sonnet` (Claude Sonnet 4.6), `haiku` (Claude Haiku 4.5)
- **Google** — `gemini-3`, `gemini-3.1`
- **OpenAI** — `gpt-5.4-mini`, `gpt-5.4`, `gpt-5.5`

### Cost & Usage Tracking
Every turn reports token usage, prompt-cache hit rate, and a computed dollar cost ([`lib/engine/pricing.ts`](lib/engine/pricing.ts)), surfaced live in the UI via the [CostCalculator](components/chat/CostCalculator.tsx). An eval harness ([`eval/`](eval/)) runs a cost-efficiency sweep across models and prompts.

### Web Application
The chat UI provides:
- A streaming-bubble chat shell with an agent-trace view of each tool-loop iteration
- A model selector and a skill toggle (raw freeform vs. frontend-design skill)
- A prompt library of demo questions, each wired to show a specific widget
- Clickable widgets that fire follow-up turns automatically
- One-click export of the conversation to a standalone HTML page

---

## Tech Stack
- TypeScript 5
- Next.js 15 (App Router) + React 19
- Tailwind CSS 3
- Anthropic SDK · OpenAI SDK · Google Generative AI SDK
- Server-Sent Events (streaming)
- react-markdown · react-syntax-highlighter · lucide-react
- Node.js 18+

---

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/DCode-v05/Skillet.git
cd Skillet
```

### 2. Install dependencies
```
npm install
```

### 3. Configure environment variables
```
cp .env.local.example .env.local
```
Then add your API key(s) to `.env.local`:

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Required for the Anthropic (Claude) models |
| `GOOGLE_API_KEY` | Required for the Gemini models |
| `OPENAI_API_KEY` | Required for the GPT models |

You only need a key for the provider(s) you intend to use.

### 4. Run the app
```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

To run the cost-efficiency eval sweep:
```
npm run eval
```

---

## Usage
- Type any prompt, or click one from the prompt library, and choose a model.
- Skillet streams its reasoning trace, then renders a typed widget answer.
- Click any chip, decision CTA, chart bar, or map pin — its baked-in prompt becomes your next message.
- Watch the live token / cost readout for each turn.
- Export the conversation to a self-contained HTML file at any time.

---

## Project Structure
```
Skillet/
│
├── app/
│   ├── api/engine/execute/route.ts   # SSE handler — streams the engine
│   ├── layout.tsx                    # Root layout + metadata
│   ├── page.tsx                      # Chat page
│   └── globals.css                   # Global styles
│
├── components/
│   ├── chat/                         # Shell, input, message list, mode selector,
│   │                                 #   prompt library, cost calculator
│   └── output/
│       ├── OutputSystem.tsx          # Walks message blocks → dispatches widgets
│       ├── AgentTrace.tsx            # Tool-loop iteration trace
│       └── widgets/                  # One React renderer per widget + registry
│
├── lib/
│   ├── engine/
│   │   ├── run-engine.ts             # Agentic tool-use loop
│   │   ├── providers/                # Anthropic · Google · OpenAI adapters
│   │   ├── tools/                    # submit_widget_json tool + executors
│   │   ├── skills/                   # One folder per widget skill
│   │   │   └── <skill>/
│   │   │       ├── SKILL.md          # When/how to use it
│   │   │       ├── template.md       # JSON skeleton
│   │   │       ├── validate.ts       # Schema enforcer
│   │   │       └── examples/         # Worked examples
│   │   ├── system-prompt-freeform.ts # Base system prompt
│   │   └── pricing.ts                # Per-model cost computation
│   ├── hooks/useChat.ts              # SSE consumer + chat-state reducer
│   ├── types/                        # Widget + engine type definitions
│   ├── download-page.ts              # HTML conversation export
│   └── download-widget.ts            # Single-widget export
│
├── eval/                             # Cost-efficiency sweep harness
├── sample/                           # Reference skill scaffold
├── package.json
└── README.md                         # Project documentation
```

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request describing your changes.

---

## Contact
- **GitHub:** [DCode-v05](https://github.com/DCode-v05)
- **Email:** denistanb05@gmail.com
