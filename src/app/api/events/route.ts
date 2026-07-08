import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const EVENT_MARKER = 'event';

function eventMessage(body: Record<string, string>) {
  return [
    body.description || '',
    `Date: ${body.date || ''}`,
    `Time: ${body.time || ''}`,
    `Type: ${body.type || ''}`,
    `Participant: ${body.name || ''}`,
    `Email: ${body.email || ''}`,
    `Phone: ${body.phone || ''}`,
    `Link: ${body.zoom || ''}`,
    `Notes: ${body.notes || ''}`,
  ].filter(Boolean).join('\n');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role');

  let query = supabase
    .from('announcements')
    .select('*')
    .eq('status', 'published')
    .eq('attachment_name', EVENT_MARKER)
    .order('published_at', { ascending: false });

  if (role === 'investor') {
    query = query.in('audience', ['all', 'investors']);
  } else if (role === 'builder') {
    query = query.in('audience', ['all', 'investors', 'builders']);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from('announcements')
    .insert([{
      title: body.title || body.name || 'Member Event',
      message: eventMessage(body),
      audience: body.audience || 'all',
      priority: body.priority || 'normal',
      status: 'published',
      created_by: 'admin',
      published_at: new Date().toISOString(),
      attachment_name: EVENT_MARKER,
      attachment_url: body.zoom || '',
    }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
