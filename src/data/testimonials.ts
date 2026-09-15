import { Testimonial } from '../types';

/**
 * =======================================================================
 * DATA TESTIMONI KLIEN ZAHRANI PROPERTY
 * =======================================================================
 * Tambahkan atau edit ulasan pelanggan di sini.
 */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Bpk. Hendra & Ibu Dian',
    occupation: 'Karyawan Swasta & Guru',
    review: 'Awalnya ragu KPR bisa disetujui karena berkas mepet. Bu Zahrani bantu dari nol, rekomendasi bank syariah terbaik, sampai akad lancar. Layanan sangat ramah!',
    propertyBought: 'Cluster Grand Emerald BSD',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verifiedTransaction: true
  },
  {
    id: 't2',
    name: 'dr. Satria Wibowo',
    occupation: 'Dokter Spesialis',
    review: 'Titip jual ruko di Bintaro lewat Zahrani Property cuma butuh waktu 3 minggu langsung laku dengan harga di atas target awal. Profesional dan transparan.',
    propertyBought: 'Ruko Bintaro Sektor 7',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verifiedTransaction: true
  },
  {
    id: 't3',
    name: 'Agnes Pramudita',
    occupation: 'First Home Buyer (Tech Lead)',
    review: 'Tidak ada biaya agen sama sekali untuk pembeli! Zahrani sangat sabar mengantar survei sampai 4 lokasi berbeda di weekend tanpa ada paksaan.',
    propertyBought: 'Rumah Japandi Mezzanine',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    verifiedTransaction: true
  }
];
