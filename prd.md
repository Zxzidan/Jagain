# JAGAIN — Product Requirements Document (PRD)

**Nama produk:** JAGAIN  
**Makna:** Jaga Hutan, Kawal Penanganan  
**Tagline:** Pantau Karhutla. Kawal Penanganannya.  
**Versi dokumen:** 1.0  
**Status:** Draft implementasi  
**Fokus awal:** Karhutla di Kalimantan

---

## 1. Ringkasan Produk

JAGAIN adalah platform informasi dan akuntabilitas untuk membantu masyarakat memantau laporan kebakaran hutan dan lahan (karhutla), melihat status verifikasi, dan mengikuti tindak lanjut laporan oleh instansi terkait. Platform menghubungkan pelaporan masyarakat, proses pemeriksaan, penugasan kepada OPD/instansi, pembaruan penanganan, dan tampilan publik yang transparan.

JAGAIN bukan sistem tanggap darurat resmi, bukan pengganti layanan darurat, dan tidak memiliki kewenangan penegakan hukum. Platform tidak boleh menyatakan bahwa laporan telah ditangani atau kebakaran telah padam tanpa bukti yang sesuai.

## 2. Masalah yang Ingin Diselesaikan

1. Masyarakat kesulitan mengetahui apakah laporan karhutla telah diterima, diverifikasi, atau ditindaklanjuti.
2. Status laporan dan penanganan dapat tersebar di banyak kanal.
3. Informasi publik sering tidak menjelaskan sumber, waktu pembaruan, atau tingkat verifikasi.
4. Petugas membutuhkan alur yang konsisten untuk memeriksa laporan, meminta informasi tambahan, dan mencatat tindak lanjut.
5. Publik membutuhkan cara membedakan laporan warga, titik panas satelit, insiden terverifikasi, dan data simulasi.

## 3. Tujuan Produk

### 3.1 Tujuan utama
- Meningkatkan transparansi perjalanan laporan karhutla.
- Membantu masyarakat mengirim laporan yang terstruktur dan melacak perkembangannya.
- Menyediakan alur kerja yang dapat diaudit bagi admin dan OPD.
- Menampilkan data beserta sumber, waktu pembaruan, dan status verifikasinya.
- Mendukung koordinasi dan akuntabilitas tanpa mengklaim sebagai sistem komando darurat.

### 3.2 Indikator keberhasilan
Target numerik ditetapkan setelah baseline dan uji coba awal tersedia. Indikator yang dapat diukur:
- Persentase laporan yang memiliki lokasi dan informasi minimum yang valid.
- Waktu median dari pengiriman ke pemeriksaan awal.
- Persentase laporan yang memiliki status dan riwayat perubahan yang lengkap.
- Persentase penugasan yang memiliki keputusan penerimaan/penolakan beserta alasan.
- Persentase laporan publik yang menampilkan sumber data dan waktu pembaruan dengan benar.
- Tingkat keberhasilan pengguna menyelesaikan tugas utama dalam usability test.

Jangan mengisi dashboard dengan angka target atau statistik yang belum didukung data nyata.

## 4. Non-Goals dan Batasan

JAGAIN tidak bertujuan untuk:
- Menggantikan nomor darurat atau kanal resmi pemerintah.
- Menjadi sistem dispatch atau komando operasional resmi.
- Menjamin kebenaran setiap laporan yang masuk.
- Mengidentifikasi pelaku atau menetapkan kesalahan hukum.
- Mengklaim titik panas satelit sebagai bukti pasti kebakaran di permukaan.
- Menyediakan data real-time jika integrasi, lisensi, dan frekuensi pembaruannya belum diverifikasi.
- Menampilkan identitas, kontak, atau lokasi sensitif pelapor kepada publik secara default.

## 5. Pengguna dan Peran

### 5.1 Masyarakat
Kebutuhan:
- Melihat peta dan laporan publik tanpa harus masuk.
- Mengirim laporan dengan lokasi, waktu, deskripsi, dan bukti jika tersedia.
- Melacak laporan milik sendiri.
- Memahami status dan langkah berikutnya.
- Menerima pembaruan jika kanal notifikasi diimplementasikan.
- Mendapat panduan keselamatan yang tidak mendorong tindakan berbahaya.

Hak dan batasan:
- Pengunjung dapat melihat informasi publik.
- Akun diperlukan untuk mengirim dan melacak laporan pribadi, kecuali produk memutuskan mekanisme alternatif yang aman.
- Pengguna hanya dapat mengelola laporan miliknya sesuai aturan.
- Data pribadi tidak ditampilkan secara publik tanpa dasar yang sesuai.

### 5.2 Admin
Kebutuhan:
- Meninjau laporan masuk.
- Menandai laporan sebagai perlu informasi, duplikat, atau terverifikasi.
- Mengelola penugasan dan koordinasi.
- Mengelola pengguna, instansi/OPD, wilayah kewenangan, kategori, dan sumber data sesuai izin.
- Melihat riwayat tindakan dan mengekspor data yang diizinkan.

Hak dan batasan:
- Akses diberikan berbasis role dan permission.
- Aksi penting harus masuk audit trail.
- Admin tidak boleh menghapus jejak perubahan untuk menyamarkan tindakan.

### 5.3 OPD / Instansi Penanganan
Contoh jenis instansi dapat mencakup BPBD, dinas pemadam, atau instansi lain yang berwenang sesuai konfigurasi dan kesepakatan. Nama instansi dan kewenangannya harus diverifikasi sebelum digunakan pada produksi.

Kebutuhan:
- Melihat tugas yang ditugaskan kepada instansi dan berada dalam cakupan kewenangannya.
- Menerima atau menolak penugasan dengan alasan.
- Memperbarui progres dan menambahkan catatan/bukti tindak lanjut.
- Melihat riwayat penugasan dan ringkasan kinerja berdasarkan data yang tercatat.

Hak dan batasan:
- Setiap akun OPD terhubung ke instansi dan wilayah kewenangan.
- OPD hanya dapat mengakses laporan dan penugasan yang diizinkan.
- OPD tidak dapat mengubah hasil verifikasi atau konfigurasi global kecuali diberi permission khusus.

## 6. Ruang Lingkup MVP

### P0 — wajib untuk MVP
- Landing page dan penjelasan batasan platform.
- Peta atau daftar laporan publik dengan sumber dan status yang jelas.
- Registrasi/login bagi pengguna yang membuat laporan.
- Formulir laporan karhutla.
- Unggah bukti jika storage dan kebijakan keamanan telah disiapkan.
- Pelacakan laporan milik pengguna.
- Alur pemeriksaan laporan oleh admin.
- Penugasan laporan ke OPD/instansi.
- Dashboard OPD untuk menerima/menolak penugasan dan memperbarui progres.
- Riwayat status dan audit trail.
- Role-based access control.
- Validasi server-side dan perlindungan data pribadi.
- Penanda data simulasi bila belum ada integrasi data eksternal.
- State loading, empty, error, dan success.

### P1 — setelah MVP stabil
- Notifikasi email atau kanal lain.
- Filter dan ekspor laporan lanjutan.
- Analitik kinerja yang lebih lengkap.
- Integrasi sumber data eksternal setelah akses, lisensi, dan skema diverifikasi.
- Moderasi lanjutan untuk spam, duplikasi, dan penyalahgunaan.
- Dukungan beberapa wilayah administratif dengan konfigurasi.

### Di luar MVP kecuali disepakati
- Aplikasi mobile native.
- Dispatch operasional atau pelacakan armada.
- Prediksi risiko berbasis machine learning.
- Pengambilan keputusan otomatis untuk memverifikasi atau menutup laporan.
- Integrasi resmi yang belum memiliki akses dan dokumentasi tervalidasi.

## 7. Alur Utama

### 7.1 Pelaporan masyarakat
1. Pengguna membuka halaman laporan.
2. Sistem menampilkan panduan singkat dan peringatan keselamatan.
3. Pengguna mengisi lokasi, waktu yang diketahui, deskripsi, kategori, dan bukti opsional.
4. Sistem memvalidasi input di sisi klien dan server.
5. Pengguna mengirim laporan.
6. Sistem membuat ID laporan dan status awal `SUBMITTED`.
7. Pengguna menerima konfirmasi dan dapat membuka halaman pelacakan.

### 7.2 Pemeriksaan admin
1. Admin membuka antrean laporan baru.
2. Admin memeriksa lokasi, deskripsi, bukti, potensi duplikasi, dan sumber.
3. Admin dapat meminta informasi tambahan, menandai duplikat, atau memverifikasi laporan.
4. Sistem menyimpan keputusan, alasan/catatan, pelaku tindakan, dan timestamp.
5. Laporan yang sesuai dapat ditugaskan ke instansi.

### 7.3 Penanganan OPD
1. OPD melihat penugasan yang tersedia untuk instansinya.
2. OPD menerima atau menolak dengan alasan.
3. Jika diterima, OPD memperbarui progres dan menambahkan bukti/catatan sesuai izin.
4. Admin atau petugas berwenang meninjau hasil penanganan.
5. Status penyelesaian administratif tidak otomatis berarti kebakaran telah padam.
6. Penutupan harus memiliki alasan dan jejak audit.

## 8. Model Status

Status laporan dan status penugasan harus dipisahkan dari kondisi kebakaran aktual.

### 8.1 Status laporan
- `SUBMITTED` — laporan baru dikirim.
- `UNDER_REVIEW` — sedang diperiksa.
- `NEEDS_INFORMATION` — informasi tambahan dibutuhkan.
- `VERIFIED` — laporan dinilai memenuhi kriteria verifikasi internal.
- `DISPATCHED` — laporan telah ditugaskan ke instansi.
- `RESOLUTION_REVIEW` — tindak lanjut diajukan dan sedang ditinjau.
- `RESOLVED_VERIFIED` — tindak lanjut dinilai selesai berdasarkan bukti dan aturan yang berlaku.
- `CLOSED_WITH_REASON` — ditutup dengan alasan yang tercatat, misalnya duplikat atau tidak memenuhi kriteria.

### 8.2 Status penugasan
- `ASSIGNED` — penugasan dibuat.
- `RECEIVED_BY_AGENCY` — instansi menerima penugasan.
- `DECLINED_BY_AGENCY` — instansi menolak penugasan dengan alasan.
- `IN_PROGRESS` — penanganan dilaporkan sedang berlangsung.
- `SUBMITTED_FOR_REVIEW` — instansi mengajukan pembaruan/hasil untuk ditinjau.
- `COMPLETED` — penugasan ditandai selesai sesuai aturan yang ditetapkan.

### 8.3 Kondisi kebakaran aktual
Jika dicatat, gunakan atribut terpisah dengan sumber dan waktu observasi, misalnya:
- `UNKNOWN`
- `REPORTED_ACTIVE`
- `OBSERVED_ACTIVE`
- `OBSERVED_CONTAINED`
- `OBSERVED_EXTINGUISHED`

Nilai tersebut hanya boleh digunakan jika didukung informasi yang relevan. Label harus menjelaskan siapa/sumber apa yang menyampaikan kondisi tersebut dan kapan. Jangan menganggap `RESOLVED_VERIFIED` atau `CLOSED_WITH_REASON` sebagai bukti api padam.

### 8.4 Validasi transisi
- Semua transisi status divalidasi di server.
- Setiap perubahan menyimpan status sebelumnya, status baru, aktor, timestamp, dan alasan/catatan jika relevan.
- Transisi yang tidak diizinkan harus ditolak.
- Pengguna tidak dapat mengubah status langsung melalui payload tanpa izin.
- Perubahan status penting memicu notifikasi hanya jika sistem notifikasi tersedia.

## 9. Persyaratan Fungsional

### FR-01 — Informasi publik
Pengunjung dapat melihat peta/daftar laporan publik, filter yang tersedia, detail laporan yang boleh dipublikasikan, sumber data, waktu pembaruan, dan status verifikasi.

### FR-02 — Autentikasi dan akun
Pengguna dapat membuat akun dan masuk secara aman. Sistem menyediakan penanganan kegagalan login, sesi, dan pemulihan akun sesuai implementasi.

### FR-03 — Pengiriman laporan
Pengguna terautentikasi dapat mengirim laporan dengan data minimum yang ditetapkan. Server memvalidasi semua input dan membuat ID laporan unik.

### FR-04 — Bukti
Jika unggahan diaktifkan, sistem membatasi tipe dan ukuran file, memeriksa nama file, menyimpan file secara aman, dan tidak mengekspos file privat tanpa otorisasi.

### FR-05 — Pelacakan
Pengguna dapat melihat laporan miliknya, status saat ini, kronologi, dan permintaan informasi tambahan. Pengguna tidak dapat melihat laporan privat milik orang lain.

### FR-06 — Review admin
Admin berizin dapat meninjau, meminta informasi tambahan, menandai duplikat, memverifikasi, menutup dengan alasan, dan mencatat keputusan.

### FR-07 — Penugasan
Admin berizin dapat menugaskan laporan ke instansi yang terdaftar, dengan wilayah kewenangan dan riwayat penugasan.

### FR-08 — Dashboard OPD
OPD berizin dapat melihat penugasan yang sesuai dengan instansi dan cakupan wilayahnya, menerima/menolak dengan alasan, serta memperbarui progres.

### FR-09 — Audit trail
Aksi sensitif dan perubahan status dicatat dengan aktor, waktu, objek, perubahan, dan alasan jika relevan. Audit log tidak dapat diedit oleh pengguna biasa.

### FR-10 — Pengelolaan konfigurasi
Admin yang memiliki izin dapat mengelola kategori, wilayah, instansi, dan sumber data. Perubahan konfigurasi harus tercatat.

### FR-11 — Ekspor
Jika tersedia, ekspor hanya menyertakan data yang boleh diakses oleh pengguna dan mencatat tindakan ekspor bila diperlukan.

### FR-12 — Integrasi data eksternal
Integrasi hanya boleh diaktifkan setelah sumber, akses, skema, lisensi, frekuensi pembaruan, dan penanganan kegagalan diverifikasi. Data eksternal harus menyimpan provenance.

### FR-13 — Penanganan error
Sistem memberikan pesan error yang ramah pengguna, tanpa menampilkan stack trace, secret, atau detail internal.

## 10. Persyaratan Non-Fungsional

- **Keamanan:** autentikasi aman, authorization server-side, validasi input, proteksi upload, rate limiting untuk endpoint sensitif, dan pengelolaan secret melalui environment/configuration yang aman.
- **Privasi:** minimalkan data pribadi; pisahkan data publik dan privat; batasi akses dan retensi sesuai kebijakan yang disepakati.
- **Auditabilitas:** status, penugasan, dan aksi administratif dapat ditelusuri.
- **Aksesibilitas:** target praktik WCAG 2.2 AA.
- **Responsif:** fungsi utama dapat digunakan di mobile, tablet, dan desktop.
- **Kinerja:** target teknis ditentukan setelah lingkungan deployment dan baseline diukur; gunakan pagination dan query efisien.
- **Reliabilitas:** kegagalan integrasi eksternal tidak boleh membuat laporan internal hilang.
- **Maintainability:** struktur kode, schema, dan dokumentasi konsisten.
- **Kejujuran data:** sumber, timestamp, status verifikasi, dan penanda simulasi tidak boleh dihilangkan ketika relevan.

## 11. Data dan Entitas Utama

Entitas konseptual minimum:
- `User`: identitas akun, status akun, dan peran.
- `Agency`: nama instansi, jenis, status, dan informasi resmi yang telah diverifikasi.
- `AgencyMembership`: hubungan pengguna dengan instansi dan permission.
- `Report`: deskripsi, lokasi, waktu kejadian yang dilaporkan, kategori, pemilik, dan status.
- `Evidence`: metadata file, pemilik, sumber, timestamp, dan izin akses.
- `ReportStatusHistory`: perubahan status laporan.
- `Assignment`: laporan yang ditugaskan, instansi, status penugasan, alasan, dan timestamp.
- `AssignmentHistory`: perubahan status penugasan.
- `OperationalUpdate`: progres, catatan, dan bukti tindak lanjut.
- `DataSource`: nama sumber, jenis, atribusi, konfigurasi, dan status integrasi.
- `ExternalObservation`: observasi dari sumber eksternal, waktu observasi, waktu ingest, lokasi, dan metadata sumber.
- `AuditLog`: aktor, tindakan, objek, perubahan, timestamp, dan metadata yang aman.

Skema final, tipe data, indeks, dan relasi ditentukan di dokumen teknis berdasarkan stack yang dipilih.

## 12. Aturan Data dan Transparansi

Setiap titik/rekaman yang tampil ke publik harus dapat diklasifikasikan, jika relevan, sebagai:
- Laporan masyarakat.
- Titik panas/observasi satelit dari sumber eksternal.
- Insiden yang diverifikasi oleh proses internal.
- Data simulasi untuk demo atau pengujian.

Simpan dan tampilkan:
- Sumber data.
- Waktu kejadian/observasi jika diketahui.
- Waktu data diterima atau diperbarui oleh sistem.
- Status verifikasi.
- Batasan interpretasi.
- Label simulasi untuk data non-produksi.

Jangan menggabungkan jenis data berbeda seolah memiliki tingkat kepastian yang sama.

## 13. Privasi, Keselamatan, dan Moderasi

- Jangan mempublikasikan nama, nomor telepon, email, atau informasi sensitif pelapor secara default.
- Pertimbangkan redaksi metadata gambar yang dapat mengungkap informasi pribadi atau lokasi sensitif.
- Sediakan cara melaporkan penyalahgunaan atau konten berbahaya jika ruang lingkup memungkinkan.
- Beri panduan agar masyarakat tidak mendekati api, asap pekat, atau area berbahaya untuk mengambil bukti.
- Jelaskan bahwa laporan pada JAGAIN tidak menggantikan pelaporan kepada layanan resmi dalam keadaan darurat.
- Tetapkan kebijakan retensi, penghapusan, dan permintaan data sebelum peluncuran publik.

## 14. Analitik dan Logging

Catat peristiwa produk yang relevan tanpa mengumpulkan data pribadi secara berlebihan:
- Laporan dikirim.
- Review dimulai dan keputusan review dibuat.
- Penugasan dibuat, diterima, atau ditolak.
- Pembaruan progres diajukan.
- Status penyelesaian ditinjau.
- Ekspor data dilakukan.
- Kegagalan integrasi atau unggahan.

Jangan mencatat password, token autentikasi, secret, atau konten privat yang tidak dibutuhkan.

## 15. Kriteria Penerimaan MVP

MVP dapat diterima jika:
1. Pengunjung dapat melihat informasi publik dengan label sumber dan status yang sesuai.
2. Pengguna dapat mengirim laporan valid dan mendapatkan ID laporan.
3. Pengguna hanya dapat mengakses laporan privat miliknya.
4. Admin dapat memeriksa laporan dan melakukan transisi status yang diizinkan.
5. Admin dapat menugaskan laporan ke instansi yang valid.
6. OPD hanya dapat mengakses penugasan yang diizinkan dan memperbarui progres sesuai permission.
7. Semua transisi status dan aksi sensitif tercatat.
8. Status laporan, status penugasan, dan kondisi kebakaran tidak dicampur menjadi satu.
9. Data simulasi terlihat jelas sebagai simulasi.
10. Integrasi eksternal yang belum diverifikasi tidak diklaim aktif.
11. Formulir, peta, dan dashboard memiliki state loading, empty, error, dan success yang sesuai.
12. UI responsif dan dapat dinavigasi menggunakan keyboard untuk fungsi utama.

## 16. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Laporan palsu atau spam | Moderasi, rate limiting, pemeriksaan duplikasi, audit trail |
| Data satelit disalahartikan | Label sumber, penjelasan keterbatasan, waktu observasi |
| Kebocoran data pelapor | Minimasi data, kontrol akses, pemisahan publik/privat |
| Status dianggap sebagai bukti api padam | Pisahkan status laporan dan kondisi aktual; wajibkan sumber bukti |
| Integrasi eksternal gagal | Tampilkan status pembaruan, tangani error, jangan hilangkan data internal |
| Penugasan salah instansi | Validasi kewenangan, konfirmasi, riwayat perubahan |
| Statistik palsu saat demo | Gunakan empty state atau dataset simulasi berlabel jelas |

## 17. Keputusan yang Masih Perlu Dikonfirmasi

Sebelum produksi, tim perlu menetapkan:
- Stack dan arsitektur akhir.
- Penyedia autentikasi dan penyimpanan bukti.
- Kebijakan privasi, retensi, moderasi, dan penghapusan.
- Sumber data eksternal yang benar-benar dapat diakses dan ketentuan penggunaannya.
- Definisi operasional verifikasi dan penyelesaian.
- Daftar instansi, pejabat pengelola, serta wilayah kewenangan yang telah dikonfirmasi.
- Kanal notifikasi yang akan didukung.
- Target kinerja dan kapasitas setelah baseline tersedia.
