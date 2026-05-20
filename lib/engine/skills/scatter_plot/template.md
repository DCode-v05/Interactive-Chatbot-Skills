# Template — `scatter_plot`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:20px;font-family:{{FONT}}">
  <h3 style="margin:0 0 4px;font-size:15px">{{CHART_TITLE}}</h3>
  <div style="font-size:11px;color:{{MUTED}};margin-bottom:10px">{{AXIS_CAPTION}}</div>
  <svg viewBox="0 0 400 280" style="width:100%">
    <!-- axes -->
    <line x1="40" y1="220" x2="380" y2="220" stroke="{{AXIS}}"/>
    <line x1="40" y1="20" x2="40" y2="220" stroke="{{AXIS}}"/>
    <text x="200" y="252" fill="{{MUTED}}" font-size="10" text-anchor="middle">{{X_AXIS_LABEL}}</text>
    <text x="20" y="120" fill="{{MUTED}}" font-size="10" text-anchor="middle" transform="rotate(-90 20 120)">{{Y_AXIS_LABEL}}</text>
    <!-- optional trend line -->
    <line x1="40" y1="200" x2="380" y2="40" stroke="{{TREND_COLOR}}" stroke-width="1" stroke-dasharray="4 3"/>
    <!-- repeat per data point (8–30) -->
    <circle data-bap-prompt="Show details for point: {{POINT_LABEL}}" cx="{{X}}" cy="{{Y}}" r="5" fill="#EC3B4A" style="cursor:pointer">
      <title>{{POINT_LABEL}} · ({{X_VALUE}}, {{Y_VALUE}})</title>
    </circle>
  </svg>
</div>
```

## Placeholders

- `{{X}}` / `{{Y}}` — viewBox coords (map data → 40-380 horiz, 220-20 vert)
- Each `<circle>` carries `data-bap-prompt` (click) + `<title>` (hover tooltip).
