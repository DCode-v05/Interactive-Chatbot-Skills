# Sample: a Python retry-with-backoff snippet

**User prompt:** "Write me a Python function that fetches a URL and retries up to 3 times with exponential backoff."

**Why this is a code-block case:** the answer IS a single self-contained snippet the user wants to read and probably copy. No multi-file scaffolding, no comparison, no explanation needed inline — the widget gives them a filename header + Copy button, and the filename is clickable if they want a walkthrough.

**What the skill emits:**

```json
{
  "widget": "code-block",
  "version": "1.0",
  "filename": "fetch_with_retry.py",
  "language": "python",
  "code": "import time\nimport urllib.request\n\ndef fetch_with_retry(url: str, attempts: int = 3) -> bytes:\n    for i in range(attempts):\n        try:\n            with urllib.request.urlopen(url, timeout=10) as r:\n                return r.read()\n        except Exception:\n            if i == attempts - 1:\n                raise\n            time.sleep(2 ** i)\n    raise RuntimeError(\"unreachable\")\n",
  "explainPrompt": "Explain this fetch_with_retry.py code line by line"
}
```

## What this looks like rendered

A rounded card with a dark `#161b22` header strip:

- **Left:** `fetch_with_retry.py` (clickable — fires the `explainPrompt`)
- **Right:** a small "Copy" button + a `python` language badge

Below the strip, a darker `#0d1117` `<pre><code>` body in monospace, 13px. Indentation is preserved exactly.

## What clicks do

- User clicks **`fetch_with_retry.py`** → chat fires "Explain this fetch_with_retry.py code line by line" as the next user message
- User clicks **Copy** → `navigator.clipboard.writeText(code)` runs; the button briefly flips to "Copied" for 1.2s, then back to "Copy". No chat message fires — it's a pure utility action.
