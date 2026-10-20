# JAGAIN — Design System & UI/UX Specification

**Nama produk:** JAGAIN  
**Makna:** Jaga Hutan, Kawal Penanganan  
**Tagline:** Pantau Karhutla. Kawal Penanganannya.  
**Dokumen:** `design.md`  
**Versi:** 1.1  
**Status:** Spesifikasi desain untuk implementasi

---

## 1. Tujuan Desain

JAGAIN adalah platform transparansi dan akuntabilitas penanganan kebakaran hutan dan lahan (karhutla), dengan fokus wilayah Kalimantan. Desain harus membantu masyarakat memahami laporan, melihat perkembangan penanganan, dan membedakan informasi yang sudah diverifikasi dari informasi yang masih perlu diperiksa.

Pengalaman pengguna harus terasa:
- Profesional, tenang, jelas, dan dapat dipercaya.
- Minimalis dengan ruang kosong yang cukup.
- Mudah dipahami oleh masyarakat umum, petugas OPD, dan admin.
- Responsif di perangkat mobile maupun desktop.
- Transparan mengenai sumber, waktu pembaruan, status verifikasi, dan keterbatasan data.

JAGAIN bukan sistem tanggap darurat resmi dan bukan pengganti layanan darurat atau kanal resmi pemerintah.

## 2. Prinsip Visual

1. **Clarity first:** informasi penting, status, lokasi, waktu, dan tindakan berikutnya harus mudah ditemukan.
2. **Minimalis tanpa mengurangi fungsi:** hapus ornamen yang tidak membantu, bukan fitur yang dibutuhkan.
3. **Trust through transparency:** tampilkan asal data, waktu pembaruan, dan status verifikasi dengan jelas.
4. **Green-led identity:** gunakan keluarga warna hijau sebagai warna identitas; hitam, putih, dan netral hanya untuk teks, latar, batas, serta struktur.
5. **Consistent components:** komponen yang memiliki fungsi sama harus memiliki tampilan dan perilaku yang konsisten.
6. **No fabricated certainty:** jangan menyamarkan data simulasi sebagai data nyata atau menyebut data real-time tanpa bukti integrasi.
7. **Plain Indonesian:** gunakan bahasa Indonesia yang singkat, natural, dan mudah dipahami.

## 3. Palet Warna

Gunakan hanya warna berikut sebagai fondasi antarmuka. Jangan menambahkan aksen warna lain di luar keluarga hijau, hitam, putih, dan netral tanpa keputusan desain yang terdokumentasi.

| Token | Nama | Hex | Penggunaan |
|---|---|---|---|
| `forest-green` | Forest Green | `#174B35` | Warna identitas utama, header tertentu, fokus visual |
| `primary-green` | Primary Green | `#216B49` | Tombol utama, tautan aktif, kontrol terpilih |
| `leaf-green` | Leaf Green | `#39845C` | Aksen hijau sekunder, indikator visual terbatas |
| `soft-green` | Soft Green | `#E8F1EB` | Latar lembut untuk panel atau status yang sesuai |
| `pale-green` | Pale Green | `#F3F7F4` | Latar halaman atau bagian yang membutuhkan pemisahan halus |
| `black` | Black | `#171C19` | Teks utama |
| `dark-neutral` | Dark Neutral | `#343B36` | Teks sekunder yang kuat dan elemen struktur |
| `gray-neutral` | Gray Neutral | `#68716B` | Metadata, label sekunder, teks bantuan |
| `border-neutral` | Border Neutral | `#DDE3DE` | Garis batas, pemisah, outline |
| `white` | White | `#FFFFFF` | Latar kartu, formulir, dan konten utama |

### 3.1 Aturan penggunaan warna
- Latar utama sebaiknya putih atau `pale-green`.
- Teks utama menggunakan `black`; jangan menggunakan hijau muda untuk teks isi.
- Tombol utama menggunakan `primary-green` dengan teks putih.
- Tombol sekunder menggunakan putih atau netral dengan outline `border-neutral` dan teks `dark-neutral`.
- `soft-green` digunakan sebagai latar status atau panel yang tidak dominan.
- Pastikan kontras teks memenuhi praktik aksesibilitas WCAG 2.2 AA.
- Status tidak boleh dibedakan hanya dengan warna. Sertakan label teks dan, bila sesuai, ikon sederhana.
- Hindari warna merah, oranye, kuning, biru, ungu, atau warna aksen lain sebagai elemen dekoratif UI. Jika ada kebutuhan operasional untuk menyampaikan bahaya, gunakan label teks yang eksplisit dan dokumentasikan pengecualiannya sebelum implementasi.

### 3.2 Gradien
Gradien hijau boleh digunakan secara selektif, misalnya `forest-green` menuju `primary-green` lalu `leaf-green`. Gunakan hanya pada area besar yang memang membutuhkan penekanan, seperti hero halaman awal. Jangan menggunakan gradien pada setiap kartu, tombol, panel, atau bagian halaman. Hindari glow, neon, dan efek dekoratif berlebihan.

## 4. Tipografi dan Konten

- Gunakan satu keluarga sans-serif yang mudah dibaca dan tersedia dengan baik di web.
- Buat hierarki yang jelas antara judul halaman, judul bagian, isi, label, dan metadata.
- Hindari paragraf panjang di dashboard; gunakan ringkasan dan tautan menuju detail.
- Gunakan format tanggal dan waktu yang konsisten, misalnya `20 Okt 2026, 14.30 WIB`.
- Jelaskan istilah teknis saat pertama kali muncul, misalnya “titik panas satelit”.
- Jangan menggunakan emoji dalam antarmuka.
- Hindari copy generik, klaim bombastis, dan pengulangan pesan yang sama.
- Jangan tampilkan string internal seperti nama variabel, endpoint API, stack trace, token, atau kode debug kepada pengguna.
- Jangan menampilkan `TODO`, `Lorem ipsum`, `Coming soon`, data palsu tanpa label, atau placeholder yang terlihat seperti konten final.

## 5. Tata Letak dan Spasi

Gunakan sistem spasi yang konsisten berbasis kelipatan 4 atau 8 px.

| Elemen | Panduan |
|---|---|
| Jarak antar kontrol dalam satu kelompok | 8–16 px |
| Padding kartu | 20–24 px |
| Jarak antar bagian dalam satu halaman | 32–48 px |
| Jarak antar bagian utama desktop | 48–72 px |
| Padding halaman desktop | 24–40 px |
| Padding halaman mobile | 16–20 px |
| Radius komponen | Konsisten dan moderat; hindari bentuk terlalu membulat secara berlebihan |
| Bayangan | Halus dan jarang digunakan; prioritaskan batas netral |

Jangan memadatkan dashboard dengan terlalu banyak kartu. Kelompokkan informasi berdasarkan tugas pengguna dan tampilkan prioritas tertinggi terlebih dahulu.

## 6. Komponen UI

### 6.1 Tombol
- **Primary:** latar `primary-green`, teks putih; satu aksi utama yang jelas per konteks.
- **Secondary:** latar putih/netral, outline `border-neutral`, teks `dark-neutral`.
- **Tertiary/link:** tanpa kotak berat; gunakan gaya tautan yang konsisten.
- **Destructive atau aksi berisiko:** gunakan konfirmasi, penjelasan konsekuensi, dan label teks eksplisit. Jangan mengandalkan warna saja.
- Semua tombol memiliki state default, hover, focus-visible, active, disabled, dan loading.

### 6.2 Formulir
- Label selalu terlihat; jangan mengandalkan placeholder sebagai satu-satunya label.
- Tandai kolom wajib dan opsional dengan jelas.
- Validasi di sisi klien untuk kenyamanan dan di sisi server untuk keamanan.
- Pesan kesalahan harus spesifik dan memberi cara memperbaiki input.
- Untuk unggahan bukti, jelaskan format dan batas ukuran berdasarkan konfigurasi aktual.
- Pada laporan lokasi, sediakan pemilihan titik pada peta serta input alamat/deskripsi lokasi jika didukung.

### 6.3 Kartu dan panel
- Gunakan latar putih dengan border netral.
- Gunakan shadow hanya jika membantu membedakan tingkat permukaan.
- Hindari menampilkan informasi sama di banyak kartu.
- Setiap kartu harus memiliki tujuan yang jelas dan konten yang relevan.

### 6.4 Ikon
- Gunakan satu keluarga ikon yang konsisten.
- Pilih ikon yang mudah dikenali dan fungsional.
- Jangan menggunakan emoji sebagai ikon.
- Ikon dekoratif tidak boleh menggantikan label pada tindakan penting.

### 6.5 Badge dan status
Badge harus ringkas, memiliki teks status yang eksplisit, dan menggunakan palet hijau/netral. Jangan menggunakan warna sebagai satu-satunya penanda. Status yang berbeda secara makna harus tetap dibedakan dengan label yang tepat.

### 6.6 Tabel
- Sediakan judul kolom yang jelas, alignment konsisten, dan jarak baris yang cukup.
- Di layar kecil, gunakan scroll horizontal yang terindikasi atau ubah menjadi daftar ringkas.
- Sediakan state kosong, loading, dan error.
- Jangan menyembunyikan tindakan penting hanya karena layar sempit.

## 7. Navigasi dan Struktur Halaman

Navigasi harus mencerminkan peran dan tugas pengguna. Jangan menampilkan menu yang tidak dapat diakses oleh peran aktif.

### 7.1 Halaman publik / landing
- Header dengan identitas JAGAIN dan navigasi ringkas.
- Hero berisi nama, tagline, penjelasan singkat, dan CTA untuk melihat peta atau membuat laporan.
- Ringkasan data hanya jika tersedia dan sumbernya jelas.
- Peta dan laporan terbaru dengan status serta waktu pembaruan.
- Bagian “Cara kerja” yang menjelaskan pelaporan, verifikasi, dan tindak lanjut.
- Penjelasan batasan: JAGAIN bukan kanal tanggap darurat resmi.
- Footer dengan sumber data, kebijakan privasi, panduan keselamatan, dan kontak pengelola yang benar-benar tersedia.

### 7.2 Dashboard masyarakat
- Ringkasan laporan milik pengguna dan perubahan status.
- Akses cepat ke formulir laporan.
- Riwayat laporan dengan filter status dan tanggal.
- Notifikasi atau pesan perubahan status jika fitur ini tersedia.
- Jangan menampilkan data pribadi pelapor kepada publik tanpa dasar dan persetujuan yang sesuai.

### 7.3 Peta karhutla
- Legenda yang membedakan laporan masyarakat, titik panas satelit, insiden terverifikasi, dan data simulasi.
- Setiap jenis data memiliki label sumber dan waktu pembaruan.
- Filter wilayah, periode, sumber, dan status jika datanya tersedia.
- Detail titik menampilkan koordinat/lokasi, waktu, sumber, status verifikasi, serta tautan detail.
- Jangan menggambarkan titik panas satelit sebagai bukti pasti kebakaran di permukaan.
- Data simulasi harus memiliki label yang terlihat dan tidak boleh bercampur tanpa penanda dengan data nyata.

### 7.4 Formulir laporan
- Panduan singkat tentang informasi yang dibutuhkan.
- Lokasi, waktu kejadian yang diketahui, deskripsi, kategori, dan unggahan bukti jika didukung.
- Peringatan agar pengguna tidak mengambil risiko demi memperoleh bukti.
- Konfirmasi sebelum mengirim dan ringkasan setelah pengiriman.
- Tampilkan nomor/kode laporan yang dapat digunakan untuk pelacakan, bila implementasi mendukungnya.

### 7.5 Pelacakan laporan
- Tampilkan status terkini, kronologi perubahan status, dan pembaruan yang bisa dibagikan.
- Bedakan status laporan, status penugasan, dan kondisi kebakaran aktual.
- Jika informasi tambahan diperlukan, tampilkan apa yang perlu dilengkapi dan bagaimana mengirimkannya.
- Status “selesai” administratif tidak otomatis berarti api telah padam.

### 7.6 Dashboard Admin
- Ringkasan laporan berdasarkan status dan wilayah.
- Antrean laporan untuk ditinjau, laporan duplikat, dan laporan yang membutuhkan informasi tambahan.
- Detail laporan dengan bukti, riwayat perubahan, sumber, dan catatan verifikasi.
- Pengelolaan pengguna, instansi, wilayah kewenangan, kategori, serta sumber data sesuai hak akses.
- Aksi penting harus tercatat dalam audit trail.

### 7.7 Dashboard OPD
- Menampilkan laporan yang ditugaskan kepada instansi dan berada dalam wilayah kewenangannya.
- Detail tugas, waktu penerimaan, status, bukti, catatan, dan riwayat.
- Aksi menerima/menolak penugasan dengan alasan, pembaruan progres, dan unggah bukti tindak lanjut sesuai izin.
- Menampilkan riwayat dan ringkasan kinerja berdasarkan data yang benar-benar tercatat.
- OPD tidak boleh mengubah data atau penugasan di luar cakupan kewenangannya.

## 8. Responsif

### Desktop
- Manfaatkan lebar layar untuk peta dan panel detail berdampingan bila relevan.
- Pertahankan hierarki dan ruang kosong yang cukup.
- Tabel dapat digunakan jika memang paling sesuai untuk tugas operasional.

### Tablet dan mobile
- Gunakan satu kolom untuk formulir dan konten utama.
- Navigasi harus mudah dijangkau.
- Peta harus memiliki kontrol yang dapat disentuh dan panel detail yang tidak menutupi konteks secara berlebihan.
- Tabel kompleks diubah menjadi daftar atau diberi scroll horizontal yang jelas.
- Hindari elemen yang membutuhkan hover sebagai satu-satunya cara mengakses fungsi.

## 9. Aksesibilitas

Targetkan praktik WCAG 2.2 AA:
- Kontras teks yang memadai.
- Navigasi keyboard yang lengkap.
- Focus-visible yang jelas.
- Label dan instruksi form yang dapat dibaca screen reader.
- Struktur heading semantik.
- Teks alternatif untuk gambar informatif.
- Error form yang dihubungkan dengan kolom terkait.
- Target sentuh yang nyaman dan tidak terlalu rapat.
- Informasi status tidak hanya disampaikan lewat warna.
- Hormati preferensi reduced motion jika ada animasi.

## 10. State yang Wajib Dirancang

Semua halaman dan komponen data harus memiliki state yang sesuai:
- Loading.
- Empty state dengan penjelasan dan langkah berikutnya.
- Error dengan pesan yang dapat ditindaklanjuti.
- Success atau konfirmasi.
- Disabled dan permission denied.
- Offline atau kegagalan jaringan jika relevan.
- Data usang atau belum diperbarui, dengan waktu pembaruan yang jelas.

Jangan menggunakan angka, peta, aktivitas, atau statistik palsu untuk mengisi empty state.

## 11. Visualisasi Data dan Peta

- Gunakan palet hijau dan netral untuk elemen visual.
- Label dan legenda harus menjelaskan arti simbol.
- Jangan menggunakan ukuran titik atau intensitas warna tanpa definisi yang konsisten.
- Tampilkan periode data, sumber, waktu pengambilan, dan batasan bila relevan.
- Hindari grafik dekoratif yang tidak membantu keputusan.
- Jika belum ada integrasi data, gunakan dataset simulasi yang diberi label jelas, atau tampilkan empty state.
- Jangan menyebut data “real-time” kecuali latensi dan sumber pembaruannya telah diverifikasi.

## 12. Motion dan Efek

- Animasi singkat dan fungsional saja.
- Jangan menggunakan parallax, glow, animasi berulang, atau efek yang mengganggu pembacaan.
- Perubahan status harus dapat dipahami tanpa animasi.
- Hindari transisi yang menunda aksi utama.

## 13. Design Tokens

Contoh token CSS yang dapat dijadikan dasar implementasi:

```css
:root {
  --color-forest-green: #174B35;
  --color-primary-green: #216B49;
  --color-leaf-green: #39845C;
  --color-soft-green: #E8F1EB;
  --color-pale-green: #F3F7F4;
  --color-black: #171C19;
  --color-dark-neutral: #343B36;
  --color-gray-neutral: #68716B;
  --color-border-neutral: #DDE3DE;
  --color-white: #FFFFFF;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}
```

Sesuaikan radius dan tipografi dengan implementasi, tetapi pertahankan konsistensi sistem.

## 14. Kriteria Penerimaan Desain

Desain dianggap siap diimplementasikan jika:
- Warna identitas menggunakan palet yang ditentukan.
- Tidak ada emoji dalam UI.
- Tidak ada data simulasi yang tampil seolah data nyata.
- Setiap data penting menampilkan status dan sumber yang relevan.
- Semua halaman memiliki loading, empty, error, dan success state yang sesuai.
- Formulir memiliki label, validasi, dan pesan kesalahan yang jelas.
- Tampilan dapat digunakan di desktop dan mobile.
- Aksi penting memiliki affordance, feedback, dan konfirmasi yang sesuai.
- Tidak ada teks debug, placeholder, atau klaim integrasi yang belum terbukti.
- Kontras, keyboard navigation, dan focus state telah diuji.

## 15. Prinsip Akhir

JAGAIN harus terasa tenang, rapi, dan dapat dipercaya. Minimalisme berarti menghilangkan gangguan visual, bukan menghilangkan informasi yang dibutuhkan masyarakat atau petugas untuk memahami dan mengawal penanganan karhutla.
