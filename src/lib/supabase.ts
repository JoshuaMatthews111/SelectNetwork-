import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Types for database tables
export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'pending' | 'inactive';
  role: 'investor' | 'builder' | 'investor+builder' | 'admin';
  units: number;
  invested_amount: number;
  joined_date: string;
  labels?: string[];
  location?: string;
  referral_source?: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interest_amount: number;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  notes?: string;
}

export interface Prospect {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  interest_amount?: number;
  source: string;
  status: 'hot' | 'warm' | 'cold' | 'new';
  last_contact: string;
  notes: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  member_id: string;
  type: string;
  title: string;
  issued_date: string;
  status: 'issued' | 'pending' | 'draft';
}

export interface Payment {
  id: string;
  member_id: string;
  amount: number;
  type: 'investment' | 'distribution' | 'incentive';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  processor?: string;
}

// Client-side Supabase client (for use in components)
export const createBrowserClient = () => {
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });
};

// Server-side Supabase client (for use in API routes/server components)
export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Singleton browser client for use in "use client" components
let browserClientInstance: ReturnType<typeof createClientComponentClient> | null = null;

export const getSupabaseBrowser = () => {
  if (!browserClientInstance) {
    browserClientInstance = createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    });
  }
  return browserClientInstance;
};
