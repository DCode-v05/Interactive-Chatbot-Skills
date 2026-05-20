# Template — `stepper`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 14px;font-size:16px">{{PLAN_TITLE}}</h3>
  <ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px">
    <!-- repeat 3–6 times -->
    <li data-bap-prompt="Tell me more about step {{N}}: {{STEP_TITLE}}" style="display:flex;gap:12px;cursor:pointer">
      <span style="background:{{ACCENT_OR_MUTED}};color:{{ACCENT_FG}};width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700">{{N}}</span>
      <div>
        <div style="font-weight:600">{{STEP_TITLE}}</div>
        <div style="font-size:12px;color:{{MUTED}}">{{STEP_BODY}}</div>
      </div>
    </li>
  </ol>
</div>
```

## Placeholders

- `{{N}}` — step number (1, 2, 3…)
- `{{STEP_TITLE}}` — short imperative title
- `{{STEP_BODY}}` — one-line elaboration
- `{{ACCENT_OR_MUTED}}` — accent color for the current step, muted for others (or BAP red on a single "you-are-here" step)
- Every `<li>` carries `data-bap-prompt` + `cursor:pointer` — the click target.
