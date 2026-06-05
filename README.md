# resellcoach-class

리셀이코치 아마존 오프라인 강의 홍보용 정적 랜딩 페이지입니다. 유튜브 영상, Google Form 신청, 스마트스토어 결제, Netlify 자동배포 흐름을 기준으로 운영합니다.

## 프로젝트 이름과 저장소

- 사이트/프로젝트 이름: `resellcoach-class`
- 로컬 폴더명 예정: `resellcoach-class`
- GitHub 레포지토리 예정: `resellcoach34/resellcoach-class`
- 현재 로컬 폴더가 아직 `git-pr`라면, Codex나 편집기를 닫은 뒤 폴더명을 `resellcoach-class`로 바꾸면 됩니다.

## 실행 방법 / 웹사이트 보는 법

Node.js가 설치된 환경에서 다음 명령을 실행하세요.

```powershell
npm.cmd run dev
```

브라우저에서 아래 주소를 열면 사이트를 볼 수 있습니다.

```text
http://localhost:3000
```

cmd나 일부 VS Code 터미널에서는 아래 명령도 사용할 수 있습니다.

```bash
npm run dev
```

PowerShell에서 `npm.ps1` 실행 정책 오류가 나면 `npm.cmd run dev`를 사용하세요.

포트를 바꾸고 싶으면 아래처럼 실행합니다.

```powershell
$env:PORT=4000; npm.cmd run dev
```

그 다음 브라우저에서 `http://localhost:4000`을 열면 됩니다.

## 나중에 수정할 항목

아래 항목은 실제 링크가 준비되면 나중에 교체하면 됩니다.

- Google Form 신청 링크
- 스마트스토어 결제 링크: `https://smartstore.naver.com/benefitothers`
- YouTube 영상 URL 3개
- Netlify 배포 주소
- 개인 도메인 연결 여부

## 운영에 필요한 계정과 링크

- YouTube 영상 URL 3개:
  - 인트로 영상 1: `https://youtu.be/F3MCYv_JkEo`
  - 무료강의 영상 2: `https://youtu.be/kX3KF7lGAtY`
  - 강의 안내 영상 3: `https://youtu.be/RAnbg3Kjm38`
- Google Form: 이름, 전화번호, 희망 반, 문의사항 필드 포함
- Google Sheets: Google Form 응답 저장용
- 스마트스토어 상품 링크: 강의 결제용 단일 상품 URL
- GitHub 저장소: `resellcoach34/resellcoach-class`
- Netlify: GitHub 자동배포 연결용

## 링크 교체 방법

`index.html`에서 아래 자리표시자를 실제 링크로 교체하세요.

```html
GOOGLE_FORM_URL_PLACEHOLDER
```

유튜브 영상 URL 교체는 `data-video-panel` 값을 기준으로 찾으면 됩니다. 현재는 한 번에 한 영상만 보이는 탭 방식입니다.

```html
data-video-panel="1"
data-video-panel="2"
data-video-panel="3"
```

실제 영상으로 바꿀 때는 각 패널 안의 YouTube embed iframe 주소에서 `VIDEO_ID` 부분을 교체하면 됩니다.

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="영상 제목" loading="lazy" allowfullscreen></iframe>
```

## 배포 방법

1. GitHub 저장소 이름을 `git-pr`에서 `resellcoach-class`로 변경합니다.
2. 로컬 원격 URL을 `https://github.com/resellcoach34/resellcoach-class.git`로 맞춥니다.
3. Netlify에서 GitHub 저장소 `resellcoach34/resellcoach-class`를 연결합니다.
4. Build command는 비워두고, Publish directory는 프로젝트 루트로 설정합니다.
5. 1차 배포는 Netlify 기본 주소를 사용하고, 개인 도메인은 추후 연결합니다.

## 파일 구조

- `index.html`: 랜딩 페이지 마크업, 영상 슬롯, 신청/결제 CTA
- `style.css`: 디자인 토큰, 섹션 레이아웃, 영상 카드, 반응형 UI
- `script.js`: 스크롤 애니메이션, 앵커 이동, 영상 자리표시 보조 표시
- `server.cjs`: `npm run dev`로 실행하는 로컬 미리보기 서버
- `package.json`: npm 실행 스크립트
- `DESIGN.md`: 디자인 기준과 AI 에이전트용 수정 가이드
- `profile-arms-crossed.jpg`: 히어로 강사 이미지
- `profile-smile.jpg`: 상단 배경 이미지
- `tests/validate-site.mjs`: 필수 섹션과 운영 링크 자리표시 검증 스크립트

## 검증 방법

```bash
node tests/validate-site.mjs
```
