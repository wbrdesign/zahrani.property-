import React, { useState } from 'react';
import { 
  X, 
  Bed, 
  Bath, 
  Maximize2, 
  FileText, 
  Car, 
  MapPin, 
  MessageCircle, 
  Calculator, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { Property } from '../types';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenKprWithPrice: (price: number) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onOpenKprWithPrice
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const gallery = property.galleryImages?.length > 0 ? property.galleryImages : [property.imageUrl];

  const waUnitLink = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Bu ${CONSULTANT_INFO.name}, saya ingin tanya ketersediaan dan jadwalkan survei untuk unit:\n*${property.title}*\nHarga: ${property.priceFormatted}\nLokasi: ${property.location}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md sm:max-w-2xl max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        {/* Modal Top Bar */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={gallery[activeImageIndex] || property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            {property.badge && (
              <span className="px-2.5 py-1 rounded-md bg-bm-teal text-white font-bold text-[11px] shadow-xs">
                {property.badge}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-white text-[11px]">
              {property.categoryLabel}
            </span>
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <div className="text-xs text-slate-200">Harga Properti</div>
              <div className="text-xl font-black text-white drop-shadow-xs">
                {property.priceFormatted}
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-lg bg-bm-teal text-white font-bold text-xs shadow-xs">
                Cicilan {property.installmentEstimate}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-bm-teal scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Details */}
        <div className="p-4 overflow-y-auto space-y-4 text-slate-800">
          <div>
            <h2 className="text-base font-bold text-[#16282E] mb-1">
              {property.title}
            </h2>
            <div className="flex items-center gap-1 text-xs text-[#50666E]">
              <MapPin className="w-3.5 h-3.5 text-bm-slate shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold text-[#16282E] mb-2">Spesifikasi Unit</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 bg-[#F8FAF9] p-3 rounded-2xl border border-[#D8E4E1] text-xs">
              {property.specs.bedrooms > 0 && (
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-bm-slate" />
                  <span>Kamar Tidur: <strong>{property.specs.bedrooms}</strong></span>
                </div>
              )}
              {property.specs.bathrooms > 0 && (
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-bm-slate" />
                  <span>Kamar Mandi: <strong>{property.specs.bathrooms}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-bm-slate" />
                <span>Luas Tanah: <strong>{property.specs.landArea} m²</strong></span>
              </div>
              {property.specs.buildingArea > 0 && (
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-bm-slate" />
                  <span>Luas Bangunan: <strong>{property.specs.buildingArea} m²</strong></span>
                </div>
              )}
              {property.specs.carport > 0 && (
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-bm-slate" />
                  <span>Carport: <strong>{property.specs.carport} Mobil</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-bm-teal" />
                <span className="text-bm-teal font-bold">{property.specs.certificate}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#16282E] mb-1.5">Deskripsi Properti</h4>
            <p className="text-xs text-[#2B454E] leading-relaxed bg-[#F8FAF9] p-3 rounded-xl border border-[#D8E4E1]">
              {property.description}
            </p>
          </div>

          {/* Keunggulan & Fasilitas */}
          <div>
            <h4 className="text-xs font-bold text-[#16282E] mb-2">Keunggulan & Fasilitas</h4>
            <div className="grid grid-cols-1 gap-1.5">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#2B454E]">
                  <CheckCircle2 className="w-4 h-4 text-bm-teal shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultant Guarantee Note */}
          <div className="p-3 bg-[#EEF4F2] rounded-2xl border border-[#D8E4E1] flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-bm-teal flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-2xs">
              ZP
            </div>
            <div className="text-[11px] text-[#16282E] leading-relaxed">
              <strong className="block text-bm-teal font-bold">Jaminan Konsultan Zahrani Property:</strong>
              100% legalitas sertifikat dicek sebelum transaksi, bebas biaya agen untuk pembeli, dan didampingi proses KPR bank sampai serah terima kunci.
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-3 bg-white border-t border-[#D8E4E1] grid grid-cols-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenKprWithPrice(property.price);
            }}
            className="py-3 px-3 rounded-xl bg-[#EEF4F2] hover:bg-[#D8E4E1] active:scale-95 text-[#16282E] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Calculator className="w-4 h-4 text-bm-teal" />
            <span>Simulasi KPR</span>
          </button>

          <a
            href={waUnitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-bm-teal/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya Bu Zahrani</span>
          </a>
        </div>
      </div>
    </div>
  );
};
