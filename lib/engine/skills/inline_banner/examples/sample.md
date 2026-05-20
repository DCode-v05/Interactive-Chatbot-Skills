# Sample widget — `inline_banner`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0f1f12;color:#d6f5dc;border-left:4px solid #34d399;border-radius:6px;padding:12px 14px;font-family:ui-sans-serif">
  <div style="font-size:13px">Deployment complete. <span data-bap-prompt="Tell me more about: the deployment" style="color:#34d399;border-bottom:1px dashed #34d399;cursor:pointer">Learn more →</span></div>
</div>
```
