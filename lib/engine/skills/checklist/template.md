# Template — `checklist`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:18px;font-family:{{FONT}}">
  <h3 style="margin:0 0 10px;font-size:15px">{{LIST_TITLE}}</h3>
  <ul style="list-style:none;padding:0;margin:0;line-height:1.9">
    <!-- repeat per item -->
    <li data-bap-prompt="Help me with: {{ITEM_TEXT}}" style="cursor:pointer">{{DONE_OR_PENDING_GLYPH}} {{ITEM_TEXT}}</li>
  </ul>
</div>
```

## Placeholders

- `{{LIST_TITLE}}` — "Code-review checklist", "Pre-flight"…
- `{{DONE_OR_PENDING_GLYPH}}` — `✓` for done, `□` for pending
- `{{ITEM_TEXT}}` — the checklist line
- Each `<li>` carries `data-bap-prompt` + `cursor:pointer`.
