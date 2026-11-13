# 2W Studio — website

Static site + serverless functions. No build step, no package.json.
Deployed on Vercel; DNS on Cloudflare.

## Structure
- `index.html` / `about.html` — marketing pages
- `verify.html` — the **Flick app** email-verification deep-link page (`flickapp://auth`). App infrastructure, not marketing — see WARNING below.
- `styles.css`, `script.js`, `mobile-menu-update.css` — front-end
- `api/*.js` — Vercel serverless functions (waitlist + contact) → Supabase
- `supabase/` — edge function + SQL for the contact-email flow (via Resend)
- `assets/` — video, images, 2W Studio SVG marks

## Deploy
Vercel: import the repo, Framework Preset **Other**, leave Build Command / Output Directory empty.
`api/*.js` are Vercel functions — they do NOT run on Cloudflare Pages static hosting.
No environment variables are required by the site itself.

## IMPORTANT — the email function is deployed separately
`supabase/functions/send-contact-email/index.ts` runs on **Supabase**, not Vercel.
Editing it in this repo changes nothing until you redeploy it to Supabase.
It reads `RESEND_API_KEY` from Supabase's secret store — never put the key in a file.

## IMPORTANT — Resend domain verification
The contact notification now sends from `noreply@2wstudio.com` to `info@2wstudio.com`.
Resend will refuse to send until **2wstudio.com is verified in Resend** and its DNS
records are added in Cloudflare. Until that is done, submissions still save to the
database but no notification email is delivered.

## WARNING — verify.html is live app plumbing
This page handles Flick's email confirmation. If the app's verification emails link to
the legacy domain (goodmonkeys.com/verify.html), those links keep working only while
that domain is under your control. Update the Flick app's Supabase redirect URL and
email templates to the 2wstudio.com address before the legacy domain changes hands.

## Still to replace
- `assets/og-image.jpg` — social preview image still carries the old branding
- `assets/*.svg` — the 2W Studio wordmark/monogram are typographic STAND-INS, not final artwork
- `assets/images/*.jpg` — some filenames retain legacy naming (not user-visible)
- Social links point to instagram.com/2wstudio and x.com/2wstudio — create or change them
