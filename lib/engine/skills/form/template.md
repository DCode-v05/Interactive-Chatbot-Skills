# Template — `form` (visual-only, no real `<form>` tag)

```html
<div style="background:{{BG}};color:{{FG}};border-radius:14px;padding:22px;font-family:{{FONT}};max-width:420px">
  <div style="font-weight:700;font-size:16px;margin:0 0 4px">{{FORM_TITLE}}</div>
  <div style="font-size:12px;color:{{MUTED}};margin-bottom:16px">{{FORM_DESCRIPTION}}</div>
  <div style="display:flex;flex-direction:column;gap:12px">
    <!-- repeat per field (3–7 rows) -->
    <div>
      <div style="font-size:12px;margin-bottom:4px">{{FIELD_LABEL}}</div>
      <input type="{{INPUT_TYPE}}" placeholder="{{PLACEHOLDER}}" style="width:100%;background:{{INPUT_BG}};color:{{FG}};border:1px solid {{BORDER}};border-radius:6px;padding:8px 10px;font-size:13px">
    </div>
    <!-- or a select field -->
    <div>
      <div style="font-size:12px;margin-bottom:4px">{{SELECT_LABEL}}</div>
      <select style="width:100%;background:{{INPUT_BG}};color:{{FG}};border:1px solid {{BORDER}};border-radius:6px;padding:8px 10px;font-size:13px">
        <option>{{OPTION_A}}</option>
        <option>{{OPTION_B}}</option>
      </select>
    </div>
  </div>
  <button type="button" data-bap-prompt="Submit {{FORM_TITLE}} with the entered values" style="margin-top:16px;background:#EC3B4A;color:#fff;border:0;border-radius:6px;padding:10px 18px;font-size:13px;cursor:pointer">{{SUBMIT_LABEL}}</button>
</div>
```

## Placeholders

- Use a `<div>` wrapper, NOT a `<form>` tag — without a script handler, a real `<form>` reloads the page on click.
- The submit `<button type="button">` carries `data-bap-prompt` — that's the click target.
- Inputs are visual placeholders only; no script, no collection.
