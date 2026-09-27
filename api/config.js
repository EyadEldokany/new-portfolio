// Vercel Serverless Function
// Reads the Firebase client config from Vercel's Environment Variables
// (set in your Vercel Project → Settings → Environment Variables)
// and hands it to the static index.html page at runtime.
//
// Note: none of these values are secret. Firebase's client config (apiKey
// included) is meant to be public — access is controlled by your Firestore
// and Authentication security rules, not by hiding this object. Serving it
// from env vars here just means you can swap Firebase projects without
// editing index.html.
//
// This file MUST live at:  /api/config.js
// (relative to your project root, same level as index.html)
//
// Vercel auto-detects any file inside /api as a serverless function —
// no framework or build step required.

export default function handler(req, res) {
  // Cache at the edge for 5 minutes; these values rarely change
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  const apiKey = process.env.FIREBASE_API_KEY;
  const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.FIREBASE_APP_ID;

  if (!apiKey || !projectId) {
    res.status(500).json({
      error: 'Missing FIREBASE_API_KEY or FIREBASE_PROJECT_ID environment variables on Vercel.'
    });
    return;
  }

  res.status(200).json({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  });
}
