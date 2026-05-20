# Sample widget — `calculator`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div id="bap-w-tip" style="background:#0f1116;color:#e6e6e6;border-radius:14px;padding:22px;font-family:ui-sans-serif">
  <input data-role="bill" type="number" value="50" style="width:100%;background:#16181f;color:#fff;border:1px solid #333;padding:8px">
  <input data-role="tip" type="range" min="0" max="40" value="18" style="width:100%;accent-color:#EC3B4A">
  <div data-role="total" style="font-size:24px;color:#EC3B4A">$59.00</div>
  <button data-bap-prompt="Explain how the tip total is computed" style="margin-top:12px;background:#16181f;color:#fff;border:1px solid #333;border-radius:999px;padding:6px 14px;font-size:12px;cursor:pointer">Explain this calculation</button>
</div>
<script>(function(){var r=document.getElementById("bap-w-tip");if(!r)return;var b=r.querySelector("[data-role=bill]"),t=r.querySelector("[data-role=tip]"),o=r.querySelector("[data-role=total]");function f(){o.textContent="$"+(parseFloat(b.value)*(1+parseFloat(t.value)/100)).toFixed(2);}b.addEventListener("input",f);t.addEventListener("input",f);})();</script>
```
