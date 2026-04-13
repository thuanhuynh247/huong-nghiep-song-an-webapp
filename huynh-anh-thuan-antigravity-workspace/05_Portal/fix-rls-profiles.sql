-- ═══════════════════════════════════════════════════════════════════
-- FIX: Infinite Recursion in RLS Policy for "profiles"
-- Ngày tạo: 13/04/2026
-- Vấn đề: Policy "Admin can view all profiles" query bảng profiles
--          bên trong policy của chính bảng profiles → infinite loop
-- ═══════════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 0: Thêm cột email nếu chưa có (cần cho onboarding)
-- ────────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 1: Xóa TẤT CẢ policy cũ trên bảng profiles
-- ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
-- Xóa bất kỳ policy nào khác có thể tồn tại
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable read for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 2: Tạo helper function lấy role (SECURITY DEFINER bypass RLS)
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 3: Tạo policy mới KHÔNG GÂY RECURSION
-- ────────────────────────────────────────────────────────────────

-- Policy 1: Mỗi user xem được profile của chính mình
-- ✅ An toàn vì chỉ dùng auth.uid() = id, không query bảng profiles
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Mỗi user sửa được profile của chính mình
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 3: Admin xem tất cả profiles
-- ✅ Dùng function SECURITY DEFINER thay vì subquery trực tiếp
--    Function bypass RLS nên không gây recursion
CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 4: Đảm bảo RLS đã enabled
-- ────────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 5: Fix các policy trên bảng KHÁC cũng query profiles
-- (counselors, clients, bookings, session_notes, ledger_entries)
-- ────────────────────────────────────────────────────────────────

-- ─── COUNSELORS: fix admin policies ────────────────────────────
DROP POLICY IF EXISTS "Admin can view all counselors" ON public.counselors;
DROP POLICY IF EXISTS "Admin can update any counselor" ON public.counselors;

CREATE POLICY "Admin can view all counselors"
  ON public.counselors FOR SELECT
  USING (public.get_user_role() = 'admin');

CREATE POLICY "Admin can update any counselor"
  ON public.counselors FOR UPDATE
  USING (public.get_user_role() = 'admin');

-- ─── CLIENTS: fix admin policy ─────────────────────────────────
DROP POLICY IF EXISTS "Admin can view all clients" ON public.clients;

CREATE POLICY "Admin can view all clients"
  ON public.clients FOR SELECT
  USING (public.get_user_role() = 'admin');

-- ─── BOOKINGS: fix admin policy ────────────────────────────────
DROP POLICY IF EXISTS "Admin can manage all bookings" ON public.bookings;

CREATE POLICY "Admin can manage all bookings"
  ON public.bookings FOR ALL
  USING (public.get_user_role() = 'admin');

-- ─── SESSION NOTES: fix admin policy ───────────────────────────
DROP POLICY IF EXISTS "Admin can view all notes" ON public.session_notes;

CREATE POLICY "Admin can view all notes"
  ON public.session_notes FOR SELECT
  USING (public.get_user_role() = 'admin');

-- ─── LEDGER: fix admin policy ──────────────────────────────────
DROP POLICY IF EXISTS "Admin can manage all ledger" ON public.ledger_entries;

CREATE POLICY "Admin can manage all ledger"
  ON public.ledger_entries FOR ALL
  USING (public.get_user_role() = 'admin');

-- ────────────────────────────────────────────────────────────────
-- BƯỚC 6: VERIFY
-- Chạy query kiểm tra policy đã tạo đúng chưa
-- ────────────────────────────────────────────────────────────────
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- ════════════════════════════════════════════════════════════════
-- DONE! Sau khi chạy xong:
-- 1. Mở portal.huynhanhthuan.com
-- 2. Login bằng Google/Email
-- 3. Nếu thấy Dashboard (không thấy "Lỗi Truy Cập") → THÀNH CÔNG
-- ════════════════════════════════════════════════════════════════
