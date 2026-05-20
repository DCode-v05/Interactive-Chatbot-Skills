# Template — `tree_diagram`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 14px;font-size:16px">{{TREE_TITLE}}</h3>
  <svg viewBox="0 0 600 360" style="width:100%">
    <!-- connector lines (parent center bottom → child center top) -->
    <line x1="{{P_X}}" y1="{{P_Y_BOTTOM}}" x2="{{C_X}}" y2="{{C_Y_TOP}}" stroke="{{LINE}}"/>
    <!-- repeat per node — root (BAP red) at top center, children below -->
    <g data-bap-prompt="Expand: {{NODE_LABEL}}" style="cursor:pointer">
      <rect x="{{X}}" y="{{Y}}" width="100" height="36" rx="8" fill="{{NODE_FILL}}" stroke="{{NODE_STROKE}}"/>
      <text x="{{X_CENTER}}" y="{{Y_TEXT}}" fill="{{NODE_FG}}" font-size="12" text-anchor="middle">{{NODE_LABEL}}</text>
    </g>
  </svg>
</div>
```

## Placeholders

- Root node: filled `#EC3B4A`, white text, centered top
- Child nodes: light fill, dark text, outlined
- 2–4 children per level, 2–3 levels (≤ 10 nodes total)
- Each node's `<g>` is a click target.
