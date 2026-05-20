# Template — `pricing_table`

```html
<div style="background:{{BG}};color:{{FG}};padding:22px;border-radius:14px;font-family:{{FONT}}">
  <h3 style="margin:0 0 16px;font-size:18px">{{HEADING}}</h3>
  <div style="display:grid;grid-template-columns:repeat({{TIER_COUNT}},1fr);gap:14px">
    <!-- non-recommended tier -->
    <div style="border:1px solid {{BORDER}};padding:16px;border-radius:10px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:{{MUTED}}">{{TIER_NAME}}</div>
      <div style="font-size:28px;font-weight:700;margin:6px 0">{{PRICE}}<span style="font-size:14px;color:{{MUTED}};font-weight:400">{{PRICE_SUFFIX}}</span></div>
      <ul style="list-style:none;padding:0;margin:10px 0;font-size:13px;line-height:1.8">
        <li>✓ {{FEATURE_LINE}}</li>
        <li style="color:{{MUTED}}">✗ {{EXCLUDED_LINE}}</li>
      </ul>
      <button data-bap-prompt="Sign me up for {{TIER_NAME}}" style="width:100%;background:transparent;color:{{FG}};border:1px solid {{BORDER}};padding:8px;border-radius:6px;cursor:pointer">{{CTA_LABEL}}</button>
    </div>
    <!-- recommended tier (2px BAP red border + ribbon) -->
    <div style="border:2px solid #EC3B4A;padding:16px;border-radius:10px;position:relative">
      <div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#EC3B4A;color:#fff;padding:3px 10px;border-radius:999px;font-size:11px">Recommended</div>
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#EC3B4A">{{REC_TIER_NAME}}</div>
      <div style="font-size:28px;font-weight:700;margin:6px 0">{{REC_PRICE}}<span style="font-size:14px;color:{{MUTED}};font-weight:400">{{REC_PRICE_SUFFIX}}</span></div>
      <ul style="list-style:none;padding:0;margin:10px 0;font-size:13px;line-height:1.8">
        <li>✓ {{REC_FEATURE_LINE}}</li>
      </ul>
      <button data-bap-prompt="Sign me up for {{REC_TIER_NAME}}" style="width:100%;background:#EC3B4A;color:#fff;border:0;padding:8px;border-radius:6px;cursor:pointer">{{REC_CTA_LABEL}}</button>
    </div>
  </div>
</div>
```

## Placeholders

- `{{TIER_COUNT}}` — `3` (most common) or `4`
- Exactly ONE tier is the recommended tier — 2px BAP red border + "Recommended" ribbon
- Each tier's CTA button is its click target. The Enterprise tier typically says "Contact sales" not "Sign up".
