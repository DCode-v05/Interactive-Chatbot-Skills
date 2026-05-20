/**
 * Interactive widget schema — three variants that are TRULY interactive,
 * driven by React state in the renderer (no LLM-written <script> tags):
 *
 *   - calculator: live numeric tool. Inputs drive a safe formula evaluator
 *                 that recomputes the output panel on every keystroke /
 *                 slider move. An "Explain this calculation" chip fires
 *                 the model-provided explainPrompt.
 *   - quiz:       multi-question multiple-choice. Selected answers are
 *                 scored client-side in React on submit; a per-question
 *                 ✓/✗ pass is shown, then a "Walk me through each answer"
 *                 chip fires reviewPrompt.
 *   - form:       visual structured-input collection. No state, no scoring
 *                 — the submit button just fires submitPrompt.
 */

export type InteractiveOutputFormat = "currency" | "number" | "percent";

export interface InteractiveCalculatorInput {
  /** Variable name in the formula (kebab-case is fine: `bill`, `tip-pct`). */
  id: string;
  /** Visible label above the control. */
  label: string;
  /** Input control kind — numeric box or range slider. */
  kind: "number" | "range";
  /** Initial value. */
  defaultValue: number;
  /** Minimum for `range` (and clamp for `number`). */
  min?: number;
  /** Maximum for `range` (and clamp for `number`). */
  max?: number;
  /** Step increment. Defaults to 1. */
  step?: number;
  /** Optional suffix shown next to the value ("$", "%", "kg"). */
  unit?: string;
}

export interface InteractiveCalculatorWidget {
  widget: "interactive";
  variant: "calculator";
  version: "1.0";
  title: string;
  /** 2–5 inputs with unique ids. */
  inputs: InteractiveCalculatorInput[];
  /**
   * Arithmetic expression in `inputs[].id` values plus + - * / and parens,
   * e.g. `"bill * (1 + tip-pct / 100)"`. Numeric literals are allowed.
   * Evaluated by the React renderer with a tiny safe parser — NOT eval().
   */
  formula: string;
  /** Label shown above the output panel. */
  outputLabel: string;
  /** Drives how the result number is formatted. */
  outputFormat: InteractiveOutputFormat;
  /** Optional unit suffix appended after the formatted number. */
  outputUnit?: string;
  /** Prompt fired when the user clicks the "Explain this calculation" chip. */
  explainPrompt: string;
}

export interface InteractiveQuizOption {
  id: string;
  label: string;
  /** Exactly one option per question must have `correct: true`. */
  correct: boolean;
}

export interface InteractiveQuizQuestion {
  id: string;
  /** Question text shown as the fieldset legend. */
  prompt: string;
  /** 2–4 options. */
  options: InteractiveQuizOption[];
}

export interface InteractiveQuizWidget {
  widget: "interactive";
  variant: "quiz";
  version: "1.0";
  title: string;
  /** 3–5 questions with unique ids. */
  questions: InteractiveQuizQuestion[];
  /** Prompt fired when the user clicks "Walk me through each answer" after submit. */
  reviewPrompt: string;
}

export type InteractiveFormFieldKind = "text" | "email" | "textarea" | "select";

export interface InteractiveFormField {
  id: string;
  label: string;
  kind: InteractiveFormFieldKind;
  placeholder?: string;
  /** Required for `kind: "select"` — ≥ 2 options. */
  options?: string[];
}

export interface InteractiveFormWidget {
  widget: "interactive";
  variant: "form";
  version: "1.0";
  title: string;
  /** Optional one-line description shown under the title. */
  description?: string;
  /** 2–7 fields with unique ids. */
  fields: InteractiveFormField[];
  /** Submit button label ("Sign up", "Send"). */
  submitLabel: string;
  /** Prompt fired as the next user message when the submit button is clicked. */
  submitPrompt: string;
}

export type InteractiveWidget =
  | InteractiveCalculatorWidget
  | InteractiveQuizWidget
  | InteractiveFormWidget;
