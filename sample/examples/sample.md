# Sample: PostgreSQL vs MongoDB vs SQLite for a hobby blog

**User prompt:** "I'm building a small personal blog with maybe 50 posts. Should I use PostgreSQL, MongoDB, or SQLite?"

**Why this is a comparison-table case:** three named options, clear use case (hobby blog), user wants to weigh tradeoffs. Don't reply in prose — fill the widget.

**What the skill emits:**

```json
{
  "widget": "comparison-table",
  "version": "1.0",
  "title": "PostgreSQL vs MongoDB vs SQLite for a hobby blog",
  "subtitle": "Comparing on what matters for ~50 posts and one developer",

  "options": [
    {
      "id": "postgresql",
      "label": "PostgreSQL",
      "tagline": "Full-featured relational DB",
      "clickPromptTemplate": "Why might I choose {option} overall?"
    },
    {
      "id": "mongodb",
      "label": "MongoDB",
      "tagline": "Document store, flexible schema",
      "clickPromptTemplate": "Why might I choose {option} overall?"
    },
    {
      "id": "sqlite",
      "label": "SQLite",
      "tagline": "Single-file embedded DB",
      "clickPromptTemplate": "Why might I choose {option} overall?"
    }
  ],

  "attributes": [
    {
      "id": "setup-effort",
      "label": "Setup effort",
      "format": "rating",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "postgresql": {
          "value": "3",
          "note": "Install server, create db, configure auth",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "mongodb": {
          "value": "3",
          "note": "Atlas free tier or local install",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "sqlite": {
          "value": "5",
          "note": "One file. No server. No config.",
          "isWinner": true,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    },
    {
      "id": "hosting-cost",
      "label": "Hosting cost at this scale",
      "format": "currency",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "postgresql": {
          "value": "$0–7/mo",
          "note": "Free tier on Neon, Supabase, Railway",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "mongodb": {
          "value": "$0/mo",
          "note": "Atlas M0 free tier (512MB)",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "sqlite": {
          "value": "$0",
          "note": "Just a file alongside your app",
          "isWinner": true,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    },
    {
      "id": "schema-flexibility",
      "label": "Schema flexibility",
      "format": "text",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "postgresql": {
          "value": "Strict + JSON columns",
          "note": "Best of both via JSONB",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "mongodb": {
          "value": "Fully flexible",
          "note": "No schema enforcement by default",
          "isWinner": true,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "sqlite": {
          "value": "Strict + JSON1 ext",
          "note": "Similar story to Postgres",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    },
    {
      "id": "ecosystem-fit",
      "label": "Blog-engine ecosystem fit",
      "format": "text",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "postgresql": {
          "value": "Excellent",
          "note": "Default for most CMS frameworks",
          "isWinner": true,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "mongodb": {
          "value": "Decent",
          "note": "Common in JS stacks; less in PHP/Ruby",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "sqlite": {
          "value": "Excellent",
          "note": "Default in Astro, Pocketbase, etc.",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    },
    {
      "id": "backup",
      "label": "Backup story",
      "format": "text",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "postgresql": {
          "value": "pg_dump",
          "note": "Or hosted snapshots",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "mongodb": {
          "value": "mongodump / Atlas",
          "note": "Hosted handles it",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "sqlite": {
          "value": "Copy the file",
          "note": "Literally `cp blog.db backup.db`",
          "isWinner": true,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    },
    {
      "id": "scaling-headroom",
      "label": "Scaling headroom if it grows",
      "format": "rating",
      "clickPromptTemplate": "How do {options} compare on {attribute}?",
      "cells": {
        "postgresql": {
          "value": "5",
          "note": "Scales to millions of rows easily",
          "isWinner": true,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "mongodb": {
          "value": "5",
          "note": "Built for horizontal scaling",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        },
        "sqlite": {
          "value": "2",
          "note": "Single-writer; fine for read-heavy blog",
          "isWinner": false,
          "clickPromptTemplate": "Explain {option}'s {attribute}: {value}"
        }
      }
    }
  ],

  "summary": "For a 50-post personal blog, SQLite wins on the things that actually matter at this scale: zero setup, zero cost, trivial backup. PostgreSQL is the safer pick only if you expect the blog to grow into something bigger or want JSON+SQL together. MongoDB shines mainly when your schema is genuinely unpredictable — not really the case for blog posts.",

  "followUps": [
    "What's the migration path from SQLite to Postgres if I outgrow it?",
    "Which blog frameworks ship with SQLite out of the box?",
    "How do I back up SQLite from a deployed server?"
  ]
}
```

## What this looks like rendered

The user sees a 3-column table with 6 rows. Trophy badges sit on the SQLite cells for setup, hosting cost, backup; on MongoDB for schema flexibility; on PostgreSQL for ecosystem fit and scaling headroom. Hovering any cell shows the `note` as a tooltip. Below the table sits the 2-3 sentence summary and three follow-up chips.

## What clicks do

- User clicks the **"Backup story"** row → chat fires `How do PostgreSQL, MongoDB, SQLite compare on Backup story?`
- User clicks the **PostgreSQL column header** → `Why might I choose PostgreSQL overall?`
- User clicks the **SQLite / Hosting cost cell** → `Explain SQLite's Hosting cost at this scale: $0`
- User clicks the **third follow-up chip** → that question becomes their next message

No re-typing. Every click is contextual.
