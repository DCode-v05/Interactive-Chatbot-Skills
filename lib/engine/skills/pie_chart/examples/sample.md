# Sample widget — `pie_chart`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0a0a0a;color:#fafafa;border-radius:10px;padding:20px">
  <svg viewBox="0 0 200 200" style="width:200px">
    <path data-bap-prompt="Show details for: Slice A" d="M100,100 L100,10 A90,90 0 0,1 178,145 Z" fill="#EC3B4A" style="cursor:pointer"><title>Slice A · 45%</title></path>
  </svg>
</div>
```
