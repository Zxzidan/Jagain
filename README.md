# JAGAIN — Jaga Hutan, Kawal Penanganan

> **JAGAIN** adalah platform transparansi dan akuntabilitas pelaporan serta pengawalan tindak lanjut kebakaran hutan dan lahan (karhutla) berbasis peta geospasial di wilayah Kalimantan. Platform ini menghubungkan laporan masyarakat yang terverifikasi dengan respon cepat instansi operasional (BPBD, Manggala Agni, Damkar) yang diawasi melalui audit trail forensik transparan.

---

## 📌 Ketentuan First Draft Submission (MIA 2026)

### 1. Judul Project & Deskripsi Singkat
- **Judul Project**: **JAGAIN — Jaga Hutan, Kawal Penanganan**
- **Deskripsi Singkat**: JAGAIN adalah platform transparansi dan akuntabilitas penanggulangan kebakaran hutan dan lahan (karhutla) di Kalimantan yang memadukan pelaporan warga terverifikasi koordinat, audit trail penanganan lintas instansi, dan integrasi titik observasi satelit. Sistem ini memastikan setiap insiden tertangani secara nyata dan transparan tanpa ada laporan yang terabaikan.

---

### 2. Tech Stack yang Digunakan
- **Backend & Arsitektur**:
  - **PHP 8.3+** (Direkomendasikan PHP 8.4)
  - **Laravel 12** (MVC, Domain State Machines, Object-Level Authorization)
  - **Laravel Fortify** (Autentikasi Aman & Pengelolaan Sesi)
  - **SQLite** (Default pengembangan lokal cepat / PostgreSQL & MySQL Ready)
- **Frontend & UI/UX**:
  - **React 19** & **TypeScript**
  - **Inertia.js v3** (Modern Monolith SPA)
  - **Tailwind CSS v4** & **Radix UI**
  - **Lucide React Icons**
- **Geospasial & Kartografi**:
  - **Leaflet** & **React-Leaflet**
  - **CartoDB Positron Basemap**
  - Geofencing batas wilayah pulau Kalimantan & custom pin marker risiko karhutla
- **Tooling, Testing & Kualitas Kode**:
  - **Vite & Vite-Plus** (Build tool & HMR)
  - **Pest 5** (Automated Feature, Security, and State Machine Testing)
  - **PHPStan Level 7** (Static Analysis & Type Safety)
  - **Laravel Pint** (Standar Format PSR-12)

---

### 3. Cara Menjalankan Project (Clone => Install => Run)

#### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/Zxzidan/Jagain.git
cd Jagain
```

#### Langkah 2: Instalasi Dependensi & Persiapan Basis Data
```bash
# 1. Pasang dependensi PHP (Backend) & JavaScript (Frontend)
composer install
npm install

# 2. Salin environment konfigurasi dan buat application key
cp .env.example .env
php artisan key:generate

# 3. Siapkan database SQLite dan jalankan migrasi beserta data seeder
touch database/database.sqlite
php artisan migrate:fresh --seed

# 4. Buat symbolic link untuk berkas media bukti laporan
php artisan storage:link
```

#### Langkah 3: Menjalankan Aplikasi

##### Opsi A: Menggunakan Laravel Herd (Rekomendasi)
Jika menggunakan **Laravel Herd**, project sudah terhubung di `http://jagain.test`. Cukup jalankan:
```bash
npm run dev
```
Buka browser dan akses: **`http://jagain.test`**

##### Opsi B: Menggunakan Dev Server Bawaan
Jalankan dev server secara simultan:
```bash
composer run dev
```
*Atau jalankan di dua terminal terpisah:*
- **Terminal 1 (Backend):** `php artisan serve` (berjalan di `http://127.0.0.1:8000`)
- **Terminal 2 (Frontend):** `npm run dev`

Buka browser dan akses: **`http://localhost:8000`**

---

### 4. Progress Saat Ini
Aplikasi telah mengimplementasikan seluruh alur kerja inti (*end-to-end*) mencakup portal publik, pelaporan warga, verifikasi admin, penanganan instansi operasional, serta pengujian terotomatisasi:

- [x] **Halaman Publik & Landing Page**:
  - **Landing Page Interaktif (`/`)**: Menampilkan statistik karhutla real-time, ringkasan laporan terbaru, banner peringatan darurat (Call 112), serta alur kerja transparansi JAGAIN.
  - **Peta Geospasial Karhutla (`/peta`)**: Peta interaktif Leaflet pulau Kalimantan dengan filter status, titik koordinat laporan publik, dan layer observasi titik panas satelit (*data simulasi berlabel transparan*).
  - **Pelacakan Laporan Publik (`/laporan-publik/{tracking_code}`)**: Pelacakan transparan perkembangan status laporan tanpa membocorkan data pribadi pelapor (*Zero-Leakage PII*).
  - **Halaman Edukasi & Informasi**: Panduan Keselamatan Karhutla (`/panduan-keselamatan`) dan Tentang Kami (`/tentang-kami`).

- [x] **Portal Pelaporan Warga (Citizen Portal)**:
  - **Formulir Laporan Karhutla (`/lapor`)**: Form pelaporan dengan pin point peta otomatis di wilayah Kalimantan, deteksi duplikasi, dan upload bukti foto kejadian.
  - **Daftar Laporan Saya (`/laporan-saya`)**: Riwayat dan status laporan yang pernah dikirim oleh pengguna.
  - **Tindak Lanjut Klarifikasi (`/laporan-saya/{code}`)**: Fitur interaktif bagi warga untuk menambahkan informasi/bukti tambahan jika diminta oleh verifikator (*status NEEDS_INFORMATION*).

- [x] **Portal Verifikator & Administrator (`/admin`)**:
  - **Dashboard Admin (`/admin/dashboard`)**: Metrik ringkasan status laporan, SLA respon instansi, dan grafik penanganan.
  - **Manajemen & Verifikasi Laporan (`/admin/reports`)**: Antrean telaah laporan, validasi bukti, pembaruan status laporan sesuai *state-machine*, dan penugasan laporan (*dispatch*) ke instansi terkait.
  - **Manajemen Instansi (`/admin/agencies`)**: Pengelolaan data OPD (BPBD, Manggala Agni KLHK, Dinas Pemadam Kebakaran).
  - **Audit Trail Forensik (`/admin/audit-logs`)**: Rekam jejak immutable seluruh mutasi status, penugasan, dan perubahan data transaksional sistem.
  - **Ekspor Data Laporan (`/admin/exports/reports`)**: Fitur rekapitulasi data laporan untuk kebutuhan analisis dan pelaporan formal.

- [x] **Portal Petugas Lapangan OPD / Instansi (`/opd`)**:
  - **Dashboard Tugas Instansi (`/opd/dashboard`)**: Antrean tugas penanganan karhutla khusus instansi terkait (terisolasi per instansi).
  - **Respon & Penerimaan Tugas (`/opd/tugas/{id}`)**: Aksi terima penugasan atau tolak dengan alasan resmi wajib.
  - **Pembaruan Progres & Bukti Lapangan**: Pencatatan log aktivitas pemadaman/patroli, upload foto penanganan, pembaruan kondisi fisik api (`fire_condition`), dan pengajuan review penyelesaian.

- [x] **Kualitas Kode, Keamanan & Pengujian**:
  - **Automated Tests**: 60 skenario automated feature & security test (Pest) mencakup alur pelaporan, validasi batas geofencing Kalimantan, otorisasi IDOR, dan state machine.
  - **Keamanan Ketat**: Object-Level Authorization (`ReportPolicy` & `AssignmentPolicy`), sanitasi data PII publik, pencegahan manipulasi status lintas instansi.
  - **Kerapian & Type Safety**: PHPStan Level 7 (Static Analysis) dan Laravel Pint (PSR-12).

---

## 🔑 Akun Uji Coba (Demo Accounts)

Aplikasi telah dilengkapi seeder basis data dengan akun percontohan untuk setiap peran:

| Peran | Email | Kata Sandi | Cakupan / Hak Akses |
|---|---|---|---|
| **Administrator** | `admin@jagain.id` | `password` | Review queue antrean laporan, deteksi duplikasi, verifikasi/penutupan berbayar alasan, penugasan ke instansi, audit trail log, manajemen OPD. |
| **Petugas OPD (BPBD Kalbar)** | `opd.kalbar@jagain.id` | `password` | Dashboard tugas instansi, respon penerimaan/penolakan (dengan alasan wajib), pencatatan progres penanganan di lapangan, pembaruan kondisi fisik api berdasar bukti. |
| **Petugas OPD (Manggala Agni Kalteng)** | `opd.kalteng@jagain.id` | `password` | Tugas instansi wilayah Kalimantan Tengah (Daops Kapuas & Palangka Raya). |
| **Masyarakat Pelapor** | `warga@jagain.id` | `password` | Pelaporan karhutla terverifikasi koordinat Kalimantan, pelacakan kronologi status mandiri, penambahan informasi bila diminta verifikator. |

> [!IMPORTANT]
> **Pemberitahuan Darurat:** JAGAIN adalah platform akuntabilitas publik dan transparansi koordinasi penanganan karhutla, **bukan pengganti kanal darurat resmi**. Jika Anda berada dalam bahaya langsung atau memerlukan pemadaman darurat seketika, hubungi **Panggilan Darurat 112** atau pos komando pemadam kebakaran terdekat.

---

## 🧪 Pengujian & Kualitas Kode

JAGAIN dibangun dengan standar rekayasa perangkat lunak ketat (Clean Architecture, Domain State Machines, Object-Level Authorization, Static Analysis Level 7, dan PSR-12).

### Menjalankan Automated Test Suite (Pest / PHPUnit)
```bash
# Jalankan seluruh 60 skenario automated feature & security tests:
vendor/bin/pest

# Atau uji spesifik domain JAGAIN (alur pelaporan, batas koordinat Kalimantan, otorisasi IDOR, state machine, penugasan OPD):
vendor/bin/pest tests/Feature/Jagain
```

### Pemeriksaan Type Safety & Linting
```bash
# Type check Backend (PHPStan Level 7)
composer types:check

# Type check Frontend (TypeScript Compiler)
npm run types:check

# Format Kode & Verifikasi PSR-12 (Laravel Pint)
vendor/bin/pint --test
```

---

## 🏛️ Arsitektur Domain & Model Data

### A. Tiga Konsep Status yang Terpisah (Kebenaran Data)
JAGAIN secara tegas membedakan 3 status berbeda agar tidak terjadi misinformasi kepada publik:

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

## 🛰️ Status Integrasi Eksternal & Data Simulasi

- **Titik Panas Satelit:** Sesuai prinsip kejujuran data, dataset satelit saat ini menggunakan data percontohan yang diberi label transparan **`DATA SIMULASI`** pada tampilan peta, legenda, dan popup detail.
- **Adapter Siap Integrasi:** Telah disediakan model `DataSource` dan tabel `external_observations` yang memisahkan waktu observasi fisik satelit (`observed_at`) dengan waktu data disinkronkan ke dalam sistem (`ingested_at`).
- Platform tidak mengklaim integrasi live streaming satelit jika token resmi LAPAN/BRIN atau NASA FIRMS belum dikonfigurasi di environment produksi.

---

## 📄 Lisensi & Hak Cipta
Hak Cipta © 2026 Tim Pengembang JAGAIN. Dikembangkan untuk transparansi dan percepatan penanggulangan karhutla di Indonesia.
