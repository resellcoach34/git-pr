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
  '참여링크 : leecoach',
  'https://open.kakao.com/o/gh3ZQyki',
  '정확한 강의 날짜와 준비물은 결제 후 또는 카카오톡 상담에서 안내드립니다.',
  'floating-kakao',
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

for (const file of ['profile-arms-crossed.jpg', 'profile-smile.jpg', 'sales-june-2026.png', 'sales-jan-may-2026.png']) {
  const path = resolve(root, file);
  assert.ok(existsSync(path), `${file} should exist`);
  assert.ok(statSync(path).size < 3 * 1024 * 1024, `${file} should be under 3MB`);
}

console.log('Site validation passed.');
