import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const MEMBER_REQUESTS_TABLE = 'applications';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET() {
  const { data, error } = await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .insert([{
      name: body.name,
      email: body.email,
      phone: body.phone,
      interest_amount: body.interest_amount,
      status: 'pending',
      submitted_at: new Date().toISOString(),
      notes: body.notes || ''
    }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
