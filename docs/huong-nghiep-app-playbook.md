# Huong Nghiep App Playbook

This file applies the new local skills `huong-nghiep-engineer` and `huong-nghiep-marketing` to the current project.

## Product Direction

- Build a mobile-first career assessment app.
- Public release priority is Android.
- Source material comes from the attached assessment manuals.
- Current repo is web-first, so the fastest path is a PWA-style product that can later be packaged for Android.

## Engineering Decisions

### Recommended Initial Stack

- HTML, CSS, and JavaScript in the current repo for the first working version
- structured JSON files for assessments and scoring rules
- local storage for in-progress and saved results
- PWA additions later: manifest, icons, offline cache, install prompt

### Why This Path

- fastest validation loop for content-heavy assessments
- easiest way to test scoring and result UX
- lowest friction before deciding whether native packaging is necessary

### Data Separation Rule

Keep these layers separate:

1. assessment content
2. scoring logic
3. rendering components
4. result interpretation text

## Content Inputs

Planned input manuals include:

- `Grit Scale_Vietnamese ver 2.pdf`
- `Khám phá sở thích theo Holland (16-22)_Manual.pdf`
- `Khám phá sở thích theo Holland (23)_Manual.pdf`
- `MIPQ_Vie version.pdf`
- `Thang đo Phát triển & Giáo dục Hướng Nghiệp (ĐH_CĐ)_Manual.pdf`
- `Thang đo Phát triển & Giáo dục Hướng Nghiệp (THPT)_Manual.pdf`

## Stitch MCP Application

Use Stitch MCP when available for:

- app scaffolding support
- repetitive implementation tasks
- data-connected workflows when the product moves beyond local JSON

If Stitch is unavailable, continue local implementation without changing the content model.

## Launch Direction

### Primary Audiences

- students aged 16 to 22
- adults aged 23 and above
- counselors, teachers, and parents

### First Aha Moment

The user selects the right assessment, completes it smoothly, and receives a result that feels clear enough to act on immediately.

### Messaging Constraints

- outcome first
- supportive tone
- no diagnostic overclaim
- clear next-step guidance after results

## Immediate Project Backlog

1. Convert each manual into a structured assessment spec.
2. Build the assessment catalog and intro flow.
3. Build one complete quiz runner with scoring.
4. Build one result screen that explains the outcome clearly.
5. Add saved progress and saved results.
6. Prepare Android launch copy and Play Store assets.
