# Template — `source_cards`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:18px;border:1px solid {{BORDER}};display:flex;flex-direction:column;gap:10px">
  <h3 style="margin:0;font-size:14px">{{HEADING}}</h3>
  <!-- repeat per source (≤ 5) -->
  <a href="{{URL}}" target="_blank" rel="noopener" style="display:block;text-decoration:none;color:{{FG}};border:1px solid {{BORDER}};padding:10px;border-radius:8px">
    <div style="font-weight:600">{{SOURCE_TITLE}}</div>
    <div style="font-size:12px;color:{{MUTED}};margin-top:2px">{{SUMMARY}}</div>
    <div style="font-size:11px;color:{{MUTED}};margin-top:6px">{{DOMAIN}}</div>
  </a>
</div>
```

## Placeholders

- `{{URL}}` — full http(s) URL
- `{{SOURCE_TITLE}}` — article / paper title
- `{{SUMMARY}}` — one-sentence summary
- `{{DOMAIN}}` — visible domain (e.g. `arxiv.org`)
- This is the ONLY widget where `<a href>` is the click target — and every anchor MUST carry `target="_blank" rel="noopener"`.
