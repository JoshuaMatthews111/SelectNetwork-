import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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
    .from('members')
    .select('*')
    .order('joined_date', { ascending: false });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  const { data, error } = await supabase
    .from('members')
    .insert([{
      name: body.name,
      email: body.email,
      phone: body.phone,
      status: 'active',
      role: body.role || 'investor',
      units: body.units || 0,
      invested_amount: body.invested_amount || 0,
      joined_date: new Date().toISOString(),
      location: body.location,
      referral_source: body.referral_source
    }])
    .select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();
  
  const { data, error } = await supabase
    .from('members')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
