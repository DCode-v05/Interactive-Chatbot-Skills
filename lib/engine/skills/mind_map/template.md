# Template — `mind_map`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px">
  <h3 style="margin:0 0 12px;font-size:15px">{{CENTRAL_CONCEPT}}</h3>
  <svg viewBox="0 0 500 300" style="width:100%">
    <!-- central node -->
    <circle cx="250" cy="150" r="40" fill="#EC3B4A"/>
    <text x="250" y="154" fill="#fff" font-size="12" text-anchor="middle" font-weight="700">{{CENTRAL_LABEL}}</text>
    <!-- repeat 4–6 branches at angles around the center -->
    <line x1="250" y1="150" x2="{{BRANCH_X}}" y2="{{BRANCH_Y}}" stroke="{{LINE}}" stroke-width="1.5"/>
    <g data-bap-prompt="Expand: {{BRANCH_LABEL}}" style="cursor:pointer">
      <circle cx="{{BRANCH_X}}" cy="{{BRANCH_Y}}" r="22" fill="{{NODE_FILL}}" stroke="#EC3B4A"/>
      <text x="{{BRANCH_X}}" y="{{BRANCH_Y_TEXT}}" fill="{{FG}}" font-size="11" text-anchor="middle">{{BRANCH_LABEL_SHORT}}</text>
    </g>
  </svg>
</div>
```

## Placeholders

- Branch positions: place 4–6 evenly around the central node (e.g. angles 0°, 60°, 120°, 180°, 240°, 300°; radius ~170)
- Each branch's wrapping `<g>` (so the circle + label fire together) is the click target.
