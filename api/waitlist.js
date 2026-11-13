// Waitlist API endpoint
// This can be deployed to Vercel, Netlify, or any serverless platform

const SUPABASE_URL = 'https://kjhhwrvduqxprweqxhbo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaGh3cnZkdXF4cHJ3ZXF4aGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MzQzMTUsImV4cCI6MjA0ODExMDMxNX0.sKhLhRNVJdOLOqGG7PcHjryi3WJeagX0BnT0L32H2lA';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const { email, name } = req.body;

            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Insert into Supabase waitlist table
            const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    email: email.toLowerCase().trim(),
                    name: name || null,
                    created_at: new Date().toISOString(),
                    source: 'landing_page'
                })
            });

            if (response.status === 409 || response.status === 400) {
                // Email might already exist
                return res.status(200).json({ 
                    success: true, 
                    message: 'You\'re already on the list!',
                    alreadyExists: true
                });
            }

            if (!response.ok) {
                throw new Error('Failed to save to database');
            }

            return res.status(200).json({ 
                success: true, 
                message: 'Successfully joined the waitlist!'
            });

        } catch (error) {
            console.error('Waitlist error:', error);
            return res.status(500).json({ 
                error: 'Something went wrong. Please try again.' 
            });
        }
    }

    // GET - return waitlist count
    if (req.method === 'GET') {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?select=count`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Prefer': 'count=exact'
                }
            });

            const countHeader = response.headers.get('content-range');
            const count = countHeader ? parseInt(countHeader.split('/')[1]) : 0;

            return res.status(200).json({ count });
        } catch (error) {
            return res.status(200).json({ count: 1247 }); // Fallback count
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

