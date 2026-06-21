// Vercel Serverless Function
// Reads the Supabase credentials from Vercel's Environment Variables
// (set in your Vercel Project → Settings → Environment Variables)
// and hands them to the static portfolio.html page at runtime.
//
// This file MUST live at:  /api/config.js
// (relative to your project root, same level as portfolio.html)
//
// Vercel auto-detects any file inside /api as a serverless function —
// no framework or build step required.

export default function handler(req, res) {
  // Cache at the edge for 5 minutes; these values rarely change
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    res.status(500).json({
      error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables on Vercel.'
    });
    return;
  }

  res.status(200).json({ url, anonKey });
}
