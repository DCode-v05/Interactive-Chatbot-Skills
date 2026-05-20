# Plan — Template

Pick exactly one variant. Replace every `[bracketed placeholder]`.

## Variant: `steps`

```json
{
  "widget": "plan",
  "variant": "steps",
  "version": "1.0",
  "title": "[Header above the step list]",
  "items": [
    {
      "id": "[kebab-case-step-id]",
      "n": 1,
      "title": "[Short step title]",
      "body": "[Optional 1-line elaboration. Omit if title is self-explanatory.]",
      "current": false,
      "clickPrompt": "[Full prompt fired when this step is clicked]"
    },
    {
      "id": "[kebab-case-step-id-2]",
      "n": 2,
      "title": "[Short step title]",
      "current": true,
      "clickPrompt": "[Full prompt fired when this step is clicked]"
    }
  ]
}
```

## Variant: `dated`

```json
{
  "widget": "plan",
  "variant": "dated",
  "version": "1.0",
  "title": "[Header above the timeline]",
  "events": [
    {
      "id": "[kebab-case-event-id]",
      "date": "[Display date — e.g. 2005, Jan 2026, 2026-05-20]",
      "title": "[Event title]",
      "body": "[Optional 1-line elaboration. Omit if redundant.]",
      "accent": false,
      "clickPrompt": "[Full prompt fired when this event row is clicked]"
    }
  ]
}
```

## Variant: `schedule`

```json
{
  "widget": "plan",
  "variant": "schedule",
  "version": "1.0",
  "title": "[Project / plan title]",
  "dateRange": {
    "startISO": "[YYYY-MM-DD, axis left edge]",
    "endISO": "[YYYY-MM-DD, axis right edge]"
  },
  "tasks": [
    {
      "id": "[kebab-case-task-id]",
      "name": "[Task name, shown to the left of the bar]",
      "startISO": "[YYYY-MM-DD, must fall within dateRange]",
      "endISO": "[YYYY-MM-DD, must fall within dateRange and be >= startISO]",
      "clickPrompt": "[Full prompt fired when this bar is clicked]"
    }
  ],
  "today": "[Optional YYYY-MM-DD inside dateRange. Omit if not relevant.]"
}
```

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | all | yes | `"plan"` |
| `version` | all | yes | `"1.0"` |
| `variant` | all | yes | `"steps"`, `"dated"`, or `"schedule"` |
| `title` | all | yes | Non-empty header |
| `items` | steps | yes | 3–6 items, unique ids |
| `items[].n` | steps | yes | Finite number, must increase monotonically across items |
| `items[].current` | steps | yes | Boolean — at most one item per widget may be `true` |
| `items[].clickPrompt` | steps | yes | Non-empty |
| `events` | dated | yes | 3–8 events, unique ids, chronological order |
| `events[].date` | dated | yes | Display-only string (year, month, ISO — pick the right granularity) |
| `events[].accent` | dated | yes | Boolean — at most one event per widget may be `true` |
| `events[].clickPrompt` | dated | yes | Non-empty |
| `dateRange` | schedule | yes | `{ startISO, endISO }`, both `YYYY-MM-DD`, end ≥ start |
| `tasks` | schedule | yes | 2–8 tasks, unique ids |
| `tasks[].startISO` / `endISO` | schedule | yes | `YYYY-MM-DD`, both inside `dateRange`, end ≥ start |
| `tasks[].clickPrompt` | schedule | yes | Non-empty |
| `today` | schedule | no | If present, `YYYY-MM-DD` inside `dateRange` |
