/**
 * =======================================================================
 * DATA PROFIL KONSULTAN & LAYANAN ZAHRANI PROPERTY
 * =======================================================================
 * File ini khusus mengatur:
 * 1. Informasi profil konsultan (Nama, kontak WhatsApp, bio, jam operasional)
 * 2. Foto profil konsultan (bisa diganti dengan '/avatar.jpg' atau link foto Anda)
 * 3. Daftar bank rekanan KPR & pilar layanan
 */

export const CONSULTANT_INFO = {
  name: 'Zahrani',
  brandName: 'Zahrani Property',
  title: 'Senior Property Consultant & KPR Specialist',
  license: 'AREBI Certified Advisor #ZR-8849',
  phone: '0857-8290-9742',
  whatsappNumber: '6285782909742',
  email: 'ranitrilestari90@gmail.com',
  location: 'Jl. Raya Langsep No.11, Bareng, Kec. Klojen, Kota Malang, Jawa Timur 65146',
  experienceYears: '10+ Tahun',
  soldCount: '140+ Unit',
  rating: '4.9',
  reviewCount: '128',
  // Foto profil utama (tersimpan di folder public/zahrani.jpg):
  avatar: './zahrani.jpg',
  bio: 'Membantu Anda menemukan rumah idaman, ruko komersial, & aset investasi properti terbaik. Pendampingan menyeluruh dari cek sertifikat, negosiasi harga terbaik, hingga persetujuan KPR bank.',
  hours: '08:00AM - 6:00PM (Setiap Hari)',
  socials: {
    instagram: '@zahrani.property',
    tiktok: '@zahraniproperty',
    youtube: 'Zahrani Property Official'
  }
};

export const BANK_PARTNERS = [
  { name: 'BCA', rate: '3.85%', type: 'Fix 1 Thn' },
  { name: 'Bank Mandiri', rate: '3.99%', type: 'Fix 3 Thn' },
  { name: 'BSI (Syariah)', rate: '4.25%', type: 'Margin Tetap' },
  { name: 'BTN Prioritas', rate: '3.72%', type: 'Promo KPR' },
  { name: 'BRI', rate: '4.10%', type: 'Fix 2 Thn' },
  { name: 'CIMB Niaga', rate: '3.99%', type: 'Fix & Cap' }
];

export const SERVICE_PILLARS = [
  {
    title: 'Bebas Biaya untuk Pembeli',
    desc: 'Semua jasa konsultasi, rekomendasi listing, dan pendampingan survei 100% gratis tanpa dipungut komisi dari pembeli.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Bantuan KPR ke 12+ Bank',
    desc: 'Kami bantu simulasi, kelengkapan berkas, hingga rekomendasi bunga KPR terendah via bank konvensional & syariah rekanan.',
    iconName: 'Building2'
  },
  {
    title: 'Legalitas Sertifikat Dijamin Aman',
    desc: 'Pengecekan sertifikat (SHM/HGB), IMB/PBG, dan PBB di BPN serta didampingi Notaris/PPAT rekanan resmi.',
    iconName: 'FileCheck'
  },
  {
    title: 'Negosiasi Harga Sampai Deal',
    desc: 'Pendampingan tawar-menawar langsung ke pemilik/developer untuk mendapatkan harga dan skema pembayaran terbaik.',
    iconName: 'Handshake'
  }
];
