# Template — `profile_card`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:20px;display:flex;gap:16px;align-items:center;font-family:{{FONT}}">
  <div style="width:60px;height:60px;border-radius:50%;background:#EC3B4A;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">{{INITIALS}}</div>
  <div style="flex:1">
    <div style="font-weight:700">{{PERSON_NAME}}</div>
    <div style="font-size:12px;color:{{MUTED}}">{{ROLE_OR_TAGLINE}}</div>
    <!-- optional 2–3 stats -->
    <div style="margin-top:6px;display:flex;gap:14px;font-size:11px;color:{{MUTED}}">
      <span><strong style="color:{{FG}}">{{STAT_A_VALUE}}</strong> {{STAT_A_LABEL}}</span>
    </div>
  </div>
  <button data-bap-prompt="{{ACTION_VERB}} {{PERSON_NAME}}" style="background:#EC3B4A;color:#fff;border:0;padding:8px 14px;border-radius:6px;cursor:pointer;font-size:13px">{{ACTION_VERB}}</button>
</div>
```

## Placeholders

- `{{INITIALS}}` — 1–2 letters
- `{{ACTION_VERB}}` — "Message", "View profile", "Connect"
- The action button is the click target.
