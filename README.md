# The Select Network Member Group - Private Investors Platform

A premium private investor platform for The Select Network Member Group.

## Domain
**Production:** https://tsnpiggybank.com

## Tech Stack
- Next.js 15
- React 18
- TypeScript
- Supabase (Auth + Database + Storage)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (server-side only)

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── admin/             # Admin portal
│   ├── login/             # Login page
│   ├── investor/          # Investor portal
│   ├── investor-builder/  # Investor-Builder portal
│   ├── builder/           # Builder portal
│   ├── reports/           # Investment reports
│   ├── invest-now/        # Investment flow
│   ├── contact/           # Contact page
│   └── api/               # API routes
├── lib/
│   └── supabase.ts        # Supabase clients
├── components/            # Shared components
└── types/                 # TypeScript types
```

## Database Schema
See `supabase-schema.sql` for the complete database schema.

Key tables:
- `members` - Platform members
- `applications` - Member request records
- `prospects` - CRM prospects
- `payments` - Payment records
- `certificates` - Member certificates
- `referrals` - Referral network

## Deployment
This project is configured for Vercel deployment. Push to main branch to trigger automatic deployment.

## Contact
For support: Selectprofits@gmail.com
