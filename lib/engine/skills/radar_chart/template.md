# Template — `radar_chart`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 14px;font-size:16px">{{TITLE}}</h3>
  <svg viewBox="0 0 360 360" style="width:100%">
    <!-- guide polygons (concentric) + axis lines from center to each tip -->
    <polygon points="{{OUTER_RING_POINTS}}" fill="none" stroke="{{GUIDE}}"/>
    <polygon points="{{INNER_RING_POINTS}}" fill="none" stroke="{{GUIDE_FAINT}}"/>
    <line x1="180" y1="160" x2="{{TIP_X}}" y2="{{TIP_Y}}" stroke="{{GUIDE}}"/>
    <!-- trait labels at each tip -->
    <text x="{{LABEL_X}}" y="{{LABEL_Y}}" fill="{{FG}}" font-size="11" text-anchor="middle">{{TRAIT_NAME}}</text>
    <!-- 1–3 entity polygons (closed, semi-transparent) -->
    <polygon data-bap-prompt="Compare: {{ENTITY_NAME}}" points="{{ENTITY_POINTS}}" fill="{{ENTITY_COLOR}}" fill-opacity="0.35" stroke="{{ENTITY_COLOR}}" style="cursor:pointer">
      <title>{{ENTITY_NAME}}</title>
    </polygon>
    <!-- legend swatches at bottom -->
    <text x="40" y="340" fill="{{ENTITY_COLOR}}" font-size="11">■ {{ENTITY_NAME}}</text>
  </svg>
</div>
```

## Placeholders

- 4–6 axes evenly spaced (compute tip coords with `cos`/`sin` of angle, radius 120 from center 180,160)
- `{{ENTITY_POINTS}}` — connect each entity's value along its trait axis (radius scaled by value/max)
- Entities: BAP red + cool blue + neutral, semi-transparent so overlaps read
- Each entity's `<polygon>` is a click target.
