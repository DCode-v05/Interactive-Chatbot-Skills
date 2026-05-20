# Sample widget — `checklist`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#fff7e6;color:#1f1410;border-radius:10px;padding:18px;font-family:Georgia,serif">
  <ul style="list-style:none;padding:0;margin:0;line-height:1.9">
    <li data-bap-prompt="Help me with: Done" style="cursor:pointer">✓ Done</li>
    <li data-bap-prompt="Help me with: Pending" style="cursor:pointer">□ Pending</li>
  </ul>
</div>
```
