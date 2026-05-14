import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const html = read('index.html');
const css = read('style.css');
const js = read('script.js');
const readme = read('README.md');
const design = read('DESIGN.md');

assert.ok(existsSync(resolve(root, 'DESIGN.md')), 'DESIGN.md should document the visual system');

for (const section of [
  'Visual Theme',
  'Color Palette',
  'Typography',
  'Components',
  'Layout',
  "Do's and Don'ts",
  'Responsive Behavior',
  'Agent Guide',
]) {
  assert.ok(design.includes(section), `DESIGN.md should include ${section}`);
}

for (const phrase of [
  '<title>아마존 리셀 실전 마스터 클래스</title>',
  '<h1>아마존 리셀로<br>첫 수익 구조 만들기</h1>',
  'id="free-lecture"',
  'id="curriculum"',
  'id="application"',
  'id="testimonials"',
  'id="support"',
  '무료강의 보기',
  '수강신청하기',
  '유튜브 후기 보기',
  '강사/강의 소개',
  '무료 강의 수강 영역',
]) {
  assert.ok(html.includes(phrase), `HTML should include ${phrase}`);
}

assert.ok(!html.includes('href="#"'), 'CTA links should point to a real destination');
assert.ok(!html.includes('style="'), 'Inline styles should be moved into CSS classes');
assert.ok(!html.includes('.jpg.jpg'), 'Image filenames should not use duplicate extensions');
assert.ok(!existsSync(resolve(root, 'profile_arms_crossed.jpg.jpg')), 'Old arms-crossed image name should be removed');
assert.ok(!existsSync(resolve(root, 'profile_smile.jpg.jpg')), 'Old smile image name should be removed');
assert.match(html, /<iframe[^>]+youtube\.com\/embed/, 'Testimonials should include an embeddable YouTube video card');
assert.match(html, /<form[^>]+id="course-application"/, 'Application form should be identifiable');
assert.ok(css.includes('--color-action'), 'CSS should expose role-based design tokens');
assert.ok(css.includes('.instructor-avatar'), 'Instructor avatar styles should live in CSS');
assert.ok(css.includes('@media (max-width: 860px)'), 'CSS should include tablet/mobile responsive rules');
assert.ok(css.includes('@media (max-width: 620px)'), 'CSS should include small-screen responsive rules');
assert.ok(css.includes('prefers-reduced-motion'), 'CSS should respect reduced motion');
assert.ok(css.includes('scroll-margin-top'), 'CSS should protect anchored headings from fixed nav');
assert.ok(js.includes('IntersectionObserver'), 'JS should handle scroll reveal behavior');
assert.ok(js.includes("!('IntersectionObserver' in window)"), 'JS should include IntersectionObserver fallback');

for (const file of ['profile-arms-crossed.jpg', 'profile-smile.jpg']) {
  const imagePath = resolve(root, file);
  assert.ok(existsSync(imagePath), `${file} should exist`);
  assert.ok(statSync(imagePath).size < 3 * 1024 * 1024, `${file} should be under 3MB`);
}

const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
assert.equal(imageTags.length, 2, 'Page should use exactly two instructor images');
for (const tag of imageTags) {
  assert.match(tag, /alt="[^"]{8,}"/, 'Each image should have meaningful alt text');
  assert.match(tag, /width="1400"/, 'Each image should declare actual width');
  assert.match(tag, /height="1960"/, 'Each image should declare actual height');
  assert.match(tag, /decoding="async"/, 'Each image should use async decoding');
}
assert.match(imageTags[0], /loading="eager"/, 'Hero image should load eagerly');
assert.match(imageTags[0], /fetchpriority="high"/, 'Hero image should have high fetch priority');
assert.match(imageTags[1], /loading="lazy"/, 'Below-fold image should lazy load');

for (const phrase of [
  'Amazon Masterclass Landing Page',
  '파일 구조',
  '디자인 기준',
  '실행 방법',
]) {
  assert.ok(readme.includes(phrase), `README should include ${phrase}`);
}
