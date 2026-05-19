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
  - DO NOT put data-bap-prompt on individual answer <input> radios or their <label> wrappers. Radios are for selection only — clicking an answer must NOT send a chat follow-up.
  - The submit <button> is type="submit" with NO data-bap-prompt. Scoring is computed in-script via the form's submit handler and written to the <output data-role="out"> element. NEVER use data-bap-prompt to "score" the quiz — that would send the score as a new chat turn instead of showing it in-component.
  - Mark each correct radio with the data-correct attribute; the script counts `input[type=radio]:checked[data-correct]` against the number of unique radio group names.
  - The post-submit click target is ONE chip wired with data-bap-prompt — a follow-up like "Walk me through each answer" or "Try another quiz on this topic". Pre-render it with style="display:none" and have the submit handler reveal it.
---

Form with radio inputs + script for scoring. Layout: 3–5 `<fieldset>`s, each with a `<legend>` (the question) and 3–4 `<label><input type="radio" name="qN" value="..."> answer</label>` rows. Mark each correct option with `data-correct`. The submit `<button type="submit">` triggers the script's submit handler — which calls `e.preventDefault()`, tallies correct radios against the total number of questions, and writes the result to `<output data-role="out">` in large accent type (24–32px). After the result panel, reveal ONE post-submit chip carrying `data-bap-prompt` (the only click target that fires a chat follow-up — e.g. "Walk me through each answer" or "Try a follow-up quiz on this topic"). Consider per-question feedback (✓ green for correct, ✗ red for incorrect) below each fieldset.
