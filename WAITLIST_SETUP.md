# Waitlist Setup Guide

## 1. Create Waitlist Table in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    source TEXT DEFAULT 'landing_page',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notified BOOLEAN DEFAULT FALSE
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for the landing page)
CREATE POLICY "Allow public inserts" ON public.waitlist
    FOR INSERT
    WITH CHECK (true);

-- Allow reading count (for displaying on landing page)
CREATE POLICY "Allow public read" ON public.waitlist
    FOR SELECT
    USING (true);
```

## 2. Deploy the Landing Page

### Option A: Simple Hosting (Netlify/Vercel)

1. Push the `landing-page` folder to GitHub
2. Connect to Netlify or Vercel
3. Deploy!

For the API endpoint, if using Vercel:
- The `api/waitlist.js` file will automatically become a serverless function

### Option B: Direct HTML Hosting

If you're just hosting the HTML file directly (without the API):
1. The form will still work - it saves emails to localStorage
2. You can manually collect emails later

### Option C: Use EmailJS (No Backend Needed)

Update the form submission in `coming-soon.html` to use EmailJS:

```javascript
// Add EmailJS script in <head>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

// In form submit handler:
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    email: email,
    to_email: "your-email@example.com"
});
```

## 3. File Structure

```
landing-page/
├── coming-soon.html    ← Main landing page
├── api/
│   └── waitlist.js     ← API endpoint for Vercel
├── assets/
│   └── logos/          ← Logo files
└── WAITLIST_SETUP.md   ← This file
```

## 4. Quick Deploy Commands

### Using Vercel CLI:
```bash
cd landing-page
vercel
```

### Using Netlify CLI:
```bash
cd landing-page
netlify deploy --prod
```

## 5. Customize

- Edit the waitlist counter starting number in `coming-soon.html`
- Update social media links
- Change the launch date (currently showing "Q1 2025")
- Update colors in CSS variables at the top of the file

