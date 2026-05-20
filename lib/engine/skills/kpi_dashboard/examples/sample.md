# Sample widget — `kpi_dashboard`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:20px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
  <div data-bap-prompt="Drill into: MRR" style="background:#16181f;border:1px solid #333;border-radius:8px;padding:14px;cursor:pointer"><div style="font-size:11px;color:#999">MRR</div><div style="font-size:24px;font-weight:700">$42K</div></div>
</div>
```
