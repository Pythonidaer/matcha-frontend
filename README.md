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
