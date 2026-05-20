# Sample widget — `venn_diagram`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:20px">
  <svg viewBox="0 0 400 250" style="width:100%">
    <circle cx="150" cy="125" r="80" fill="#EC3B4A" fill-opacity="0.45"/>
    <circle cx="250" cy="125" r="80" fill="#7dd3fc" fill-opacity="0.45"/>
    <text data-bap-prompt="Show items in: Set A only" x="110" y="130" fill="#fff" font-size="13" text-anchor="middle" style="cursor:pointer">A only</text>
    <text data-bap-prompt="Show items in: Both A and B" x="200" y="130" fill="#fff" font-size="13" text-anchor="middle" style="cursor:pointer">A ∩ B</text>
    <text data-bap-prompt="Show items in: Set B only" x="290" y="130" fill="#fff" font-size="13" text-anchor="middle" style="cursor:pointer">B only</text>
  </svg>
</div>
```
