# Template — `sequence_diagram`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 14px;font-size:16px">{{TITLE}}</h3>
  <svg viewBox="0 0 600 400" style="width:100%">
    <!-- actor headers + lifelines (2–5 actors) -->
    <text x="{{ACTOR_X}}" y="20" fill="{{FG}}" font-size="12" text-anchor="middle">{{ACTOR_NAME}}</text>
    <line x1="{{ACTOR_X}}" y1="30" x2="{{ACTOR_X}}" y2="380" stroke="{{LIFELINE}}"/>
    <!-- repeat per message (4–10), each at a different y as time flows down -->
    <g data-bap-prompt="Explain: {{MESSAGE_LABEL}}" style="cursor:pointer">
      <line x1="{{SRC_X}}" y1="{{Y}}" x2="{{DST_X}}" y2="{{Y}}" stroke="{{IS_RESPONSE_GRAY_ELSE_RED}}" stroke-width="2" {{DASH_IF_RESPONSE}}/>
      <text x="{{MID_X}}" y="{{Y_MINUS_6}}" fill="{{LABEL_COLOR}}" font-size="11" text-anchor="middle">{{MESSAGE_LABEL}}</text>
    </g>
  </svg>
</div>
```

## Placeholders

- `{{ACTOR_X}}` — evenly space actors across width 600 (e.g. 100, 300, 500 for 3 actors)
- `{{IS_RESPONSE_GRAY_ELSE_RED}}` — BAP red `#EC3B4A` for primary requests, gray `#999` for responses
- `{{DASH_IF_RESPONSE}}` — empty for requests; `stroke-dasharray="4 3"` for responses
- Each message-arrow `<g>` is a click target.
