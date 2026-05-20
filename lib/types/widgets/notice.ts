/**
 * Notice widget schema — two variants:
 *   - banner:  short status line with severity-mapped accent color
 *   - sources: list of external citation cards (the only widget allowed
 *              to surface `<a href>` since each opens in a new tab)
 */

export type Severity = "success" | "warning" | "error" | "info";

export interface NoticeBannerWidget {
  widget: "notice";
  variant: "banner";
  version: "1.0";
  /** Severity drives the accent color: success=green, warning=amber, error=red, info=blue. */
  severity: Severity;
  /** The status line itself. Non-empty. */
  message: string;
  /** Optional inline "Learn more →" affordance. Fires `prompt` when clicked. */
  learnMore?: {
    label: string;
    prompt: string;
  };
}

export interface NoticeSourcesWidget {
  widget: "notice";
  variant: "sources";
  version: "1.0";
  /** Optional heading above the source-card list. */
  title?: string;
  /** 1–5 external citations. */
  sources: Array<{
    id: string;
    /** http(s) URL — opened in a new tab. */
    url: string;
    /** Title of the article / paper / page. */
    title: string;
    /** Optional 1-line summary shown under the title. */
    summary?: string;
    /** Visible domain shown at the bottom of the card (e.g. "arxiv.org"). */
    domain: string;
  }>;
}

export type NoticeWidget = NoticeBannerWidget | NoticeSourcesWidget;
