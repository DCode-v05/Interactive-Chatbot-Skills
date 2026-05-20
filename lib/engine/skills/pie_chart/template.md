# Template — `pie_chart`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:20px">
  <h3 style="margin:0 0 10px;font-size:15px">{{PIE_TITLE}}</h3>
  <svg viewBox="0 0 200 200" style="width:200px">
    <!-- repeat per slice (≤ 6). Compute path d from cumulative angle. -->
    <path data-bap-prompt="Show details for: {{SLICE_LABEL}}" d="{{SLICE_PATH}}" fill="{{SLICE_COLOR}}" style="cursor:pointer">
      <title>{{SLICE_LABEL}} · {{PERCENT}}%</title>
    </path>
  </svg>
  <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:10px;font-size:12px">
    <!-- legend swatches, one per slice -->
    <span><span style="display:inline-block;width:10px;height:10px;background:{{SLICE_COLOR}};margin-right:4px"></span>{{SLICE_LABEL}}</span>
  </div>
</div>
```

## Placeholders

- `{{SLICE_PATH}}` — `M cx,cy L x1,y1 A r,r 0 0,1 x2,y2 Z` (compute endpoints via `cos`/`sin` of cumulative angle)
- `{{SLICE_COLOR}}` — BAP red for the largest slice, fading to neutral grays for smaller ones
- Each `<path>` has BOTH `data-bap-prompt` (click) AND a `<title>` child (hover tooltip).
