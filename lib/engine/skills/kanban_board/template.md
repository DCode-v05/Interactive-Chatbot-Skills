# Template — `kanban_board`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px;display:grid;grid-template-columns:repeat({{COLUMN_COUNT}},1fr);gap:14px;font-family:{{FONT}}">
  <!-- repeat per column (typically 3: Backlog · In progress · Done) -->
  <div>
    <div style="font-size:11px;color:{{MUTED}};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">{{COLUMN_NAME}} · {{COUNT}}</div>
    <!-- repeat per card in this column (2–4) -->
    <div data-bap-prompt="Show details for: {{TASK_TITLE}}" style="background:{{CARD_BG}};border:1px solid {{BORDER}};padding:10px;border-radius:6px;margin-bottom:8px;cursor:pointer">
      <div style="font-weight:600;font-size:13px">{{TASK_TITLE}}</div>
      <div style="font-size:11px;color:{{MUTED}};margin-top:4px">{{TASK_META}}</div>
    </div>
  </div>
</div>
```

## Placeholders

- `{{COLUMN_COUNT}}` — usually 3 or 4
- `{{TASK_META}}` — assignee / due / size, kept tight
- Every task card carries `data-bap-prompt` + `cursor:pointer`. Static — no drag-and-drop.
