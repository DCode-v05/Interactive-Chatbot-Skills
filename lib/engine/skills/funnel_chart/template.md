# Template — `funnel_chart`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 14px;font-size:16px">{{FUNNEL_TITLE}}</h3>
  <svg viewBox="0 0 480 320" style="width:100%">
    <!-- repeat per stage (4–6), each narrower than the one above. Top in BAP red, fading. -->
    <polygon data-bap-prompt="Drill into: {{STAGE_NAME}}" points="{{TL}},{{TY}} {{TR}},{{TY}} {{BR}},{{BY}} {{BL}},{{BY}}" fill="{{STAGE_FILL}}" style="cursor:pointer">
      <title>{{STAGE_NAME}} · {{COUNT}} ({{PERCENT}}%)</title>
    </polygon>
    <text x="240" y="{{LABEL_Y}}" fill="#fff" font-size="13" text-anchor="middle" font-weight="700">{{STAGE_NAME}} · {{COUNT}} ({{PERCENT}}%)</text>
  </svg>
</div>
```

## Placeholders

- 4 points per trapezoid: top-left, top-right (wider), bottom-right (narrower), bottom-left
- Each stage band is ~60px tall; top in `#EC3B4A`, then `#ef6f7c`, then mid-grays for lower stages
- Each `<polygon>` carries `data-bap-prompt` + `<title>` hover tooltip.
