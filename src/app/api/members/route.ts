import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('joined_date', { ascending: false });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
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
  const supabase = createRouteHandlerClient({ cookies });
  const { id, ...updates } = await req.json();
  
  const { data, error } = await supabase
    .from('members')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
