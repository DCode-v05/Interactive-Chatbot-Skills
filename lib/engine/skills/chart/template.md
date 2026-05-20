# Template — `chart` (bar / line / area)

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:20px">
  <h3 style="margin:0 0 4px;font-size:15px">{{CHART_TITLE}}</h3>
  <div style="font-size:11px;color:{{MUTED}};margin-bottom:10px">{{UNITS_SUBTITLE}}</div>
  <svg viewBox="0 0 400 220" style="width:100%">
    <!-- axes / gridlines -->
    <line x1="40" y1="200" x2="380" y2="200" stroke="{{AXIS}}"/>
    <line x1="40" y1="20" x2="40" y2="200" stroke="{{AXIS}}"/>
    <!-- repeat per bar / data point -->
    <rect data-bap-prompt="What's the data for {{LABEL}}?" x="{{X}}" y="{{Y}}" width="{{W}}" height="{{H}}" fill="#EC3B4A" style="cursor:pointer">
      <title>{{LABEL}} · {{VALUE}}{{OPTIONAL_DELTA}}</title>
    </rect>
    <text x="{{X_CENTER}}" y="215" fill="{{MUTED}}" font-size="10" text-anchor="middle">{{LABEL_SHORT}}</text>
  </svg>
</div>
```

## Placeholders

- `{{CHART_TITLE}}` / `{{UNITS_SUBTITLE}}` — what we're measuring + units (e.g. `$K · per month`)
- `{{X}}` / `{{Y}}` / `{{W}}` / `{{H}}` — per-bar geometry (compute from data)
- `{{LABEL}}` — full data-point label (Jan, Feb…)
- `{{VALUE}}` / `{{OPTIONAL_DELTA}}` — what appears in the hover tooltip
- Every `<rect>` has BOTH `data-bap-prompt` (click → follow-up) AND a `<title>` child (hover → native tooltip).
