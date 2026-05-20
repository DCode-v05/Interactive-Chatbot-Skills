# Template — `heatmap`

```html
<div style="background:{{BG}};color:{{FG}};border-radius:10px;padding:20px;font-family:{{FONT}}">
  <h3 style="margin:0 0 4px;font-size:15px">{{HEATMAP_TITLE}}</h3>
  <div style="font-size:11px;color:{{MUTED}};margin-bottom:10px">{{AXIS_CAPTION}}</div>
  <table style="border-collapse:collapse">
    <thead>
      <tr>
        <th></th>
        <!-- per X-axis tick -->
        <th style="font-size:10px;color:{{MUTED}};font-weight:400;padding:2px 4px">{{X_LABEL}}</th>
      </tr>
    </thead>
    <tbody>
      <!-- per row (Y-axis) -->
      <tr>
        <td style="font-size:10px;color:{{MUTED}};padding:0 6px;text-align:right">{{Y_LABEL}}</td>
        <!-- per cell -->
        <td data-bap-prompt="Show data for {{Y_LABEL}} at {{X_LABEL}}" style="width:18px;height:18px;background:rgba(236,59,74,{{OPACITY}});cursor:pointer"></td>
      </tr>
    </tbody>
  </table>
</div>
```

## Placeholders

- `{{OPACITY}}` — `0.0` (no activity) through `1.0` (max). Map value → opacity, e.g. `value / max`.
- `{{X_LABEL}}` / `{{Y_LABEL}}` — axis ticks (e.g. days × hours)
- Every `<td>` cell is a click target. Keep cells compact (16–22px square) and prompts terse so you stay under the 20KB cap on dense grids.
