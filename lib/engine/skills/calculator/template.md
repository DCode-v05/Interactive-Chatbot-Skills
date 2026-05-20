# Template — `calculator`

```html
<div id="bap-w-{{TOOL_SLUG}}" style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}}">
  <h3 style="margin:0 0 12px;font-size:15px">{{CALC_TITLE}}</h3>
  <!-- repeat per input -->
  <label style="display:block;font-size:12px;color:{{MUTED}};margin-top:10px">{{INPUT_LABEL}}</label>
  <input data-role="{{INPUT_ROLE}}" type="{{INPUT_TYPE}}" value="{{DEFAULT_VALUE}}" {{EXTRA_ATTRS}} style="width:100%;background:{{INPUT_BG}};color:{{FG}};border:1px solid {{BORDER}};padding:8px;border-radius:6px">
  <!-- live output -->
  <div style="margin-top:14px;font-size:11px;color:{{MUTED}}">{{OUTPUT_LABEL}}</div>
  <div data-role="total" style="font-size:28px;color:#EC3B4A;font-weight:700">{{INITIAL_OUTPUT}}</div>
  <!-- follow-up click target (chat continuation) -->
  <button data-bap-prompt="Explain how {{OUTPUT_LABEL}} is computed" style="margin-top:14px;background:{{CHIP_BG}};color:{{FG}};border:1px solid {{BORDER}};border-radius:999px;padding:6px 14px;font-size:12px;cursor:pointer">Explain this calculation</button>
</div>
<script>(function(){var r=document.getElementById("bap-w-{{TOOL_SLUG}}");if(!r)return;var a=r.querySelector("[data-role={{INPUT_ROLE}}]");/* ...wire inputs to total via 'input' events; null-guard every querySelector; no fetch/eval */ })();</script>
```

## Placeholders

- `{{TOOL_SLUG}}` — short, unique-ish slug for the root id (`bap-w-tip`, `bap-w-bmi`)
- `{{INPUT_ROLE}}` — `data-role` value the script queries
- Live inputs do NOT carry `data-bap-prompt`. The "Explain this calculation" chip IS the click target — it's the chat-continuation affordance.
- Script must use the IIFE pattern + null-guard + `addEventListener("input", ...)`. No `fetch` / `eval` / `new Function` / network calls.
