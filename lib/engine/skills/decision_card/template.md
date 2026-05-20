# Template — `decision_card`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px;font-family:{{FONT}}">
  <h3 style="margin:0 0 12px;font-size:15px">{{HEADING}}</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <!-- recommended option -->
    <div style="border:1px solid {{BORDER}};padding:14px;border-radius:8px">
      <div style="font-size:11px;color:{{MUTED}}">{{OPTION_A_LABEL}}</div>
      <p style="margin:6px 0 10px;font-size:13px">{{OPTION_A_BLURB}}</p>
      <button data-bap-prompt="Choose {{OPTION_A_LABEL}}" style="width:100%;background:#EC3B4A;color:#fff;border:0;padding:8px;border-radius:6px;cursor:pointer">Choose</button>
    </div>
    <!-- alternative option -->
    <div style="border:1px solid {{BORDER}};padding:14px;border-radius:8px">
      <div style="font-size:11px;color:{{MUTED}}">{{OPTION_B_LABEL}}</div>
      <p style="margin:6px 0 10px;font-size:13px">{{OPTION_B_BLURB}}</p>
      <button data-bap-prompt="Choose {{OPTION_B_LABEL}}" style="width:100%;background:transparent;color:#EC3B4A;border:1px solid #EC3B4A;padding:8px;border-radius:6px;cursor:pointer">Choose</button>
    </div>
  </div>
</div>
```

## Placeholders

- `{{HEADING}}` — the question being decided ("REST vs GraphQL?")
- `{{OPTION_A_*}}` — recommended option (filled CTA)
- `{{OPTION_B_*}}` — alternative (outline CTA)
- `{{BORDER}}` / `{{MUTED}}` — subtle separators / labels
