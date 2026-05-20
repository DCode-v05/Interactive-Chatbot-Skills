"use client";

import type { ChipsWidget } from "@/lib/types/widgets/chips";

interface Props {
  widget: ChipsWidget;
}

export function ChipsWidget({ widget }: Props) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      {widget.title ? (
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--secondary)] mb-3">
          {widget.title}
        </h3>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {widget.chips.map((c) => (
          <button
            key={c.id}
            type="button"
            data-bap-prompt={c.prompt}
            className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-full bg-[var(--background)] hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors text-left leading-snug"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
