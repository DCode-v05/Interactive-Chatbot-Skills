# Sample widget — `heatmap`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0a0a0a;color:#fafafa;border-radius:10px;padding:20px">
  <table style="border-collapse:collapse">
    <tbody>
      <tr><td data-bap-prompt="Show data for Mon at 09:00" style="width:24px;height:24px;background:rgba(236,59,74,0.6);cursor:pointer"></td></tr>
    </tbody>
  </table>
</div>
```
