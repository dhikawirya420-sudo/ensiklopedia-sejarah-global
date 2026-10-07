# Ensiklopedia Sejarah Global

Website berbahasa Indonesia yang mengadaptasi PDF **Ensiklopedia Sejarah Global — Abad 1–21 (sampai 2026)**.

## Isi dan fitur

- 21 bab abad, 9 genealogi ilmu, 5 topik sintesis, 10 istilah glosarium.
- Pencarian seluruh naskah dan filter periode.
- Halaman baca, navigasi antarabad, indikator kemajuan, penanda dan bab terakhir di localStorage.
- PDF asli dapat dibaca dan diunduh; rujukan halaman tersedia pada setiap bab.
- Responsif, navigasi keyboard, reduced motion, dan gaya cetak.

Isi naskah dipertahankan dari PDF. Judul pendek ditambahkan untuk navigasi. Dokumen merupakan kerangka ensiklopedis, belum laporan akademik dengan sitasi lengkap. Cakupan 2026 mengikuti dokumen, bukan pembaruan otomatis. Situs menampilkan catatan editorial sumber secara utuh.

## Menjalankan lokal

Node.js 20.11 atau lebih baru; tidak perlu memasang dependensi.

```sh
npm run dev
npm test
```

Buka http://127.0.0.1:4173.

## Hosting

GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. Semua aset memakai alamat relatif agar bekerja di subpath repositori. `.nojekyll` menonaktifkan pemrosesan Jekyll.

## Struktur

- `index.html`, `styles.css`, `app.js`: antarmuka, navigasi, dan interaksi.
- `assets/content.js`: naskah terstruktur dari sumber.
- `assets/ensiklopedia-sejarah-global.pdf`: sumber asli.
- `scripts/extract.py`: ekstraksi ulang (Python + pypdf; argumen berupa path PDF).
- `scripts/content.test.mjs`: pemeriksaan isi dan aset.

Tidak ada backend atau analitik. Google Fonts memiliki fallback font sistem. Penanda tersimpan hanya di browser pengguna.
