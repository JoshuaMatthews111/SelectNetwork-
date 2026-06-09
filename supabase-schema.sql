-- ═══════════════════════════════════════════════════════════════════════════════
-- TTRG Supabase Schema — Full Database Setup
-- Run this in Supabase SQL Editor or via CLI
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── DOGS TABLE ───
CREATE TABLE IF NOT EXISTS dogs (
  id TEXT PRIMARY KEY DEFAULT ('dog-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL DEFAULT '',
  age TEXT DEFAULT '',
  breed TEXT DEFAULT '',
  gender TEXT DEFAULT 'Male',
  weight TEXT DEFAULT '',
  price NUMERIC DEFAULT 35,
  story TEXT DEFAULT '',
  full_story TEXT DEFAULT '',
  image TEXT DEFAULT '',
  gallery JSONB DEFAULT '[]'::jsonb,
  urgent BOOLEAN DEFAULT false,
  stage TEXT DEFAULT 'rescue' CHECK (stage IN ('rescue', 'rehabilitate', 'train', 'recover', 'rehome')),
  stage_color TEXT DEFAULT 'bg-red-500',
  medical_needs TEXT DEFAULT '',
  training_needs TEXT DEFAULT '',
  behavior_notes TEXT DEFAULT '',
  special_needs TEXT DEFAULT '',
  location TEXT DEFAULT 'Cleveland, OH',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'hidden', 'adopted', 'urgent', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  created_by TEXT DEFAULT 'Admin',
  -- Extended journey fields
  rescue_date TEXT DEFAULT '',
  days_in_rescue INTEGER DEFAULT 0,
  current_journey_stage TEXT DEFAULT 'rescue',
  journey_dates JSONB DEFAULT '{}'::jsonb,
  progress_percent INTEGER DEFAULT 0,
  current_stage_label TEXT DEFAULT '',
  status_badges JSONB DEFAULT '[]'::jsonb,
  milestones JSONB DEFAULT '[]'::jsonb,
  current_needs JSONB DEFAULT '[]'::jsonb,
  care_team TEXT DEFAULT '',
  last_update TEXT DEFAULT '',
  admin_note TEXT DEFAULT '',
  sponsor_status TEXT DEFAULT 'none' CHECK (sponsor_status IN ('none', 'partial', 'full'))
);

-- ─── USERS TABLE ───
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY DEFAULT ('u-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  role TEXT DEFAULT 'trainer' CHECK (role IN ('super_admin', 'admin', 'trainer', 'org_partner')),
  status TEXT DEFAULT 'active' CHECK (status IN ('invited', 'active', 'disabled')),
  avatar_url TEXT DEFAULT '',
  date_invited TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  assigned_dogs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SUBMISSIONS (dog rescue intake forms) ───
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY DEFAULT ('TTRG-' || upper(substr(md5(random()::text), 1, 6))),
  dog_name TEXT NOT NULL,
  breed TEXT DEFAULT '',
  age TEXT DEFAULT '',
  gender TEXT DEFAULT '',
  weight TEXT DEFAULT '',
  location TEXT DEFAULT '',
  story TEXT DEFAULT '',
  reason_for_submission TEXT DEFAULT '',
  medical_needs TEXT DEFAULT '',
  training_needs TEXT DEFAULT '',
  behavior_notes TEXT DEFAULT '',
  urgency TEXT DEFAULT 'Standard',
  submitter_name TEXT DEFAULT '',
  submitter_email TEXT DEFAULT '',
  submitter_phone TEXT DEFAULT '',
  submitter_type TEXT DEFAULT '',
  organization TEXT DEFAULT '',
  living_situation TEXT DEFAULT '',
  video_link TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'more_info')),
  date TIMESTAMPTZ DEFAULT NOW(),
  action_by TEXT DEFAULT '',
  consent BOOLEAN DEFAULT false
);

-- ─── CONTACT MESSAGES ───
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY DEFAULT ('msg-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT DEFAULT '',
  date TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);

-- ─── FOSTER APPLICATIONS ───
CREATE TABLE IF NOT EXISTS foster_applications (
  id TEXT PRIMARY KEY DEFAULT ('foster-' || substr(md5(random()::text), 1, 8)),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  city_state TEXT DEFAULT '',
  housing_type TEXT DEFAULT '',
  rent_or_own TEXT DEFAULT '',
  current_pets TEXT DEFAULT '',
  dog_experience TEXT DEFAULT '',
  children_in_home TEXT DEFAULT '',
  preferred_size TEXT DEFAULT '',
  availability TEXT DEFAULT '',
  reason TEXT DEFAULT '',
  consent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  date TIMESTAMPTZ DEFAULT NOW(),
  action_by TEXT DEFAULT ''
);

-- ─── SPONSOR INTERESTS ───
CREATE TABLE IF NOT EXISTS sponsor_interests (
  id TEXT PRIMARY KEY DEFAULT ('sponsor-' || substr(md5(random()::text), 1, 8)),
  dog_id TEXT REFERENCES dogs(id) ON DELETE SET NULL,
  dog_name TEXT DEFAULT '',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  amount NUMERIC DEFAULT 0,
  frequency TEXT DEFAULT 'monthly',
  date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'active', 'closed'))
);

-- ─── TICKER ITEMS ───
CREATE TABLE IF NOT EXISTS ticker_items (
  id TEXT PRIMARY KEY DEFAULT ('t-' || substr(md5(random()::text), 1, 8)),
  text TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT DEFAULT 'manual' CHECK (type IN ('manual', 'auto'))
);

-- ─── DONATIONS ───
CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY DEFAULT ('don-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  frequency TEXT DEFAULT 'one-time' CHECK (frequency IN ('one-time', 'monthly')),
  dog_name TEXT DEFAULT '',
  date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'failed', 'pending')),
  last4 TEXT DEFAULT ''
);

-- ─── SITE SETTINGS (single row) ───
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_headlines JSONB DEFAULT '["Rescue.", "Train.", "Rehome.", "Repeat."]'::jsonb,
  hero_subtitles JSONB DEFAULT '[]'::jsonb,
  ticker_speed INTEGER DEFAULT 30,
  announcement_bar TEXT DEFAULT '',
  announcement_active BOOLEAN DEFAULT false,
  ticker_color JSONB DEFAULT '{"from": "#1e6b3a", "via": "#28a745", "to": "#1e6b3a"}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AUDIT LOGS ───
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY DEFAULT ('log-' || substr(md5(random()::text), 1, 10)),
  user_name TEXT DEFAULT '',
  user_role TEXT DEFAULT '',
  action TEXT NOT NULL,
  entity_type TEXT DEFAULT '',
  entity_id TEXT DEFAULT '',
  entity_name TEXT DEFAULT '',
  details JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- ─── MEDIA LIBRARY (for uploaded images/videos) ───
CREATE TABLE IF NOT EXISTS media_library (
  id TEXT PRIMARY KEY DEFAULT ('media-' || substr(md5(random()::text), 1, 8)),
  url TEXT NOT NULL,
  filename TEXT DEFAULT '',
  alt TEXT DEFAULT '',
  type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video', 'document')),
  size_bytes INTEGER DEFAULT 0,
  uploaded_by TEXT DEFAULT '',
  bucket TEXT DEFAULT 'media',
  storage_path TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── INSERT DEFAULT SITE SETTINGS ROW ───
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ─── INSERT DEFAULT TICKER ITEMS ───
INSERT INTO ticker_items (id, text, active, type) VALUES
  ('t1', '🐾 3 Dogs Rescued This Week — Your Support Saves Lives', true, 'manual'),
  ('t2', '🐾 127 Dogs Successfully Trained, Rehabilitated & Rehomed', true, 'manual'),
  ('t3', '🐾 New Rescue Story Added — Follow Bailey''s Journey', true, 'manual'),
  ('t4', '🐾 Thank You To Our Amazing Donors & Foster Families', true, 'manual'),
  ('t5', '🐾 Emergency Foster Placements Helping Dogs in Critical Need', true, 'manual'),
  ('t6', '🐾 Every Adoption Opens Space for the Next Dog Waiting', true, 'manual')
ON CONFLICT (id) DO NOTHING;

-- ─── INSERT DEFAULT ADMIN USER (super_admin) ───
INSERT INTO admin_users (id, name, email, password_hash, role, status) VALUES
  ('u1', 'Lorenzo Miller', 'lorenzo@ttrg.org', 'ttrg', 'super_admin', 'active'),
  ('u2', 'Admin Staff', 'admin@ttrg.org', 'ttrg', 'admin', 'active'),
  ('u3', 'Jasmine Bland', 'jasmine@ttrg.org', 'ttrg', 'trainer', 'active'),
  ('u4', 'Daniel Bainbridge', 'daniel@ttrg.org', 'ttrg', 'trainer', 'active'),
  ('u5', 'Bailey Brown', 'bailey@ttrg.org', 'ttrg', 'trainer', 'active')
ON CONFLICT (id) DO NOTHING;

-- ─── INSERT SEED DOGS ───
INSERT INTO dogs (id, name, age, breed, gender, weight, price, story, full_story, image, gallery, urgent, stage, stage_color, medical_needs, training_needs, behavior_notes, special_needs, location, status, published_at, rescue_date, days_in_rescue, current_journey_stage, journey_dates, progress_percent, current_stage_label, status_badges, milestones, current_needs, care_team, last_update, admin_note, sponsor_status) VALUES
  ('bailey', 'Bailey', '2 yrs old', 'Mixed Breed', 'Female', '35 lbs', 35, 'Bailey was found scared and underweight, hiding under a porch during a thunderstorm. She''s slowly learning to trust again.', 'Bailey was discovered by a concerned neighbor, huddled under a porch during a severe thunderstorm...', 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80', '["https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80","https://images.unsplash.com/photo-1596854273338-cbf078ec7071?w=800&q=80","https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80"]', true, 'rehabilitate', 'bg-amber-500', 'Needs weight gain program, flea treatment completed, dental cleaning scheduled', 'Basic trust building, leash introduction, socialization with calm dogs', 'Fearful of loud noises, hand-shy, improving daily with consistent positive reinforcement', 'High-calorie diet for weight recovery, quiet environment preferred', 'Cleveland, OH', 'published', NOW(), 'Feb 10, 2025', 47, 'rehab', '{"rescue":"Feb 10, 2025","medical":"Feb 12, 2025","rehab":"Feb 15, 2025"}', 50, 'Rehabilitation In Progress', '["Urgent","Needs Medical Care"]', '[{"label":"First vet exam completed","date":"Feb 11","status":"completed"},{"label":"Started weight recovery plan","date":"Feb 13","status":"completed"},{"label":"Responding to basic training","date":"Feb 18","status":"completed"},{"label":"Confidence building in progress","status":"in_progress"},{"label":"Foster placement needed","status":"upcoming"},{"label":"Ready for adoption","status":"upcoming"}]', '[{"icon":"nutrition","label":"Nutrition & Supplements","detail":"$75 helps for 1 week"},{"icon":"vet","label":"Ongoing Vet Care","detail":"$100 supports medical needs"},{"icon":"training","label":"Training & Rehab","detail":"$150 supports her recovery"},{"icon":"foster","label":"Foster Home","detail":"Most needed next step","urgent":true}]', 'TTRG Rehabilitation Team', '2 days ago', 'Responding well to training. Building trust and social skills.', 'partial'),
  ('tucker', 'Tucker', '3 yrs old', 'Labrador Mix', 'Male', '55 lbs', 40, 'Tucker was surrendered when his family lost their home. He''s gentle but heartbroken, waiting for someone to love him again.', 'Tucker''s world fell apart when his family lost their home...', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', '["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80","https://images.unsplash.com/photo-1477884213360-7e9d7dcc8f9b?w=800&q=80","https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80"]', false, 'train', 'bg-emerald-500', 'Up to date on vaccinations, neutered, healthy', 'Leash manners, basic obedience refresher, confidence building', 'Separation anxiety improving, gentle with children, good with other dogs', 'Needs a home with a consistent daily routine', 'Cleveland, OH', 'published', NOW(), 'Mar 5, 2025', 23, 'rehab', '{"rescue":"Mar 5, 2025","medical":"Mar 7, 2025","rehab":"Mar 12, 2025"}', 50, 'In Training — Rehabilitation Phase', '["In Training"]', '[{"label":"Intake and vet exam completed","date":"Mar 6","status":"completed"},{"label":"Emotional assessment completed","date":"Mar 8","status":"completed"},{"label":"Leash training started","date":"Mar 14","status":"completed"},{"label":"Confidence building in progress","status":"in_progress"},{"label":"Foster placement search","status":"upcoming"},{"label":"Ready for adoption","status":"upcoming"}]', '[{"icon":"nutrition","label":"Nutrition & Supplements","detail":"$60 helps for 1 week"},{"icon":"vet","label":"Ongoing Vet Care","detail":"$80 supports medical needs"},{"icon":"training","label":"Training & Rehab","detail":"$150 supports his recovery"},{"icon":"foster","label":"Foster Home","detail":"Searching for foster family"}]', 'TTRG Training Team', '3 days ago', 'Tucker is responding well. Building trust and confidence daily.', 'full'),
  ('daisy', 'Daisy', '1 yr old', 'Pit Bull Mix', 'Female', '42 lbs', 30, 'Daisy was found chained in a backyard with no food or water. Despite everything, she still wags her tail at every person she meets.', 'Daisy was rescued from a neglect situation...', 'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=600&q=80', '["https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=800&q=80","https://images.unsplash.com/photo-1583337130417-13571fc377ad?w=800&q=80","https://images.unsplash.com/photo-1601758174114-e711c8c4b03f?w=800&q=80"]', false, 'recover', 'bg-blue-500', 'Weight gain program, skin treatment for irritation from chain, spay scheduled', 'Basic obedience, crate training, socialization', 'Extremely friendly, food-motivated, pulls on leash (improving)', 'Needs gradual introduction to indoor living', 'Cleveland, OH', 'published', NOW(), 'Feb 25, 2025', 31, 'medical', '{"rescue":"Feb 25, 2025","medical":"Feb 27, 2025"}', 33, 'Recovering — Medical Phase', '["Recovering"]', '[{"label":"Emergency intake completed","date":"Feb 25","status":"completed"},{"label":"Skin treatment started","date":"Feb 28","status":"completed"},{"label":"Weight gain program started","date":"Mar 2","status":"in_progress"},{"label":"Basic obedience intro","status":"upcoming"},{"label":"Foster placement needed","status":"upcoming"},{"label":"Ready for adoption","status":"upcoming"}]', '[{"icon":"nutrition","label":"Nutrition & Supplements","detail":"$80 helps for 1 week"},{"icon":"vet","label":"Skin Treatment","detail":"$120 supports medical care"},{"icon":"training","label":"Crate & Obedience Training","detail":"$100 supports her progress"},{"icon":"foster","label":"Foster Home","detail":"Needs indoor living introduction","urgent":true}]', 'TTRG Medical Team', '1 day ago', 'Gaining weight steadily. Extremely friendly and food-motivated.', 'none'),
  ('shadow', 'Shadow', '5 yrs old', 'Labrador Retriever', 'Male', '65 lbs', 45, 'Shadow was found wandering a highway, confused and limping. He needs surgery and rehabilitation before he can find his forever home.', 'Shadow was spotted by a truck driver...', 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&q=80', '["https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80","https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80"]', true, 'rescue', 'bg-red-500', 'Corrective leg surgery needed, pain management, physical therapy', 'Minimal—well-mannered, knows basic commands', 'Calm, gentle, great with people, tolerant of handling', 'Low-impact exercise only, orthopedic bed recommended, surgery funding needed', 'Cleveland, OH', 'published', NOW(), 'Jan 25, 2025', 62, 'rescue', '{"rescue":"Jan 25, 2025"}', 17, 'Awaiting Surgery — Rescue Phase', '["Urgent","Needs Medical Care"]', '[{"label":"Highway rescue completed","date":"Jan 25","status":"completed"},{"label":"X-rays and diagnosis","date":"Jan 27","status":"completed"},{"label":"Corrective surgery needed","status":"urgent"},{"label":"Physical rehabilitation","status":"upcoming"},{"label":"Foster placement","status":"upcoming"},{"label":"Ready for adoption","status":"upcoming"}]', '[{"icon":"vet","label":"Corrective Leg Surgery","detail":"$2,500 needed urgently","urgent":true},{"icon":"nutrition","label":"Pain Management","detail":"$80/month for medication"},{"icon":"training","label":"Physical Therapy","detail":"$200 for rehab sessions"},{"icon":"foster","label":"Quiet Foster Home","detail":"Low-impact environment needed"}]', 'TTRG Veterinary Team', 'Today', 'Surgery funding critical. Shadow is comfortable but needs intervention soon.', 'partial'),
  ('prince', 'Prince', '1 yr old', 'Doberman Mix', 'Male', '48 lbs', 35, 'Prince had severe behavioral challenges—jumping, pulling, running away. He''s in serious need of training to keep him and others safe.', 'Prince is a 1 year old Doberman mix...', '/ttrg/dogs/prince.jpg', '["/ttrg/dogs/prince.jpg","/ttrg/testimonial-photo.jpg"]', true, 'train', 'bg-emerald-500', 'Neutered, vaccinations current, healthy', 'Impulse control, leash training, recall training, boundary setting', 'High energy, intelligent, responds well to structure, needs experienced handler', 'Needs daily exercise and mental stimulation, fenced yard preferred', 'Cleveland, OH', 'published', NOW(), 'Mar 16, 2025', 12, 'rehab', '{"rescue":"Mar 16, 2025","medical":"Mar 17, 2025","rehab":"Mar 20, 2025"}', 50, 'In Training — Behavioral Rehab', '["Urgent","In Training"]', '[{"label":"Intake and vet exam","date":"Mar 17","status":"completed"},{"label":"Neutered and vaccinated","date":"Mar 18","status":"completed"},{"label":"Impulse control training started","date":"Mar 20","status":"in_progress"},{"label":"Leash and recall training","status":"upcoming"},{"label":"Foster placement search","status":"upcoming"},{"label":"Ready for adoption","status":"upcoming"}]', '[{"icon":"training","label":"Behavioral Training","detail":"$200 for intensive program","urgent":true},{"icon":"nutrition","label":"High-Energy Diet","detail":"$65 helps for 1 week"},{"icon":"vet","label":"Follow-up Vet Visit","detail":"$75 for checkup"},{"icon":"foster","label":"Experienced Foster","detail":"Needs handler with large breed experience"}]', 'TTRG Behavioral Team', 'Today', 'High energy but extremely smart. Responding well to structure.', 'none'),
  ('luna', 'Luna', '3 yrs old', 'Staffordshire Mix', 'Female', '38 lbs', 40, 'Luna was found alone in an abandoned lot, scared and trembling. She''s timid but slowly opening up with gentle, patient care.', 'Luna was found curled up alone in an abandoned lot...', 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&q=80', '["https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80","https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80"]', false, 'rehabilitate', 'bg-amber-500', 'Spayed, vaccinations current, dental cleaning needed', 'Leash training, socialization with new dogs, basic commands', 'Shy and timid, warming up slowly, responds well to calm voices', 'Needs quiet environment, patient adopter, gradual introductions', 'Cleveland, OH', 'published', NOW(), 'Feb 18, 2025', 38, 'rehab', '{"rescue":"Feb 18, 2025","medical":"Feb 20, 2025","rehab":"Feb 24, 2025"}', 50, 'Rehabilitation In Progress', '["Needs Foster"]', '[{"label":"Intake and initial vet exam","date":"Feb 19","status":"completed"},{"label":"Spayed and vaccinated","date":"Feb 21","status":"completed"},{"label":"Trust building started","date":"Feb 24","status":"in_progress"},{"label":"Socialization with calm dogs","status":"upcoming"},{"label":"Foster placement needed","status":"upcoming"},{"label":"Ready for adoption","status":"upcoming"}]', '[{"icon":"nutrition","label":"Gentle Diet Plan","detail":"$55 helps for 1 week"},{"icon":"vet","label":"Dental Cleaning","detail":"$150 for procedure"},{"icon":"training","label":"Socialization Program","detail":"$100 supports her progress"},{"icon":"foster","label":"Quiet Foster Home","detail":"Calm environment needed","urgent":true}]', 'TTRG Rehabilitation Team', '4 days ago', 'Luna is warming up slowly. Responds well to calm voices and gentle handling.', 'none')
ON CONFLICT (id) DO NOTHING;

-- ─── ROW LEVEL SECURITY (RLS) ───
-- Enable RLS on all tables
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE foster_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticker_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Public read for published dogs (anyone can see public site)
CREATE POLICY "Public can read published dogs" ON dogs FOR SELECT USING (status IN ('published', 'urgent'));
-- Admin full access
CREATE POLICY "Admin full access dogs" ON dogs FOR ALL USING (true) WITH CHECK (true);

-- Public read for ticker
CREATE POLICY "Public can read active ticker" ON ticker_items FOR SELECT USING (active = true);
CREATE POLICY "Admin full access ticker" ON ticker_items FOR ALL USING (true) WITH CHECK (true);

-- Public read for site settings
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access site settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Admin-only tables
CREATE POLICY "Admin full access users" ON admin_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access submissions" ON submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert submissions" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access contacts" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert contacts" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access foster" ON foster_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert foster" ON foster_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access sponsor" ON sponsor_interests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert sponsor" ON sponsor_interests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access donations" ON donations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can insert donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access audit" ON audit_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access media" ON media_library FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public can read media" ON media_library FOR SELECT USING (true);

-- ─── STORAGE BUCKETS ───
-- These need to be created via Supabase Dashboard or API:
-- 1. 'dogs' bucket - for dog photos and galleries
-- 2. 'media' bucket - for general site media (videos, images)
-- 3. 'avatars' bucket - for user profile pictures

-- ─── UPDATED_AT TRIGGER ───
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dogs_updated_at BEFORE UPDATE ON dogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
