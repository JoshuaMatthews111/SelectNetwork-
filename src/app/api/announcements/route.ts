import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// GET — fetch announcements (optionally filter by status/audience)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const audience = searchParams.get('audience');
  const role = searchParams.get('role'); // investor | builder — for user dashboard filtering
  const includeEvents = searchParams.get('include_events') === 'true';

  let query = supabase.from('announcements').select('*').order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (audience) query = query.eq('audience', audience);
  if (!includeEvents) query = query.or('attachment_name.is.null,attachment_name.neq.event');

  // For user dashboards: show published only, filter by audience matching their role
  if (role) {
    query = query.eq('status', 'published');
    if (role === 'investor') {
      query = query.in('audience', ['all', 'investors']);
    } else if (role === 'builder') {
      query = query.in('audience', ['all', 'investors', 'builders']);
    }
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

// POST — create announcement
export async function POST(req: NextRequest) {
  const body = await req.json();

  const record: Record<string, unknown> = {
    title: body.title,
    message: body.message || '',
    audience: body.audience || 'all',
    priority: body.priority || 'normal',
    status: body.status || 'draft',
    created_by: body.created_by || 'admin',
    attachment_url: body.attachment_url || '',
    attachment_name: body.attachment_name || '',
  };

  if (body.status === 'published') {
    record.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase.from('announcements').insert([record]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PATCH — update announcement (edit, publish, archive)
export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  if (updates.status === 'published' && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase.from('announcements').update(updates).eq('id', id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE — delete announcement
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
