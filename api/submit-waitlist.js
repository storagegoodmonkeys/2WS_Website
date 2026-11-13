// API endpoint to handle waitlist submissions
// This can be deployed as a serverless function on Vercel, Netlify, or similar

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Option 1: Store in a database (examples below)
        
        // Option 2: Send to email service (e.g., SendGrid, Mailchimp)
        
        // Option 3: Save to Google Sheets
        await addToGoogleSheets(name, email, phone);
        
        // Option 4: Save to a file (for simple deployments)
        // await saveToFile(name, email, phone);
        
        // Return success
        return res.status(200).json({ 
            success: true, 
            message: 'Successfully added to waitlist!' 
        });
        
    } catch (error) {
        console.error('Error processing waitlist signup:', error);
        return res.status(500).json({ 
            error: 'Failed to process signup. Please try again.' 
        });
    }
}

// Google Sheets integration example
async function addToGoogleSheets(name, email, phone) {
    // This requires Google Sheets API setup
    // See: https://developers.google.com/sheets/api/quickstart/nodejs
    
    /*
    const { google } = require('googleapis');
    const auth = new google.auth.GoogleAuth({
        keyFile: 'path/to/service-account-key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    
    await sheets.spreadsheets.values.append({
        spreadsheetId: 'YOUR_SHEET_ID',
        range: 'Waitlist!A:C',
        valueInputOption: 'RAW',
        resource: {
            values: [[name, email, phone || '']],
        },
    });
    */
}

// Save to file example (for simple server deployments)
async function saveToFile(name, email, phone) {
    const fs = require('fs').promises;
    const path = require('path');
    
    const entry = {
        name,
        email,
        phone: phone || '',
        timestamp: new Date().toISOString(),
    };
    
    const filePath = path.join(process.cwd(), 'waitlist.json');
    
    // Read existing data
    let data = [];
    try {
        const existing = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(existing);
    } catch (error) {
        // File doesn't exist yet
    }
    
    // Add new entry
    data.push(entry);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}


