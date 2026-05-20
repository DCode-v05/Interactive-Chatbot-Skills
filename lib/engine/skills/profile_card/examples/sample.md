# Sample widget — `profile_card`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:20px;display:flex;gap:16px;align-items:center">
  <div style="width:60px;height:60px;border-radius:50%;background:#EC3B4A;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">JD</div>
  <div style="flex:1"><div style="font-weight:700">Jane Doe</div></div>
  <button data-bap-prompt="Message Jane Doe" style="background:#EC3B4A;color:#fff;border:0;padding:8px 14px;border-radius:6px;cursor:pointer;font-size:13px">Message</button>
</div>
```
