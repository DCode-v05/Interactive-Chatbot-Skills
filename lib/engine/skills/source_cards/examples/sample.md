# Sample widget — `source_cards`

Worked example. The loader extracts the fenced HTML block as the skill's reference widget; structural rules in `lib/engine/tools/validate.ts` (contrast, click-target, tag balance, byte cap) must all pass.

```html
<div style="background:#fff;color:#0a0a0a;border-radius:10px;padding:18px;border:1px solid #e5e5e5">
  <a href="https://example.com" target="_blank" rel="noopener" style="display:block;text-decoration:none;color:#0a0a0a;border:1px solid #e5e5e5;padding:10px;border-radius:8px"><div style="font-weight:600">Title</div><div style="font-size:12px;color:#666">example.com</div></a>
</div>
```
