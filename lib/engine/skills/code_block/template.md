# Template — `code_block`

```html
<div id="bap-w-code" style="background:#0d1117;color:#e6edf3;border-radius:10px;font-family:ui-monospace;overflow:hidden">
  <div style="background:#161b22;padding:8px 14px;font-size:11px;color:#8b949e;display:flex;align-items:center;justify-content:space-between">
    <span data-bap-prompt="Explain this {{FILENAME}} code" style="cursor:pointer">{{FILENAME}}</span>
    <button data-role="copy" style="background:#21262d;color:#e6edf3;border:1px solid #30363d;border-radius:6px;padding:2px 10px;font-size:11px;cursor:pointer;font-family:ui-monospace">Copy</button>
  </div>
  <pre data-role="src" style="margin:0;padding:14px"><code>{{CODE_BODY}}</code></pre>
</div>
<script>(function(){var r=document.getElementById("bap-w-code");if(!r)return;var btn=r.querySelector("[data-role=copy]"),src=r.querySelector("[data-role=src]");if(!btn||!src)return;btn.addEventListener("click",function(){try{navigator.clipboard.writeText(src.textContent||"");btn.textContent="Copied";setTimeout(function(){btn.textContent="Copy";},1200);}catch(e){}});})();</script>
```

## Placeholders

- `{{FILENAME}}` — header strip text (also the click target for "Explain this code")
- `{{CODE_BODY}}` — the actual code (HTML-escape `<` as `&lt;` if needed)
- TWO click targets: the filename span (chat follow-up) + the Copy button (in-script clipboard write, no `data-bap-prompt`).
- Script must use the IIFE pattern, null-guard, no fetch/eval.
