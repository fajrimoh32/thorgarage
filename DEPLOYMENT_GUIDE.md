# THOR GARAGE - Supabase + Vercel Setup Guide

## 1. Create Supabase project
1. Open https://supabase.com
2. Create a new project
3. Copy the project URL and anon key
4. Save them as environment variables in Vercel

## 2. Apply database schema
1. Open Supabase SQL editor
2. Paste the contents of `supabase/schema.sql`
3. Run the query

## 3. Vercel environment variables
Set these inside Vercel project settings > Environment Variables:

- `VITE_SUPABASE_URL` = your-project-url
- `VITE_SUPABASE_ANON_KEY` = your-anon-key
- `VITE_FIREBASE_API_KEY` = optional
- `VITE_FIREBASE_AUTH_DOMAIN` = optional
- `VITE_FIREBASE_PROJECT_ID` = optional
- `VITE_FIREBASE_STORAGE_BUCKET` = optional
- `VITE_FIREBASE_MESSAGING_SENDER_ID` = optional
- `VITE_FIREBASE_APP_ID` = optional

## 4. Deploy to Vercel
1. Push project to GitHub
2. Import repo in Vercel
3. Select framework: Vite
4. Use default build command: `npm run build`
5. Use output directory: `dist`
6. Add env variables above
7. Deploy

## 5. Post-deploy notes
- The app will load in demo mode without env variables.
- Once Supabase is configured, the app can read and write live data from the database.
- For full auth integration, connect the app to Supabase Auth and keep role values as `owner` or `admin`.

## 6. Recommended role model
- Owner: full access
- Admin: dashboard, queue, customers, inventory, transactions, payments, reports, admin panel

This project intentionally removes the kasir role as requested.
