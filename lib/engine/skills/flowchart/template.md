# Template — `flowchart`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px">
  <h3 style="margin:0 0 12px;font-size:15px">{{FLOW_TITLE}}</h3>
  <svg viewBox="0 0 500 240" style="width:100%">
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="{{ARROW}}"/></marker>
    </defs>
    <!-- repeat per node (≤ 6) -->
    <rect data-bap-prompt="Explain: {{NODE_LABEL}}" x="{{X}}" y="{{Y}}" width="120" height="44" rx="6" fill="{{NODE_FILL}}" stroke="#EC3B4A" style="cursor:pointer"/>
    <text x="{{X_CENTER}}" y="{{Y_CENTER}}" fill="{{FG}}" font-size="12" text-anchor="middle" dominant-baseline="middle">{{NODE_LABEL}}</text>
    <!-- per edge -->
    <line x1="{{X1}}" y1="{{Y1}}" x2="{{X2}}" y2="{{Y2}}" stroke="{{ARROW}}" stroke-width="1.5" marker-end="url(#arr)"/>
  </svg>
</div>
```

## Placeholders

- `{{NODE_LABEL}}` — short noun phrase
- `{{X}}` / `{{Y}}` — top-left corner of each node
- Edges connect node centers; the arrow marker sits at the destination.
- Every `<rect>` (node) is a click target.
