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
