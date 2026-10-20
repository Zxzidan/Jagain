# JAGAIN — Technical Specification

**Nama produk:** JAGAIN  
**Dokumen:** `TECHNICAL.md`  
**Versi:** 1.0  
**Status:** Rancangan teknis implementasi  
**Catatan:** Pilihan teknologi final perlu disesuaikan dengan repository dan keputusan tim. Dokumen ini tidak mengasumsikan integrasi eksternal telah tersedia.

---

## 1. Tujuan

Dokumen ini menjelaskan batas arsitektur, domain model, keamanan, alur data, API konseptual, observabilitas, pengujian, dan proses deployment untuk JAGAIN. Tujuannya memastikan implementasi dapat diaudit, aman, dan konsisten dengan PRD.

## 2. Prinsip Teknis

- Validasi dan otorisasi dilakukan di server, bukan hanya di UI.
- Gunakan prinsip least privilege untuk setiap peran.
- Status laporan, status penugasan, dan kondisi kebakaran aktual merupakan konsep terpisah.
- Setiap perubahan status dan aksi administratif penting harus dapat diaudit.
- Data publik harus dipisahkan dari data privat.
- Data eksternal harus memiliki provenance, timestamp, dan label sumber.
- Integrasi yang belum diverifikasi tidak boleh diklaim aktif.
- Data simulasi harus ditandai secara eksplisit dan dipisahkan dari data produksi.
- Kegagalan sumber eksternal tidak boleh menghilangkan laporan internal.
- Hindari hard-code secret, kredensial, atau konfigurasi sensitif di repository.

## 3. Arsitektur Logis

Arsitektur konseptual terdiri dari:

1. **Web client**
   - Landing/public pages.
   - Peta dan daftar laporan.
   - Formulir laporan dan pelacakan.
   - Dashboard Admin dan OPD.
   - Menampilkan state loading, empty, error, dan success.

2. **Application/API layer**
   - Autentikasi dan sesi.
   - Otorisasi berbasis role dan permission.
   - Validasi request.
   - Logika bisnis laporan, review, penugasan, dan pembaruan.
   - Endpoint publik dengan pembatasan data.
   - Endpoint admin/OPD yang dilindungi.

3. **Database**
   - Pengguna, instansi, laporan, status history, penugasan, bukti, sumber data, dan audit log.
   - Constraint dan indeks untuk integritas serta query umum.

4. **Object/file storage**
   - Bukti foto/video jika fitur upload diaktifkan.
   - Akses privat secara default.
   - URL akses terbatas/berumur pendek bila sesuai.

5. **External data adapters (opsional)**
   - Adapter terpisah untuk setiap sumber.
   - Normalisasi data ke skema internal.
   - Logging waktu ingest dan status sinkronisasi.
   - Penanganan timeout, retry, rate limit, dan perubahan skema.

6. **Background jobs (opsional)**
   - Sinkronisasi sumber eksternal.
   - Pemrosesan file atau notifikasi.
   - Job harus idempoten dan dapat dipantau.

Arsitektur ini adalah rancangan logis. Jangan menyimpulkan bahwa layanan tertentu telah dipilih atau di-deploy tanpa bukti konfigurasi repository.

## 4. Pemilihan Stack

Stack aktual harus mengikuti repository yang ada. Jika repository belum menetapkan stack, evaluasi pilihan berdasarkan:
- Dukungan autentikasi dan authorization.
- Ekosistem peta dan geospasial.
- Kemudahan pengujian.
- Keamanan upload.
- Dukungan migration dan schema validation.
- Biaya dan kompleksitas deployment.
- Kemampuan tim untuk memelihara aplikasi.

Catat versi runtime, framework, database, dan library utama di README atau manifest. Hindari menambahkan dependency tanpa kebutuhan yang jelas.

## 5. Domain Model

Skema berikut adalah model konseptual; sesuaikan nama kolom dan tipe dengan database yang dipilih.

### 5.1 `users`
- `id`
- `display_name`
- `email` atau identifier login yang dipilih
- `password_hash` jika autentikasi password dikelola aplikasi
- `account_status`
- `created_at`
- `updated_at`

Jangan pernah menyimpan password plaintext. Jika menggunakan penyedia identitas eksternal, simpan identifier provider yang diperlukan dan jangan mengelola password provider.

### 5.2 `roles` / `permissions`
- Role: `PUBLIC`/unauthenticated, `COMMUNITY`, `ADMIN`, `AGENCY`
- Permission granular seperti `report.review`, `assignment.create`, `assignment.update`, `agency.manage`, `source.manage`, `audit.read`, `report.export`

Gunakan enum/constant yang konsisten dengan framework. Hindari pemeriksaan otorisasi hanya berdasarkan teks role di frontend.

### 5.3 `agencies`
- `id`
- `name`
- `agency_type`
- `jurisdiction`
- `is_active`
- `created_at`
- `updated_at`

Jangan menganggap nama atau kewenangan instansi telah diverifikasi sebelum dikonfirmasi.

### 5.4 `agency_memberships`
- `id`
- `user_id`
- `agency_id`
- `membership_status`
- `permissions` atau referensi role/permission
- `created_at`

Pastikan pengguna tidak dapat mengganti `agency_id` sendiri melalui request.

### 5.5 `reports`
- `id` atau ID publik yang tidak mudah ditebak
- `created_by_user_id`
- `title` atau ringkasan
- `description`
- `category_id`
- `latitude`
- `longitude`
- `location_description`
- `reported_occurrence_at` nullable
- `report_status`
- `visibility`
- `is_simulated`
- `created_at`
- `updated_at`

Validasi koordinat pada rentang yang benar dan batasi presisi jika diperlukan. Jangan menyimpan informasi pribadi ke kolom publik tanpa kebutuhan.

### 5.6 `evidence`
- `id`
- `report_id`
- `uploaded_by_user_id`
- `storage_key`
- `original_filename` yang telah disanitasi atau nama internal
- `media_type`
- `size_bytes`
- `checksum` bila diperlukan
- `captured_at` jika diketahui dan dapat dipercaya
- `created_at`
- `visibility`

Simpan file di storage, bukan sebagai blob database kecuali ada alasan teknis kuat. Jangan mempercayai `Content-Type` dari klien tanpa pemeriksaan.

### 5.7 `report_status_history`
- `id`
- `report_id`
- `from_status`
- `to_status`
- `actor_user_id`
- `reason`
- `note`
- `created_at`

Riwayat bersifat append-only dari perspektif aplikasi biasa.

### 5.8 `assignments`
- `id`
- `report_id`
- `agency_id`
- `assigned_by_user_id`
- `assignment_status`
- `decline_reason` nullable
- `assigned_at`
- `updated_at`

### 5.9 `assignment_history`
- `id`
- `assignment_id`
- `from_status`
- `to_status`
- `actor_user_id`
- `reason`
- `note`
- `created_at`

### 5.10 `operational_updates`
- `id`
- `assignment_id`
- `created_by_user_id`
- `update_type`
- `note`
- `evidence_id` nullable
- `created_at`

### 5.11 `data_sources`
- `id`
- `name`
- `source_type`
- `attribution_text`
- `documentation_url` nullable
- `integration_status`
- `last_successful_sync_at` nullable
- `created_at`
- `updated_at`

### 5.12 `external_observations`
- `id`
- `data_source_id`
- `external_record_id` nullable
- `latitude`
- `longitude`
- `observed_at` nullable
- `ingested_at`
- `confidence_or_quality_metadata` nullable
- `raw_metadata` terbatas dan disaring
- `is_simulated`

Data mentah dari sumber eksternal tidak boleh otomatis diperlakukan sebagai insiden terverifikasi.

### 5.13 `audit_logs`
- `id`
- `actor_user_id` nullable untuk sistem
- `action`
- `entity_type`
- `entity_id`
- `before_snapshot` terbatas/tersaring
- `after_snapshot` terbatas/tersaring
- `reason` nullable
- `request_id` nullable
- `created_at`

Jangan menulis password, token, secret, atau data pribadi yang tidak diperlukan ke audit log.

## 6. Status dan Transisi

### 6.1 Status laporan
- `SUBMITTED`
- `UNDER_REVIEW`
- `NEEDS_INFORMATION`
- `VERIFIED`
- `DISPATCHED`
- `RESOLUTION_REVIEW`
- `RESOLVED_VERIFIED`
- `CLOSED_WITH_REASON`

### 6.2 Status penugasan
- `ASSIGNED`
- `RECEIVED_BY_AGENCY`
- `DECLINED_BY_AGENCY`
- `IN_PROGRESS`
- `SUBMITTED_FOR_REVIEW`
- `COMPLETED`

### 6.3 Kondisi kebakaran
Jika disimpan, atribut ini terpisah dan selalu menyertakan provenance:
- `UNKNOWN`
- `REPORTED_ACTIVE`
- `OBSERVED_ACTIVE`
- `OBSERVED_CONTAINED`
- `OBSERVED_EXTINGUISHED`

Nilai `OBSERVED_*` hanya boleh digunakan ketika sumber observasi dan waktunya tercatat. Jangan otomatis menyimpulkan kondisi api dari status administratif laporan.

### 6.4 Aturan implementasi
- Implementasikan transisi melalui service/domain function tunggal, bukan dengan menerima status bebas dari klien.
- Validasi status saat ini, status tujuan, peran aktor, assignment scope, dan field wajib.
- Simpan perubahan status, history, dan audit log dalam transaksi database yang sama jika didukung.
- Gunakan concurrency control atau optimistic locking bila dua petugas dapat memperbarui objek bersamaan.
- Tolak transisi tidak valid dengan error yang konsisten.
- Jangan hard-delete history atau audit log melalui UI normal.

## 7. Otorisasi

### 7.1 Prinsip
Gunakan RBAC ditambah pemeriksaan cakupan objek (object-level authorization). Role saja tidak cukup untuk mengizinkan akses ke semua laporan.

### 7.2 Contoh aturan
- Pengunjung: hanya data yang ditetapkan publik.
- Masyarakat: mengirim laporan; melihat dan melengkapi laporan miliknya.
- Admin: akses sesuai permission admin; perubahan penting masuk audit.
- OPD: melihat penugasan untuk instansi terkait dan memperbarui tugas sesuai permission.
- OPD tidak boleh membaca laporan privat yang tidak ditugaskan kepadanya, kecuali ada aturan akses yang eksplisit.
- Ekspor harus menerapkan filter akses yang sama dengan tampilan.
- Validasi izin dilakukan di server pada setiap endpoint/action.

## 8. API Konseptual

Endpoint berikut adalah kontrak konseptual, bukan klaim bahwa route tersebut sudah tersedia. Sesuaikan prefix, metode, dan format respons dengan framework.

| Metode | Path konseptual | Akses | Tujuan |
|---|---|---|---|
| `GET` | `/api/public/reports` | Publik | Daftar laporan yang boleh ditampilkan |
| `GET` | `/api/public/reports/:id` | Publik sesuai visibility | Detail laporan publik |
| `POST` | `/api/reports` | Masyarakat login | Membuat laporan |
| `GET` | `/api/me/reports` | Masyarakat login | Laporan milik sendiri |
| `GET` | `/api/me/reports/:id` | Pemilik/role berizin | Detail dan kronologi |
| `POST` | `/api/reports/:id/evidence` | Pemilik/role berizin | Unggah bukti |
| `GET` | `/api/admin/reports` | Admin berizin | Antrean review |
| `POST` | `/api/admin/reports/:id/transitions` | Admin berizin | Transisi status tervalidasi |
| `POST` | `/api/admin/reports/:id/assignments` | Admin berizin | Membuat penugasan |
| `GET` | `/api/agency/assignments` | OPD berizin | Daftar penugasan instansi |
| `POST` | `/api/agency/assignments/:id/transitions` | OPD berizin | Terima/tolak/perbarui status |
| `POST` | `/api/agency/assignments/:id/updates` | OPD berizin | Menambahkan update operasional |
| `GET` | `/api/admin/audit-logs` | Admin dengan permission audit | Melihat audit log |
| `GET` | `/api/admin/exports/reports` | Admin berizin | Ekspor sesuai cakupan akses |

### 8.1 Standar request/response
- Gunakan JSON untuk API kecuali unggahan file.
- Validasi tipe, panjang, format, dan rentang setiap field.
- Gunakan kode HTTP yang tepat.
- Respons error tidak boleh menyertakan stack trace atau secret.
- Gunakan pagination untuk daftar besar.
- Tetapkan sorting dan filtering yang diizinkan secara eksplisit.
- Terapkan rate limiting pada autentikasi, laporan, upload, dan endpoint sensitif.
- Gunakan request/correlation ID untuk investigasi error.
- Dokumentasikan schema request dan response jika API publik/internal dipakai oleh beberapa klien.

## 9. Integrasi Sumber Data Eksternal

Sumber potensial seperti layanan pemerintah atau meteorologi hanya boleh digunakan setelah akses, dokumentasi, atribusi, lisensi, dan skema diperiksa. Nama sumber potensial bukan bukti bahwa integrasi tersedia.

Untuk setiap adapter:
1. Dokumentasikan pemilik sumber dan URL dokumentasi resmi.
2. Verifikasi cara akses dan ketentuan penggunaan.
3. Petakan field sumber ke skema internal.
4. Simpan waktu observasi dari sumber dan waktu ingest lokal secara terpisah.
5. Simpan identifier eksternal bila tersedia untuk deduplikasi.
6. Tangani timeout, retry dengan backoff, rate limit, dan perubahan skema.
7. Catat status sinkronisasi dan `last_successful_sync_at`.
8. Hindari menghapus data sebelumnya saat satu sinkronisasi gagal.
9. Beri label sumber dan batasan interpretasi pada UI.
10. Pisahkan data simulasi dari data produksi.

Jangan menampilkan “real-time” kecuali latensi dan frekuensi pembaruan benar-benar diukur dan dijelaskan.

## 10. Keamanan

### 10.1 Autentikasi dan sesi
- Gunakan library/provider yang terpelihara.
- Hash password dengan algoritma modern yang direkomendasikan framework jika password dikelola sendiri.
- Gunakan cookie sesi yang aman atau token dengan lifecycle dan storage yang sesuai.
- Terapkan perlindungan CSRF bila model autentikasi membutuhkannya.
- Sediakan pembatasan percobaan login dan alur pemulihan akun yang aman.

### 10.2 Validasi input
- Validasi di sisi server untuk semua field.
- Sanitasi teks sesuai konteks rendering.
- Validasi koordinat dan ukuran field.
- Gunakan query parameterized/ORM dengan aman.
- Jangan membangun query database dari string input tanpa parameterisasi.

### 10.3 Upload file
- Allowlist tipe file yang didukung.
- Batasi ukuran dan jumlah file berdasarkan konfigurasi.
- Periksa signature/magic bytes jika sesuai.
- Buat nama storage internal; jangan menggunakan nama file pengguna sebagai path.
- Simpan file di lokasi privat secara default.
- Gunakan URL sementara atau endpoint terotorisasi untuk akses.
- Pertimbangkan pemindaian malware dan penghapusan metadata sensitif sesuai kebutuhan.
- Jangan menjalankan file unggahan sebagai konten aktif.

### 10.4 Data pribadi dan audit
- Minimalkan data pribadi.
- Terapkan kebijakan retensi dan akses.
- Redaksi data sensitif dari log.
- Lindungi endpoint ekspor.
- Catat aksi sensitif tanpa merekam secret.

### 10.5 Konfigurasi
- Simpan secret di environment/secret manager.
- Sediakan `.env.example` hanya dengan placeholder non-rahasia.
- Jangan commit `.env` atau kredensial.
- Gunakan HTTPS di deployment produksi.
- Terapkan dependency updates dan pemeriksaan kerentanan sesuai proses tim.

## 11. Geospasial dan Peta

- Validasi latitude dalam rentang `-90..90` dan longitude `-180..180`.
- Tentukan sistem koordinat dan format penyimpanan secara konsisten.
- Gunakan indeks geospasial jika database mendukung dan kebutuhan query membenarkannya.
- Batasi jumlah fitur yang dikirim pada satu permintaan; gunakan bounding box atau clustering jika perlu.
- Filter data berdasarkan visibility dan permission sebelum dikirim ke klien.
- Setiap layer harus memiliki sumber, timestamp, dan legenda.
- Titik panas satelit bukan bukti definitif api di permukaan.
- Data simulasi harus memiliki atribut eksplisit seperti `is_simulated=true` dan label UI.
- Jangan menaruh informasi sensitif pelapor pada popup publik.

## 12. Audit Trail

Audit minimal untuk:
- Perubahan status laporan.
- Permintaan informasi tambahan.
- Keputusan verifikasi atau penutupan.
- Pembuatan, perubahan, atau pembatalan penugasan.
- Penerimaan/penolakan tugas.
- Pembaruan progres dan pengajuan penyelesaian.
- Perubahan permission, keanggotaan instansi, dan konfigurasi.
- Ekspor data.
- Perubahan konfigurasi sumber data.

Setiap record sebaiknya mencatat aktor, aksi, entitas, waktu, request ID, dan alasan jika relevan. Batasi akses baca audit log. Jangan sediakan fungsi edit/hapus audit log untuk pengguna aplikasi biasa.

## 13. Logging dan Observabilitas

- Gunakan structured logging bila tersedia.
- Sertakan request/correlation ID.
- Log error integrasi, kegagalan upload, kegagalan job, dan penolakan transisi status.
- Hindari log payload penuh jika berisi data pribadi.
- Buat health check untuk aplikasi dan dependency yang relevan.
- Pantau tingkat error, latensi, kegagalan job, dan waktu sinkronisasi sumber eksternal.
- Jangan menampilkan detail observabilitas internal kepada pengguna akhir.

## 14. Strategi Pengujian

### Unit tests
- Validasi field laporan.
- Aturan transisi status.
- Otorisasi berdasarkan role dan cakupan instansi.
- Normalisasi data eksternal.
- Aturan visibilitas publik.

### Integration tests
- Pembuatan laporan dan history.
- Transisi status beserta audit log.
- Pembuatan penugasan dan pembatasan akses OPD.
- Upload dan akses bukti.
- Pagination dan filter API.
- Kegagalan integrasi eksternal.

### End-to-end tests
- Pengguna mengirim dan melacak laporan.
- Admin meninjau dan menugaskan laporan.
- OPD menerima/menolak dan memperbarui progres.
- Pengguna yang tidak berwenang ditolak.
- Data simulasi tampil dengan label yang benar.

### Security checks
- Uji akses langsung ke objek milik pengguna lain.
- Uji privilege escalation.
- Uji validasi upload.
- Uji rate limiting.
- Uji kebocoran data pribadi pada API publik, log, dan ekspor.
- Uji transisi status tidak valid.

## 15. Migrasi dan Integritas Data

- Gunakan migration versioned.
- Jangan mengubah schema produksi secara manual tanpa prosedur yang terdokumentasi.
- Siapkan backup dan rencana rollback.
- Tambahkan constraint untuk foreign key, unique identifier, dan field wajib.
- Gunakan transaksi untuk operasi yang mengubah status, history, assignment, dan audit log.
- Rencanakan penanganan duplikasi berdasarkan identifier sumber atau kemiripan lokasi/waktu; jangan menggabungkan laporan otomatis tanpa review yang sesuai.

## 16. Deployment dan Environment

Environment minimum:
- `development`
- `test`
- `production`

Ketentuan:
- Pisahkan database dan storage per environment.
- Gunakan konfigurasi environment dan secret manager.
- Jangan memakai data pribadi produksi di development tanpa dasar dan perlindungan yang sesuai.
- Jalankan migration dengan prosedur yang dapat diulang.
- Sediakan backup dan uji pemulihan.
- Gunakan HTTPS di produksi.
- Siapkan monitoring error dan pemeriksaan kesehatan.
- Tampilkan label simulasi secara jelas jika demo menggunakan dataset buatan.
- Dokumentasikan langkah build, test, migrate, dan deploy dalam README proyek.

## 17. Variabel Konfigurasi

Nama berikut contoh konseptual dan perlu disesuaikan dengan stack:
- `APP_ENV`
- `APP_BASE_URL`
- `DATABASE_URL`
- `AUTH_SECRET` atau konfigurasi provider autentikasi
- `STORAGE_BUCKET` / konfigurasi storage
- `EXTERNAL_SOURCE_*` untuk setiap integrasi yang sudah diverifikasi
- `LOG_LEVEL`

Jangan memasukkan nilai rahasia ke file contoh. Validasi konfigurasi wajib saat aplikasi startup agar aplikasi gagal dengan pesan internal yang aman jika konfigurasi kritis tidak tersedia.

## 18. Penanganan Error

Gunakan bentuk error konsisten, misalnya:
- `code`: kode stabil untuk aplikasi.
- `message`: pesan aman dan dapat dipahami.
- `requestId`: identifier untuk dukungan teknis.
- `details`: hanya field validation yang aman untuk ditampilkan.

Jangan mengembalikan stack trace, query SQL, path server, secret, atau data privat. Bedakan error validasi, autentikasi, otorisasi, konflik status, rate limit, dan kegagalan dependency.

## 19. Kriteria Kesiapan Teknis

Implementasi siap untuk review jika:
- Otorisasi dilakukan di server dan diuji.
- Transisi status terpusat dan divalidasi.
- History dan audit log tercatat secara konsisten.
- Data privat tidak dapat diakses melalui endpoint publik.
- Upload aman atau dinonaktifkan sampai kontrolnya tersedia.
- Data eksternal menyimpan sumber dan timestamp.
- Data simulasi tidak tercampur tanpa label.
- Error tidak membocorkan detail internal.
- Test utama berjalan di CI atau prosedur lokal yang terdokumentasi.
- Setup lokal dan deployment dijelaskan di README.
- Tidak ada secret yang ter-commit.
- Semua klaim integrasi sesuai dengan implementasi aktual.

## 20. Checklist Implementasi

- [ ] Konfirmasi stack dan struktur repository.
- [ ] Implementasikan schema dan migrations.
- [ ] Implementasikan autentikasi dan RBAC/object-level authorization.
- [ ] Implementasikan pembuatan laporan dan validasi server-side.
- [ ] Implementasikan status history dan audit log.
- [ ] Implementasikan review admin.
- [ ] Implementasikan assignment dan dashboard OPD.
- [ ] Implementasikan penyimpanan bukti yang aman atau nonaktifkan upload.
- [ ] Implementasikan endpoint publik dengan field allowlist.
- [ ] Implementasikan penanda sumber dan data simulasi.
- [ ] Tambahkan unit, integration, E2E, dan security tests.
- [ ] Dokumentasikan environment, migration, backup, dan deployment.
- [ ] Verifikasi akses, atribusi, dan ketentuan setiap sumber data eksternal sebelum mengaktifkannya.
