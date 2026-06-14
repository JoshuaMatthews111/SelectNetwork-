import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// GET — fetch tickets + messages
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticket_id');
  const memberId = searchParams.get('member_id');

  // If ticket_id provided, return that ticket's messages
  if (ticketId) {
    const { data: messages, error } = await supabase
      .from('support_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ messages: messages || [] });
  }

  // If member_id provided, return that member's tickets
  if (memberId) {
    const { data: tickets, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('member_id', memberId)
      .order('updated_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ tickets: tickets || [] });
  }

  // Admin: return all tickets
  const { data: tickets, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tickets: tickets || [] });
}

// POST — create ticket or send message
export async function POST(req: NextRequest) {
  const body = await req.json();

  // Create new ticket
  if (body.action === 'create_ticket') {
    const { data: ticket, error: ticketErr } = await supabase
      .from('support_tickets')
      .insert([{
        member_id: body.member_id,
        member_name: body.member_name || '',
        member_email: body.member_email || '',
        member_role: body.member_role || 'investor',
        subject: body.subject || 'General Support',
        status: 'open',
        priority: body.priority || 'normal',
      }])
      .select();
    if (ticketErr) return NextResponse.json({ error: ticketErr.message }, { status: 500 });

    // Also add first message if provided
    if (body.message && ticket?.[0]) {
      await supabase.from('support_messages').insert([{
        ticket_id: ticket[0].id,
        sender_id: body.member_id,
        sender_name: body.member_name || '',
        sender_role: 'member',
        message: body.message,
      }]);
    }

    return NextResponse.json(ticket);
  }

  // Send message on existing ticket
  if (body.action === 'send_message') {
    const { data, error } = await supabase
      .from('support_messages')
      .insert([{
        ticket_id: body.ticket_id,
        sender_id: body.sender_id,
        sender_name: body.sender_name || '',
        sender_role: body.sender_role || 'member',
        message: body.message,
      }])
      .select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Update ticket updated_at
    await supabase.from('support_tickets').update({ updated_at: new Date().toISOString() }).eq('id', body.ticket_id);

    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// PATCH — update ticket status/priority
export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { data, error } = await supabase
    .from('support_tickets')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
