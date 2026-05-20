# Map — Template

Copy the JSON, replace every `[bracketed placeholder]`, and emit. The validator rejects any unfilled placeholders. Omit `caption` and `routeIds` when not needed (do not leave them as bracketed placeholders).

```json
{
  "widget": "map",
  "version": "1.0",
  "title": "[One-line map title, e.g. 'Europe itinerary']",
  "caption": "[N cities · approximate locations]",
  "region": "[world | europe | us | asia]",

  "pins": [
    {
      "id": "[kebab-case-pin-id]",
      "name": "[City or location name]",
      "x": 0,
      "y": 0,
      "clickPrompt": "[Full prompt fired when this pin is clicked]"
    }
  ],

  "routeIds": ["[first-pin-id]", "[next-pin-id]"]
}
```

## Field reference

| Field | Required | Notes |
|---|---|---|
| `widget` | yes | Must be exactly `"map"` |
| `version` | yes | Currently `"1.0"` |
| `title` | yes | Non-empty one-line title |
| `caption` | no | Short approximate-locations disclaimer; omit if no caption |
| `region` | yes | One of `"world"`, `"europe"`, `"us"`, `"asia"` |
| `pins` | yes | 1–8 items |
| `pins[].id` | yes | Kebab-case, unique within widget |
| `pins[].name` | yes | Human label shown next to the pin |
| `pins[].x` | yes | Number in [0..600] (viewBox space) |
| `pins[].y` | yes | Number in [0..360] (viewBox space) |
| `pins[].clickPrompt` | yes | Non-empty prompt fired on click |
| `routeIds` | no | Ordered list of pin ids, length ≥ 2; every id must exist in `pins` |

## Region presets and city cheat sheet

The renderer ships fixed (stylized) SVG outlines for each preset. ViewBox is `0 0 600 360`. Approximate viewBox coords for common cities under each preset:

### `world`

A roughly continental world shape filling the viewBox. Use when locations span multiple continents.

| City | x | y |
|---|---|---|
| New York | 160 | 150 |
| Los Angeles | 100 | 165 |
| London | 290 | 130 |
| Paris | 300 | 140 |
| Berlin | 320 | 130 |
| Tokyo | 510 | 165 |
| Beijing | 480 | 155 |
| Sydney | 530 | 280 |
| São Paulo | 220 | 250 |
| Cape Town | 330 | 270 |
| Dubai | 390 | 180 |
| Mumbai | 430 | 195 |

### `europe`

Rough Europe outline. Use when locations are within Europe.

| City | x | y |
|---|---|---|
| London | 200 | 150 |
| Paris | 270 | 170 |
| Berlin | 340 | 200 |
| Madrid | 200 | 260 |
| Rome | 340 | 270 |
| Amsterdam | 290 | 160 |
| Prague | 380 | 200 |
| Vienna | 380 | 220 |
| Warsaw | 420 | 180 |
| Stockholm | 380 | 100 |
| Athens | 430 | 290 |
| Lisbon | 140 | 270 |

### `us`

Rough United States outline. Use when locations are within the contiguous US.

| City | x | y |
|---|---|---|
| New York | 490 | 140 |
| Boston | 510 | 130 |
| Washington DC | 470 | 160 |
| Atlanta | 420 | 220 |
| Miami | 460 | 280 |
| Chicago | 380 | 150 |
| Dallas | 320 | 230 |
| Houston | 320 | 260 |
| Denver | 240 | 180 |
| Seattle | 110 | 110 |
| San Francisco | 80 | 180 |
| Los Angeles | 110 | 220 |

### `asia`

Rough Asia outline. Use when locations are within Asia.

| City | x | y |
|---|---|---|
| Tokyo | 490 | 170 |
| Seoul | 460 | 175 |
| Beijing | 410 | 160 |
| Shanghai | 440 | 200 |
| Hong Kong | 420 | 220 |
| Singapore | 390 | 280 |
| Bangkok | 360 | 250 |
| Mumbai | 220 | 210 |
| Delhi | 250 | 175 |
| Dubai | 150 | 200 |
| Jakarta | 410 | 305 |
| Manila | 470 | 250 |

Use these as a starting point — nudge ±20px if a city you need isn't listed. Pins are NOT real geo data; always include the "approximate locations" caption.
