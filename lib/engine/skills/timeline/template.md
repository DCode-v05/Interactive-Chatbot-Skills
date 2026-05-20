# Template — `timeline`

```html
<div style="background:{{BG}};color:{{FG}};padding:22px;border-radius:14px;font-family:{{FONT}}">
  <h3 style="margin:0 0 16px;font-size:18px">{{TIMELINE_TITLE}}</h3>
  <div style="position:relative;padding-left:120px">
    <div style="position:absolute;left:96px;top:0;bottom:0;width:2px;background:{{LINE_COLOR}}"></div>
    <!-- repeat 3–8 events in chronological order -->
    <div data-bap-prompt="Tell me more about: {{EVENT_TITLE}} ({{DATE}})" style="position:relative;padding-bottom:18px;cursor:pointer">
      <div style="position:absolute;left:-120px;top:2px;width:80px;text-align:right;font-family:ui-monospace,monospace;font-size:12px;color:{{DATE_COLOR}}">{{DATE}}</div>
      <div style="position:absolute;left:-30px;top:6px;width:10px;height:10px;border-radius:50%;background:{{DOT_COLOR}}"></div>
      <div style="font-weight:600;font-size:14px">{{EVENT_TITLE}}</div>
      <div style="font-size:12px;color:{{MUTED}};margin-top:2px">{{EVENT_BODY}}</div>
    </div>
  </div>
</div>
```

## Placeholders

- `{{DATE}}` — year or full date (right-aligned monospace)
- `{{DATE_COLOR}}` / `{{DOT_COLOR}}` — `#EC3B4A` for the accent event, muted for others
- `{{LINE_COLOR}}` — vertical guide line, very low-contrast
- `{{EVENT_TITLE}}` / `{{EVENT_BODY}}` — what happened + 1-line context
- Each event `<div>` is the click target.
