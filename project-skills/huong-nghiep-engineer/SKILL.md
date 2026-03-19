---
name: huong-nghiep-engineer
description: Use when building or restructuring the Huong nghiep assessment app, especially for Android-first delivery, mobile-first UX, PDF/manual-to-question-bank conversion, scoring logic, result interpretation flows, or Stitch MCP-assisted implementation.
---

# Huong Nghiep Engineer

## Overview

This skill turns assessment manuals and project requirements into a shippable Android-first product plan and implementation workflow. Use it to keep questionnaire content, scoring logic, mobile UX, and data structure aligned while the app evolves.

## When To Use

Use this skill when the task involves one or more of these:

- building the quiz app flow, result screens, storage, or architecture
- converting PDF/manual content into structured question banks or scoring tables
- handling reverse-scored items, multi-dimension scoring, age-group routing, or interpretation bands
- deciding between PWA, React Native, Flutter, or later Android packaging
- applying Stitch MCP if it is configured in the environment
- verifying that mobile UX, offline behavior, and scoring accuracy stay correct

## Workflow

### 1. Gather Source Of Truth

- Start from the attached assessment manuals and the project playbook in `../../docs/huong-nghiep-app-playbook.md`.
- Capture for each assessment: audience, instructions, item set, answer scale, scoring dimensions, reverse items, cutoffs, and interpretation text.
- Keep a traceable mapping back to the source manual so later content edits stay auditable.

### 2. Separate Content From App Logic

- Store assessments as structured data, not hardcoded UI strings.
- Keep schema fields explicit: `assessment`, `sections`, `questions`, `options`, `dimensions`, `scoring`, `resultBands`, `eligibility`.
- Treat raw content, scoring rules, and rendering as separate layers.

### 3. Prefer The Fastest Android-First Path

- Default to a mobile-first web app/PWA first when the repo is already web-based and public Android release speed matters.
- Only jump to React Native or Flutter if native APIs, app store-only constraints, or deep offline requirements justify the added complexity.
- Keep packaging options open by using clean routing, manifest metadata, touch-friendly UI, and local persistence from day one.

### 4. Build For Real Assessment Use

- One assessment per focused flow.
- Clear progress indicator and safe resume behavior.
- Intro screen explains purpose, time, and answer format before the first question.
- Result screen should show top dimensions, plain-language explanation, and next-step guidance without overclaiming clinical certainty.

### 5. Use Stitch MCP As An Accelerator, Not A Dependency

- If Stitch MCP is available, use it to speed up scaffolding, data wiring, or repetitive build steps.
- If Stitch is unavailable in the current session, continue with local implementation and keep the architecture compatible with later Stitch-assisted work.
- Do not block core product progress on MCP access.

### 6. Verify Before Claiming Completion

- Cross-check every scoring rule against the manual.
- Test reverse-scored items and edge-score bands.
- Test on narrow mobile viewports first.
- Verify reload/resume behavior and empty-state handling.
- Keep content and scoring reviewable by a counselor or domain owner.

## Reference Navigation

- Read `references/source-kit-map.md` for the distilled ClaudeKit Engineer sources behind this skill.
- Read `references/app-build-playbook.md` for the project-specific architecture, schema, and QA checklist.

## Output Expectations

- Prefer changes that update app flow, content structure, and project docs together.
- Preserve traceability back to the original manuals.
- Keep the implementation understandable for future conversion to a packaged Android app.
