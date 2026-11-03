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

Import this GitHub repository in Netlify. Select `main`, build command `npm run build`, publish directory `dist`. `netlify.toml` already supplies build settings. Netlify uses the root base path. Once the final Netlify URL is chosen, update the canonical/Open Graph/social URLs in `index.html` to that origin.

## Contact form: next step

The animated field is currently a demo, not a submission form. It never sends messages. Email me opens the visitor's email app.

After deployment, enable Netlify Forms detection and add a form named `contact` to both the React UI and the initial static HTML. The static hidden blueprint must contain matching fields: `form-name`, `email`, `message`, and a honeypot. Give the visible textarea `name="message"`, add a labeled reply email field and Send message button. POST URL-encoded data to `/` with `form-name=contact`; show success only after an accepted response, preserve input on failure. Keep typewriter text as a decorative overlay rather than submitted content.

Redeploy, then open Forms → Submission notifications → Add notification → Email notification and enter JHJonathanHammond@gmail.com. Test a real message on the Netlify URL, verify it in Forms and in the inbox, and check Spam submissions if absent. Notifications deliver copies to the owner; visitors should see an on-page confirmation, not a redirect to an email address. Netlify processing is unavailable on GitHub Pages and the separate Sites deployment.

Official documentation: https://docs.netlify.com/manage/forms/setup/ and https://docs.netlify.com/manage/forms/notifications/

## Reference and behavior

Matcha's single-family typography and green/white/gray interface informed the design. This is an independent personal demo. The paired sprigs are supplied Matcha SVG references. GitHub icon geometry comes from MUI Icons (MIT). JetBrains Mono is licensed under SIL OFL 1.1; see `public/OFL.txt`.

Typing/deleting both use 55ms per character. Focus displays the custom message placeholder; blur resumes the animation when empty. Reduced-motion shows complete text. Experience starts hidden and opens/scrolls from the disclosure or topic links. Theme follows system settings until manually overridden. Mobile declarations follow Matcha's 640/1024px steps; rendered mobile comparison remains for the owner to perform.
