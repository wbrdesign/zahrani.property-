import React, { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  MessageCircle, 
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { Property } from '../types';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface ListingCardProps {
  property: Property;
  itemNumber?: number;
  onSelectProperty: (property: Property) => void;
}

/**
 * =======================================================================
 * KOMPONEN TAMPILAN KARTU LISTING PROPERTI (HTML KHUSUS LISTING)
 * =======================================================================
 * File ini KHUSUS mengatur tampilan (HTML / JSX) setiap kartu listing:
 * 1. Wadah Foto Properti (tinggi, aspect-ratio, zoom hover effect)
 * 2. Badge Status (Promo DP 0%, Baru, Nego, dll)
 * 3. Tampilan Harga & Estimasi Cicilan
 * 4. Spesifikasi (Kamar Tidur, Kamar Mandi, Luas Tanah)
 * 5. Tombol Aksi (Lihat Detail & Chat WhatsApp Langsung)
 *
 * Anda dapat mengedit tampilan visual kartu properti di sini secara terpisah!
 */
export const ListingCard: React.FC<ListingCardProps> = ({
  property,
  itemNumber,
  onSelectProperty
}) => {
  const [imgError, setImgError] = useState(false);

  // Link WhatsApp otomatis dengan isi pesan detail properti
  const waUnitLink = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Bu ${CONSULTANT_INFO.name}, saya tertarik dengan "${property.title}" (${property.priceFormatted}) di ${property.location}. Apakah unit ini masih tersedia?`
  );

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#D8E4E1] shadow-2xs hover:shadow-xl hover:border-bm-slate transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* ========================================================= */}
      {/* 1. BAGIAN FOTO PROPERTI (IMAGE & OVERLAY)                 */}
      {/* ========================================================= */}
      <div 
        className="relative h-32 sm:h-44 md:h-52 w-full cursor-pointer overflow-hidden bg-slate-100"
        onClick={() => onSelectProperty(property)}
      >
        {!imgError ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-2 text-center">
            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
            <span className="text-[10px]">Foto Properti</span>
          </div>
        )}

        {/* Gradien gelap di bagian bawah foto agar teks harga terbaca tajam */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />

        {/* --- Top Badges & Penomoran Unit --- */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 overflow-hidden">
            {property.badge && (
              <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-bm-teal text-white font-bold text-[9px] sm:text-[11px] tracking-tight sm:tracking-wide shadow-xs truncate max-w-[110px] sm:max-w-none">
                {property.badge}
              </span>
            )}
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg bg-slate-900/70 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-medium hidden sm:inline-block">
              {property.categoryLabel.split(' ')[0]}
            </span>
          </div>
          {typeof itemNumber === 'number' && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-slate-900/60 backdrop-blur-xs text-white/95 text-[9px] sm:text-[10px] font-semibold shrink-0">
              #{itemNumber}
            </span>
          )}
        </div>

        {/* --- Bottom Overlay: Harga & Cicilan --- */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3.5 right-2 sm:right-3.5 flex items-end justify-between text-white gap-1">
          <div className="min-w-0">
            <div className="text-[8px] sm:text-[10px] text-slate-200 font-medium">Harga Mulai</div>
            <div className="text-xs sm:text-base lg:text-xl font-black tracking-tight text-white drop-shadow-xs truncate">
              {property.priceFormatted}
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-bm-teal/95 backdrop-blur-xs text-white text-[8px] sm:text-[11px] font-bold shadow-xs">
              {property.installmentEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. BAGIAN DESKRIPSI & SPESIFIKASI                         */}
      {/* ========================================================= */}
      <div className="p-2.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Judul Properti */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-bold text-xs sm:text-sm lg:text-base text-[#16282E] leading-tight sm:leading-snug cursor-pointer hover:text-bm-teal transition-colors line-clamp-1 mb-1"
          >
            {property.title}
          </h3>

          {/* Lokasi */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#50666E] mb-2">
            <MapPin className="w-3 h-3 text-bm-slate shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Kotak Spesifikasi: Kamar Tidur, Kamar Mandi, Luas Tanah */}
          <div className="grid grid-cols-3 gap-1 py-1 sm:py-1.5 px-1.5 sm:px-2.5 bg-[#EEF4F2]/50 rounded-lg sm:rounded-xl text-[9px] sm:text-xs text-[#2B454E] font-medium mb-2 sm:mb-3 border border-[#D8E4E1]/60 text-center">
            {property.specs.bedrooms > 0 ? (
              <div className="flex items-center justify-center gap-1">
                <Bed className="w-3 h-3 text-bm-slate shrink-0" />
                <span>{property.specs.bedrooms} KT</span>
              </div>
            ) : (
              <span className="text-slate-400">-</span>
            )}
            {property.specs.bathrooms > 0 ? (
              <div className="flex items-center justify-center gap-1">
                <Bath className="w-3 h-3 text-bm-slate shrink-0" />
                <span>{property.specs.bathrooms} KM</span>
              </div>
            ) : (
              <span className="text-slate-400">-</span>
            )}
            <div className="flex items-center justify-center gap-1">
              <Maximize2 className="w-3 h-3 text-bm-slate shrink-0" />
              <span>{property.specs.landArea}m²</span>
            </div>
          </div>

          {/* Keunggulan Utama (Muncul di Layar Tablet & Desktop) */}
          <div className="hidden sm:flex flex-wrap gap-1 mb-3">
            {property.features.slice(0, 2).map((feat, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-[#F3EFE6] text-[#3E5259] font-medium truncate border border-[#E7DECC]"
              >
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. TOMBOL AKSI: LIHAT DETAIL & HUBUNGI WHATSAPP          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 border-t border-[#D8E4E1] mt-1">
          <button
            type="button"
            onClick={() => onSelectProperty(property)}
            className="py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-[#EEF4F2] hover:bg-bm-teal hover:text-white active:scale-95 text-[#2B454E] font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
          >
            <span>Detail</span>
            <ArrowRight className="w-3 h-3 text-bm-slate" />
          </button>

          <a
            href={waUnitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Tanya WA</span>
          </a>
        </div>
      </div>
    </div>
  );
};
