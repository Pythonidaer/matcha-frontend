# Vote for Johnny!

A personal frontend introduction made for Matcha. React, TypeScript and Vite, with locally hosted JetBrains Mono, accessible experience disclosures and system-aware dark mode.

## Run locally

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript and builds `dist/`.

## GitHub Pages

In Settings → Pages, select GitHub Actions as the source. The included workflow builds and deploys `main`, using `/matcha-frontend/` as the Vite base. Rerun the workflow if Pages was enabled after the first push. Intended URL: https://pythonidaer.github.io/matcha-frontend/

## Netlify

Import this GitHub repository in Netlify. Select `main`, build command `npm run build`, publish directory `dist`. `netlify.toml` already supplies build settings. Netlify uses the root base path. Canonical/Open Graph/social URLs point to https://johnny-for-matcha.netlify.app/.

## Contact form

The typing area becomes a contact form on focus: a reply email field and Send message button appear. A hidden `contact` blueprint in the initial HTML allows Netlify form detection. Fields are `form-name`, `bot-field` (honeypot), `email`, and `message`. Only visitor-entered text is submitted; the animation is decorative.

On the canonical Netlify host, submissions use URL-encoded POST to `/` and show success only after an accepted response. Errors preserve the message. On other static hosts, a normal browser form POST goes to the Netlify thank-you URL. The static thank-you page provides a return link. No receiving email address is embedded in source.

Enable Forms detection, deploy, and configure Forms → Submission notifications → Email notification. The receiving address must be associated with an active Netlify team member. Test on the Netlify URL and verify Forms submissions and inbox delivery. If absent, check Spam submissions. Email delivery is managed by Netlify; a successful HTTP response is not proof of inbox delivery.

Official documentation: https://docs.netlify.com/manage/forms/setup/ and https://docs.netlify.com/manage/forms/notifications/

## Font matching

Matcha's stylesheet requests the 400 and 700 JetBrains Mono files, although its hero CSS specifies weight 800. The browser chooses the available 700 face for that request. This demo now maps weights 600–800 to the locally hosted 700 file so its heading no longer uses the heavier true 800 face. The CSS hero weight remains 800. This explains why matching computed family/weight alone previously produced a different result.

## Reference and behavior

Matcha's single-family typography and green/white/gray interface informed the design. This is an independent personal demo. The paired sprigs are supplied Matcha SVG references. GitHub icon geometry comes from MUI Icons (MIT). JetBrains Mono is licensed under SIL OFL 1.1; see `public/OFL.txt`.

Typing/deleting both use 55ms per character. Focus displays the custom message placeholder; blur resumes the animation when empty. Reduced-motion shows complete text. Experience starts hidden and opens/scrolls from the disclosure or topic links. Theme follows system settings until manually overridden. Mobile declarations follow Matcha's 640/1024px steps; rendered mobile comparison remains for the owner to perform.

Production revision: promoted the compact fixed-height contact form and wider experience paragraphs from the Sites experiment. Topic labels are 1–4 and React. Updated experience headings and frontend introduction per owner. Gmail symbol from Simple Icons 14.0.0 (CC0). Form button enables only when both the message and email are valid. The reply email stays inside the original input surface; focusing does not expand it.

## Code quality before deployment

Use a feature branch and pull request for changes. Before committing, run `npm run format`; review the diff, then run `npm run check`.

| Command                | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run format`       | Apply Prettier formatting locally                                        |
| `npm run format:check` | Check formatting without rewriting files                                 |
| `npm run lint`         | Check JavaScript/TypeScript and core React Hook rules                    |
| `npm run lint:fix`     | Apply ESLint's available safe automatic fixes; review the diff afterward |
| `npm run check`        | Verify formatting, lint, type-check and build                            |

The GitHub Actions workflow runs the same checks on pull requests to main and pushes to main. Pull requests never deploy through this workflow. A main build deploys to GitHub Pages only after checks pass. Netlify also runs `npm run check` before producing a deploy, so its separate build path verifies the same quality checks.

To prevent merging a failing PR or bypassing PR review, configure a GitHub branch ruleset for main requiring a pull request and the **Quality checks** status check. A workflow alone does not prevent direct pushes or merges. Repository instructions guide assistants but do not enforce repository permissions.

Prettier handles formatting; ESLint handles code-quality rules with conflicting formatting rules disabled. The initial React checks enforce rules-of-hooks and exhaustive-deps; this is not the entire React Compiler-oriented recommended preset. TypeScript's strict compiler check remains in the build. Type-aware linting and interaction tests can be added separately. Accessibility linting can be added when its plugins support the selected ESLint major version; keyboard and assistive-technology review remain necessary. Public assets and generated build files are excluded from formatting.
