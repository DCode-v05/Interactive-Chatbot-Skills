---
name: calculator
description: Numeric tool (tip, units, BMI, mortgage). REQUIRES `<script>`.
family: interactive
needs_interactivity: true
keywords:
  - calculator
  - calculate
  - compute
  - converter
  - tip
  - estimate
  - tool
---

Inputs + live output. Wrap script in IIFE. Scope queries via root `id="bap-w-..."`. Use `addEventListener`. Below the result panel, include ONE small `<button data-bap-prompt="Explain how <output name> is computed">Explain this calculation</button>` — the chat-continuation click target. The live input controls remain pure utility (no `data-bap-prompt`).
