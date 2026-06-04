# Amazon Seller Offline Class Site Design

## Document Purpose

이 문서는 아마존 오프라인 강의 사이트의 현재 디자인 및 개발 상태와 앞으로 유지할 방향을 기록하는 기준 문서다.

사이트는 일회성 라이브 강의 자료가 아니다. 유튜브와 SNS를 통해 유입된 방문자가 언제든 강사와 강의를 확인하고, 예정된 오프라인 강의를 신청하거나 스마트스토어에서 결제할 수 있는 상시형 포트폴리오 겸 판매 페이지다.

## Product Goals

- 유튜브 및 SNS에서 강사와 아마존 강의에 관심을 가진 방문자의 신뢰를 높인다.
- 아마존 판매를 무조건 홍보하기보다, 판매 시장을 선택하는 기준을 먼저 설명한다.
- 예정된 강의 일정이 있으면 방문자가 스마트스토어에서 바로 결제할 수 있게 한다.
- 결제 전 질문이 있거나 예정된 일정이 없으면 카카오톡 오픈채팅으로 연결한다.
- 동일한 오프라인 강의를 날짜만 변경하여 반복 모집할 수 있게 한다.

## Audience

- 아마존 판매에 관심이 생겨 유튜브 또는 SNS에서 유입된 사람
- 쿠팡이나 스마트스토어 등 국내 판매 시장을 검토했거나 경험한 사람
- 강의 신청 전 강사의 경험, 강의 방식, 일정, 가격을 확인하려는 사람
- 강의를 바로 결제하거나 카카오톡으로 질문하려는 사람

## Positioning And Message

### Core Positioning

상품을 고르는 방법만 알려주는 강의가 아니라, 자신에게 유리한 판매 시장을 판단하고 아마존 판매를 직접 실행하도록 돕는 오프라인 실습 강의다.

### Recommended Hero Message

> 국내를 넘어, 한국 상품을 세계 시장에 판매하는 방법

> 초보자도 직접 실행할 수 있도록 아마존 입점부터 상품 소싱, FBA 발송까지 알려드립니다.

### Narrative Direction

설명의 중심은 교육적인 비교 방식으로 유지한다. 국내 플랫폼의 문제를 강하게 비난하는 대신, 방문자가 시장 구조를 이해하고 아마존을 대안으로 판단하도록 만든다.

도입 메시지는 다음 두 방향을 조합한다.

- 중심: 어디에서 팔 것인가가 무엇을 팔 것인가보다 중요하다.
- 보조 문제 제기: 열심히 판매해도 힘든 이유는 상품이 아니라 시장 구조에 있을 수 있다.

피해야 할 표현:

- 쿠팡이나 스마트스토어를 무조건 하지 말아야 한다는 단정
- 근거가 부족한 `블루오션`, `완벽한 자동화`, `무조건 수익` 표현
- 실제 운영 조건과 맞지 않는 정원 제한 및 마감 임박 표현

## Conversion Model

### Primary Conversion

예정된 오프라인 강의 일정을 확인하고 스마트스토어에서 신청 및 결제한다.

### Secondary Conversion

카카오톡 오픈채팅에서 강의 관련 질문을 하거나 다음 강의 일정을 안내받는다.

### Schedule State Rules

강의는 하나의 동일한 오프라인 강의를 날짜만 변경하여 반복 진행한다. 현재 정원 제한은 없다.

- 예정 일정 있음: 날짜, 시간, 장소, 가격을 표시하고 `강의 신청 및 결제하기` 버튼을 노출한다.
- 예정 일정 없음: `다음 강의 준비 중입니다`를 표시하고 `카카오톡에서 다음 일정 안내받기` 버튼을 노출한다.
- 모든 상태: `카카오톡으로 강의 문의하기`를 보조 CTA로 유지한다.
- 정원 제한이 생기기 전까지 `5명 한정`, `선착순 마감`, `남은 자리` 등의 표현을 사용하지 않는다.

## Page Flow

1. **Hero And Immediate Action**
   - 강의의 핵심 가치와 가장 가까운 강의 일정을 첫 화면에서 확인한다.
   - 스마트스토어 결제와 카카오톡 문의 경로를 함께 제공한다.

2. **Why Market Choice Matters**
   - 가격 경쟁, 광고 의존, 빠른 트렌드 변화 등 판매자가 통제하기 어려운 구조를 설명한다.
   - 국내 플랫폼 비판보다 판매 시장 선택의 중요성을 강조한다.

3. **Why Amazon**
   - 시장 규모, FBA 운영 효율, 한국 상품의 경쟁력, 글로벌 확장성을 설명한다.
   - 계정 리스크와 초기 진입장벽 등 현실적인 단점도 함께 안내한다.

4. **Instructor Proof**
   - 강사의 실제 판매 경험, 운영 방식, 판매 사례, 유튜브 콘텐츠를 보여준다.

5. **Course Outcomes And Curriculum**
   - 입점, 소싱, 리스팅, FBA 발송까지 강의에서 다루는 과정을 설명한다.
   - 강의가 끝난 뒤 수강생이 직접 할 수 있는 행동을 중심으로 표현한다.

6. **Testimonials And FAQ**
   - 수강 후기와 함께 영어, 초기 자본, 직장인 부업 가능성, 계정 리스크 등 결제 전 불안을 해소한다.

7. **Schedule And Application**
   - 예정 일정이 있으면 스마트스토어 결제로 연결한다.
   - 일정이 없으면 카카오톡 오픈채팅에서 다음 일정을 안내받게 한다.

## Visual Theme

Amazon Seller Offline Class는 프리미엄한 인상과 실용적인 강의 분위기를 함께 전달한다. 화면은 신뢰감 있고 집중되어야 하며, 장식보다 강사 사진, 실제 콘텐츠, 일정, CTA가 먼저 보여야 한다.

현재 사용 중인 어두운 배경과 Amazon 계열 오렌지 포인트 방향을 유지한다. 전체 페이지는 상시형 포트폴리오로 보이되, 방문자가 결제와 문의 경로를 쉽게 찾을 수 있어야 한다.

## Color Palette

- Canvas: `#090a0d` for the main dark background.
- Soft Canvas: `#111318` for alternating sections.
- Surface: `rgba(255, 255, 255, 0.045)` for dark cards.
- Text: `#f8f9fa` for primary copy.
- Muted Text: `#b6bcc6` for supporting copy.
- Action Orange: `#ff9900` for primary CTA buttons and highlights only.
- Action Hover: `#ff7a00` for hover states.

## Typography

- Use `Pretendard`, `Inter`, and system sans-serif.
- Hero headings should be large, direct, and readable on mobile.
- Section headings should state a clear claim rather than use generic labels.
- Body copy should explain concrete actions and realistic outcomes.
- CTA labels should describe the next action: `강의 일정 확인하기`, `스마트스토어에서 신청·결제하기`, `카카오톡으로 문의하기`.

## Components

- Primary CTA: smartstore application and payment action using orange.
- Secondary CTA: KakaoTalk inquiry or next-schedule notification using a distinct secondary style.
- Schedule Status: one reusable block that can switch between an available schedule and no-schedule state.
- Video Tabs: three YouTube videos shown one at a time.
- Instructor Profile: real instructor photography and concrete experience.
- Curriculum: a clear three-week practical course sequence.
- Testimonials: proof from students without exaggerated claims.
- FAQ: answers to common objections before payment.
- Cards: 8px radius and no nested card UI.

## Layout

- Single-page flow: hero, market-choice explanation, Amazon opportunity, instructor proof, videos, course outcomes, curriculum, testimonials, FAQ, schedule, application.
- Desktop hero: core message and CTA on the left, instructor profile on the right.
- Mobile hero: core message first, profile second, full-width CTAs.
- Keep content width around 1120px.
- Show a schedule and payment path near the top as well as near the final application section.
- Use `scroll-margin-top` so fixed navigation does not cover anchors.

## Current Development Status

The current implementation is a static single-page site built with plain HTML, CSS, JavaScript, and a Node.js validation script.

Implemented:

- Responsive hero and instructor profile
- Three tabbed YouTube videos
- Course reasons and free e-book section
- Practical-course explanation
- Testimonials
- Three-week curriculum
- Offline course schedule and price section
- Google Form application placeholder
- Smartstore payment link
- Scroll reveal and smooth anchor navigation
- Local Node development server
- Automated content and structure validation

Current implementation files:

- `index.html`: page content and semantic sections
- `style.css`: design system and responsive layout
- `script.js`: video tabs, reveal animation, and anchor scrolling
- `server.cjs`: local development server
- `tests/validate-site.mjs`: required-content and implementation checks
- `README.md`: operation and deployment notes

## Known Gaps And Next Changes

The following decisions are approved but are not fully reflected in the current implementation:

- Replace the current hero claim `아마존 리셀로 한 달 100만원 벌기!` with a trustworthy global-market message.
- Add the `판매 시장 선택의 중요성 → 왜 아마존인가` explanation before strongly promoting the course.
- Add a persistent KakaoTalk open-chat inquiry path.
- Change the schedule section to support `scheduled` and `no scheduled class` states.
- Remove `5명 한정`, `선착순 마감`, and similar scarcity claims because there is currently no capacity limit.
- Replace hard-coded past class dates with the next active class date.
- Add FAQ content covering English, initial capital, side-job operation, and Amazon account risk.
- Replace `GOOGLE_FORM_URL_PLACEHOLDER` with the final application flow or remove it if Smartstore and KakaoTalk become sufficient.
- Confirm the final Smartstore product URL and KakaoTalk open-chat URL.

## Content Maintenance Rules

- Update the next class date, time, location, and price in one clearly identifiable schedule area.
- When there is no scheduled class, do not leave an expired date visible.
- Keep the Smartstore URL and KakaoTalk URL easy to replace.
- Use past classes as proof or testimonials, not as active schedules.
- Do not publish unsupported revenue, scarcity, or urgency claims.
- Keep YouTube and SNS content as trust-building proof before the final application section.

## Do's and Don'ts

Do:

- Keep the first viewport usable with immediate schedule, payment, and inquiry paths.
- Explain why Amazon is a reasonable option using clear comparison criteria.
- Show both advantages and realistic risks.
- Keep CTA wording consistent and action-oriented.
- Use real instructor photos, videos, and course proof.
- Make the site useful even when no class date is scheduled.

Don't:

- Do not attack domestic marketplaces or their sellers.
- Do not use artificial scarcity.
- Do not make guaranteed-income claims.
- Do not hide core content if JavaScript fails.
- Do not use decorative effects that compete with the instructor photo or CTA.
- Do not leave expired schedules or placeholder URLs in production.

## Responsive Behavior

- At 860px and below, switch major grids to one column.
- At 620px and below, make CTAs full width and allow nav links to scroll horizontally.
- Long Korean text and URLs must wrap.
- Schedule and CTA state must remain clear on small screens.
- Respect `prefers-reduced-motion`.

## Verification

Before considering a change complete:

1. Run `npm test` or `node tests/validate-site.mjs`.
2. Confirm the active schedule and CTA destinations.
3. Confirm the page works when no class date is available.
4. Check desktop and mobile layouts.
5. Verify Smartstore, KakaoTalk, YouTube, and application links.

## Agent Guide

Before changing the page, read this file and preserve the site's role as an evergreen instructor portfolio and offline-course sales page. Keep the approved narrative, conversion model, visual system, and schedule-state rules intact. When product direction or operating rules change, update this document before or alongside implementation.
