/**
 * Map widget schema. Stylized geographic surface with location pins.
 *
 * The model picks one of four `region` presets — the renderer ships fixed
 * SVG outlines for each. The model supplies pin coordinates in viewBox
 * space (0..600, 0..360) approximately matching real lat/lng — NOT real
 * geo data.
 *
 * Mirror of the JSON shape documented in
 * `lib/engine/skills/map/template.md`. The agent emits a `MapWidget`
 * object; `validateMap()` is the runtime gate; `MapWidget.tsx` is the
 * renderer.
 */

/** Fixed region preset — picks which SVG outline the renderer draws. */
export type MapRegion = "world" | "europe" | "us" | "asia";

export interface MapPin {
  /** Kebab-case stable id, unique within the widget. */
  id: string;
  /** City or location name shown next to the pin. */
  name: string;
  /** ViewBox x coordinate (0..600). Approximate, not real geo. */
  x: number;
  /** ViewBox y coordinate (0..360). Approximate, not real geo. */
  y: number;
  /** Prompt fired as the next user message when this pin is clicked. */
  clickPrompt: string;
}

export interface MapWidget {
  widget: "map";
  version: "1.0";
  /** One-line title (e.g. "Europe itinerary"). */
  title: string;
  /** Optional one-line context (e.g. "5 cities · approximate locations"). */
  caption?: string;
  /** One of the four fixed region outline presets. */
  region: MapRegion;
  /** 1–8 location pins with unique ids and viewBox-space coords. */
  pins: MapPin[];
  /**
   * Optional ordered list of pin ids drawing a polyline through them.
   * Must reference existing pin ids and have length >= 2 when present.
   */
  routeIds?: string[];
}
