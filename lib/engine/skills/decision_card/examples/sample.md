# Sample widget — `decision_card`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:20px;font-family:Georgia,serif">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div style="border:1px solid #333;padding:14px;border-radius:8px"><div style="font-size:11px;color:#999">Option A</div><button data-bap-prompt="Choose A" style="margin-top:8px;width:100%;background:#EC3B4A;color:#fff;border:0;padding:8px;border-radius:6px">Choose</button></div>
    <div style="border:1px solid #333;padding:14px;border-radius:8px"><div style="font-size:11px;color:#999">Option B</div><button data-bap-prompt="Choose B" style="margin-top:8px;width:100%;background:transparent;color:#EC3B4A;border:1px solid #EC3B4A;padding:8px;border-radius:6px">Choose</button></div>
  </div>
</div>
```
