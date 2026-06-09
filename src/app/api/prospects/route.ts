import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase
    .from('prospects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();
  
  const { data, error } = await supabase
    .from('prospects')
    .insert([{
      name: body.name,
      phone: body.phone,
      email: body.email,
      interest_amount: body.interest_amount,
      source: body.source,
      status: body.status || 'new',
      last_contact: new Date().toISOString(),
      notes: body.notes || '',
      created_at: new Date().toISOString()
    }])
    .select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { id, notes, status } = await req.json();
  
  const updates: any = { last_contact: new Date().toISOString() };
  if (notes !== undefined) updates.notes = notes;
  if (status !== undefined) updates.status = status;
  
  const { data, error } = await supabase
    .from('prospects')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
