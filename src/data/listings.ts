import { Property } from '../types';

/**
 * =======================================================================
 * DATA KATALOG LISTING PROPERTI & FOTO - KOTA MALANG, JAWA TIMUR 65146
 * =======================================================================
 * Data terintegrasi dengan Admin Backend (Password: Bismillah99).
 * Admin dapat menambah, mengedit, mengubah status Terjual/Belum Terjual,
 * serta memfilter berdasarkan wilayah Malang.
 */

export const MALANG_DISTRICTS = [
  'Lowokwaru',
  'Klojen',
  'Blimbing',
  'Sukun',
  'Kedungkandang',
  'Batu / Malang Raya'
] as const;

export const INITIAL_PROPERTIES: Property[] = [
  // 1. Blimbing - Araya
  {
    id: 'prop-mlg-1',
    title: 'Cluster Mewah Golf View Kota Araya',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Baru Eksklusif',
    location: 'Perumahan Kota Araya, Blimbing',
    city: 'Kota Malang',
    district: 'Blimbing',
    price: 1850000000,
    priceFormatted: 'Rp 1,85 Miliar',
    installmentEstimate: 'Rp 10,2 Jt/bln',
    specs: {
      bedrooms: 4,
      bathrooms: 3,
      landArea: 120,
      buildingArea: 135,
      carport: 2,
      certificate: 'SHM + PBG Siap'
    },
    features: ['Akses Golf & Club House', 'Row Jalan 10 Meter', 'Keamanan 24 Jam One Gate', 'Dekat RS Persada & Plaza Araya'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'PROMO BULAN INI',
    description: 'Hunian mewah 2 lantai berkonsep resort di kawasan mandiri paling prestisius di Kota Malang (Kota Araya). Udara sejuk, lingkungan rindang, dan nilai investasi tinggi.',
    createdAt: '2026-03-01'
  },

  // 2. Lowokwaru - Soekarno Hatta
  {
    id: 'prop-mlg-2',
    title: 'Rumah Modern Minimalis Area Kampus Suhat',
    category: 'rumah-second',
    categoryLabel: 'Rumah Siap Huni',
    location: 'Jl. Soekarno Hatta, Lowokwaru',
    city: 'Kota Malang',
    district: 'Lowokwaru',
    price: 975000000,
    priceFormatted: 'Rp 975 Juta',
    installmentEstimate: 'Rp 5,5 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 96,
      buildingArea: 80,
      carport: 1,
      certificate: 'SHM On Hand'
    },
    features: ['5 Menit ke Univ Brawijaya & Polinema', 'Full Furnished Rapi', 'Sirkulasi Udara Adem', 'Potensi Kost Mahasiswa'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'SIAP HUNI KOTA MALANG',
    description: 'Rumah siap huni di pusat lifestyle dan kuliner Soekarno Hatta (Suhat) Lowokwaru Malang. Sangat prospektif untuk tempat tinggal keluarga atau disewakan ke mahasiswa UB/Polinema.',
    createdAt: '2026-03-02'
  },

  // 3. Lowokwaru - Komersial Ruko Suhat
  {
    id: 'prop-mlg-3',
    title: 'Ruko Bisnis 3 Lantai Utama Soekarno-Hatta',
    category: 'komersial',
    categoryLabel: 'Komersial / Ruko Usaha',
    location: 'Boulevard Soekarno Hatta, Lowokwaru',
    city: 'Kota Malang',
    district: 'Lowokwaru',
    price: 2650000000,
    priceFormatted: 'Rp 2,65 Miliar',
    installmentEstimate: 'Rp 14,8 Jt/bln',
    specs: {
      bedrooms: 1,
      bathrooms: 3,
      landArea: 90,
      buildingArea: 220,
      carport: 4,
      certificate: 'SHM Murni'
    },
    features: ['Parkiran Luas Depan Ruko', 'Kawasan Pusat Bisnis & Kafe', 'Listrik 5500 Watt + Tandon', 'Yield Sewa s/d 130 Jt/thn'],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'LOKASI EMAS KAFE & KANTOR',
    description: 'Unit ruko 3 lantai di jalur terpadat Kota Malang. Sangat cocok untuk kantor cabang, klinik kecantikan, restoran franchise, maupun co-working space.',
    createdAt: '2026-03-03'
  },

  // 4. Klojen - Ijen Boulevard Heritage
  {
    id: 'prop-mlg-4',
    title: 'Rumah Kolonial Indische Dekat Ijen Boulevard',
    category: 'rumah-second',
    categoryLabel: 'Hunian Premium Pusat Kota',
    location: 'Kawasan Oro-Oro Dowo, Klojen',
    city: 'Kota Malang',
    district: 'Klojen',
    price: 3800000000,
    priceFormatted: 'Rp 3,80 Miliar',
    installmentEstimate: 'Rp 21,5 Jt/bln',
    specs: {
      bedrooms: 5,
      bathrooms: 4,
      landArea: 280,
      buildingArea: 240,
      carport: 3,
      certificate: 'SHM + PBB Lengkap'
    },
    features: ['Halaman Asri & Rindang', 'Hanya 2 Menit ke Ijen Boulevard', 'Plafon Tinggi 4 Meter', 'Kawasan Elit Pusat Malang'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    isSold: false,
    badge: 'ASET PRESTISIUS',
    description: 'Properti langka di lingkar pusat pemerintahan dan heritage Kota Malang. Lokasi tenang, prestisius, dan bernilai warisan tinggi.',
    createdAt: '2026-03-04'
  },

  // 5. Sukun - Dieng Permai (TERJUAL / SOLD SAMPLE)
  {
    id: 'prop-mlg-5',
    title: 'Scandinavian Compact House Lembah Dieng',
    category: 'rumah-baru',
    categoryLabel: 'Rumah Konsep Scandinavian',
    location: 'Kawasan Lembah Dieng, Sukun',
    city: 'Kota Malang',
    district: 'Sukun',
    price: 685000000,
    priceFormatted: 'Rp 685 Juta',
    installmentEstimate: 'Rp 3,9 Jt/bln',
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      landArea: 65,
      buildingArea: 50,
      carport: 1,
      certificate: 'SHM Siap Balik Nama'
    },
    features: ['Dekat Universitas Merdeka (UNMER)', 'Free Canopy & Smartlock', 'Bebas Banjir & Tenang', 'Cicilan Terjangkau'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    isSold: true, // Sample sold property!
    badge: 'SUDAH TERJUAL (SOLD)',
    description: 'Unit rumah compact modern telah berhasil terjual dalam kurun waktu 2 minggu pendampingan Zahrani Property kepada pembeli dokter muda.',
    createdAt: '2026-02-15'
  },

  // 6. Kedungkandang - Sawojajar 2
  {
    id: 'prop-mlg-6',
    title: 'Cluster Minimalis Asri Sawojajar Malang',
    category: 'rumah-baru',
    categoryLabel: 'Cluster Baru Sawojajar',
    location: 'Sawojajar, Kedungkandang',
    city: 'Kota Malang',
    district: 'Kedungkandang',
    price: 590000000,
    priceFormatted: 'Rp 590 Juta',
    installmentEstimate: 'Rp 3,4 Jt/bln',
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      landArea: 72,
      buildingArea: 48,
      carport: 1,
      certificate: 'SHM + IMB'
    },
    features: ['Akses Dekat Pintu Tol Madyopuro Malang', 'Kawasan Padat Fasilitas', 'Air PDAM Lancar & Jernih', 'Bisa KPR Bank BSI / BCA'],
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'AKSES CEPAT TOL MALANG',
    description: 'Rumah idaman di Sawojajar Kedungkandang dengan akses hanya 5 menit menuju Pintu Tol Malang-Pandaan (Madyopuro). Sangat cocok untuk mobilitas ke Surabaya.',
    createdAt: '2026-03-05'
  },

  // 7. Lowokwaru - Tunggulwulung
  {
    id: 'prop-mlg-7',
    title: 'Rumah 2 Lantai Mewah Tunggulwulung Malang',
    category: 'rumah-baru',
    categoryLabel: 'Rumah 2 Lantai Kekinian',
    location: 'Tunggulwulung, Lowokwaru',
    city: 'Kota Malang',
    district: 'Lowokwaru',
    price: 1150000000,
    priceFormatted: 'Rp 1,15 Miliar',
    installmentEstimate: 'Rp 6,6 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 84,
      buildingArea: 90,
      carport: 2,
      certificate: 'SHM Pecah'
    },
    features: ['Balkon Luas View Gunung Panderman', 'One Gate System & CCTV', 'Dekat Kampus UMM & UB', 'Desain Modern Industrial'],
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'BEST SELLER LOWOKWARU',
    description: 'Hunian asri bernuansa sejuk dengan view pegunungan di kawasan favorit Tunggulwulung Lowokwaru. Sangat diminati kalangan profesional muda dan dosen.',
    createdAt: '2026-03-06'
  },

  // 8. Batu / Malang Raya - Villa Wisata
  {
    id: 'prop-mlg-8',
    title: 'Villa Modern Estetik Panorama Kota Batu',
    category: 'rumah-second',
    categoryLabel: 'Villa Wisata & Liburan',
    location: 'Oro-Oro Ombo, Kota Batu',
    city: 'Kota Batu / Malang Raya',
    district: 'Batu / Malang Raya',
    price: 1450000000,
    priceFormatted: 'Rp 1,45 Miliar',
    installmentEstimate: 'Rp 8,2 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 105,
      buildingArea: 95,
      carport: 2,
      certificate: 'SHM + IMB Wisata'
    },
    features: ['Dekat Jatim Park 2 & BNS', 'Private Rooftop BBQ View Gunung', 'Okupansi Homestay 70%', 'Full Furnished Siap Sewa'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'POTENSI PASSIVE INCOME',
    description: 'Villa aktif menghasilkan sewa harian wisatawan di Kota Batu. Sangat cocok bagi Anda yang menginginkan aset hunian peristirahatan sekaligus investasi produktif.',
    createdAt: '2026-03-07'
  },

  // 9. Blimbing - Tanah Kavling Siap Bangun
  {
    id: 'prop-mlg-9',
    title: 'Tanah Kavling Siap Bangun Kawasan Araya',
    category: 'tanah',
    categoryLabel: 'Tanah Kavling Residensial',
    location: 'Pandanwangi - Araya, Blimbing',
    city: 'Kota Malang',
    district: 'Blimbing',
    price: 495000000,
    priceFormatted: 'Rp 495 Juta',
    installmentEstimate: 'Cash / Bertahap 12x',
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      landArea: 100,
      buildingArea: 0,
      carport: 0,
      certificate: 'SHM Split'
    },
    features: ['Kontur Tanah Datar Padat', 'Lebar Depan 8 Meter', 'Akses Mobil Simpangan', 'Jaringan Listrik & Air Siap'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    isSold: false,
    badge: 'HARGA PERDANA',
    description: 'Kavling tanah matang siap langsung bangun di perbatasan Pandanwangi dan Araya Blimbing Kota Malang. Legalitas aman SHM pecahan per bidang.',
    createdAt: '2026-03-08'
  },

  // 10. Sukun - Kebonsari (TERJUAL / SOLD SAMPLE)
  {
    id: 'prop-mlg-10',
    title: 'Rumah Asri Siap Huni Kebonsari Sukun',
    category: 'rumah-second',
    categoryLabel: 'Rumah Keluarga Nyaman',
    location: 'Kebonsari, Sukun',
    city: 'Kota Malang',
    district: 'Sukun',
    price: 525000000,
    priceFormatted: 'Rp 525 Juta',
    installmentEstimate: 'Rp 3,1 Jt/bln',
    specs: {
      bedrooms: 2,
      bathrooms: 1,
      landArea: 70,
      buildingArea: 55,
      carport: 1,
      certificate: 'SHM Lengkap'
    },
    features: ['Lingkungan Tetangga Ramah', 'Dekat Pasar Tradisional Sukun', 'Air Sumur Bor Bening', 'Bebas Banjir'],
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    isSold: true, // Sample sold property!
    badge: 'SUDAH TERJUAL (SOLD)',
    description: 'Rumah di Kebonsari Sukun Malang telah sukses terjual via proses KPR Bank BTN dengan pendampingan verifikasi data oleh Zahrani Property.',
    createdAt: '2026-01-20'
  },

  // 11. Klojen - Ruko Rampal Celaket
  {
    id: 'prop-mlg-11',
    title: 'Ruko Strategis 2 Lantai Ring 1 Rampal Celaket',
    category: 'komersial',
    categoryLabel: 'Komersial / Kantor',
    location: 'Rampal Celaket, Klojen',
    city: 'Kota Malang',
    district: 'Klojen',
    price: 1950000000,
    priceFormatted: 'Rp 1,95 Miliar',
    installmentEstimate: 'Rp 11,2 Jt/bln',
    specs: {
      bedrooms: 1,
      bathrooms: 2,
      landArea: 80,
      buildingArea: 140,
      carport: 2,
      certificate: 'SHM'
    },
    features: ['Dekat Stasiun Kotabaru Malang', 'Lalu Lintas Ramai Siang-Malam', 'Listrik 3500 Watt', 'Sangat Cocok Apotek / Praktek Dokter'],
    imageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: true,
    isSold: false,
    badge: 'DEKAT STASIUN KOTA MALANG',
    description: 'Ruko dua lantai di lokasi pusat kota Klojen. Akses sangat cepat ke Stasiun Malang Kotabaru, Alun-Alun Tugu, dan Balaikota Malang.',
    createdAt: '2026-03-09'
  },

  // 12. Kedungkandang - Buring Hill View
  {
    id: 'prop-mlg-12',
    title: 'Kavling View Perbukitan Buring Kedungkandang',
    category: 'tanah',
    categoryLabel: 'Tanah Villa Perkotaan',
    location: 'Buring Hill, Kedungkandang',
    city: 'Kota Malang',
    district: 'Kedungkandang',
    price: 360000000,
    priceFormatted: 'Rp 360 Juta',
    installmentEstimate: 'Cash Lunak 6x',
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      landArea: 90,
      buildingArea: 0,
      carport: 0,
      certificate: 'SHM'
    },
    features: ['Panorama Citylight Kota Malang', 'Hawa Sejuk Alami', 'Akses Dekat Ciputra CitraGarden', 'Jalan Paving 7 Meter'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    isHot: false,
    isSold: false,
    badge: 'VIEW CITYLIGHT CANTIK',
    description: 'Tanah kavling menghadap view citylight Kota Malang yang menawan di malam hari. Cocok untuk dibangun rumah peristirahatan modern.',
    createdAt: '2026-03-10'
  }
];

export const PROPERTIES = INITIAL_PROPERTIES;
