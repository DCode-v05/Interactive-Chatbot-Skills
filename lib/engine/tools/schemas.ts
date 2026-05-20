import type { ToolDefinition } from "./types";
import { JSON_INTENTS } from "../skills/json-registry";

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: "submit_widget_json",
    description:
      "Submit a typed widget. The engine validates the JSON shape against " +
      "the skill's schema (lib/engine/skills/<intent>/validate.ts). If " +
      "valid → renders + ENDS the loop (terminal). If invalid → returns " +
      "issues; agent loops back with corrected JSON.\n\n" +
      "See lib/engine/skills/<intent>/template.md for each skill's JSON " +
      "schema. All widgets carry: { widget: <intent>, version: '1.0', " +
      "[variant: <variant>], ...fields }. Click prompts are baked into " +
      "the JSON; the host fires them on click. comparison-table additionally " +
      "supports {option}/{attribute}/{value}/{options} placeholder substitution.",
    input_schema: {
      type: "object",
      properties: {
        intent: {
          type: "string",
          enum: [...JSON_INTENTS],
          description:
            "Widget super-skill intent. See lib/engine/skills/<intent>/SKILL.md " +
            "for the schema of each.",
        },
        widget: {
          type: "object",
          description:
            "The full widget JSON object conforming to the skill's schema. " +
            "Must include the `widget` discriminator field set to the intent " +
            "(note: code_block uses discriminator 'code-block' with a hyphen) " +
            "and `version: \"1.0\"`. Multi-variant skills must also include " +
            "the `variant` field.",
        },
        prose: {
          type: "string",
          description:
            "Optional ONE-sentence preamble shown above the widget. Omit if " +
            "redundant.",
        },
      },
      required: ["intent", "widget"],
    },
    terminal: true,
  },
];

export function getToolDefinition(name: string): ToolDefinition | undefined {
  return TOOL_DEFINITIONS.find((t) => t.name === name);
}
