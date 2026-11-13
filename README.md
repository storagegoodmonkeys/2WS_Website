# 2W Studio — site (rebranded from the Flick/Good Monkeys landing site)

Static site + serverless functions. Rebranded to **2W Studio** on 2026-11-13.
Legal entity is unchanged: footers read "2W Studio — a brand of Good Monkeys L.L.C-FZ".

## What this is
- `index.html` / `about.html` — marketing pages (video background, cream/ink/·#ff6b35 accent)
- `verify.html` — the **Flick app** email-verification deep-link page (`flickapp://auth`). App infrastructure — see WARNING below.
- `styles.css`, `script.js`, `mobile-menu-update.css` — front-end
- `api/*.js` — Vercel serverless functions (waitlist + contact), talk to Supabase
- `supabase/` — edge function + SQL for the contact-email flow (Resend)
- `assets/` — video, images, and the new 2W Studio SVG marks

## Deploy
Static host (Cloudflare Pages / Netlify / Vercel). No build step, no package.json.
Cloudflare Pages: Workers & Pages → Create → Pages → upload this folder → add custom domain `www.2wstudio.com`.
Note: `api/*.js` are Vercel serverless functions — they run on Vercel, NOT on Cloudflare Pages static hosting. If you move off Vercel, the waitlist/contact endpoints need porting (e.g. to a Cloudflare Worker).

## What still points at the old backend / brand — DECIDE BEFORE LAUNCH
- The Supabase projects referenced in `api/*.js` and `verify.html` are the ORIGINAL ones. The keys are public `anon` keys (safe to ship) but the projects are still the old account's. Confirm they're yours to keep using.
- `assets/og-image.jpg` is the old Good-Monkeys-branded social preview image — still shows the old brand. Replace it.
- Image filenames under `assets/images/` still read `good-monkeys-*.jpg` (not user-visible; left as-is).
- Social links now point to instagram.com/2wstudio and x.com/2wstudio — create those or change them.
- The 2W Studio wordmark/monogram in `assets/*.svg` are typographic STAND-INS. Replace with real logo artwork when you have it.

## WARNING — verify.html is live app plumbing
`verify.html` handles Flick's email confirmation (`flickapp://auth?...`). If the Flick app sends verification emails whose links point at goodmonkeys.com/verify.html, changing the domain WILL break confirmation for real users unless the app's email templates / Supabase redirect URLs are updated to the new domain in lockstep. Do not move this page's domain casually.
