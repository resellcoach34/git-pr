# DESIGN.md

## Visual Theme

Amazon Masterclass is a premium but practical course landing page for beginners who want to understand Amazon resale and take their first action. The site should feel trustworthy, focused, and usable from the first viewport: users can see the offer, inspect the free lecture, view testimonials, and apply.

## Color Palette

- Canvas: `#090a0d` for the main dark background.
- Soft Canvas: `#111318` for alternating sections.
- Surface: `rgba(255, 255, 255, 0.045)` for dark cards.
- Text: `#f8f9fa` for primary copy.
- Muted Text: `#b6bcc6` for supporting copy.
- Action Orange: `#ff9900` for CTA buttons, active markers, and highlights only.
- Action Hover: `#ff7a00` for hover states.

## Typography

- Use `Pretendard`, `Inter`, and system sans-serif.
- Hero headings should be large, direct, and readable on mobile.
- Section headings should be compact and clear.
- Body copy should explain concrete actions rather than abstract motivation.
- Button labels should be action-oriented: `무료강의 보기`, `수강신청하기`, `유튜브 후기 보기`.

## Components

- Primary CTA: orange background with dark text.
- Secondary CTA: transparent or dark surface with a thin border.
- Cards: 8px radius, no nested card UI.
- Timeline: left rail with week markers.
- Video Card: 16:9 YouTube iframe with a short caption.
- Application Form: white surface, visible labels, focus states, fallback email.
- Photography: real instructor photos should remain visible and inspectable.

## Layout

- Single-page landing flow: hero, free lecture, benefits, curriculum, testimonials, support, application.
- Desktop hero: copy on the left and instructor profile on the right.
- Mobile hero: copy first, profile second, full-width CTAs.
- Keep content width around 1120px.
- Use `scroll-margin-top` so fixed navigation does not cover anchors.

## Do's and Don'ts

Do:
- Keep the first viewport usable, with immediate CTAs.
- Keep CTA wording consistent and clear.
- Make the free lecture offer concrete.
- Provide a replaceable YouTube embed structure.
- Add image dimensions and async/lazy loading where appropriate.

Don't:
- Do not use card-inside-card layouts.
- Do not hide core content if JavaScript fails.
- Do not use decorative effects that compete with the instructor photo or CTA.
- Do not leave placeholder filenames or duplicate extensions.
- Do not use unreadable or corrupted text.

## Responsive Behavior

- At 860px and below, switch major grids to one column.
- At 620px and below, make CTAs full width and allow nav links to scroll horizontally.
- Long Korean text and email addresses must wrap.
- Respect `prefers-reduced-motion`.

## Agent Guide

Before changing the page, read this file and keep the site focused on a usable course discovery and application experience. If the visual direction changes, update this file first. Preserve role-based CSS tokens and verify with `node tests/validate-site.mjs`.
