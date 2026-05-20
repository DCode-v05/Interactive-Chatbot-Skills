# Sample widget — `radar_chart`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#fdfcf8;color:#1a1a1a;border-radius:14px;padding:22px;font-family:ui-sans-serif">
  <h3 style="margin:0 0 14px;font-size:16px">Slack vs Teams · 5 axes</h3>
  <svg viewBox="0 0 360 320" style="width:100%">
    <polygon points="180,40 280,110 250,230 110,230 80,110" fill="none" stroke="#bbb"/>
    <polygon points="180,80 250,125 230,210 130,210 110,125" fill="none" stroke="#ccc"/>
    <line x1="180" y1="160" x2="180" y2="40" stroke="#ccc"/>
    <line x1="180" y1="160" x2="280" y2="110" stroke="#ccc"/>
    <line x1="180" y1="160" x2="250" y2="230" stroke="#ccc"/>
    <line x1="180" y1="160" x2="110" y2="230" stroke="#ccc"/>
    <line x1="180" y1="160" x2="80" y2="110" stroke="#ccc"/>
    <polygon data-bap-prompt="Compare: Slack" points="180,60 260,118 240,220 130,210 100,118" fill="#EC3B4A" fill-opacity="0.35" stroke="#EC3B4A" style="cursor:pointer"/>
    <polygon data-bap-prompt="Compare: Teams" points="180,90 240,128 220,200 150,200 120,125" fill="#7dd3fc" fill-opacity="0.35" stroke="#7dd3fc" style="cursor:pointer"/>
    <text x="180" y="30" fill="#1a1a1a" font-size="11" text-anchor="middle">Usability</text>
    <text x="295" y="108" fill="#1a1a1a" font-size="11" text-anchor="middle">Search</text>
    <text x="265" y="248" fill="#1a1a1a" font-size="11" text-anchor="middle">Integrations</text>
    <text x="95" y="248" fill="#1a1a1a" font-size="11" text-anchor="middle">Voice</text>
    <text x="65" y="108" fill="#1a1a1a" font-size="11" text-anchor="middle">Mobile</text>
    <text x="50" y="295" fill="#EC3B4A" font-size="11">■ Slack</text>
    <text x="120" y="295" fill="#7dd3fc" font-size="11">■ Teams</text>
  </svg>
</div>
```
