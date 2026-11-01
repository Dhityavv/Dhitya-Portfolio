# Portofolio Dhitya Nurhadi

Website portofolio pribadi untuk menampilkan karya, eksperimen, dan proyek di bidang 3D modeling dan animasi. Dibuat sebagai website statis menggunakan HTML, CSS, dan JavaScript, dengan tampilan gelap dan elemen visual yang terinspirasi dari dunia 3D.

## Halaman

- `index.html` — halaman utama portofolio, profil, dan pilihan karya.
- `all-project.html` — arsip proyek dengan tampilan galeri dan daftar. Di Vercel, halaman ini dapat diakses melalui `/all-project`. Pilih proyek untuk membuka detailnya.

## Fitur

- Tata letak responsif untuk desktop dan perangkat seluler.
- Animasi dan elemen visual CSS/SVG.
- Galeri proyek dengan pilihan tampilan galeri atau daftar.
- Dialog detail proyek yang mendukung gambar, deskripsi, kategori, tahun, dan peran.
- Favicon khusus untuk identitas website.

## Struktur Proyek

```text
.
├── index.html
├── all-project.html
├── assets/
│   ├── favicon.svg
│   └── images/
│       └── profile/
├── css/
│   ├── style.css
│   └── projects.css
├── js/
│   ├── main.js
│   └── projects.js
└── documents/
```

## Menjalankan Secara Lokal

Buka `index.html` di browser, atau jalankan folder ini menggunakan ekstensi seperti Live Server di Visual Studio Code. Di Vercel, URL halaman utama menggunakan domain root dan halaman arsip proyek menggunakan `/all-project`.

## Menambahkan Proyek

Konten proyek di halaman `all-project.html` menggunakan atribut `data-*` pada kartu galeri dan baris daftar. Saat menambahkan proyek, perbarui kedua tampilan agar detail, kategori, dan statusnya tetap konsisten. Gunakan `data-status="upcoming"` untuk proyek yang belum selesai; proyek lain dihitung sebagai selesai. Isi `data-source` dengan URL source yang tersedia, atau biarkan kosong jika belum dibagikan. Jika proyek memiliki gambar, isi `data-image` dengan path gambar tersebut.

Ringkasan jumlah proyek di `index.html` sengaja tetap ringkas. Perbarui angka completed/upcoming di sana saat status proyek berubah.

## Deployment

Website ini dapat di-deploy sebagai situs statis melalui Vercel. Jika repo GitHub sudah terhubung ke project Vercel, push ke branch deployment akan memicu deployment baru secara otomatis.
