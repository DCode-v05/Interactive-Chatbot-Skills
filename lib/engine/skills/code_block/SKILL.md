---
name: code_block
description: Code snippet
family: static
needs_interactivity: true
keywords:
  - code
  - function
  - sql
  - snippet
  - script
  - example code
---

Filename header strip + monospace block. Dark surface. The header has TWO click targets: (1) the filename text is `data-bap-prompt="Explain this <filename> code"` so the user can ask for a walkthrough; (2) a small "Copy" `<button>` on the right, wired via an IIFE `<script>` calling `navigator.clipboard.writeText(code)` (try/catch, no fallback). The Copy button does NOT carry `data-bap-prompt` — it's a pure utility action.
