import type { ToolCall, ToolResult } from "./types";
import { getJsonSkill, JSON_INTENTS } from "../skills/json-registry";
import type { JsonWidget } from "@/lib/types/engine-widgets";

export interface FinalRender {
  widget: JsonWidget;
  prose: string | null;
}

export interface ExecuteResult {
  result: ToolResult;
  finalRender?: FinalRender;
}

export function executeTool(call: ToolCall): ExecuteResult {
  try {
    switch (call.name) {
      case "submit_widget_json":
        return runSubmitJson(call);
      default:
        return {
          result: errorResult(
            call,
            `Unknown tool "${call.name}". Available: submit_widget_json.`,
          ),
        };
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { result: errorResult(call, `Tool threw: ${msg}`) };
  }
}

function runSubmitJson(call: ToolCall): ExecuteResult {
  const intent = String(call.input.intent ?? "").trim();
  const widget = call.input.widget;
  const proseRaw = call.input.prose;
  const prose =
    typeof proseRaw === "string" && proseRaw.trim().length > 0
      ? proseRaw.trim()
      : null;

  const skill = getJsonSkill(intent);
  if (!skill) {
    return {
      result: rejectResult(
        call,
        [
          `Unknown intent "${intent}". Valid intents: ${JSON_INTENTS.join(", ")}.`,
        ],
        `submit_widget_json rejected — fix the intent and call again.`,
      ),
    };
  }
  if (!widget || typeof widget !== "object") {
    return {
      result: rejectResult(
        call,
        [`"widget" must be a JSON object conforming to the ${intent} schema.`],
        `submit_widget_json rejected — provide the widget object and call again.`,
      ),
    };
  }

  const v = skill.validate(widget);
  if (!v.valid) {
    return {
      result: rejectResult(
        call,
        v.issues,
        `submit_widget_json rejected — fix the JSON above and call submit_widget_json AGAIN.`,
      ),
    };
  }

  return {
    result: {
      toolCallId: call.id,
      name: call.name,
      content: [
        `valid: true`,
        `intent: ${intent}`,
        v.summary,
        ``,
        `accepted — widget rendered. Loop ends.`,
      ].join("\n"),
      isError: false,
    },
    finalRender: { widget: widget as JsonWidget, prose },
  };
}

function rejectResult(call: ToolCall, issues: string[], nextStep: string): ToolResult {
  const lines = [`valid: false`];
  if (issues.length > 0) {
    lines.push(`issues:`);
    for (const i of issues) lines.push(`  - ${i}`);
  }
  lines.push(``, `→ ${nextStep}`);
  return {
    toolCallId: call.id,
    name: call.name,
    content: lines.join("\n"),
    isError: false,
  };
}

function errorResult(call: ToolCall, message: string): ToolResult {
  return {
    toolCallId: call.id,
    name: call.name,
    content: message,
    isError: true,
  };
}
