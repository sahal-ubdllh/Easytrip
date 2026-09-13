-- Jalankan seluruh isi file ini di Supabase Dashboard -> SQL Editor -> New query -> Run

-- 1. Buat tabel book_form (pengganti book_db.sql)
create table if not exists public.book_form (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null,
  address text not null,
  location text not null,
  guests integer not null check (guests > 0),
  arrivals date not null,
  leaving date not null,
  created_at timestamptz not null default now()
);

-- 2. Aktifkan Row Level Security (WAJIB, karena anon key dipakai langsung di browser)
alter table public.book_form enable row level security;

-- 3. Siapa saja (pengunjung website) boleh mengirim booking baru
create policy "Public can insert bookings"
on public.book_form
for insert
to anon
with check (true);

-- 4. Hanya admin yang sudah login (authenticated) yang boleh melihat daftar booking
create policy "Authenticated can read bookings"
on public.book_form
for select
to authenticated
using (true);

-- 5. Hanya admin yang sudah login yang boleh menghapus booking
create policy "Authenticated can delete bookings"
on public.book_form
for delete
to authenticated
using (true);

-- Catatan:
-- - Pengunjung biasa (anon) TIDAK bisa membaca atau menghapus data, hanya insert.
--   Ini mencegah siapa pun mengintip/menghapus data booking orang lain lewat browser.
-- - Untuk membuat akun admin (login di admin-login.html), buka:
--   Supabase Dashboard -> Authentication -> Users -> Add user (isi email & password manual).
--   TIDAK perlu dan TIDAK BISA dibuat lewat SQL biasa karena auth.users dikelola Supabase Auth.
