import { createClient } from '@supabase/supabase-js';

// Types for database tables
export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'pending' | 'inactive';
  role: 'investor' | 'builder' | 'admin';
  units: number;
  invested_amount: number;
  joined_date: string;
  labels?: string[];
  location?: string;
  referral_source?: string;
  sponsor_id?: string;
  avatar_url?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: 'all' | 'investors' | 'builders' | 'foundation_partners' | 'specific';
  priority: 'normal' | 'urgent';
  status: 'draft' | 'published' | 'archived';
  attachment_url?: string;
  attachment_name?: string;
  created_by: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  member_id: string;
  member_name: string;
  member_email: string;
  member_role: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'normal' | 'important' | 'urgent';
  created_at: string;
  updated_at: string;
}

export interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'member' | 'admin';
  message: string;
  read: boolean;
  created_at: string;
}

export interface MemberRequest {
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

// Client-side Supabase client singleton
let browserClient: ReturnType<typeof createClient> | null = null;

export const getSupabaseBrowser = () => {
  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        },
      }
    );
  }
  return browserClient;
};

// Server-side Supabase client (for use in API routes only)
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
