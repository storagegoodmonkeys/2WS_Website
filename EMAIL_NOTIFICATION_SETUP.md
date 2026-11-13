# Email Notification Setup Guide

This guide will help you set up automatic email notifications when someone submits the contact form.

## Step 1: Add Resend API Key to Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Edge Functions**
4. Click **Add new secret**
5. Add:
   - Name: `RESEND_API_KEY`
   - Value: `<YOUR_RESEND_API_KEY>`

## Step 2: Verify Your Domain in Resend (Important!)

For emails to work, you need to verify your domain in Resend:

1. Go to https://resend.com/domains
2. Click **Add Domain**
3. Enter: `2wstudio.com`
4. Add the DNS records they provide to your domain
5. Wait for verification (usually 5-10 minutes)

**OR** for testing, use Resend's default sender:
- Change the "from" email in the function to: `onboarding@resend.dev`

## Step 3: Deploy the Edge Function

Run this command in your terminal:

```bash
cd /Users/tayyab/.cursor/worktrees/flick/nre/landing-page
supabase login
supabase link --project-ref kjhhwrvduqxprweqxhbo
supabase functions deploy send-contact-email
```

## Step 4: Create Database Trigger

Go to Supabase Dashboard → SQL Editor and run this:

```sql
-- Create the trigger function
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://kjhhwrvduqxprweqxhbo.supabase.co/functions/v1/send-contact-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_new_contact ON public.waitlist;
CREATE TRIGGER on_new_contact
  AFTER INSERT ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();
```

## Alternative: Simpler Webhook Approach

If the above is complex, use Supabase Database Webhooks:

1. Go to **Database** → **Webhooks**
2. Click **Create a new webhook**
3. Settings:
   - Name: `send-contact-email`
   - Table: `waitlist`
   - Events: `INSERT`
   - Type: `Supabase Edge Function`
   - Function: `send-contact-email`
4. Click **Create webhook**

## Testing

1. Submit a test contact form on your website
2. Check your email at info@2wstudio.com
3. If no email, check:
   - Supabase Edge Function logs
   - Resend dashboard for delivery status

## Troubleshooting

- **Email not sending**: Check if domain is verified in Resend
- **Function error**: Check Edge Function logs in Supabase Dashboard
- **No trigger firing**: Verify the webhook/trigger is set up correctly

