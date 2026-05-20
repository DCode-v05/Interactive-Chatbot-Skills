# Template — `map`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 4px;font-size:16px">{{MAP_TITLE}}</h3>
  <div style="font-size:11px;color:{{MUTED}};margin-bottom:14px">{{LOCATIONS_COUNT}} · approximate locations</div>
  <svg viewBox="0 0 600 360" style="width:100%">
    <rect x="0" y="0" width="600" height="360" fill="{{WATER}}"/>
    <!-- region outline — stylized, not cartographically accurate -->
    <path d="{{REGION_PATH}}" fill="{{LAND}}" stroke="{{LAND_STROKE}}" stroke-width="1"/>
    <!-- optional route polyline through the pins -->
    <polyline points="{{ROUTE_POINTS}}" fill="none" stroke="#EC3B4A" stroke-width="2" stroke-dasharray="5 4"/>
    <!-- repeat per pin (3–8) -->
    <g data-bap-prompt="Tell me more about: {{LOCATION_NAME}}" style="cursor:pointer">
      <circle cx="{{PIN_X}}" cy="{{PIN_Y}}" r="6" fill="#EC3B4A"/>
      <text x="{{LABEL_X}}" y="{{LABEL_Y}}" fill="{{FG}}" font-size="11">{{LOCATION_NAME}}</text>
    </g>
  </svg>
</div>
```

## Placeholders

- `{{REGION_PATH}}` — a single `<path d="...">` of the region outline (rough, not real geo)
- `{{PIN_X}}` / `{{PIN_Y}}` — APPROXIMATE coords mapping lat/lng to viewBox space
- Each pin's `<g>` is a click target. Always include the "approximate locations" caption — pins are NOT real geo data.
