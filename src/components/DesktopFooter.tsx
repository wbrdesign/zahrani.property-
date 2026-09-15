import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/mockData';
import { ActiveTab } from '../types';

interface DesktopFooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenSellModal: () => void;
  onOpenSurveyModal: () => void;
}

export const DesktopFooter: React.FC<DesktopFooterProps> = ({
  onTabChange,
  onOpenSellModal,
  onOpenSurveyModal
}) => {
  return (
    <footer className="bg-[#EEF4F2]/60 text-[#50666E] border-t border-[#D8E4E1] mt-12 pt-12 pb-16 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Profile */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-bm-teal flex items-center justify-center text-white shadow-xs">
                <span className="font-extrabold text-lg text-white">ZP</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#16282E]">
                  ZAHRANI <span className="text-bm-teal">PROPERTY</span>
                </h3>
                <p className="text-[11px] text-[#50666E] font-medium">Konsultan Properti Berlisensi</p>
              </div>
            </div>
            <p className="text-xs text-[#50666E] leading-relaxed mb-3">
              Solusi terpercaya menemukan hunian impian, ruko bisnis strategis, dan aset investasi terbaik dengan pendampingan penuh hingga KPR bank dan serah terima kunci.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-bm-teal text-[11px] font-semibold border border-[#D8E4E1] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-bm-teal" />
              <span>{CONSULTANT_INFO.license}</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-bold text-[#16282E] uppercase tracking-wider mb-3">
              Menu Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('beranda')}
                  className="hover:text-bm-teal transition-colors"
                >
                  Beranda & Profil Konsultan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('listing')}
                  className="hover:text-bm-teal transition-colors"
                >
                  Katalog Listing Pilihan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('kpr')}
                  className="hover:text-bm-teal transition-colors"
                >
                  Simulasi & Rekomendasi KPR Bank
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('kontak')}
                  className="hover:text-bm-teal transition-colors"
                >
                  Kontak & Lokasi Kantor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Klien */}
          <div>
            <h4 className="text-xs font-bold text-[#16282E] uppercase tracking-wider mb-3">
              Layanan Khusus
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenSurveyModal}
                  className="hover:text-bm-teal transition-colors"
                >
                  Jadwalkan Survei Lokasi Gratis
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSellModal}
                  className="hover:text-bm-teal transition-colors"
                >
                  Titip Jual / Sewa Properti
                </button>
              </li>
              <li>
                <span className="text-[#50666E]">Pengecekan Legalitas Sertifikat (BPN)</span>
              </li>
              <li>
                <span className="text-[#50666E]">Bantuan Bunga Promo KPR 12+ Bank</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Area & Hubungi */}
          <div>
            <h4 className="text-xs font-bold text-[#16282E] uppercase tracking-wider mb-3">
              Hubungi Langsung
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bm-teal shrink-0" />
                <span className="text-[#16282E] font-medium">{CONSULTANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bm-teal shrink-0" />
                <span className="text-[#16282E] font-medium">Kota Malang, Jawa Timur 65146</span>
              </div>
              <div className="text-[11px] text-[#50666E] pt-1">
                Jam Operasional: {CONSULTANT_INFO.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#D8E4E1] text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#50666E]">
          <p>© {new Date().getFullYear()} Zahrani Property. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 text-[#50666E]">
            Website Resmi Personal Branding Konsultan Properti Terpercaya
          </p>
        </div>
      </div>
    </footer>
  );
};
