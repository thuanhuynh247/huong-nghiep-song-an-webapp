# App Build Playbook

## Product Goal

Build an Android-first career assessment app that lets users complete suitable assessments, receive understandable results, and return later to compare or review outcomes.

## Current Recommendation

Start as a mobile-first web app/PWA inside this repo, then package for Android later if needed.

Why:

- the current workspace is already a lightweight web project
- public release speed matters more than native-only features right now
- questionnaires and scoring logic can be validated faster on the web

## Core Screens

1. Home or assessment catalog
2. Assessment intro
3. Quiz runner
4. Result summary
5. Result detail or guidance
6. Saved results history

## Assessment Data Model

Use a schema close to this shape:

```json
{
  "id": "holland-16-22",
  "title": "Kham pha so thich theo Holland",
  "audience": {
    "minAge": 16,
    "maxAge": 22
  },
  "scale": {
    "type": "likert",
    "labels": ["Rat khong dung", "Khong dung", "Dung", "Rat dung"]
  },
  "dimensions": ["R", "I", "A", "S", "E", "C"],
  "questions": [
    {
      "id": "q1",
      "text": "...",
      "dimension": "R",
      "reverse": false
    }
  ],
  "resultBands": [],
  "source": {
    "manualFile": "Khám phá sở thích theo Holland (16-22)_Manual.pdf"
  }
}
```

## Scoring Rules

- Keep scoring rules data-driven.
- Reverse-scored items must be explicit per question.
- Result interpretation should support both raw score output and human-readable explanation.
- Validate one assessment at a time before merging multiple scales into the app.

## Stitch MCP Notes

If Stitch is configured:

- use it for repetitive scaffolding or data-connected app tasks
- keep assessment content in structured JSON or CMS-like records
- avoid binding core quiz correctness to a remote dependency too early

If Stitch is not configured:

- keep the same content model locally
- defer remote sync, auth, or analytics until the assessment flows are stable

## QA Checklist

- test portrait mobile first
- confirm progress persistence on refresh
- verify score totals against the manual
- test lowest, middle, and highest possible outcomes
- verify age-based assessment routing
- keep copy neutral, supportive, and non-diagnostic
