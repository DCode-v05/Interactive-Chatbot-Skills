# Sample: deploy-status banner + citation cards

Two worked examples — one per variant.

---

## Variant: `banner`

**User prompt:** "Confirm that my deploy went through successfully."

**What the skill emits:**

```json
{
  "widget": "notice",
  "variant": "banner",
  "version": "1.0",
  "severity": "success",
  "message": "Deployment to production completed at 14:32 UTC (commit a1b2c3d, 38s).",
  "learnMore": {
    "label": "Show deploy log",
    "prompt": "Show me the full deploy log for commit a1b2c3d"
  }
}
```

**What this looks like rendered:** a thin green-accented bar across the chat bubble with the status text. The "Show deploy log" affordance has an accent-colored underline; hovering it lifts a pointer cursor.

**What clicks do:** clicking "Show deploy log" fires the prompt as the next user message.

---

## Variant: `sources`

**User prompt:** "Find me 3 reputable articles about prompt caching."

**What the skill emits:**

```json
{
  "widget": "notice",
  "variant": "sources",
  "version": "1.0",
  "title": "Reading list — prompt caching",
  "sources": [
    {
      "id": "anthropic-caching",
      "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
      "title": "Prompt caching — Anthropic docs",
      "summary": "Reference for how cache_control works on the Anthropic API, with TTL behavior and pricing.",
      "domain": "docs.anthropic.com"
    },
    {
      "id": "openai-caching",
      "url": "https://platform.openai.com/docs/guides/prompt-caching",
      "title": "Prompt caching — OpenAI",
      "summary": "OpenAI's prompt-caching guide, including which models support it and what counts as a cache hit.",
      "domain": "platform.openai.com"
    },
    {
      "id": "deepmind-paper",
      "url": "https://arxiv.org/abs/2410.07590",
      "title": "Cache-augmented language model serving",
      "summary": "Research paper covering the cache-hit-rate / cost trade-offs across providers.",
      "domain": "arxiv.org"
    }
  ]
}
```

**What this looks like rendered:** a small "Reading list — prompt caching" header above 3 source cards stacked vertically. Each card shows the title (bold), the summary (one line of muted text), and the domain at the bottom.

**What clicks do:** clicking any card opens its URL in a new tab (`target="_blank" rel="noopener"`). No chat continuation — the user reads the source, the chat stays where it was.
