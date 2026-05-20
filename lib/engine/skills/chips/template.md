# Template — `chips`

Fill in `{{...}}` placeholders. Drop sections that don't apply.

```html
<div style="background:{{BG}};color:{{FG}};padding:14px 16px;border-radius:14px;display:flex;flex-wrap:wrap;gap:8px;font-family:{{FONT}}">
  <!-- repeat 3–5 times -->
  <button data-bap-prompt="{{FOLLOW_UP_PROMPT}}" style="background:{{PILL_BG}};color:{{FG}};border:1px solid {{PILL_BORDER}};border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer">{{CHIP_LABEL}}</button>
</div>
```

## Placeholders

- `{{BG}}` / `{{FG}}` — container background + foreground (must contrast)
- `{{PILL_BG}}` / `{{PILL_BORDER}}` — pill colors (subtle vs container)
- `{{FONT}}` — `ui-sans-serif` / `Georgia,serif` / `ui-monospace`
- `{{FOLLOW_UP_PROMPT}}` — what gets sent as the next user message on click
- `{{CHIP_LABEL}}` — visible chip text (usually short — 2–4 words)
