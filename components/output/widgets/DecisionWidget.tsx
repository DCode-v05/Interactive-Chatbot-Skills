"use client";

import type {
  DecisionDestructiveWidget,
  DecisionTradeoffWidget,
  DecisionWidget,
} from "@/lib/types/widgets/decision";

export function DecisionWidget({ widget }: { widget: DecisionWidget }) {
  return widget.variant === "tradeoff" ? (
    <Tradeoff widget={widget} />
  ) : (
    <Destructive widget={widget} />
  );
}

function Tradeoff({ widget }: { widget: DecisionTradeoffWidget }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <h3 className="font-display text-base font-bold tracking-tight mb-3">
        {widget.heading}
      </h3>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${widget.options.length}, minmax(0, 1fr))`,
        }}
      >
        {widget.options.map((opt) => (
          <article
            key={opt.id}
            className={
              "rounded-lg border px-3 py-3 flex flex-col gap-2 transition-colors " +
              (opt.recommended
                ? "border-accent/60 bg-accent/5"
                : "border-[var(--border)]")
            }
          >
            <header className="flex items-center justify-between">
              <span className="font-semibold text-sm">{opt.label}</span>
              {opt.recommended ? (
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent">
                  Recommended
                </span>
              ) : null}
            </header>
            <p className="text-xs text-[var(--secondary)] leading-relaxed flex-1">
              {opt.blurb}
            </p>
            <button
              type="button"
              data-bap-prompt={opt.choosePrompt}
              className={
                "w-full text-xs px-3 py-2 rounded-md border font-semibold transition-colors " +
                (opt.recommended
                  ? "bg-accent text-white border-accent hover:opacity-90"
                  : "bg-transparent text-accent border-accent hover:bg-accent/10")
              }
            >
              {opt.chooseLabel}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function Destructive({ widget }: { widget: DecisionDestructiveWidget }) {
  return (
    <div className="rounded-lg border-l-4 border-l-accent bg-accent/5 px-4 py-3">
      <p className="text-sm font-semibold text-[var(--foreground)]">
        {widget.question}
      </p>
      {widget.irreversibleNote ? (
        <p className="mt-1 text-xs text-[var(--secondary)] leading-relaxed">
          {widget.irreversibleNote}
        </p>
      ) : null}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          data-bap-prompt={widget.confirmedPrompt}
          data-bap-confirm
          className="text-xs px-3 py-2 rounded-md font-semibold bg-accent text-white hover:opacity-90 transition-colors"
        >
          {widget.actionLabel}
        </button>
        <button
          type="button"
          data-bap-prompt="Cancel"
          className="text-xs px-3 py-2 rounded-md font-semibold bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--border)]/30 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
