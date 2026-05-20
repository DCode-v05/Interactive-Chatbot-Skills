# Template — `kpi_dashboard`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px;display:grid;grid-template-columns:repeat({{COLUMNS}},1fr);gap:12px">
  <!-- repeat per metric tile (aim for 4–6 tiles, not 2 sparse ones) -->
  <div data-bap-prompt="Drill into: {{METRIC_NAME}}" style="background:{{TILE_BG}};border:1px solid {{BORDER}};border-radius:8px;padding:14px;cursor:pointer">
    <div style="font-size:11px;color:{{MUTED}};text-transform:uppercase;letter-spacing:1px">{{METRIC_NAME}}</div>
    <div style="font-size:24px;font-weight:700;margin-top:4px">{{BIG_NUMBER}}</div>
    <div style="font-size:11px;color:{{DELTA_COLOR}};margin-top:2px">{{DELTA_SYMBOL}} {{DELTA_VALUE}}</div>
  </div>
</div>
```

## Placeholders

- `{{COLUMNS}}` — typically `3`
- `{{METRIC_NAME}}` — MRR, Churn, ARPU…
- `{{BIG_NUMBER}}` — the headline ($42K, 4.2%, 32 min)
- `{{DELTA_*}}` — `+` green, `−` red (against prior period)
- Each tile `<div>` is the click target.
