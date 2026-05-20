# Diagram — Template

Pick exactly one variant. Replace every `[bracketed placeholder]`. **Never** emit pixel coordinates, SVG, or HTML — only the JSON structure below.

## Variant: `flow`

```json
{
  "widget": "diagram",
  "variant": "flow",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "nodes": [
    {
      "id": "[kebab-case-node-id]",
      "label": "[Short label for the box]",
      "row": 0,
      "col": 0,
      "accent": true,
      "clickPrompt": "[Full prompt fired when this node is clicked]"
    },
    {
      "id": "[kebab-case-node-id-2]",
      "label": "[Short label]",
      "row": 0,
      "col": 1,
      "clickPrompt": "[Full prompt fired when this node is clicked]"
    }
  ],
  "edges": [
    { "from": "[node-id]", "to": "[node-id-2]", "label": "[Optional short edge label, omit if none]" }
  ]
}
```

## Variant: `sequence`

```json
{
  "widget": "diagram",
  "variant": "sequence",
  "version": "1.0",
  "title": "[Diagram title]",
  "actors": ["[Actor 0]", "[Actor 1]", "[Actor 2]"],
  "messages": [
    {
      "id": "[kebab-case-message-id]",
      "fromIdx": 0,
      "toIdx": 1,
      "label": "[Short message label]",
      "kind": "request",
      "clickPrompt": "[Full prompt fired when this arrow is clicked]"
    }
  ]
}
```

## Variant: `tree`

```json
{
  "widget": "diagram",
  "variant": "tree",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "root": {
    "id": "[root-id]",
    "label": "[Root label]",
    "accent": true,
    "clickPrompt": "[Full prompt when root is clicked]",
    "children": [
      {
        "id": "[child-id]",
        "label": "[Child label]",
        "clickPrompt": "[Full prompt when this child is clicked]"
      }
    ]
  }
}
```

## Variant: `mind`

```json
{
  "widget": "diagram",
  "variant": "mind",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "central": "[Central concept]",
  "branches": [
    { "id": "[branch-id]", "label": "[Branch label]", "clickPrompt": "[Full prompt fired when this branch is clicked]" }
  ]
}
```

## Variant: `venn`

```json
{
  "widget": "diagram",
  "variant": "venn",
  "version": "1.0",
  "title": "[Optional header. Omit if none.]",
  "sets": [
    { "id": "a", "label": "[Set A label]" },
    { "id": "b", "label": "[Set B label]" }
  ],
  "regions": [
    { "id": "a-only", "label": "[A-only label]", "setIds": ["a"], "clickPrompt": "[Prompt fired when A-only is clicked]" },
    { "id": "ab", "label": "[A ∩ B label]", "setIds": ["a", "b"], "clickPrompt": "[Prompt fired when A ∩ B is clicked]" },
    { "id": "b-only", "label": "[B-only label]", "setIds": ["b"], "clickPrompt": "[Prompt fired when B-only is clicked]" }
  ]
}
```

For 3 sets, use 7 regions covering `["a"]`, `["b"]`, `["c"]`, `["a","b"]`, `["a","c"]`, `["b","c"]`, `["a","b","c"]`.

## Field reference

| Field | Variant | Required | Notes |
|---|---|---|---|
| `widget` | all | yes | `"diagram"` |
| `version` | all | yes | `"1.0"` |
| `variant` | all | yes | One of `flow`, `sequence`, `tree`, `mind`, `venn` |
| `title` | flow, tree, mind, venn | no | Optional header |
| `title` | sequence | yes | Non-empty header |
| `nodes` | flow | yes | 2–8 nodes, unique ids |
| `nodes[].row` | flow | yes | Integer ≥ 0 — logical grid row |
| `nodes[].col` | flow | yes | Integer ≥ 0 — logical grid column |
| `nodes[].accent` | flow | no | At most one node may be `true` |
| `nodes[].clickPrompt` | flow | yes | Non-empty |
| `edges` | flow | yes | 1–10 edges; `from`/`to` must reference existing node ids |
| `edges[].label` | flow | no | Optional short edge label |
| `actors` | sequence | yes | 2–5 non-empty strings; order = lifeline order left-to-right |
| `messages` | sequence | yes | 3–10 messages, unique ids |
| `messages[].fromIdx` | sequence | yes | Integer in `[0..actors.length-1]`, != `toIdx` |
| `messages[].toIdx` | sequence | yes | Integer in `[0..actors.length-1]`, != `fromIdx` |
| `messages[].kind` | sequence | yes | `"request"` (red solid) or `"response"` (gray dashed) |
| `messages[].clickPrompt` | sequence | yes | Non-empty |
| `root` | tree | yes | TreeNode — recursive `{id, label, clickPrompt, accent?, children?}` |
| (tree) | tree | yes | Depth ≤ 3 levels (root = 0), ≤ 12 nodes total, ids globally unique |
| `central` | mind | yes | Non-empty central concept |
| `branches` | mind | yes | 3–6 branches, unique ids |
| `sets` | venn | yes | Exactly 2 or 3 sets, unique ids |
| `regions` | venn | yes | 3 regions if 2 sets, 7 regions if 3 sets, unique ids |
| `regions[].setIds` | venn | yes | Subset of `sets[].id` identifying which region this is |
| `regions[].clickPrompt` | venn | yes | Non-empty |
