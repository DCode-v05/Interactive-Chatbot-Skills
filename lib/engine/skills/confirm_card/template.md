# Template — `confirm_card`

```html
<div style="background:{{BG}};color:{{FG}};border-left:4px solid #EC3B4A;border-radius:10px;padding:18px;font-family:{{FONT}}">
  <p style="margin:0 0 16px">{{CONFIRMATION_QUESTION}} {{IRREVERSIBLE_NOTE}}</p>
  <button data-bap-prompt="{{CONFIRMED_PROMPT}}" data-bap-confirm style="background:#EC3B4A;color:#fff;border:0;padding:9px 16px;border-radius:6px;cursor:pointer">{{ACTION_LABEL}}</button>
  <button data-bap-prompt="Cancel" style="margin-left:8px;background:transparent;color:{{FG}};border:1px solid {{BORDER}};padding:9px 16px;border-radius:6px;cursor:pointer">Cancel</button>
</div>
```

## Placeholders

- `{{CONFIRMATION_QUESTION}}` — "Delete the staging database?"
- `{{IRREVERSIBLE_NOTE}}` — "Cannot be undone." (or specifics)
- `{{CONFIRMED_PROMPT}}` — message fired after the user confirms in the dialog
- `{{ACTION_LABEL}}` — destructive verb on the red button ("Delete", "Send")
- The destructive button MUST carry `data-bap-confirm` so the host shows a `window.confirm()` dialog.
