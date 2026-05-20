# Sample widget — `code_block`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div id="bap-w-code" style="background:#0d1117;color:#e6edf3;border-radius:10px;font-family:ui-monospace;overflow:hidden">
  <div style="background:#161b22;padding:8px 14px;font-size:11px;color:#8b949e;display:flex;align-items:center;justify-content:space-between">
    <span data-bap-prompt="Explain this example.ts code" style="cursor:pointer">example.ts</span>
    <button data-role="copy" style="background:#21262d;color:#e6edf3;border:1px solid #30363d;border-radius:6px;padding:2px 10px;font-size:11px;cursor:pointer;font-family:ui-monospace">Copy</button>
  </div>
  <pre data-role="src" style="margin:0;padding:14px"><code>function f(){}</code></pre>
</div>
<script>(function(){var r=document.getElementById("bap-w-code");if(!r)return;var btn=r.querySelector("[data-role=copy]"),src=r.querySelector("[data-role=src]");if(!btn||!src)return;btn.addEventListener("click",function(){try{navigator.clipboard.writeText(src.textContent||"");btn.textContent="Copied";setTimeout(function(){btn.textContent="Copy";},1200);}catch(e){}});})();</script>
```
