# Sample widget — `kanban_board`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:20px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
  <div><div style="font-size:11px;color:#999">Backlog</div><div data-bap-prompt="Show details for: Task" style="background:#16181f;border:1px solid #333;padding:10px;border-radius:6px;cursor:pointer">Task</div></div>
</div>
```
