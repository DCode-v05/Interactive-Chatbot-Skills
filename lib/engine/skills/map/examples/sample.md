# Sample: Europe 4-stop itinerary

**User prompt:** "Draw our 4-stop Europe itinerary: London → Paris → Berlin → Prague."

**Why this is a map case:** the user explicitly asked to draw cities on a map, all 4 cities are within Europe, and the "→" wording asks for an ordered route — so we set `region: "europe"` and supply `routeIds`.

**What the skill emits:**

```json
{
  "widget": "map",
  "version": "1.0",
  "title": "Europe itinerary",
  "caption": "4 cities · approximate locations",
  "region": "europe",

  "pins": [
    {
      "id": "london",
      "name": "London",
      "x": 200,
      "y": 150,
      "clickPrompt": "Tell me more about London on this itinerary"
    },
    {
      "id": "paris",
      "name": "Paris",
      "x": 270,
      "y": 170,
      "clickPrompt": "Tell me more about Paris on this itinerary"
    },
    {
      "id": "berlin",
      "name": "Berlin",
      "x": 340,
      "y": 200,
      "clickPrompt": "Tell me more about Berlin on this itinerary"
    },
    {
      "id": "prague",
      "name": "Prague",
      "x": 380,
      "y": 215,
      "clickPrompt": "Tell me more about Prague on this itinerary"
    }
  ],

  "routeIds": ["london", "paris", "berlin", "prague"]
}
```

## What this looks like rendered

A paper-cream rounded card. Inside: the title "Europe itinerary" and the small muted caption "4 cities · approximate locations". Below them, an SVG with a beige sea fill, a rough white Europe outline stroked in grey, and four red pin dots labelled London, Paris, Berlin, Prague at their approximate viewBox coordinates. A dashed red polyline connects the pins in order: London → Paris → Berlin → Prague.

## What clicks do

- User clicks **the London pin** → chat fires "Tell me more about London on this itinerary" as the next user message
- User clicks **the Paris pin** → chat fires "Tell me more about Paris on this itinerary"
- User clicks **Berlin** or **Prague** → analogously

The route polyline itself is not interactive — only the pin `<g>` is a click target. No re-typing. The prompt fires verbatim.
