#!/bin/bash

# Quick deployment script for Flick Landing Page

echo "🔥 Flick Landing Page Deployment Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the landing-page directory."
    exit 1
fi

echo "✅ Files found!"
echo ""

# List available deployment options
echo "Select deployment option:"
echo "1) Open in browser (local preview)"
echo "2) Serve with Python HTTP server (for testing)"
echo "3) Deploy to Netlify"
echo "4) Deploy to Vercel"
echo "5) Just show file structure"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "Opening in browser..."
        open index.html
        ;;
    2)
        echo "Starting Python HTTP server..."
        echo "Server running at http://localhost:8000"
        echo "Press Ctrl+C to stop"
        python3 -m http.server 8000
        ;;
    3)
        echo "📦 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
        else
            echo "❌ Netlify CLI not found. Install with: npm install -g netlify-cli"
            echo "Or upload manually at: https://app.netlify.com/drop"
        fi
        ;;
    4)
        echo "📦 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI not found. Install with: npm install -g vercel"
        fi
        ;;
    5)
        echo "📁 File Structure:"
        ls -lh
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

echo ""
echo "✅ Done!"


