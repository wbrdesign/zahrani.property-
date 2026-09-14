# Zahrani Property - Website Profil & Katalog Properti Konsultan

Website profil personal branding dan katalog listing properti modern untuk **Zahrani, S.Ars (Senior Property Consultant & KPR Specialist)**. 

Dibangun dengan **React 19, TypeScript, Tailwind CSS v4, & Vite**. 
Aplikasi ini **100% Client-Side Static**, tidak memerlukan server backend, database eksternal, atau layanan pihak ketiga. Sangat ideal dan siap langsung di-deploy gratis di **GitHub Pages**!

---

## 🚀 Cara Cepat Deploy ke GitHub Pages

### Opsi 1: Otomatis via GitHub Actions (Sangat Disarankan)

1. Buat repository baru di akun GitHub Anda (misal: `zahrani-property`).
2. Hubungkan dan push seluruh kode ini ke repository GitHub Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Zahrani Property Website"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/zahrani-property.git
   git push -u origin main
   ```
3. Di halaman repository GitHub Anda:
   - Buka menu **Settings** > **Pages** (di sidebar kiri).
   - Di bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
4. Website Anda akan otomatis di-build dan di-deploy ke:
   `https://USERNAME_ANDA.github.io/zahrani-property/`

---

### Opsi 2: Build Manual & Upload Folder `dist`

Jika ingin upload hasil build secara langsung tanpa Git CLI:
1. Jalankan build di komputer lokal:
   ```bash
   npm install
   npm run build
   ```
2. Seluruh website statis yang siap tayang akan berada di dalam folder **`dist/`**.
3. Anda dapat meng-upload isi folder `dist/` tersebut ke branch `gh-pages` di GitHub, atau hosting statis apa pun (seperti Cloudflare Pages, Vercel, Netlify).

---

## 💻 Menjalankan di Komputer Lokal (Local Development)

1. **Install dependensi**:
   ```bash
   npm install
   ```
2. **Jalankan local dev server**:
   ```bash
   npm run dev
   ```
3. Buka browser di `http://localhost:3000` (atau port yang tertera di terminal).

---

## 📁 Struktur Kode Terpisah (Mudah Diedit di GitHub)

Untuk memudahkan Anda memperbarui foto dan konten listing secara berkelanjutan di GitHub tanpa takut merusak bagian lain, kode telah dipisahkan secara modular:

### 1. 🏠 Bagian Listing Properti & Foto (Paling Sering Diedit)
- **Data & Foto Listing**: `src/data/listings.ts`
  - Di sini tempat menambahkan rumah baru, mengubah harga, mengedit spesifikasi, dan **memperbarui foto**.
  - Setiap properti memiliki kolom `imageUrl` (foto utama) dan `galleryImages` (galeri foto detail).
- **Tampilan Visual Kartu Listing (HTML/JSX)**: `src/components/ListingCard.tsx`
  - Khusus mengatur struktur tampilan kartu listing (posisi foto, rasio gambar, badge promo, dan tombol WhatsApp) jika Anda ingin mengubah desainnya terpisah.
- **Folder Penyimpanan Foto Lokal**: `public/properties/`
  - Anda bisa meng-upload foto langsung ke folder ini di GitHub (misal: `rumah1.jpg`), lalu panggil di `src/data/listings.ts` dengan cara:
    ```ts
    imageUrl: '/properties/rumah1.jpg',
    ```

### 2. 👩‍💼 Bagian Profil Konsultan
- **Data & Kontak Konsultan**: `src/data/consultant.ts`
  - Mengatur nama, gelar, nomor WhatsApp, jam operasional, pilar layanan, dan daftar bank rekanan KPR.
- **Foto Profil Konsultan**: `public/avatar.jpg`
  - Cukup timpa file ini jika ingin mengganti foto profil utama permanen.

### 3. ⭐ Bagian Testimoni Klien
- **Data Testimoni**: `src/data/testimonials.ts`
  - Berisi ulasan pelanggan yang dapat ditambah atau diedit sewaktu-waktu.

---

## 📝 Contoh Cara Menambah Listing Baru di `src/data/listings.ts`

Tinggal salin contoh blok berikut ke dalam `PROPERTIES` di file `src/data/listings.ts`:

```ts
{
  id: 'prop-baru-1',
  title: 'Cluster Minimalis Modern Bintaro',
  category: 'rumah-baru', // Pilihan: 'rumah-baru' | 'rumah-second' | 'komersial' | 'tanah'
  categoryLabel: 'Rumah Baru Siap Huni',
  location: 'Bintaro, Tangerang Selatan',
  city: 'Tangerang Selatan',
  price: 1250000000,
  priceFormatted: 'Rp 1,25 Miliar',
  installmentEstimate: 'Rp 7,1 Jt/bln',
  specs: {
    bedrooms: 3,
    bathrooms: 2,
    landArea: 84,
    buildingArea: 72,
    carport: 2,
    certificate: 'SHM + IMB Siap'
  },
  features: ['Free Biaya KPR & BPHTB', 'Dekat Pintu Tol', 'Keamanan 24 Jam'],
  // Foto bisa pakai file di folder public/properties/ atau link online (URL)
  imageUrl: '/properties/rumah-baru-1.jpg',
  galleryImages: [
    '/properties/rumah-baru-1.jpg',
    '/properties/interior-1.jpg'
  ],
  isHot: true,
  badge: 'PROMO DP 0%',
  description: 'Rumah cantik 2 lantai di lingkungan asri dan strategis.'
},
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6 (dengan konfigurasi `base: './'` untuk kompatibilitas GitHub Pages)
- **Styling**: Tailwind CSS v4 (Palet Elegan: *In Your Eyes* #D8E4E1, *Bermuda Turquoise* #0097A7, *Cable Knit Sweater* #6B8B9B)
- **Icons**: Lucide React
- **Animations**: Motion
