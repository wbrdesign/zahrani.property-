/**
 * =======================================================================
 * DATA AGGREGATOR UTAMA
 * =======================================================================
 * File ini menggabungkan semua modul data yang telah dipisahkan:
 * - src/data/consultant.ts   -> Data profil & kontak konsultan
 * - src/data/listings.ts     -> Khusus katalog listing properti & foto (Edit foto di sini!)
 * - src/data/testimonials.ts -> Khusus ulasan dan testimoni klien
 */

export * from './consultant';
export * from './listings';
export * from './testimonials';
