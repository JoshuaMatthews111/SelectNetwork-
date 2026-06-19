-- ═══════════════════════════════════════════════════════════════════════════════
-- The Select Network Member Group — Announcements + Support Tables Migration
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── MEMBERS TABLE (if not exists) ───
CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY DEFAULT ('m-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive', 'disabled')),
  role TEXT DEFAULT 'investor' CHECK (role IN ('investor', 'builder', 'admin')),
  units INTEGER DEFAULT 0,
  invested_amount NUMERIC DEFAULT 0,
  joined_date TIMESTAMPTZ DEFAULT NOW(),
  labels TEXT[] DEFAULT '{}',
  location TEXT DEFAULT '',
  referral_source TEXT DEFAULT '',
  sponsor_id TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ANNOUNCEMENTS ───
CREATE TABLE IF NOT EXISTS announcements (
  id TEXT PRIMARY KEY DEFAULT ('ann-' || substr(md5(random()::text), 1, 8)),
  title TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  audience TEXT DEFAULT 'all' CHECK (audience IN ('all', 'investors', 'builders', 'foundation_partners', 'specific')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  attachment_url TEXT DEFAULT '',
  attachment_name TEXT DEFAULT '',
  created_by TEXT DEFAULT 'admin',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ANNOUNCEMENT READS (tracks which users have read which announcements) ───
CREATE TABLE IF NOT EXISTS announcement_reads (
  id TEXT PRIMARY KEY DEFAULT ('ar-' || substr(md5(random()::text), 1, 8)),
  announcement_id TEXT NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  member_id TEXT NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(announcement_id, member_id)
);

-- ─── SUPPORT TICKETS ───
CREATE TABLE IF NOT EXISTS support_tickets (
  id TEXT PRIMARY KEY DEFAULT ('tkt-' || substr(md5(random()::text), 1, 8)),
  member_id TEXT NOT NULL,
  member_name TEXT NOT NULL DEFAULT '',
  member_email TEXT DEFAULT '',
  member_role TEXT DEFAULT 'investor',
  subject TEXT NOT NULL DEFAULT 'General Support',
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'pending', 'resolved', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('normal', 'important', 'urgent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SUPPORT MESSAGES ───
CREATE TABLE IF NOT EXISTS support_messages (
  id TEXT PRIMARY KEY DEFAULT ('msg-' || substr(md5(random()::text), 1, 10)),
  ticket_id TEXT NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL DEFAULT '',
  sender_role TEXT DEFAULT 'member' CHECK (sender_role IN ('member', 'admin')),
  message TEXT NOT NULL DEFAULT '',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── RLS ───
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Public policies (service role key bypasses these anyway)
CREATE POLICY "Admin full access announcements" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reads" ON announcement_reads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access tickets" ON support_tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access messages" ON support_messages FOR ALL USING (true) WITH CHECK (true);

-- Updated at trigger for announcements
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
