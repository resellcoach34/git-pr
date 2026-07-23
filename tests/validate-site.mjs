import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const html = read('index.html');
const css = read('style.css');
const js = read('script.js');
const packageJson = JSON.parse(read('package.json'));

assert.equal(packageJson.scripts.dev, 'node server.cjs');
assert.equal(packageJson.scripts.test, 'node tests/validate-site.mjs && node tests/validate-harness.mjs');

for (const id of ['hero', 'market-choice', 'why-amazon', 'instructor', 'video-proof', 'outcomes', 'curriculum', 'testimonials', 'faq', 'application']) {
  assert.ok(html.includes(`id="${id}"`), `Page should include #${id}`);
}

for (const phrase of [
  '아마존 판매,<br>너무 어렵게 생각하지 마세요.',
  '아마존 셀러<br>&quot;리셀이코치&quot;',
  '88년생, ESTJ',
  '홍삼업체 해외영업부 5년',
  '유튜브 &quot;리셀이코치&quot; 채널 운영',
  '국내 마켓 리셀로 3년 연속 10억 매출',
  '아마존 셀러 3년차',
  '한국에서 싸게 사서 미국에 마진 붙여서 판매하는 것입니다.',
  '아마존 무료 강의 보러가기',
  '리셀이코치에게 교육 받기',
  '아마존 A-Z까지<br>같이 옆에서 알려드립니다',
  '아직도 쿠팡에서<br>판매하시나요?',
  '그래서 저는 블루오션 아마존에서 한국 상품을 팔고 있습니다.',
  '왜 아마존인가<span class="question-mark">?</span>',
  'amazon-wordmark',
  '환율은 오르고, 국내 온라인 경쟁은 더 치열해지고 있습니다',
  '직접 판매해본 사람이',
  '가장 최근 매출',
  '실제 아마존 매출을 확인해주세요',
  'US$23,736.50',
  '약 3,590만원',
  'US$59,025.96',
  '약 9,000만원',
  '혼자 다음 상품을 준비할 수 있도록',
  '수강 신청은 스마트스토어에서 바로 진행할 수 있습니다',
  'large-action-btn',
  'smartstore-icon',
  '스마트스토어에서 결제하기',
  '수강 신청 바로가기',
  'kakao-icon',
  '카톡으로 질문하기',
  '참여 코드 : leecoach',
  'https://open.kakao.com/o/gh3ZQyki',
  '정확한 강의 날짜와 준비물은 결제 후 또는 카카오톡 상담에서 안내드립니다.',
  'floating-kakao',
  '<span class="floating-kakao-code">참여코드 : leecoach</span>',
]) {
  assert.ok(html.includes(phrase), `HTML should include ${phrase}`);
}

const hero = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
assert.ok(!hero.includes('스마트스토어'), 'Hero should not expose payment');
assert.ok(!hero.includes('카카오톡'), 'Hero should not expose Kakao inquiry');
assert.ok(!hero.includes('가격'), 'Hero should not expose price');
assert.ok(!hero.includes('처음 시작하는 사람도'), 'Hero should not include old checklist copy');
assert.ok(!hero.includes('화면으로만 보지 않고'), 'Hero should not include old checklist copy');
assert.ok(!hero.includes('비용과 계정 리스크'), 'Hero should not include old checklist copy');
assert.ok(!hero.includes('판매 경험을 실행 과정으로 바꾼 강의'), 'Hero should not include old profile heading');
assert.ok(!hero.includes('막연한 성공담'), 'Hero should not include old profile description');
assert.ok(html.indexOf('id="application"') > html.indexOf('id="faq"'), 'Application should appear after FAQ');
assert.ok(html.indexOf('스마트스토어에서 결제하기') > html.indexOf('id="application"'), 'Payment button should appear in the final application section');
assert.ok(html.indexOf('https://smartstore.naver.com/benefitothers') > html.indexOf('id="application"'), 'Smartstore link should appear in the final application section');
assert.ok(!html.includes('KAKAO_OPEN_CHAT_URL_PLACEHOLDER'), 'Kakao placeholder should be replaced');
assert.ok(html.includes('class="application-pricing-card"'), 'Application section should include the pricing image card');
assert.ok(html.includes('src="course-fee-schedule.jpg"'), 'Application section should use the supplied pricing image');
assert.ok(html.includes('alt="온라인반과 서울 오프라인반 강의 일정 및 얼리버드 수강료 안내"'), 'Pricing image should have descriptive alt text');
assert.ok(!html.includes('일정 확정 후 안내되는 내용'), 'Old application guide should be removed');
assert.ok(!html.includes('강의 날짜와 진행 시간'), 'Old application guide items should be removed');
assert.ok(html.includes('<p class="eyebrow">수강생 후기</p>'), 'Testimonials should use the requested eyebrow copy');
assert.ok(html.includes('<h2>처음 시작한 수강생분들의 생생한 후기</h2>'), 'Testimonials should use the requested heading');
assert.ok(html.includes('<p class="testimonial-period">(2026년 7월 수강생분들)</p>'), 'Testimonials should include the requested July 2026 cohort note');
assert.equal([...html.matchAll(/class="testimonial-proof/g)].length, 4, 'Testimonials should include four proof images');
for (const file of ['testimonial-01.png', 'testimonial-02.png', 'testimonial-03.png', 'testimonial-04.png']) {
  assert.ok(html.includes(`src="${file}"`), `Testimonials should include ${file}`);
}
assert.ok(!html.includes('class="testimonial-card'), 'Old testimonial cards should be removed');
assert.ok(css.includes('.testimonial-gallery'), 'Testimonials should use the proof image gallery');
assert.ok(css.includes('width: min(100% - 40px, 1200px)'), 'Testimonial images should use a wide readable layout');
assert.ok(css.includes('.testimonials-section .section-header .eyebrow'), 'Testimonials eyebrow should have a section-specific style');
assert.ok(css.includes('font-size: clamp(2.525rem, calc(5vw + 6px), 4.625rem)'), 'Testimonials eyebrow should be slightly larger than the main heading');
assert.ok(css.includes('color: #ff3b24'), 'Testimonials eyebrow should be red');
assert.ok(css.includes('.testimonial-period'), 'Testimonials cohort note should have a dedicated style');
assert.ok(css.includes('.floating-kakao-copy .floating-kakao-code'), 'Floating Kakao participation code should have a readable dedicated style');

assert.equal([...html.matchAll(/class="video-panel"/g)].length, 3);
assert.equal([...html.matchAll(/class="video-frame video-preview"/g)].length, 3);
assert.equal([...html.matchAll(/img\.youtube\.com\/vi/g)].length, 3);
assert.ok(!html.includes('youtube.com/embed'), 'Video previews should avoid embedded player errors');
for (const phrase of [
  '아마존에서 물건 판매하는 기초 영상',
  '(아마존으로 한달에 150만원 버는 법)',
  '아마존 판매하는 방법 무료 강의',
  '(리셀이코치 방법을 배워보세요!)',
  '아마존 수강생분들의 생생한 후기 영상',
]) {
  assert.ok(html.includes(phrase), `Video cards should include ${phrase}`);
}
assert.ok(css.includes('font-size: clamp(1.7rem, 3.2vw, 2.5rem)'), 'Video titles should use the larger responsive font size');
assert.ok(css.includes('font-size: clamp(1.05rem, 1.5vw, 1.2rem)'), 'Video descriptions should use the larger responsive font size');

for (const phrase of [
  '아마존 글로벌 셀러 입문',
  '아마존 필수 서류 안내',
  '반려 없는 입점',
  '[실습] 아마존 가입하기',
  '초보자 맞춤 셀러 계정 실전 생성',
  '성공 마인드셋',
  '확실한 수익 비전과 동기 부여',
  '[추가] 정산 계좌 세팅',
  '핑퐁 페이먼트 계좌 연동',
  '1주차 밀착 Q&amp;A',
  '마이너스 NO! 마진 극대',
  '상표권(USPTO) 방어',
  '셀유어즈 실전 기법',
  '[실습] 절대 마진 계산',
  '카테고리 승인',
  '[특전] 황금 소싱 리스트',
  '2주차 밀착 Q&amp;A',
  '[실습] 다이소 온라인 소싱',
  '[실습] 오프라인 다이소 투어',
  '영어 몰라도 OK! AI',
  '뉴리스팅 필수 이론',
  'AI 자동화 전략',
  'AI 상세페이지 제작',
  'AI 이미지 편집',
  '[실습] 내 상품 리스팅',
  '[실습] 라벨 바코드',
  '[시크릿] 실제 리스팅 공개',
  '정글스카우트 심화',
  '3주차 밀착 Q&amp;A',
  '배송(Door-to-Door) 마스터 &amp;',
  '무역 기초 프로세스',
  '[실습] 아마존 배송 플랜',
  '[실습] 운송사 배송 만들기',
  '[마케팅] 상위 노출 꼼수',
  '정부 지원금 지원',
  '[특전] 핵심 체크리스트',
  '최종 Q&amp;A',
]) {
  assert.ok(html.includes(phrase), `Curriculum should include ${phrase}`);
}
assert.equal([...html.matchAll(/class="curriculum-card/g)].length, 4, 'Curriculum should include four weekly cards');
assert.ok(css.includes('.curriculum-item-detail'), 'Curriculum should style item descriptions');
assert.ok(css.includes('width: min(100% - 40px, 1360px)'), 'Curriculum should use a wider desktop container');
assert.ok(css.includes('grid-template-columns: repeat(2, minmax(0, 1fr))'), 'Curriculum items should spread across two columns on wide screens');
assert.ok(css.includes('font-size: clamp(1.95rem, 2.5vw, 2.3rem)'), 'Curriculum headings should be about 5px larger');
assert.ok(css.includes('font-size: 1.43rem'), 'Curriculum item labels should be about 5px larger');
assert.ok(css.includes('font-size: 1.31rem'), 'Curriculum item details should be about 5px larger');
assert.ok(css.includes('--week-color:'), 'Curriculum cards should use distinct weekly accent colors');
assert.ok(css.includes('background: var(--week-soft)'), 'Curriculum items should use tinted backgrounds');
assert.ok(css.includes('border-left: 5px solid var(--week-color)'), 'Curriculum items should use stronger visual grouping');
assert.ok(css.includes('.curriculum-section .section-header .eyebrow'), 'Curriculum eyebrow should have a section-specific style');
assert.ok(css.includes('font-size: clamp(2.775rem, calc(5vw + 10px), 4.875rem)'), 'Curriculum eyebrow should stay 10px larger than the section title');
assert.ok(css.includes('color: #e53220'), 'Curriculum eyebrow should be red');
assert.equal([...html.matchAll(/<details/g)].length, 4);
assert.ok(!html.includes('href="#"'), 'Links should point to destinations');
assert.ok(!html.includes('style="'), 'Inline styles should not be used');

for (const className of ['.market-section', '.amazon-grid', '.outcome-grid', '.faq-list', '.floating-kakao', '.schedule-note', '.large-action-btn', '.smartstore-icon', '.kakao-icon', '.action-copy', '.hero-tab-btn', '.hero-bio-list']) {
  assert.ok(css.includes(className), `CSS should include ${className}`);
}
assert.ok(css.includes('@media (max-width: 640px)'));
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(js.includes('IntersectionObserver'));

const mobileAmazonHeadingStart = css.lastIndexOf('.amazon-section .section-header h2');
const mobileAmazonHeadingEnd = css.indexOf('.amazon-title-row', mobileAmazonHeadingStart);
const mobileAmazonHeading = css.slice(mobileAmazonHeadingStart, mobileAmazonHeadingEnd);
assert.ok(mobileAmazonHeading.includes('font-size: clamp(2.3rem, 11vw, 3rem)'), 'Mobile Amazon heading should fit on one line');
assert.ok(mobileAmazonHeading.includes('white-space: nowrap'), 'Mobile Amazon heading should not wrap');

const mobileVideoTitleStart = css.lastIndexOf('.video-copy h3');
const mobileVideoTitleEnd = css.indexOf('.video-panel', mobileVideoTitleStart);
const mobileVideoTitle = css.slice(mobileVideoTitleStart, mobileVideoTitleEnd);
assert.ok(mobileVideoTitle.includes('font-size: 1.55rem'), 'Mobile video titles should keep Video 01 copy on two lines');

for (const file of ['profile-arms-crossed.jpg', 'profile-smile.jpg', 'sales-june-2026.png', 'sales-jan-may-2026.png', 'course-fee-schedule.jpg', 'testimonial-01.png', 'testimonial-02.png', 'testimonial-03.png', 'testimonial-04.png']) {
  const path = resolve(root, file);
  assert.ok(existsSync(path), `${file} should exist`);
  assert.ok(statSync(path).size < 3 * 1024 * 1024, `${file} should be under 3MB`);
}

console.log('Site validation passed.');
