# Course Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a usable responsive course promotion landing page with instructor/course profile, free lecture exploration, testimonials, and application CTA.

**Architecture:** Keep the project as a static single-page site. `index.html` owns semantic content, `style.css` owns the visual system and responsive layout, `script.js` owns small interactions, `DESIGN.md` records design rules, and `tests/validate-site.mjs` verifies required sections and hygiene.

**Tech Stack:** Plain HTML, CSS, JavaScript, Node.js validation script.

---

## File Structure

- `index.html`: Replace corrupted HTML with valid UTF-8 markup for hero, instructor profile, free lecture, curriculum, testimonials, application, and footer.
- `style.css`: Style responsive desktop/mobile layout, CTA hierarchy, video/testimonial cards, application form, and accessibility states.
- `script.js`: Keep scroll animations and anchor behavior; improve fallback for browsers without IntersectionObserver.
- `README.md`: Document purpose, file structure, design guide, validation, and local server command.
- `DESIGN.md`: Maintain design rules inspired by DESIGN.md practice.
- `tests/validate-site.mjs`: Assert required sections, CTA labels, YouTube embed structure, image hygiene, and responsive CSS markers.

## Tasks

### Task 1: Required Content and HTML

- [ ] Run `node tests/validate-site.mjs` and confirm it fails because required sections are missing or corrupted.
- [ ] Replace `index.html` with valid UTF-8 Korean content:
  - Hero with clear CTAs: `무료강의 보기`, `수강신청하기`, `유튜브 후기 보기`.
  - Instructor/course profile section.
  - Free lecture section with format, outcomes, and modules.
  - Curriculum section.
  - Testimonials section with YouTube embed structure and fallback list.
  - Application form with labels and fallback contact options.
- [ ] Run `node tests/validate-site.mjs` and confirm HTML requirements pass.

### Task 2: Responsive Visual System

- [ ] Update `style.css` to support the new sections.
- [ ] Keep cards un-nested and use 8px card radius.
- [ ] Ensure mobile buttons become full width and long Korean text wraps.
- [ ] Run `node tests/validate-site.mjs`.

### Task 3: Interaction and Documentation

- [ ] Improve `script.js` so animations become visible if IntersectionObserver is unavailable.
- [ ] Update `README.md` with execution and validation commands.
- [ ] Run `node tests/validate-site.mjs`.

### Task 4: Browser and Git Verification

- [ ] Serve locally with Node on `http://localhost:4173/`.
- [ ] Open the site in browser if policy allows.
- [ ] Run final `node tests/validate-site.mjs`.
- [ ] Run `git status --short`.
- [ ] Commit changes if verification passes.
