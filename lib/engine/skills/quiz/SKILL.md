---
name: quiz
description: Multiple-choice quiz with scoring. REQUIRES `<form>` + `<script>`.
family: interactive
needs_interactivity: true
keywords:
  - quiz
  - test
  - questions
  - score
  - multiple choice
  - trivia
reminders:
  - Form submit handler MUST call e.preventDefault() at the top.
---

Form with radio inputs + script for scoring. Submit handler MUST call `e.preventDefault()`. After submit, the score must be VISUALLY OBVIOUS — display in a prominent result panel with accent color and large type (24–32px), not a tiny corner note. Consider per-question feedback (✓ green for correct, ✗ red for incorrect) shown after submit. Provide a follow-up chip like 'Try another quiz' (`data-bap-prompt`) after the result.
