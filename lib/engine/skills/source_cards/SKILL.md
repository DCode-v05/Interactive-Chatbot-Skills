---
name: source_cards
description: Citations with external links (the only widget where <a href> is allowed)
family: static
needs_interactivity: false
keywords:
  - sources
  - citations
  - links
  - references
  - articles
  - papers
reminders:
  - "<a href> is allowed in this widget ONLY."
  - 'Every anchor MUST have target="_blank" rel="noopener" so the source opens in a new tab without leaving the chat.'
---

Card per source: title + 1-line summary + visible domain. Up to 5. Each card is wrapped in `<a href="..." target="_blank" rel="noopener">` so clicking opens the citation in a new tab. This is the ONLY widget where `<a href>` substitutes for `data-bap-prompt` as the click target.
