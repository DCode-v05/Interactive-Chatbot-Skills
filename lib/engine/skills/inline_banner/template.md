# Template — `inline_banner`

```html
<div style="background:{{BG}};color:{{FG}};border-left:4px solid {{SEVERITY_COLOR}};border-radius:6px;padding:12px 14px;font-family:{{FONT}}">
  <div style="font-size:13px">{{STATUS_TEXT}} <span data-bap-prompt="Tell me more about: {{SUBJECT}}" style="color:{{SEVERITY_COLOR}};border-bottom:1px dashed {{SEVERITY_COLOR}};cursor:pointer">Learn more →</span></div>
</div>
```

## Placeholders

- `{{SEVERITY_COLOR}}` — `#34d399` (success), `#fbbf24` (warning), `#EC3B4A` (error)
- `{{STATUS_TEXT}}` — concise outcome ("Deployment complete.", "API v1 deprecates 2026-07-01.")
- `{{SUBJECT}}` — what the Learn-more chip asks about
- The inline "Learn more →" span is the click target. Avoid a separate button — keep the banner tight.
