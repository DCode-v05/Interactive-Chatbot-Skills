# Sample widget — `scatter_plot`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0a0a0a;color:#fafafa;border-radius:10px;padding:20px;font-family:ui-sans-serif">
  <h3 style="margin:0 0 4px;font-size:15px">Revenue vs Ad Spend</h3>
  <div style="font-size:11px;color:#999;margin-bottom:10px">$K · top 20 campaigns</div>
  <svg viewBox="0 0 400 260" style="width:100%">
    <line x1="40" y1="220" x2="380" y2="220" stroke="#333"/>
    <line x1="40" y1="20" x2="40" y2="220" stroke="#333"/>
    <text x="200" y="252" fill="#999" font-size="10" text-anchor="middle">Ad spend</text>
    <text x="20" y="120" fill="#999" font-size="10" text-anchor="middle" transform="rotate(-90 20 120)">Revenue</text>
    <line x1="40" y1="200" x2="380" y2="40" stroke="#666" stroke-width="1" stroke-dasharray="4 3"/>
    <circle data-bap-prompt="Show details for point: Campaign A" cx="80" cy="180" r="5" fill="#EC3B4A" style="cursor:pointer"/>
    <circle data-bap-prompt="Show details for point: Campaign B" cx="140" cy="150" r="5" fill="#EC3B4A" style="cursor:pointer"/>
    <circle data-bap-prompt="Show details for point: Campaign C" cx="220" cy="100" r="5" fill="#EC3B4A" style="cursor:pointer"/>
    <circle data-bap-prompt="Show details for point: Campaign D" cx="320" cy="60" r="5" fill="#EC3B4A" style="cursor:pointer"/>
  </svg>
</div>
```
