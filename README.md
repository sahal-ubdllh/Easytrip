# EasyTrip - Versi Tanpa PHP (HTML + JS + Supabase)

Situs ini sudah dikonversi dari PHP/MySQL menjadi **HTML + JavaScript murni**
yang berbicara langsung ke **Supabase** (tanpa server backend sama sekali).

## Yang berubah dari versi PHP

| Sebelumnya | Sekarang |
|---|---|
| `book_form.php` (INSERT via mysqli) | `book.html` + `js/book.js` (insert via Supabase JS) |
| `view_book.php` (SELECT/DELETE via mysqli, bebas akses) | `view_book.html` + `js/admin.js`, **wajib login** |
| Tidak ada login admin | `admin-login.html` + `js/login.js` (Supabase Auth) |
| `book_db.sql` | `supabase_setup.sql` |
| Semua file `.php` | Semua diganti `.html`, halaman `paket-*` dipindah ke folder `paket/` |

Masalah SQL Injection & Stored XSS yang ada di versi PHP sudah tidak relevan
lagi di versi ini karena tidak ada query SQL manual, dan semua data ditulis
ke DOM lewat `textContent` (bukan `innerHTML` langsung dari data).

## Cara setup (sekali saja)

1. **Buat project Supabase** di https://supabase.com (gratis).
2. Buka **SQL Editor** di dashboard Supabase, tempel isi file
   `supabase_setup.sql`, lalu klik **Run**. Ini akan membuat tabel
   `book_form` beserta aturan keamanannya (Row Level Security).
3. Buka **Project Settings -> API**, salin:
   - `Project URL`
   - `anon public` key
4. Buka file `js/supabase-client.js`, ganti dua baris ini dengan nilai di atas:
   ```js
   const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
   const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";
   ```
5. Buat akun admin: **Authentication -> Users -> Add user**, isi email &
   password. Ini yang dipakai untuk login di `admin-login.html`.
6. Buka `index.html` langsung di browser (double click), atau jalankan
   local server sederhana, misalnya:
   ```bash
   npx serve .
   ```
   (Boleh juga pakai ekstensi "Live Server" di VS Code.)

## Struktur folder

```
site/
├── index.html
├── about.html
├── package.html
├── book.html              <- form booking (insert ke Supabase)
├── admin-login.html        <- login admin
├── view_book.html          <- daftar pesanan (perlu login)
├── supabase_setup.sql      <- jalankan sekali di Supabase SQL Editor
├── styles.css
├── scripts.js
├── js/
│   ├── supabase-client.js  <- isi URL & key Supabase di sini
│   ├── book.js
│   ├── login.js
│   └── admin.js
├── paket/
│   ├── paket-bali.html
│   ├── paket-bromo.html
│   ├── paket-bunaken.html
│   ├── paket-danau-toba.html
│   ├── paket-derawan.html
│   ├── paket-gorontalo.html
│   ├── paket-labuan-bajo.html
│   ├── paket-raja-ampat.html
│   └── paket-yogyakarta.html
└── assets/                 <- taruh gambar-gambar (bg, paket, dll) di sini
```

## Catatan penting

- Folder `assets/` dikosongkan di paket ini — salin ulang gambar-gambar
  kamu (logo, background, foto paket, dll) ke sana sesuai nama file yang
  sudah dirujuk di HTML (mis. `assets/bg-about.jpg`).
- Row Level Security sudah diatur supaya pengunjung biasa hanya bisa
  **mengirim** booking, bukan membaca atau menghapus punya orang lain.
  Hanya user yang login (admin) yang bisa melihat/menghapus dari
  `view_book.html`.
- Beberapa bug kecil dari versi PHP juga ikut diperbaiki: path `scripts.js`
  yang salah di sebagian halaman paket, link navbar yang salah folder, dan
  dropdown tujuan di form booking sekarang mencakup semua 9 paket (bukan
  cuma 5 + "Paket Lombok" yang halamannya tidak pernah ada).
