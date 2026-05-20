# Sample widget — `table`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#fafafa;color:#111;border-radius:10px;padding:18px;font-family:ui-sans-serif;border:1px solid #e5e5e5">
  <table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead><tr style="background:#111;color:#fff"><th style="padding:8px">A</th><th style="padding:8px">B</th></tr></thead>
    <tbody>
      <tr data-bap-prompt="Tell me more about: row 1" style="cursor:pointer"><td style="padding:8px">val A</td><td style="padding:8px">val B</td></tr>
    </tbody>
  </table>
</div>
```
