"use client";

import type {
  NoticeBannerWidget,
  NoticeSourcesWidget,
  NoticeWidget,
  Severity,
} from "@/lib/types/widgets/notice";

const SEVERITY: Record<Severity, { border: string; text: string; bg: string; label: string }> = {
  success: { border: "#34d399", text: "#34d399", bg: "rgba(52,211,153,0.08)", label: "Success" },
  warning: { border: "#fbbf24", text: "#b45309", bg: "rgba(251,191,36,0.10)", label: "Warning" },
  error:   { border: "#EC3B4A", text: "#EC3B4A", bg: "rgba(236,59,74,0.08)",  label: "Error" },
  info:    { border: "#7dd3fc", text: "#0369a1", bg: "rgba(125,211,252,0.10)", label: "Info" },
};

export function NoticeWidget({ widget }: { widget: NoticeWidget }) {
  return widget.variant === "banner" ? (
    <Banner widget={widget} />
  ) : (
    <Sources widget={widget} />
  );
}

function Banner({ widget }: { widget: NoticeBannerWidget }) {
  const s = SEVERITY[widget.severity];
  return (
    <div
      role="status"
      className="rounded-lg border-l-4 px-4 py-3 text-sm leading-relaxed"
      style={{ borderLeftColor: s.border, background: s.bg }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.18em] mr-3"
        style={{ color: s.text }}
      >
        {s.label}
      </span>
      <span className="text-[var(--foreground)]">{widget.message}</span>
      {widget.learnMore ? (
        <>
          {" "}
          <span
            data-bap-prompt={widget.learnMore.prompt}
            className="cursor-pointer"
            style={{ color: s.text, borderBottom: `1px dashed ${s.text}` }}
          >
            {widget.learnMore.label}
          </span>
        </>
      ) : null}
    </div>
  );
}

function Sources({ widget }: { widget: NoticeSourcesWidget }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      {widget.title ? (
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--secondary)] mb-3">
          {widget.title}
        </h3>
      ) : null}
      <div className="flex flex-col gap-2">
        {widget.sources.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-[var(--border)] px-3 py-2.5 hover:border-accent hover:bg-accent/5 transition-colors no-underline text-[var(--foreground)]"
          >
            <div className="font-semibold text-sm">{s.title}</div>
            {s.summary ? (
              <div className="text-xs text-[var(--secondary)] mt-1 leading-relaxed">
                {s.summary}
              </div>
            ) : null}
            <div className="text-[11px] font-mono text-[var(--secondary)] mt-1.5">
              {s.domain} ↗
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
