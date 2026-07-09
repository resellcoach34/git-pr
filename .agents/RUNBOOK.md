# Operating Runbook

## Session Start

1. Read `AGENTS.md`, `.agents/PROJECT_STATE.md`, `.agents/ROADMAP.md`.
2. Read `.agents/BRAND_RULES.md` for UI or content work.
3. Read `.agents/LESSONS.md` for deployment or recurring failures.
4. Inspect current truth:

```powershell
git status --short
git log -5 --oneline
git remote -v
```

Do not overwrite unrelated user changes or assume old conversation state is still current.

## Change Workflow

1. Identify the exact user-visible result and affected files.
2. Add or update a regression test before production changes.
3. Run the focused test and confirm it fails for the intended reason.
4. Implement the smallest complete change.
5. Run:

```powershell
npm.cmd test
git diff --check
```

6. For rendered changes, verify the actual page at desktop width and 375px mobile. Check clipping, overlap, horizontal overflow, missing assets, console warnings/errors, and the requested interaction.

## Sales Proof Update

When replacing monthly sales:

1. Copy the supplied source image into the repository with a month-specific filename.
2. Update period, USD amount, KRW approximation, exchange rate, reference date, image path, dimensions, and alt text together.
3. Update `tests/validate-site.mjs`.
4. Confirm the old monthly amount is no longer presented as the latest month.
5. Scroll to the sales section during browser QA so lazy images load; verify `naturalWidth > 0`.

## Git and GitHub

Stage only files belonging to the current task.

```powershell
git status --short
git diff --check
git add -- style.css tests/validate-site.mjs
git commit -m "Describe the user-visible outcome"
git push origin main
```

Never add `.vercel/`, `.superpowers/`, `outputs/`, server logs, credentials, or payment information.

## Production Deployment

Every completed change must be deployed unless the user explicitly requests local-only work.

```powershell
npx.cmd --yes vercel@50.28.0 deploy --prod --yes --scope resellcoach34s-projects
```

Confirm the deployment is READY:

```powershell
npx.cmd --yes vercel@50.28.0 inspect https://www.resellcoach34.com
```

## Definition of Done

A task is complete only when all applicable checks are proven:

- regression test was observed failing before the change and passes after it;
- `npm.cmd test` passes;
- `git diff --check` passes;
- rendered changes pass desktop and 375px mobile QA;
- related files are committed and pushed to `origin/main`;
- a Vercel production deployment completes;
- `https://www.resellcoach34.com` serves the new result over HTTPS;
- apex redirects permanently to `www`;
- console has no relevant errors or warnings;
- changed images load and changed links/interactions work;
- `.agents/PROJECT_STATE.md` and other harness records reflect material state changes.

Local edits, a green test, or a Git push alone are not completion.

## Domain Verification

```powershell
curl.exe -I https://www.resellcoach34.com/
curl.exe -I https://resellcoach34.com/
```

Expected:

- `www`: HTTP 200 with `Strict-Transport-Security`
- apex: HTTP 308 with `Location: https://www.resellcoach34.com/`

## GitHub Automatic Deployment

The desired state is a Vercel GitHub connection to `resellcoach34/git-pr`, production branch `main`.

```powershell
npx.cmd --yes vercel@50.28.0 git connect https://github.com/resellcoach34/git-pr --scope resellcoach34s-projects --yes
```

If access fails, the user must grant the Vercel GitHub App access to the repository. Do not claim automatic deployment is active until a new `main` commit produces a Vercel deployment.

## Failure and Rollback

1. Read the failing command output or Vercel deployment logs.
2. Compare with the last known READY production deployment.
3. Fix forward when the cause is small and verified.
4. If production is broken and rollback is safer, explain the target deployment and obtain user approval before:

```powershell
npx.cmd --yes vercel@50.28.0 rollback
```

5. After rollback, repeat representative URL and browser checks.
