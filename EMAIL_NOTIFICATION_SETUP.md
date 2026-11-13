# Contact form — email notifications

The contact form on `index.html` posts to `/api/contact` (a Vercel function),
which inserts a row into the Supabase table `contact_messages`.
Saving the message and emailing a notification are two SEPARATE layers.
Get the save working first.

## Layer 1 — saving the message (required)

1. Create a Supabase project under a **company-owned** account.
2. SQL Editor → run `supabase/new-project-setup.sql` once.
3. Settings → API → copy the **Project URL** and the **anon public** key.
4. Edit `api/contact.js` lines 3–4 with those two values. Commit; Vercel redeploys.
5. Submit the form on the live site and confirm a row appears in
   Table Editor → `contact_messages`.

Stop here until that works.

## Layer 2 — the notification email (optional)

Requires a Resend account you control.

1. **Resend → Domains → Add Domain** → `2wstudio.com`. Add the three DNS records
   it gives you in Cloudflare, all **DNS only**:
   - MX on name `send` (NOT the root — the root MX belongs to Google Workspace)
   - TXT on name `send`  → `v=spf1 include:amazonses.com ~all`
   - TXT on name `resend._domainkey` → the key Resend shows
   Do NOT enable Resend's inbound/receiving option: that would conflict with Workspace mail.
2. **Supabase → Settings → Edge Functions → Add new secret**
   Name `RESEND_API_KEY`, value = your key. Never put the key in a file.
3. **Supabase → Edge Functions** → deploy `send-contact-email`
   (the Dashboard has a browser editor; the CLI is not required).
   It sends from `noreply@2wstudio.com` to `info@2wstudio.com`.
4. **Supabase → Database → Webhooks → Create a new webhook**
   - Table: **`contact_messages`**  ← the table the form actually writes to
   - Events: INSERT
   - Type: Supabase Edge Function → `send-contact-email`

## Troubleshooting

Check all three, in order — each failure looks identical from outside:

| Where | What it tells you |
|---|---|
| Supabase → Table Editor | Did the row save? (Vercel function + database) |
| Supabase → Edge Functions → Logs | Did the function fire, and did it error? |
| Resend → Emails | Did Resend accept it, and was it delivered? |

Most common cause of silence: the sending domain is not verified in Resend.
