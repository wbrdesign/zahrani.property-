import { Property } from '../types';

/**
 * =======================================================================
 * DATA KATALOG LISTING PROPERTI & FOTO (KHUSUS LISTING)
 * =======================================================================
 * File ini KHUSUS untuk mengelola semua listing properti beserta fotonya.
 * Anda dapat dengan mudah mengedit atau menambahkan properti baru di sini 
 * tanpa takut merusak bagian kode lainnya!
 *
 * --- CARA MENGGANTI ATAU MENAMBAHKAN FOTO PROPERTI ---
 * 1. OPSI A (Rekomendasi di GitHub):
 *    - Upload foto properti Anda ke folder: public/properties/
 *      (Contoh nama: rumah-bsd-1.jpg, tampak-depan.jpg)
 *    - Masukkan path fotonya di properti ini:
 *      imageUrl: '/properties/rumah-bsd-1.jpg',
 *      galleryImages: [
 *        '/properties/rumah-bsd-1.jpg',
 *        '/properties/rumah-bsd-interior.jpg'
 *      ]
 *
 * 2. OPSI B (Menggunakan Link URL Online):
 *    - Masukkan link gambar langsung (misal dari Cloudinary, Imgur, Google Photos, Unsplash):
 *      imageUrl: 'https://images.unsplash.com/photo-xxx...'
 *
 * --- TEMPLATE MENAMBAH UNIT BARU (Tinggal Copy-Paste di bawah) ---
 * {
 *   id: 'prop-unik-baru',
 *   title: 'Nama Properti / Cluster',
 *   category: 'rumah-baru', // Pilihan: 'rumah-baru' | 'rumah-second' | 'komersial' | 'tanah'
 *   categoryLabel: 'Rumah Baru Siap Huni',
 *   location: 'Area, Kota',
 *   city: 'Tangerang Selatan',
 *   price: 1500000000,
 *   priceFormatted: 'Rp 1,5 Miliar',
 *   installmentEstimate: 'Rp 8,5 Jt/bln',
 *   specs: {
 *     bedrooms: 3,
 *     bathrooms: 2,
 *     landArea: 90,
 *     buildingArea: 75,
 *     carport: 2,
 *     certificate: 'SHM + IMB Siap'
 *   },
 *   features: ['Free Biaya KPR', 'Dekat Stasiun', 'One Gate System'],
 *   imageUrl: '/properties/nama-foto.jpg',
 *   galleryImages: [
 *     '/properties/nama-foto.jpg',
 *     '/properties/nama-foto-2.jpg'
 *   ],
 *   isHot: true,
 *   badge: 'PROMO BULAN INI',
 *   description: 'Deskripsi lengkap properti Anda...'
 * },
 */

export const PROPERTIES: Property[] = [
  // Page 1 (1 - 9)
  {
    id: 'prop-1',
    title: 'Cluster Grand Emerald BSD',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Baru (Indent / Ready)',
    location: 'BSD City, Tangerang Selatan',
    city: 'Tangerang Selatan',
    price: 1350000000,
    priceFormatted: 'Rp 1,35 Miliar',
    installmentEstimate: 'Rp 7,8 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 72,
      buildingArea: 68,
      carport: 2,
      certificate: 'SHM + IMB Siap'
    },
    features: ['Free BPHTB & Biaya KPR', 'Smart Home System', 'Clubhouse & Kolam Renang', '5 Menit ke Gerbang Tol'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'PROMO DP 0%',
    description: 'Rumah modern 2 lantai di kawasan mandiri prestisius BSD. Lingkungan asri, bebas banjir, keamanan 24 jam dengan fasilitas one gate system.'
  },
  {
    id: 'prop-2',
    title: 'Modern Minimalist Villa Cibubur',
    category: 'rumah-second',
    categoryLabel: 'Rumah Siap Huni',
    location: 'Kota Wisata, Cibubur',
    city: 'Jakarta Timur / Cibubur',
    price: 980000000,
    priceFormatted: 'Rp 980 Juta',
    installmentEstimate: 'Rp 5,6 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 90,
      buildingArea: 80,
      carport: 1,
      certificate: 'SHM On Hand'
    },
    features: ['Furnished Cantik', 'Siap Huni Langsung', 'Dekat Stasiun LRT', 'Row Jalan 8 Meter'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'BISA NEGO SAMPAI JADI',
    description: 'Hunian nyaman semi furnished dengan sirkulasi udara optimal dan pencahayaan alami melimpah. Pemilik pindah tugas ke luar kota, BU (Butuh Uang).'
  },
  {
    id: 'prop-3',
    title: 'Ruko Komersial 3 Lantai Strategis',
    category: 'komersial',
    categoryLabel: 'Komersial / Ruko Bisnis',
    location: 'Bintaro Jaya Sektor 7',
    city: 'Tangerang Selatan',
    price: 2450000000,
    priceFormatted: 'Rp 2,45 Miliar',
    installmentEstimate: 'Rp 14,2 Jt/bln',
    specs: {
      bedrooms: 1,
      bathrooms: 3,
      landArea: 85,
      buildingArea: 180,
      carport: 3,
      certificate: 'HGB Murni'
    },
    features: ['Parkiran Luas Depan', 'Lalu Lintas Ramai 24 Jam', 'Cocok Kafe / Klinik / Kantor', 'Listrik 4400 Watt'],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'YIELD SEWA TINGGI',
    description: 'Unit ruko 3 lantai di pusat bisnis ramai Bintaro. Potensi sewa Rp 120-150 Jt per tahun, posisi persis di pinggir jalan boulevard utama.'
  },
  {
    id: 'prop-4',
    title: 'Rumah Mezzanine Japandi Bintaro',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Desain Kekinian',
    location: 'Pondok Aren, Bintaro',
    city: 'Tangerang Selatan',
    price: 795000000,
    priceFormatted: 'Rp 795 Juta',
    installmentEstimate: 'Rp 4,5 Jt/bln',
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      landArea: 60,
      buildingArea: 52,
      carport: 1,
      certificate: 'SHM Siap Balik Nama'
    },
    features: ['Desain Mezzanine Estetik', 'Bisa KPR Bank Syariah', 'Dekat Toll Pondok Ranji', 'Bebas Biaya Notaris'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'CICILAN 4 JUTAAN',
    description: 'Rumah modern Scandinavian Japandi dengan langit-langit tinggi (high ceiling) 4.5m sehingga ruangan tetap sejuk dan lapang.'
  },
  {
    id: 'prop-5',
    title: 'Kavling Tanah Siap Bangun Jagakarsa',
    category: 'tanah',
    categoryLabel: 'Tanah Kavling',
    location: 'Jagakarsa, Jakarta Selatan',
    city: 'Jakarta Selatan',
    price: 650000000,
    priceFormatted: 'Rp 650 Juta',
    installmentEstimate: 'Cash / Bertahap',
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      landArea: 105,
      buildingArea: 0,
      carport: 0,
      certificate: 'SHM Pecah Unit'
    },
    features: ['Bentuk Kotak Simetris', 'Akses Masuk Mobil 2 Arah', 'Zonasi R1 Pemukiman', 'Jauh Dari SUTET / Makam'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'LANGKA DI JAKSEL',
    description: 'Tanah kavling padat siap bangun dalam mini townhouse. Suasana asri dan tenang di Jakarta Selatan dengan kenaikan nilai investasi cepat.'
  },
  {
    id: 'prop-6',
    title: 'Scandinavian Modern Townhouse Serpong',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Baru 2 Lantai',
    location: 'Serpong Jaya, Tangerang Selatan',
    city: 'Tangerang Selatan',
    price: 1150000000,
    priceFormatted: 'Rp 1,15 Miliar',
    installmentEstimate: 'Rp 6,7 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 70,
      buildingArea: 65,
      carport: 2,
      certificate: 'SHM + PBG'
    },
    features: ['Free AC Tiap Kamar', 'Underground Utility Cable', 'Bebas Banjir 100%', 'One Gate Security 24 Jam'],
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'FREE BIAYA KPR',
    description: 'Townhouse eksklusif bertema Scandinavian modern di kawasan berkembang Serpong, dekat stasiun KRL Rawa Buntu dan pintu tol BSD.'
  },
  {
    id: 'prop-7',
    title: 'Rumah Kolonial Cantik Cilandak',
    category: 'rumah-second',
    categoryLabel: 'Rumah Siap Huni Jaksel',
    location: 'Cilandak Barat, Jakarta Selatan',
    city: 'Jakarta Selatan',
    price: 3200000000,
    priceFormatted: 'Rp 3,2 Miliar',
    installmentEstimate: 'Rp 18,5 Jt/bln',
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      landArea: 160,
      buildingArea: 140,
      carport: 2,
      certificate: 'SHM Bersih'
    },
    features: ['Taman Depan & Belakang', 'Halaman Luas', '5 Menit ke Citos & MRT Fatmawati', 'Akses Jalan Lebar'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'LOKASI EMAS JAKSEL',
    description: 'Hunian asri bergaya modern kolonial di kawasan prestisius Cilandak. Dekat pusat perbelanjaan, sekolah internasional, dan stasiun MRT.'
  },
  {
    id: 'prop-8',
    title: 'Shophouse Boulevard Gading Serpong',
    category: 'komersial',
    categoryLabel: 'Ruko Usaha Boulevard',
    location: 'Gading Serpong, Tangerang',
    city: 'Tangerang',
    price: 3100000000,
    priceFormatted: 'Rp 3,1 Miliar',
    installmentEstimate: 'Rp 17,9 Jt/bln',
    specs: {
      bedrooms: 1,
      bathrooms: 3,
      landArea: 90,
      buildingArea: 210,
      carport: 4,
      certificate: 'HGB Murni'
    },
    features: ['Frontage Lebar 5 Meter', 'Area Parkir On-Street Luas', 'Dikelilingi 5 Cluster Padat', 'Sangat Prospektif'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'TRAFFIC RAMAI',
    description: 'Shophouse 3 lantai di boulevard utama Gading Serpong. Sangat cocok untuk restoran, showroom, apotek, maupun kantor cabang.'
  },
  {
    id: 'prop-9',
    title: 'Cluster Asri Forest View Pamulang',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Murah Subsidi & Komersil',
    location: 'Pamulang, Tangerang Selatan',
    city: 'Tangerang Selatan',
    price: 685000000,
    priceFormatted: 'Rp 685 Juta',
    installmentEstimate: 'Rp 3,9 Jt/bln',
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      landArea: 60,
      buildingArea: 45,
      carport: 1,
      certificate: 'SHM Pecah'
    },
    features: ['Cicilan Sangat Terjangkau', 'DP Cuma 10 Juta', 'Dekat RSUD Pamulang', 'Fasilitas Playground Anak'],
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'BEST SELLER',
    description: 'Pilihan tepat untuk generasi muda dan keluarga baru yang ingin memiliki hunian pertama dengan cicilan di bawah 4 jutaan.'
  },

  // Page 2 (10 - 18)
  {
    id: 'prop-10',
    title: 'Rumah Mewah Modern Classic BSD',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Mewah Eksklusif',
    location: 'The Mozia BSD City',
    city: 'Tangerang Selatan',
    price: 4500000000,
    priceFormatted: 'Rp 4,5 Miliar',
    installmentEstimate: 'Rp 26,0 Jt/bln',
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      landArea: 180,
      buildingArea: 220,
      carport: 2,
      certificate: 'PPJB Siap AJB'
    },
    features: ['Private Swimming Pool Option', 'Full Marmer Import', 'Smart Digital Lock Door', 'Dekat QBig & ICE BSD'],
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'PREMIUM LUXURY',
    description: 'Hunian mewah 3 lantai dengan tata ruang luas, material premium marmer Italia, dan pemandangan danau buatan yang tenang di BSD.'
  },
  {
    id: 'prop-11',
    title: 'Compact Smart Home Kebayoran Lama',
    category: 'rumah-second',
    categoryLabel: 'Rumah Siap Huni Jaksel',
    location: 'Kebayoran Lama, Jakarta Selatan',
    city: 'Jakarta Selatan',
    price: 1650000000,
    priceFormatted: 'Rp 1,65 Miliar',
    installmentEstimate: 'Rp 9,5 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 78,
      buildingArea: 95,
      carport: 1,
      certificate: 'SHM Hak Milik'
    },
    features: ['10 Menit ke Gandaria City', 'Renovasi Total 2024', 'Kitchen Set Mewah', 'Row Jalan 2 Mobil'],
    imageUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'LOKASI STRATEGIS',
    description: 'Rumah cantik 2 lantai di Kebayoran Lama yang sudah direnovasi total dengan sentuhan modern minimalis, siap huni tanpa perlu perbaikan.'
  },
  {
    id: 'prop-12',
    title: 'Tanah Komersial Boulevard BSD',
    category: 'tanah',
    categoryLabel: 'Tanah Komersial Kavling',
    location: 'Boulevard Utama BSD City',
    city: 'Tangerang Selatan',
    price: 4800000000,
    priceFormatted: 'Rp 4,8 Miliar',
    installmentEstimate: 'Cash / Termin Developer',
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      landArea: 320,
      buildingArea: 0,
      carport: 0,
      certificate: 'HGB Komersial'
    },
    features: ['Izin Bangun Usaha / Kantor', 'Lebar Muka 16 Meter', 'Hadap Timur', 'Dekat Akses Tol Baru'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'INVESTASI EMAS',
    description: 'Kavling komersial langka di jalan utama BSD. Cocok untuk membangun klinik estetika, head office perusahaan, atau kafe berkonsep garden.'
  },
  {
    id: 'prop-13',
    title: 'Rumah Tropis Modern Bintaro Sektor 9',
    category: 'rumah-second',
    categoryLabel: 'Rumah Mewah Siap Huni',
    location: 'Bintaro Jaya Sektor 9',
    city: 'Tangerang Selatan',
    price: 2850000000,
    priceFormatted: 'Rp 2,85 Miliar',
    installmentEstimate: 'Rp 16,5 Jt/bln',
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      landArea: 140,
      buildingArea: 165,
      carport: 2,
      certificate: 'SHM Siap Notaris'
    },
    features: ['High Ceiling 4 Meter', 'Dekat Bintaro Xchange', 'Semi Furnished Jati', 'Kamar Tidur Utama Luas'],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'HOT DEAL BINTARO',
    description: 'Rumah impian di kawasan paling diminati Bintaro Sektor 9. Desain tropis modern dengan inner courtyard yang sejuk dan sirkulasi angin alami.'
  },
  {
    id: 'prop-14',
    title: 'Ruko 2 Lantai Pusat Kuliner Alam Sutera',
    category: 'komersial',
    categoryLabel: 'Ruko Kuliner & F&B',
    location: 'Alam Sutera, Tangerang Selatan',
    city: 'Tangerang Selatan',
    price: 2100000000,
    priceFormatted: 'Rp 2,1 Miliar',
    installmentEstimate: 'Rp 12,2 Jt/bln',
    specs: {
      bedrooms: 1,
      bathrooms: 2,
      landArea: 75,
      buildingArea: 135,
      carport: 3,
      certificate: 'HGB Murni'
    },
    features: ['Tenant F&B Ramai', 'Area Outdoor Dining', 'Dekat Kampus Binus & Mall', 'Air & Listrik Stabil'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'SIAP USAHA',
    description: 'Ruko di sentra kuliner Alam Sutera dengan captive market ribuan mahasiswa dan penghuni apartemen sekitar. Kondisi rapi dan siap operasional.'
  },
  {
    id: 'prop-15',
    title: 'Townhouse Semi-Detached TB Simatupang',
    category: 'rumah-baru',
    categoryLabel: 'Townhouse Baru Jaksel',
    location: 'TB Simatupang, Jakarta Selatan',
    city: 'Jakarta Selatan',
    price: 2700000000,
    priceFormatted: 'Rp 2,7 Miliar',
    installmentEstimate: 'Rp 15,6 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      landArea: 88,
      buildingArea: 130,
      carport: 2,
      certificate: 'SHM + IMB'
    },
    features: ['Akses Langsung Tol JORR', 'Rooftop Lounge Pribadi', 'Underground Utilities', 'Bebas Macet Perkantoran'],
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'DEKAT PERKANTORAN',
    description: 'Townhouse modern semi-detached di koridor bisnis TB Simatupang. Pilihan sempurna untuk profesional mapan yang mengutamakan mobilitas.'
  },
  {
    id: 'prop-16',
    title: 'Rumah Cantik 1 Lantai Ciater Serpong',
    category: 'rumah-second',
    categoryLabel: 'Rumah 1 Lantai Nyaman',
    location: 'Ciater Permai, BSD Tangsel',
    city: 'Tangerang Selatan',
    price: 720000000,
    priceFormatted: 'Rp 720 Juta',
    installmentEstimate: 'Rp 4,1 Jt/bln',
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      landArea: 72,
      buildingArea: 50,
      carport: 1,
      certificate: 'SHM Hak Milik'
    },
    features: ['Rumah 1 Lantai Ramah Lansia', 'Halaman Belakang Luas', 'Bebas Banjir', 'Dekat Pasar Modern BSD'],
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'HARGA DIBAWAH PASAR',
    description: 'Rumah 1 lantai yang tenang dan nyaman, cocok untuk pasangan muda atau pensiunan. Lingkungan ramah bertetangga dengan keamanan 24 jam.'
  },
  {
    id: 'prop-17',
    title: 'Kavling Hook View Danau Sentul',
    category: 'tanah',
    categoryLabel: 'Tanah Villa & Residensial',
    location: 'Sentul City, Bogor',
    city: 'Bogor / Sentul',
    price: 850000000,
    priceFormatted: 'Rp 850 Juta',
    installmentEstimate: 'Cash / Cicil 12x',
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      landArea: 210,
      buildingArea: 0,
      carport: 0,
      certificate: 'SHGB Murni'
    },
    features: ['Posisi Hook 2 Muka', 'Udara Sejuk Pegunungan', 'Kontur Siap Bangun', 'Dekat AEON Sentul'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    badge: 'VIEW PEGUNUNGAN',
    description: 'Tanah kavling posisi hook dengan panorama perbukitan asri dan udara sejuk di Sentul City. Cocok untuk villa akhir pekan atau tempat tinggal masa pensiun.'
  },
  {
    id: 'prop-18',
    title: 'Neo Classic Cluster Cinere Gandul',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Desain Neo Classic',
    location: 'Cinere, Depok / Jaksel',
    city: 'Depok / Jakarta Selatan',
    price: 1480000000,
    priceFormatted: 'Rp 1,48 Miliar',
    installmentEstimate: 'Rp 8,5 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      landArea: 84,
      buildingArea: 90,
      carport: 2,
      certificate: 'SHM + IMB Pecah'
    },
    features: ['Fasad Megah Neo-Klasik', 'Kamar Mandi Dalam', 'Dekat Pintu Tol Brigif (Desari)', 'Free Kanopi & Smartlock'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    badge: 'PROMO BULAN INI',
    description: 'Cluster bergaya Neo Classic mewah di perbatasan Cinere dan Jakarta Selatan. Akses sangat cepat ke Tol Desari, dekat mall dan sekolah favorit.'
  }
];
