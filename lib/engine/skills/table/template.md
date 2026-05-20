# Template — `table`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:18px;font-family:{{FONT}};border:1px solid {{BORDER}}">
  <h3 style="margin:0 0 10px;font-size:14px">{{TABLE_TITLE}}</h3>
  <table style="width:100%;border-collapse:collapse;font-size:13px">
    <thead>
      <tr style="background:{{HEADER_BG}};color:{{HEADER_FG}}">
        <th style="padding:8px;text-align:left">{{COL_1}}</th>
        <th style="padding:8px;text-align:left">{{COL_2}}</th>
        <th style="padding:8px;text-align:left">{{COL_3}}</th>
      </tr>
    </thead>
    <tbody>
      <!-- repeat per row -->
      <tr data-bap-prompt="Tell me more about: {{ROW_NAME}}" style="cursor:pointer;border-bottom:1px solid {{BORDER}}">
        <td style="padding:8px"><strong>{{ROW_NAME}}</strong></td>
        <td style="padding:8px">{{CELL_A}}</td>
        <td style="padding:8px">{{CELL_B}}</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Placeholders

- `{{TABLE_TITLE}}` — "Lambda vs Vercel vs Workers"
- `{{COL_*}}` — column headers (≤ 4 columns total)
- `{{ROW_NAME}}` — row identifier (used in click prompt + bold first cell)
- `{{CELL_*}}` — comparison cell values (highlight winners with weight or color)
- Each `<tr>` in `<tbody>` carries `data-bap-prompt`.
