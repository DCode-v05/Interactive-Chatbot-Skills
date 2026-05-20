---
name: map
description: Render a small set of locations on a stylized geographic surface. Trigger when the user asks for "show these cities on a map", "draw our European itinerary", "plot these offices", or any request that's fundamentally "here are N places, place them on a region". The model picks ONE of four fixed region presets (world, europe, us, asia) and supplies pin coordinates in viewBox space approximately matching real lat/lng — pins are not real geo data.
allowed-tools:
---

# Map Widget

You are generating an **interactive map widget**, not a written answer. Output is JSON the Mini-BAP host renders inside the chat bubble; each pin is clickable and fires its pre-baked `clickPrompt` as the next user message.

## When to use this skill

Trigger on:

- "Show me London, Paris, and Berlin on a map"
- "Draw our 5-stop Europe itinerary"
- "Plot our US offices"
- "Where are the major Asia tech hubs?"

Do **not** use this skill when:

- The user needs cartographic precision (we are not a GIS tool — pins are approximate)
- The user wants driving directions or live geo data
- There are no real locations involved (use `chart`, `list`, etc. instead)
- The region isn't one of the four presets — there is no "africa", no "south america", no "country-level". Either pick the closest preset or fall back to a different widget.

## What to gather before writing

1. **Region** — pick exactly ONE preset:
   - `world` — locations span multiple continents
   - `europe` — locations within Europe
   - `us` — locations within the United States
   - `asia` — locations within Asia
   The renderer ships a fixed (stylized, rough) outline for each. You DO NOT invent SVG paths — you only pick the preset name.
2. **Pin list** — 1 to 8 locations. For each:
   - `id` (kebab-case, unique within the widget)
   - `name` (the human label shown next to the pin)
   - `x`, `y` in **viewBox space**: x ∈ [0..600], y ∈ [0..360]. These are APPROXIMATE — you eyeball where the city sits on the chosen region preset based on your training-time knowledge. See `template.md` for a cheat sheet of common city coords under each region.
   - `clickPrompt` — the full prompt that fires when the user clicks this pin (e.g. `"Tell me more about Paris"`).
3. **Optional route** — if the user asked for an itinerary / route / journey, set `routeIds` to the ordered list of pin ids the polyline should connect through. Length must be ≥ 2 and every id must exist in `pins`.
4. **Caption** — short disclaimer like `"5 cities · approximate locations"`. Always include the "approximate" wording — pins are NOT real geo data.

## Filling the template

Open `template.md`, copy the JSON skeleton, fill the `[bracketed placeholders]`. Use the city-coords cheat sheet in that file as a starting point — adjust slightly for cities not listed. See `examples/sample.md` for a worked vignette.

## Validate before emitting

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/validate.sh path/to/output.json
```

The validator checks: parses, no unfilled placeholders, required fields, `widget === "map"`, `region` is one of the four presets, 1–8 pins, unique pin ids, each pin's x ∈ [0..600] and y ∈ [0..360], non-empty `name` and `clickPrompt` per pin, and (if `routeIds` is set) length ≥ 2 with every id referencing a real pin.

## Output contract

Return **only** the validated JSON object. No prose preamble. No markdown fences. No SVG. No invented paths. The host renders the JSON directly — the renderer owns the region outlines, the water/land styling, and the route line. You own: region choice, pin coordinates, names, click prompts.
