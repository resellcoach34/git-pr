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
assert.equal(packageJson.scripts.test, 'node tests/validate-site.mjs');

for (const id of ['hero', 'market-choice', 'why-amazon', 'instructor', 'video-proof', 'outcomes', 'curriculum', 'testimonials', 'faq', 'application']) {
  assert.ok(html.includes(`id="${id}"`), `Page should include #${id}`);
}

for (const phrase of [
  '한국 상품의 다음 시장',
  '아직도 쿠팡에서<br>판매하시나요?',
  '그래서 저는 블루오션 아마존에서 한국 상품을 팔고 있습니다.',
  '왜 아마존인가<span class="question-mark">?</span>',
  'amazon-wordmark',
  '환율은 오르고, 국내 온라인 경쟁은 더 치열해지고 있습니다',
  '직접 판매해본 사람이',
  '가장 최근 매출',
  '실제 아마존 매출을 확인해주세요',
  'US$17,411.65',
  '약 2,660만원',
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
assert.ok(html.indexOf('id="application"') > html.indexOf('id="faq"'), 'Application should appear after FAQ');
assert.ok(html.indexOf('스마트스토어에서 결제하기') > html.indexOf('id="application"'), 'Payment button should appear in the final application section');
assert.ok(html.indexOf('https://smartstore.naver.com/benefitothers') > html.indexOf('id="application"'), 'Smartstore link should appear in the final application section');
assert.ok(!html.includes('KAKAO_OPEN_CHAT_URL_PLACEHOLDER'), 'Kakao placeholder should be replaced');

assert.equal([...html.matchAll(/data-video-tab=/g)].length, 3);
assert.equal([...html.matchAll(/data-video-panel=/g)].length, 3);
assert.equal([...html.matchAll(/youtube\.com\/embed/g)].length, 3);
assert.equal([...html.matchAll(/<details/g)].length, 4);
assert.ok(!html.includes('href="#"'), 'Links should point to destinations');
assert.ok(!html.includes('style="'), 'Inline styles should not be used');

for (const className of ['.market-section', '.amazon-grid', '.outcome-grid', '.faq-list', '.floating-kakao', '.schedule-note', '.large-action-btn', '.smartstore-icon', '.kakao-icon', '.action-copy']) {
  assert.ok(css.includes(className), `CSS should include ${className}`);
}
assert.ok(css.includes('@media (max-width: 640px)'));
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(js.includes('IntersectionObserver'));
assert.ok(js.includes('data-video-tab'));

for (const file of ['profile-arms-crossed.jpg', 'profile-smile.jpg', 'sales-may-2026.png', 'sales-jan-may-2026.png']) {
  const path = resolve(root, file);
  assert.ok(existsSync(path), `${file} should exist`);
  assert.ok(statSync(path).size < 3 * 1024 * 1024, `${file} should be under 3MB`);
}

console.log('Site validation passed.');
