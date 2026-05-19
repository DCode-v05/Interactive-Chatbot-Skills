---
name: form
description: Structured input collection (signup, contact, settings) — visual only
family: static
needs_interactivity: false
keywords:
  - form
  - signup
  - register
  - contact form
  - settings
  - fields
  - inputs
  - onboarding
reminders:
  - Use a <div> wrapper, NOT a real <form> tag. Without a script handler a real form will reload the page on submit. The submit <button> is type="button" and carries data-bap-prompt — no script.
---

Visual-only structured-input collection. Stack of labeled field rows, each: small label `<div>` · `<input>` or `<select>` · optional 1-line helper text. End with a primary `<button type="button" data-bap-prompt="Submit <form name> with the entered values">` — the chat-continuation click target. The `<input>` / `<select>` elements are visual placeholders (they don't actually collect anything — there's no script). Distinct from `calculator` (live recompute) and `quiz` (scoring).
