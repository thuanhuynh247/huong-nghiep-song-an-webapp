-- ═══════════════════════════════════════════════════════════════════
-- Hệ sinh thái Chuyên viên Hướng nghiệp — Data Model V1
-- Supabase Postgres (Singapore region)
-- Created: 2026-04-02
-- ═══════════════════════════════════════════════════════════════════

-- ─── EXTENSIONS ──────────────────────────────────────────────────
-- Supabase đã enable sẵn uuid-ossp, không cần create extension

-- ═══════════════════════════════════════════════════════════════════
-- 1. PROFILES (mở rộng từ auth.users)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'client'
              CHECK (role IN ('client', 'counselor', 'admin')),
  full_name   TEXT,
  email       TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'Profile mở rộng từ auth.users. Mỗi user có đúng 1 profile.';

-- Trigger: tự tạo profile khi user đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════
-- 2. COUNSELORS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.counselors (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'suspended', 'rejected')),
  -- Thông tin cá nhân
  name              TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  location          TEXT,
  -- Profile công khai
  bio               TEXT,
  tagline           TEXT,
  experience_years  INT NOT NULL DEFAULT 0,
  specialties       TEXT[] DEFAULT '{}',
  tools             TEXT[] DEFAULT '{}',
  availability      TEXT[] DEFAULT '{}',
  social_links      JSONB DEFAULT '{}',
  portfolio_url     TEXT,
  -- Hệ thống
  split_percent     INT NOT NULL DEFAULT 80,
  featured          BOOLEAN DEFAULT false,
  -- Application data
  expectations      TEXT,
  application_id    TEXT,
  -- Timestamps
  approved_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.counselors IS 'Chuyên viên hướng nghiệp. Status: pending → approved/rejected → suspended.';

CREATE INDEX idx_counselors_status ON public.counselors(status);
CREATE INDEX idx_counselors_user_id ON public.counselors(user_id);

-- ═══════════════════════════════════════════════════════════════════
-- 3. CLIENTS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.clients (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  email               TEXT NOT NULL,
  name                TEXT,
  phone               TEXT,
  role_segment        TEXT,  -- 'Học sinh', 'Sinh viên', 'Phụ huynh', 'Người đi làm'
  marketing_consent   BOOLEAN DEFAULT false,
  -- Lead tracking
  source_first        TEXT,
  source_last         TEXT,
  lead_stage          TEXT DEFAULT 'new',
  tags                TEXT[] DEFAULT '{}',
  -- Timestamps
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.clients IS 'Thân chủ / lead. Có thể chưa có user_id nếu chưa login portal.';

CREATE UNIQUE INDEX idx_clients_email ON public.clients(email);
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
CREATE INDEX idx_clients_lead_stage ON public.clients(lead_stage);

-- ═══════════════════════════════════════════════════════════════════
-- 4. BOOKINGS
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.bookings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  counselor_id      UUID REFERENCES public.counselors(id) ON DELETE SET NULL,
  -- Payment
  payment_code      TEXT UNIQUE NOT NULL,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN (
                      'pending',       -- chờ thanh toán
                      'paid',          -- đã thanh toán, chờ assign
                      'assigned',      -- đã gán counselor
                      'contacted',     -- counselor đã liên hệ
                      'completed',     -- hoàn thành buổi tư vấn
                      'cancelled',     -- hủy
                      'expired'        -- hết hạn thanh toán
                    )),
  amount            INT NOT NULL,
  currency          TEXT DEFAULT 'VND',
  -- Consultation info
  main_concern      TEXT,
  expectation       TEXT,
  preferred_time    TEXT,
  birth_year        TEXT,
  previous_assessment TEXT,
  -- SePay data
  sepay_data        JSONB DEFAULT '{}',
  -- Timestamps
  paid_at           TIMESTAMPTZ,
  assigned_at       TIMESTAMPTZ,
  contacted_at      TIMESTAMPTZ,
  completed_at      TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.bookings IS 'Booking tư vấn 1:1. Lifecycle: pending → paid → assigned → contacted → completed.';

CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_counselor_id ON public.bookings(counselor_id);
CREATE INDEX idx_bookings_payment_code ON public.bookings(payment_code);

-- ═══════════════════════════════════════════════════════════════════
-- 5. SESSION NOTES
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.session_notes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  counselor_id    UUID NOT NULL REFERENCES public.counselors(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  note_type       TEXT DEFAULT 'session'
                  CHECK (note_type IN ('session', 'follow_up', 'internal')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.session_notes IS 'Ghi chú của counselor sau mỗi buổi tư vấn.';

CREATE INDEX idx_session_notes_booking ON public.session_notes(booking_id);

-- ═══════════════════════════════════════════════════════════════════
-- 6. LEDGER ENTRIES (Sổ cái doanh thu)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.ledger_entries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  counselor_id    UUID NOT NULL REFERENCES public.counselors(id) ON DELETE CASCADE,
  booking_id      UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  amount_total    INT NOT NULL,
  amount_split    INT NOT NULL,
  entry_type      TEXT NOT NULL DEFAULT 'earn'
                  CHECK (entry_type IN ('earn', 'payout', 'adjustment')),
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'transferred', 'cancelled')),
  note            TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.ledger_entries IS 'Sổ cái ghi nhận doanh thu counselor. earn = phát sinh, payout = đã chuyển khoản.';

CREATE INDEX idx_ledger_counselor ON public.ledger_entries(counselor_id);
CREATE INDEX idx_ledger_status ON public.ledger_entries(status);

-- ═══════════════════════════════════════════════════════════════════
-- 7. ROW-LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;

-- ─── PROFILES ────────────────────────────────────────────────────

-- User xem/sửa profile của chính mình
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admin xem tất cả profiles
-- ✅ Dùng SECURITY DEFINER function thay vì subquery trực tiếp
--    để tránh infinite recursion (policy query chính bảng nó)
CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role() = 'admin');

-- ─── COUNSELORS ──────────────────────────────────────────────────

-- Public: chỉ xem counselor đã approved (cho directory)
CREATE POLICY "Anyone can view approved counselors"
  ON public.counselors FOR SELECT
  USING (status = 'approved');

-- Counselor xem/sửa hồ sơ của mình
CREATE POLICY "Counselor can update own profile"
  ON public.counselors FOR UPDATE
  USING (user_id = auth.uid());

-- Ai cũng có thể đăng ký (insert)
CREATE POLICY "Anyone can register as counselor"
  ON public.counselors FOR INSERT
  WITH CHECK (true);

-- Admin xem tất cả (kể cả pending)
CREATE POLICY "Admin can view all counselors"
  ON public.counselors FOR SELECT
  USING (public.get_user_role() = 'admin');

-- Admin duyệt/reject
CREATE POLICY "Admin can update any counselor"
  ON public.counselors FOR UPDATE
  USING (public.get_user_role() = 'admin');

-- ─── CLIENTS ─────────────────────────────────────────────────────

-- Client xem data của mình
CREATE POLICY "Client can view own data"
  ON public.clients FOR SELECT
  USING (user_id = auth.uid());

-- Service role (PHP) có thể insert/update (không cần policy, dùng service_role key)
-- Admin xem tất cả
CREATE POLICY "Admin can view all clients"
  ON public.clients FOR SELECT
  USING (public.get_user_role() = 'admin');

-- Counselor xem client được assign cho mình
CREATE POLICY "Counselor can view assigned clients"
  ON public.clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings b
      JOIN public.counselors c ON b.counselor_id = c.id
      WHERE b.client_id = clients.id AND c.user_id = auth.uid()
    )
  );

-- ─── BOOKINGS ────────────────────────────────────────────────────

-- Client xem booking của mình
CREATE POLICY "Client can view own bookings"
  ON public.bookings FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.clients WHERE id = bookings.client_id AND user_id = auth.uid())
  );

-- Counselor xem booking assign cho mình
CREATE POLICY "Counselor can view assigned bookings"
  ON public.bookings FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.counselors WHERE id = bookings.counselor_id AND user_id = auth.uid())
  );

-- Counselor update status booking
CREATE POLICY "Counselor can update assigned booking status"
  ON public.bookings FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.counselors WHERE id = bookings.counselor_id AND user_id = auth.uid())
  );

-- Admin xem/sửa tất cả
CREATE POLICY "Admin can manage all bookings"
  ON public.bookings FOR ALL
  USING (public.get_user_role() = 'admin');

-- ─── SESSION NOTES ───────────────────────────────────────────────

-- Counselor xem/tạo note cho booking của mình
CREATE POLICY "Counselor can manage own notes"
  ON public.session_notes FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.counselors WHERE id = session_notes.counselor_id AND user_id = auth.uid())
  );

-- Client xem note (trừ internal) của booking mình
CREATE POLICY "Client can view session notes"
  ON public.session_notes FOR SELECT
  USING (
    note_type != 'internal' AND
    EXISTS (
      SELECT 1 FROM public.bookings b
      JOIN public.clients c ON b.client_id = c.id
      WHERE b.id = session_notes.booking_id AND c.user_id = auth.uid()
    )
  );

-- Admin xem tất cả
CREATE POLICY "Admin can view all notes"
  ON public.session_notes FOR SELECT
  USING (public.get_user_role() = 'admin');

-- ─── LEDGER ENTRIES ──────────────────────────────────────────────

-- Counselor xem ledger của mình
CREATE POLICY "Counselor can view own ledger"
  ON public.ledger_entries FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.counselors WHERE id = ledger_entries.counselor_id AND user_id = auth.uid())
  );

-- Admin xem/tạo tất cả
CREATE POLICY "Admin can manage all ledger"
  ON public.ledger_entries FOR ALL
  USING (public.get_user_role() = 'admin');

-- ═══════════════════════════════════════════════════════════════════
-- 8. HELPER FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════

-- Hàm lấy role hiện tại
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger cho tất cả bảng
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.counselors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
