# JAGAIN — Jaga Hutan, Kawal Penanganan

> **"Pantau Karhutla. Kawal Penanganannya."**

Platform transparansi dan akuntabilitas pelaporan serta tindak lanjut kebakaran hutan dan lahan (karhutla), difokuskan pada wilayah pulau Kalimantan (Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, dan Kalimantan Utara).

JAGAIN memadukan pelaporan masyarakat yang terverifikasi, pelacakan transparan tindak lanjut lintas instansi operasional (BPBD, Manggala Agni KLHK, Damkar), audit trail forensik yang tidak dapat diubah secara sepihak, serta pemantauan titik observasi satelit.

---

## 1. Panduan Cepat & Akun Demo

Aplikasi telah dilengkapi seeder basis data lengkap dengan akun percontohan untuk setiap peran:

| Peran | Email | Kata Sandi | Cakupan / Hak Akses |
|---|---|---|---|
| **Administrator** | `admin@jagain.id` | `password` | Review queue antrean laporan, deteksi duplikasi, verifikasi/penutupan berbayar alasan, penugasan ke instansi, audit trail log, manajemen OPD. |
| **Petugas OPD (BPBD Kalbar)** | `opd.kalbar@jagain.id` | `password` | Dashboard tugas instansi, respon penerimaan/penolakan (dengan alasan wajib), pencatatan progres penanganan di lapangan, pembaruan kondisi fisik api berdasar bukti. |
| **Petugas OPD (Manggala Agni Kalteng)** | `opd.kalteng@jagain.id` | `password` | Tugas instansi wilayah Kalimantan Tengah (Daops Kapuas & Palangka Raya). |
| **Masyarakat Pelapor** | `warga@jagain.id` | `password` | Pelaporan karhutla terverifikasi koordinat Kalimantan, pelacakan kronologi status mandiri, penambahan informasi bila diminta verifikator. |

> [!IMPORTANT]
> **Pemberitahuan Darurat:** JAGAIN adalah platform akuntabilitas publik dan transparansi koordinasi penanganan karhutla, **bukan pengganti kanal darurat resmi**. Jika Anda berada dalam bahaya langsung atau memerlukan pemadaman darurat seketika, hubungi **Panggilan Darurat 112** atau pos komando pemadam kebakaran terdekat.

---

## 2. Prasyarat Sistem

- **PHP**: Versi `>= 8.2` (Direkomendasikan PHP 8.4)
- **Ekstensi PHP**: `pdo_sqlite` (atau `pdo_mysql` / `pdo_pgsql`), `mbstring`, `fileinfo`, `gd` / `imagick`
- **Composer**: Versi `>= 2.7`
- **Node.js**: Versi `>= 20.x` (LTS)
- **Package Manager**: `npm`

---

## 3. Instalasi dan Setup Lokal

### Langkah 1: Kloning & Pasang Dependensi
```bash
git clone <repository_url> jagain
cd jagain

# Pasang dependensi PHP (Backend)
composer install

# Pasang dependensi JavaScript (Frontend React & Leaflet)
npm install
```

### Langkah 2: Konfigurasi Environment
Salin file konfigurasi percontohan:
```bash
cp .env.example .env
```
Pastikan kunci aplikasi digenerate:
```bash
php artisan key:generate
```

Secara default, aplikasi menggunakan database SQLite lokal yang ringan dan cepat untuk pengujian:
```env
APP_NAME=JAGAIN
APP_ENV=local
APP_DEBUG=true
APP_URL=http://jagain.test
# (atau http://localhost:8000 jika menggunakan php artisan serve)

DB_CONNECTION=sqlite
# Database otomatis berada di database/database.sqlite
```

### Langkah 3: Siapkan Database & Seeder
Buat file SQLite (jika belum ada) dan jalankan seluruh migration serta seeder data demo:
```bash
# Buat database sqlite kosong jika belum ada
touch database/database.sqlite

# Jalankan migrasi dan isi data awal Kalimantan
php artisan migrate:fresh --seed

# Buat symbolic link untuk media penyimpanan bukti laporan publik
php artisan storage:link
```

### Langkah 4: Menjalankan Aplikasi

#### Opsi A: Menggunakan Laravel Herd (Rekomendasi - Tanpa Perlu Serve)
Project sudah terhubung ke Herd (`jagain.test`):
1. Pastikan aplikasi **Laravel Herd** aktif di komputer Anda.
2. Buka browser dan langsung akses: **`http://jagain.test`**
*(Tidak perlu menjalankan `php artisan serve`)*.
Jika sedang melakukan pengembangan UI secara aktif, cukup jalankan `npm run dev` untuk Vite HMR.

#### Opsi B: Menggunakan CLI / Artisan Serve Biasa
Jalankan dev server secara simultan menggunakan perintah bawaan:
```bash
composer run dev
```
Atau di dua terminal terpisah:
- **Terminal 1 (Laravel Server):** `php artisan serve` (berjalan di `http://127.0.0.1:8000`)
- **Terminal 2 (Vite Assets):** `npm run dev`

Buka browser dan akses: **`http://localhost:8000`**

---

## 4. Pengujian & Kualitas Kode

JAGAIN dibangun dengan standar rekayasa perangkat lunak ketat (Clean Architecture, Domain State Machines, Object-Level Authorization, Static Analysis Level 7, dan PSR-12).

### Menjalankan Automated Test Suite (Pest / PHPUnit)
```bash
# Jalankan seluruh 60 skenario automated feature & security tests:
vendor/bin/pest

# Atau uji spesifik domain JAGAIN (20 skenario inti: alur pelaporan, batas koordinat Kalimantan, otorisasi IDOR, state machine, penugasan OPD):
vendor/bin/pest tests/Feature/Jagain
```

### Pemeriksaan Type Safety
```bash
# Type check Backend (PHPStan Level 7 - Max memory 1G)
composer types:check

# Type check Frontend (TypeScript Compiler)
npm run types:check
```

### Format Kode & Linting (Pint)
```bash
# Verifikasi format PSR-12 / Laravel Pint
vendor/bin/pint --test

# Memperbaiki format secara otomatis
vendor/bin/pint
```

### Production Build
```bash
npm run build
```

---

## 5. Arsitektur Domain & Model Data

### A. Tiga Konsep Status yang Terpisah (Kebenaran Data)
Sesuai ketetapan `prd.md` dan `TECHNICAL.md`, JAGAIN secara tegas membedakan 3 status berbeda agar tidak terjadi misinformasi kepada publik:

1. **Status Laporan (`report_status`)**: Siklus hidup administratif laporan masyarakat:
   - `SUBMITTED` -> Baru masuk dari warga.
   - `UNDER_REVIEW` -> Sedang ditelaah oleh verifikator Admin JAGAIN.
   - `NEEDS_INFORMATION` -> Admin meminta klarifikasi/bukti tambahan dari pelapor.
   - `VERIFIED` -> Laporan terbukti valid dan akurat.
   - `DISPATCHED` -> Diteruskan dan ditugaskan ke instansi penanganan lapangan (BPBD / Manggala Agni / Damkar).
   - `RESOLUTION_REVIEW` -> Laporan tindak lanjut instansi sedang ditinjau.
   - `RESOLVED_VERIFIED` -> Penanganan selesai dan terverifikasi di lapangan.
   - `CLOSED_WITH_REASON` -> Laporan ditutup (duplikasi, hoax, atau di luar cakupan).

2. **Status Penugasan (`assignment_status`)**: Siklus tanggung jawab instansi lapangan:
   - `ASSIGNED` -> Tugas diterbitkan Admin untuk instansi tertentu.
   - `RECEIVED_BY_AGENCY` -> Diterima dan diakui oleh petugas instansi.
   - `DECLINED_BY_AGENCY` -> Ditolak instansi (wajib menyertakan alasan penolakan).
   - `IN_PROGRESS` -> Regu pemadam/patroli sedang berada di lokasi kejadian.
   - `SUBMITTED_FOR_REVIEW` -> Instansi mengajukan bukti penanganan untuk diverifikasi Admin.
   - `COMPLETED` -> Penugasan tuntas.

3. **Kondisi Kebakaran Fisik (`fire_condition`)**:
   - `UNKNOWN`, `REPORTED_ACTIVE`, `OBSERVED_ACTIVE`, `OBSERVED_CONTAINED`, `OBSERVED_EXTINGUISHED`.
   - *Prinsip Kejujuran:* Status administratif "Selesai" **tidak pernah otomatis** menyimpulkan bara api telah padam tanpa konfirmasi observasi lapangan dari petugas dengan atribusi sumber yang jelas (`fire_condition_source`).

### B. Proteksi Privasi & Keamanan (Zero-Leakage PII)
- Data pribadi pelapor (`reporter_name`, `reporter_phone`, `created_by_user_id`) diproteksi ketat dan disanitasi saat data dikirim ke endpoint publik (`/`, `/peta`, `/laporan-publik/{code}`).
- Endpoint pelaporan warga terlindungi dengan *Object-Level Authorization* (`ReportPolicy`): Pelapor A tidak dapat mengintip laporan privat Pelapor B hanya dengan mengganti kode pelacakan.
- Dashboard OPD terlindungi dengan *Agency Membership Authorization* (`AssignmentPolicy`): Petugas Damkar Kota Pontianak tidak dapat mengubah atau menerima tugas yang dialokasikan untuk BPBD Kalimantan Tengah.
- Rekam Jejak Audit (`AuditLog`): Setiap aksi mutasi status, penugasan, dan perubahan data dicatat secara transaksional dengan snapshot atribut sebelum dan sesudah kejadian.

---

## 6. Status Integrasi Eksternal & Data Simulasi

- **Titik Panas Satelit:** Sesuai prinsip kejujuran data, dataset satelit saat ini menggunakan data percontohan yang diberi label transparan **`DATA SIMULASI`** pada tampilan peta, legenda, dan popup detail.
- **Adapter Siap Integrasi:** Telah disediakan model `DataSource` dan tabel `external_observations` yang memisahkan waktu observasi fisik satelit (`observed_at`) dengan waktu data disinkronkan ke dalam sistem (`ingested_at`).
- Platform tidak mengklaim integrasi live streaming satelit jika token resmi LAPAN/BRIN atau NASA FIRMS belum dikonfigurasi di environment produksi.

---

## 7. Identitas Visual & Desain

Desain antarmuka JAGAIN sepenuhnya mengikuti standar identitas visual `design.md`:
- **Warna Utama**: Forest Green (`#174B35`), Primary Green (`#216B49`), Leaf Green (`#39845C`), Soft Green (`#E8F1EB`), Pale Green (`#F3F7F4`).
- **Netral**: Deep Carbon Black (`#171C19`), Dark Neutral (`#343B36`), Gray Neutral (`#68716B`), Border Neutral (`#DDE3DE`), Pure White (`#FFFFFF`).
- Bebas dari penggunaan emoji pada UI formal, menggunakan Lucide Icons resmi, komponen peta berbasis Leaflet dengan kartografi Positron yang bersih dan kontras tinggi untuk pemantauan titik karhutla Kalimantan.

---

## 8. Lisensi & Hak Cipta
Hak Cipta © 2026 Tim Pengembang JAGAIN. Dikembangkan untuk transparansi dan percepatan penanggulangan karhutla di Indonesia.
