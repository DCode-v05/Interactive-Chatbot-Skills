# Template — `venn_diagram`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px">
  <h3 style="margin:0 0 12px;font-size:15px">{{VENN_TITLE}}</h3>
  <svg viewBox="0 0 400 260" style="width:100%">
    <circle cx="150" cy="125" r="80" fill="#EC3B4A" fill-opacity="0.45"/>
    <circle cx="250" cy="125" r="80" fill="#7dd3fc" fill-opacity="0.45"/>
    <!-- region labels — each is a click target -->
    <text data-bap-prompt="Show items in: {{LEFT_ONLY_REGION}}" x="110" y="130" fill="{{FG}}" font-size="13" text-anchor="middle" style="cursor:pointer">{{LEFT_LABEL}}</text>
    <text data-bap-prompt="Show items in: {{OVERLAP_REGION}}" x="200" y="130" fill="{{FG}}" font-size="13" text-anchor="middle" style="cursor:pointer">{{OVERLAP_LABEL}}</text>
    <text data-bap-prompt="Show items in: {{RIGHT_ONLY_REGION}}" x="290" y="130" fill="{{FG}}" font-size="13" text-anchor="middle" style="cursor:pointer">{{RIGHT_LABEL}}</text>
  </svg>
</div>
```

## Placeholders

- 2-set Venn (default) — for 3-set, add a third circle and 4 more region labels (left-only / right-only / bottom-only / pairwise overlaps / triple overlap).
- `{{*_REGION}}` — full region name fed to the click prompt
- `{{*_LABEL}}` — short on-diagram label
- Each `<text>` region label is the click target.
