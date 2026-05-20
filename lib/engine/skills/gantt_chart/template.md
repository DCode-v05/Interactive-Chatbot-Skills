# Template — `gantt_chart`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 4px;font-size:16px">{{PROJECT_TITLE}}</h3>
  <div style="font-size:11px;color:{{MUTED}};margin-bottom:14px">{{DATE_RANGE}}</div>
  <svg viewBox="0 0 600 {{HEIGHT}}" style="width:100%">
    <!-- date headers (months or weeks) -->
    <text x="{{TICK_X}}" y="20" fill="{{MUTED}}" font-size="11">{{TICK_LABEL}}</text>
    <!-- repeat per task -->
    <text x="0" y="{{ROW_Y}}" fill="{{FG}}" font-size="12">{{TASK_NAME}}</text>
    <rect data-bap-prompt="Show details for: {{TASK_NAME}}" x="{{BAR_X}}" y="{{BAR_Y}}" width="{{BAR_W}}" height="18" rx="4" fill="#EC3B4A" style="cursor:pointer">
      <title>{{TASK_NAME}} · {{START_DATE}} → {{END_DATE}}</title>
    </rect>
    <!-- optional "today" marker -->
    <line x1="{{TODAY_X}}" y1="40" x2="{{TODAY_X}}" y2="{{BOTTOM}}" stroke="#7dd3fc" stroke-width="1" stroke-dasharray="3 3"/>
  </svg>
</div>
```

## Placeholders

- `{{HEIGHT}}` — scales with task count (~40px per row + 60px headroom)
- `{{BAR_X}}` / `{{BAR_W}}` — start position / duration (compute from date range scaled to viewBox)
- Each task bar is a click target AND carries a hover `<title>` with full date range.
