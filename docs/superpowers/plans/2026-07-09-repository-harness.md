# Repository Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이 저장소의 모든 Codex 대화가 현재 운영 상태와 방향성을 파악하고, 작업마다 테스트·커밋·푸시·운영 재배포·대표 도메인 검증까지 능동적으로 완료하게 하는 저장소 전용 하네스를 구축한다.

**Architecture:** 루트 `AGENTS.md`를 자동 진입점으로 두고 `.agents/` 아래에 상태, 로드맵, 실행 절차, 브랜드 규칙, 회고를 책임별로 분리한다. Node 검증 스크립트로 필수 파일·문구·운영 정보·비밀정보 부재를 확인하고, 내부 하네스 문서가 Vercel 정적 배포에 포함되지 않도록 `.vercelignore`를 강화한다.

**Tech Stack:** Markdown, Node.js ESM, Git, GitHub, Vercel CLI, 정적 HTML/CSS/JavaScript

---

### Task 1: 하네스 구조 검증 테스트 작성

**Files:**
- Create: `tests/validate-harness.mjs`
- Modify: `package.json`

- [ ] **Step 1: 실패하는 하네스 검증 테스트 작성**

`tests/validate-harness.mjs`를 다음 내용으로 만든다.

```js
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const requiredFiles = [
  'AGENTS.md',
  '.agents/PROJECT_STATE.md',
  '.agents/ROADMAP.md',
  '.agents/RUNBOOK.md',
  '.agents/BRAND_RULES.md',
  '.agents/LESSONS.md',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(resolve(root, file)), `${file} should exist`);
}

const read = (file) => readFileSync(resolve(root, file), 'utf8');
const agents = read('AGENTS.md');
const state = read('.agents/PROJECT_STATE.md');
const roadmap = read('.agents/ROADMAP.md');
const runbook = read('.agents/RUNBOOK.md');
const brand = read('.agents/BRAND_RULES.md');
const lessons = read('.agents/LESSONS.md');
const vercelIgnore = read('.vercelignore');

for (const phrase of [
  'npm.cmd test',
  'git push origin main',
  'Vercel 운영 재배포',
  'https://www.resellcoach34.com',
  '.agents/PROJECT_STATE.md',
]) {
  assert.ok(agents.includes(phrase), `AGENTS.md should include ${phrase}`);
}

for (const phrase of [
  'https://github.com/resellcoach34/git-pr',
  'resellcoach34s-projects',
  'git-pr',
  'www.resellcoach34.com',
  'main',
]) {
  assert.ok(state.includes(phrase), `PROJECT_STATE.md should include ${phrase}`);
}

assert.ok(roadmap.includes('전환율'), 'ROADMAP.md should cover conversion');
assert.ok(roadmap.includes('모바일'), 'ROADMAP.md should cover mobile quality');
assert.ok(runbook.includes('Definition of Done'), 'RUNBOOK.md should define completion');
assert.ok(runbook.includes('npx.cmd --yes vercel@50.28.0 deploy --prod'), 'RUNBOOK.md should include the production deploy command');
assert.ok(brand.includes('매출'), 'BRAND_RULES.md should cover sales proof');
assert.ok(brand.includes('한 줄'), 'BRAND_RULES.md should cover mobile heading readability');
assert.ok(lessons.includes('.vercelignore'), 'LESSONS.md should record deploy exclusions');
assert.ok(lessons.includes('npm.cmd'), 'LESSONS.md should record the PowerShell npm workaround');

for (const entry of ['AGENTS.md', '.agents/', 'docs/superpowers/']) {
  assert.ok(vercelIgnore.includes(entry), `.vercelignore should exclude ${entry}`);
}

const allHarnessText = [agents, state, roadmap, runbook, brand, lessons].join('\n');
assert.ok(!/Bearer\s+[A-Za-z0-9._-]+/i.test(allHarnessText), 'Harness must not contain bearer tokens');
assert.ok(!/(password|비밀번호)\s*[:=]\s*\S+/i.test(allHarnessText), 'Harness must not contain passwords');

console.log('Harness validation passed.');
```

- [ ] **Step 2: 테스트 명령을 package.json에 추가**

`package.json`의 scripts를 다음과 같이 바꾼다.

```json
{
  "dev": "node server.cjs",
  "start": "node server.cjs",
  "test": "node tests/validate-site.mjs && node tests/validate-harness.mjs",
  "test:site": "node tests/validate-site.mjs",
  "test:harness": "node tests/validate-harness.mjs"
}
```

- [ ] **Step 3: 테스트가 올바른 이유로 실패하는지 확인**

Run:

```powershell
npm.cmd test
```

Expected: 기존 사이트 검증은 통과하고 `AGENTS.md should exist`에서 실패한다.

---

### Task 2: 루트 행동 계약 작성

**Files:**
- Create: `AGENTS.md`
- Modify: `.vercelignore`

- [ ] **Step 1: AGENTS.md 작성**

다음 계약을 포함한다.

```markdown
# Repository Operating Harness

## Mission

이 저장소는 한국 사용자를 위한 아마존 셀러 오프라인 강의 랜딩 페이지다. 기본 응답과 사용자 노출 문구는 한국어로 작성한다.

## Start Every Session

작업 전 반드시 `.agents/PROJECT_STATE.md`, `.agents/ROADMAP.md`, `.agents/RUNBOOK.md`를 읽는다. UI나 콘텐츠를 바꾸면 `.agents/BRAND_RULES.md`도 읽고, 배포나 반복 장애를 다루면 `.agents/LESSONS.md`도 읽는다. 저장소와 외부 상태를 직접 확인할 수 있으면 사용자에게 묻지 않는다.

## Definition of Done

사용자가 변경을 요청한 작업은 다음이 모두 끝나야 완료다.

1. 관련 회귀 테스트를 먼저 추가하거나 갱신한다.
2. 최소 범위로 구현한다.
3. `npm.cmd test`와 `git diff --check`를 통과한다.
4. 렌더링 변경은 데스크톱과 375px 모바일에서 브라우저 검증한다.
5. 관련 파일만 커밋하고 `git push origin main`으로 푸시한다.
6. Vercel 운영 재배포를 실행한다.
7. `https://www.resellcoach34.com`에서 HTTPS, 콘솔 오류, 이미지, 핵심 문구와 대상 상호작용을 검증한다.
8. 상태 변화는 `.agents/PROJECT_STATE.md`, 새 교훈은 `.agents/LESSONS.md`, 방향 변화는 `.agents/ROADMAP.md`에 반영한다.

로컬 수정, 테스트 통과, Git 푸시만으로는 완료라고 말하지 않는다. 사용자가 명시적으로 로컬 작업만 요청한 경우에만 재배포를 생략하고 그 사실을 보고한다.

## Operating Rules

- 기존 사용자 변경과 무관한 파일을 되돌리거나 삭제하지 않는다.
- 미추적 `.superpowers/`, `outputs/`, 로그 파일을 커밋하거나 배포하지 않는다.
- `.vercel/`, 토큰, 비밀번호, 결제정보를 커밋하지 않는다.
- 결제, 도메인 구매, 권한 승인 직전에는 사용자 확인을 받는다.
- 렌더링 변경은 빌드나 정적 검색만으로 검증하지 않는다.
- 배포 후 대표 도메인을 검증하며 임시 `*.vercel.app` 주소만 확인하고 끝내지 않는다.
- 세부 실행 명령과 장애 대응은 `.agents/RUNBOOK.md`를 따른다.
```

- [ ] **Step 2: 내부 하네스를 배포에서 제외**

`.vercelignore`에 다음 항목을 추가한다.

```text
AGENTS.md
.agents/
docs/superpowers/
```

기존 `.agents/` 항목이 이미 있으면 중복 없이 유지한다.

---

### Task 3: 현재 상태와 방향성 문서 작성

**Files:**
- Create: `.agents/PROJECT_STATE.md`
- Create: `.agents/ROADMAP.md`

- [ ] **Step 1: PROJECT_STATE.md 작성**

다음 사실을 기록한다.

```markdown
# Project State

Last updated: 2026-07-09

## Product

- 한국 사용자를 위한 아마존 셀러 오프라인 강의 랜딩 페이지
- 정적 HTML/CSS/JavaScript
- 핵심 목표: 신뢰 형성, 강의 이해, 스마트스토어 결제와 카카오톡 문의 전환

## Source and Delivery

- Repository: https://github.com/resellcoach34/git-pr
- Production branch: `main`
- Vercel team: `resellcoach34s-projects`
- Vercel project: `git-pr`
- Project ID: `prj_D2ILf9HW6dzdmn05VVck7zbDvhJV`
- Canonical URL: https://www.resellcoach34.com
- Apex redirect: https://resellcoach34.com → `www` with HTTP 308
- Fallback production alias: https://git-pr-gold.vercel.app
- Domain registration expires: 2027-07-09

## Commands

- Development: `npm.cmd run dev`
- Full validation: `npm.cmd test`
- Production deploy: `npx.cmd --yes vercel@50.28.0 deploy --prod --yes --scope resellcoach34s-projects`

## Recent Completed Work

- 2026년 6월 매출을 `US$23,736.50`, 약 `3,590만원`, 환율 `1,513원`으로 갱신
- 모바일 `왜 아마존인가?` 제목을 375px 화면에서 한 줄로 수정
- Vercel 운영 배포와 `www.resellcoach34.com` 연결
- apex 도메인을 `www`로 308 리디렉션
- 로컬 임시 산출물을 `.vercelignore`로 배포 제외

## Open Work

- Vercel GitHub 앱에 `resellcoach34/git-pr` 저장소 권한을 부여하고 `main` 자동 배포 연결
- 전환 측정용 Web Analytics 또는 외부 분석 도구 결정
- 실제 사용자 모바일 기기에서 CTA 위치와 고정 카카오 버튼 겹침 확인

## Next Priority

1. GitHub 자동 배포 연결 복구
2. 모바일 CTA와 고정 카카오 버튼의 겹침 개선
3. 전환 이벤트 측정
4. 최신 매출 증빙의 월별 갱신 절차 정착
```

- [ ] **Step 2: ROADMAP.md 작성**

다음 우선순위와 완료 조건을 기록한다.

```markdown
# Roadmap

## 방향성

이 사이트는 화려함보다 신뢰, 구체성, 빠른 문의·결제 전환을 우선한다. 개선은 현재 디자인 언어를 유지하며 실제 운영 데이터와 모바일 경험을 중심으로 진행한다.

## P0 운영 안정화

- GitHub `main` 푸시가 Vercel 운영 배포로 자동 연결
- 대표 도메인 HTTPS와 apex→www 리디렉션 유지
- 모든 변경에서 자동 테스트, 운영 재배포, 대표 도메인 브라우저 검증 수행

완료 조건: 새 커밋을 `main`에 푸시했을 때 Vercel 배포가 생성되고 대표 도메인이 새 커밋을 제공한다.

## P1 모바일 전환율

- 375px 기준 제목, 카드, CTA가 잘리거나 겹치지 않음
- 고정 카카오 버튼이 핵심 콘텐츠와 결제 버튼을 과도하게 가리지 않음
- 모바일 내비게이션을 한 손로 탐색 가능

필요 자료: 실제 모바일 스크린샷, 주요 기기 폭, 사용자 피드백.

## P1 신뢰 증빙

- 매월 최신 매출 카드 갱신
- 달러 매출, 원화 환산, 환율, 기준일, 원본 이미지 일치
- 누적 매출 범위와 월 매출 범위를 혼동하지 않음

필요 자료: Seller Central 월간 캡처, 적용 환율, 기준일.

## P2 전환 측정

- 스마트스토어 결제 클릭, 카카오톡 문의 클릭, 영상 클릭 측정
- 개인정보를 수집하지 않는 최소 분석 우선

완료 조건: 운영 환경에서 핵심 CTA 이벤트를 확인할 수 있다.

## P2 콘텐츠 운영

- 강의 일정, 가격, 장소, 후기 갱신 절차 마련
- 오래된 수치와 이미지를 정기적으로 점검
```

---

### Task 4: 실행 절차와 브랜드 기준 작성

**Files:**
- Create: `.agents/RUNBOOK.md`
- Create: `.agents/BRAND_RULES.md`
- Create: `.agents/LESSONS.md`

- [ ] **Step 1: RUNBOOK.md 작성**

세션 시작, UI 변경, 매출 갱신, Git, 배포, 운영 검증, 롤백 절차를 포함한다. 필수 명령은 다음과 같다.

```powershell
git status --short
git log -5 --oneline
npm.cmd test
git diff --check
git add -- style.css tests/validate-site.mjs
git commit -m "Keep Amazon heading on one line on mobile"
git push origin main
npx.cmd --yes vercel@50.28.0 deploy --prod --yes --scope resellcoach34s-projects
npx.cmd --yes vercel@50.28.0 inspect https://www.resellcoach34.com
curl.exe -I https://www.resellcoach34.com/
curl.exe -I https://resellcoach34.com/
```

Definition of Done에는 대표 도메인에서 페이지 정체성, 빈 화면 여부, 콘솔 오류, 이미지, 375px 모바일, 변경된 상호작용을 검증하도록 명시한다. 실패 시 새 배포를 만들기 전에 로그와 최근 정상 배포를 확인하고, 필요하면 `vercel rollback`을 사용자 승인 후 실행하도록 한다.

- [ ] **Step 2: BRAND_RULES.md 작성**

다음을 명시한다.

```markdown
# Brand and Content Rules

- 사용자 노출 문구는 자연스러운 한국어가 기본이다.
- 강한 검정·남색 기반 대비, 주황·노랑 CTA, 기존 타이포그래피를 유지한다.
- 요청 없는 전면 재설계나 프레임워크 전환은 하지 않는다.
- 모바일 375px에서 중요한 제목은 의미 단위로 읽혀야 하며, `왜 아마존인가?`는 한 줄을 유지한다.
- 고정 카카오 CTA는 문의 접근성을 제공하되 핵심 수치와 결제 CTA를 가리지 않아야 한다.
- 매출 증빙은 기간, USD, 원화, 환율, 기준일, 이미지 alt가 모두 같은 사실을 표현해야 한다.
- 외부 링크는 실제 목적지를 사용하고 빈 `href="#"`를 만들지 않는다.
- 판매 주장을 새로 추가할 때는 사용자가 제공한 사실이나 검증 가능한 자료만 사용한다.
```

- [ ] **Step 3: LESSONS.md 작성**

다음 문제·해결책을 기록한다.

```markdown
# Lessons and Failure Prevention

- Git 원격 주소는 추측하지 말고 `git remote -v`와 실제 저장소 URL을 확인한다.
- PowerShell 실행 정책 때문에 `npm` 대신 `npm.cmd`를 사용한다.
- Vercel CLI 연결 정보 `.vercel/`은 `.gitignore`로 비공개 유지한다.
- `.superpowers/`, `outputs/`, 서버 로그는 `.vercelignore`로 업로드를 막는다.
- Vercel 플러그인 배포 도구의 스키마가 실패하면 공식 CLI로 전환하되 인증과 팀을 검증한다.
- GitHub 자동 배포 연결 오류는 Vercel GitHub 앱의 저장소 권한을 먼저 확인한다.
- `file://` URL이 브라우저 정책에 막히면 운영 URL이나 로컬 HTTP 서버를 사용한다.
- 지연 로딩 이미지는 DOM 존재만 보지 말고 해당 섹션까지 스크롤한 뒤 `naturalWidth`를 확인한다.
- 배포 성공 출력만 믿지 말고 `READY`, 대표 도메인 HTTP 응답, 실제 렌더링을 각각 확인한다.
- 도메인 구매와 결제는 가격·기간을 사용자에게 보여준 뒤 최종 승인을 받는다.
```

---

### Task 5: 검증, 커밋, 배포

**Files:**
- Verify: `AGENTS.md`
- Verify: `.agents/*.md`
- Verify: `.vercelignore`
- Verify: `tests/validate-harness.mjs`
- Verify: `package.json`

- [ ] **Step 1: 전체 검증 실행**

Run:

```powershell
npm.cmd test
git diff --check
```

Expected:

```text
Site validation passed.
Harness validation passed.
```

- [ ] **Step 2: 비밀정보와 미완성 표식 검사**

Run:

```powershell
rg -n -i "bearer |password\\s*[:=]|비밀번호\\s*[:=]|api[_-]?key|secret\\s*[:=]" AGENTS.md .agents
rg -n -i "fill this|decide later|unfinished requirement" AGENTS.md .agents
```

Expected: 결과 없음.

- [ ] **Step 3: 하네스 파일만 커밋**

```powershell
git add -- AGENTS.md .agents package.json tests/validate-harness.mjs .vercelignore docs/superpowers/plans/2026-07-09-repository-harness.md
git commit -m "Add repository operating harness"
git push origin main
```

- [ ] **Step 4: 운영 재배포**

```powershell
npx.cmd --yes vercel@50.28.0 deploy --prod --yes --scope resellcoach34s-projects
```

Expected: 배포가 완료되고 `https://www.resellcoach34.com`에 alias가 유지된다. `AGENTS.md`, `.agents/`, `docs/superpowers/`는 `.vercelignore` 때문에 업로드되지 않는다.

- [ ] **Step 5: 운영 검증**

```powershell
curl.exe -I https://www.resellcoach34.com/
curl.exe -I https://resellcoach34.com/
```

Expected:

- `www`: HTTP 200, HSTS 포함
- apex: HTTP 308, `Location: https://www.resellcoach34.com/`

브라우저에서 데스크톱과 375px 모바일을 열어 기존 사이트 콘텐츠와 이미지가 그대로이며 콘솔 오류가 없는지 확인한다.

- [ ] **Step 6: 상태 기록 갱신**

`.agents/PROJECT_STATE.md`의 Recent Completed Work에 저장소 하네스 구축과 검증 일자를 추가하고, 필요하면 GitHub 자동 배포 연결 상태를 현재 사실로 갱신한다. 문서 변경 후 `npm.cmd test`를 다시 실행하고 후속 커밋·푸시·운영 재배포·대표 도메인 검증을 반복한다.
