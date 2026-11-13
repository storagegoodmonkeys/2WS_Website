// Contact form endpoint -> stores submissions in Supabase (contact_messages table).
// Uses the same public anon key as the waitlist function.
const SUPABASE_URL = 'https://xkxskiilahsnnuvtmhzp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_cQV3fJVnRX7fo8IM1iRzqw_QPyyQ-cT';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

    try {
        const { name, email, phone, message } = req.body || {};
        if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

        const r = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ name, email, phone: phone || null, message: message || '' })
        });
        if (!r.ok) {
            const t = await r.text();
            console.error('Supabase insert failed:', r.status, t);
            return res.status(500).json({ error: 'Failed to store message' });
        }
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error('contact error', e);
        return res.status(500).json({ error: 'Server error' });
    }
}
