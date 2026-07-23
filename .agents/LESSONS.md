# Lessons and Failure Prevention

- Codex 브라우저 연결이 `Cannot redefine property: process`로 실패할 때 빈 헤드리스 캡처를 화면 검증 근거로 사용하지 않고, 자동 테스트와 운영 HTML·CSS 검증 결과 및 시각 검증 제한을 명확히 보고한다.

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
