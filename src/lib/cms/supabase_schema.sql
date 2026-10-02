-- =========================================================================
-- LCB BRIGADE — OFFICIAL SUPABASE CMS RELATIONAL SCHEMA
-- Execute this script in your Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Charter Members & Family Tree Lineage
CREATE TABLE IF NOT EXISTS charter_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  charter_year TEXT NOT NULL DEFAULT 'April 2021',
  parent_id TEXT REFERENCES charter_members(id) ON DELETE SET NULL,
  photo_url TEXT,
  description TEXT,
  historical_info TEXT,
  sponsor_name TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'confirmed',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_charter_members_parent ON charter_members(parent_id);
CREATE INDEX IF NOT EXISTS idx_charter_members_order ON charter_members(display_order);
CREATE INDEX IF NOT EXISTS idx_charter_members_published ON charter_members(is_published);

-- 2. Community Services & Civic Initiatives
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT DEFAULT '2024–2025',
  partner_association TEXT,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  impact_metrics TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Users',
  video_ids JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published);

-- 3. Field Recordings, Activity Videos & Media Catalog
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'service',
  service_id TEXT REFERENCES services(id) ON DELETE SET NULL,
  description TEXT,
  channel TEXT,
  requires_verification BOOLEAN NOT NULL DEFAULT false,
  verification_note TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_videos_service ON videos(service_id);
CREATE INDEX IF NOT EXISTS idx_videos_youtube ON videos(youtube_id);
CREATE INDEX IF NOT EXISTS idx_videos_order ON videos(display_order);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(is_published);

-- 4. Historical Leadership Tenures
CREATE TABLE IF NOT EXISTS history_entries (
  id TEXT PRIMARY KEY,
  tenure_year TEXT NOT NULL,
  president TEXT NOT NULL,
  team_title TEXT NOT NULL,
  term_dates TEXT NOT NULL,
  summary TEXT NOT NULL,
  activities JSONB NOT NULL DEFAULT '[]'::jsonb,
  background_note TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_history_order ON history_entries(display_order);
CREATE INDEX IF NOT EXISTS idx_history_published ON history_entries(is_published);

-- 5. Official Meetings Schedule
CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  description TEXT NOT NULL,
  agenda JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(date);
CREATE INDEX IF NOT EXISTS idx_meetings_published ON meetings(is_published);

-- 6. Row Level Security (RLS) Setup
ALTER TABLE charter_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Allow public read-only access for published records
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only charter_members') THEN
    CREATE POLICY "Public read-only charter_members" ON charter_members FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only services') THEN
    CREATE POLICY "Public read-only services" ON services FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only videos') THEN
    CREATE POLICY "Public read-only videos" ON videos FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only history_entries') THEN
    CREATE POLICY "Public read-only history_entries" ON history_entries FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only meetings') THEN
    CREATE POLICY "Public read-only meetings" ON meetings FOR SELECT USING (is_published = true);
  END IF;

  -- Allow full administrative mutations via Service Role (used by our server-side Next.js APIs)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access charter_members') THEN
    CREATE POLICY "Service role full access charter_members" ON charter_members USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access services') THEN
    CREATE POLICY "Service role full access services" ON services USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access videos') THEN
    CREATE POLICY "Service role full access videos" ON videos USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access history_entries') THEN
    CREATE POLICY "Service role full access history_entries" ON history_entries USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access meetings') THEN
    CREATE POLICY "Service role full access meetings" ON meetings USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
  END IF;
END $$;
