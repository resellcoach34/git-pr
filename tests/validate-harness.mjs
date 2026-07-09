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
