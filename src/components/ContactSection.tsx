import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Building, 
  CalendarCheck2 
} from 'lucide-react';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface ContactSectionProps {
  onOpenSurveyModal?: () => void;
  onOpenSellModal?: () => void;
  avatarUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenSurveyModal,
  onOpenSellModal,
  avatarUrl
}) => {
  const currentAvatar = avatarUrl || CONSULTANT_INFO.avatar;
  const directWa = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Bu ${CONSULTANT_INFO.name}, saya ingin menjadwalkan konsultasi properti privat.`
  );

  return (
    <section className="py-4 sm:py-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#16282E] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 sm:h-5 bg-bm-teal rounded-full inline-block"></span>
            Hubungi Konsultan Zahrani
          </h2>
          <p className="text-[11px] sm:text-xs text-[#50666E]">Layanan ramah, cepat, & solusi properti terpercaya</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#D8E4E1] shadow-sm p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Consultant Profile Details (5 cols on PC, centered on mobile) */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-3.5">
            <div className="relative">
              <img
                src={currentAvatar}
                alt={CONSULTANT_INFO.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top ring-4 ring-bm-teal/70 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-bm-teal text-white p-1 rounded-full ring-2 ring-white shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#16282E] leading-tight">
                {CONSULTANT_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-bm-teal font-bold">
                {CONSULTANT_INFO.brandName} • {CONSULTANT_INFO.title}
              </p>
              <div className="inline-flex items-center justify-center gap-1.5 text-xs text-[#50666E] mt-1">
                <Clock className="w-3.5 h-3.5 text-bm-slate" />
                <span>{CONSULTANT_INFO.hours}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#3E5259] leading-relaxed bg-[#F3EFE6] p-4 rounded-2xl border border-[#E7DECC] italic w-full">
              "Kepuasan dan keamanan legalitas properti Anda adalah prioritas nomor satu saya. Silakan hubungi saya kapan pun untuk konsultasi gratis."
            </p>

            {/* Direct survey or sell triggers */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {onOpenSurveyModal && (
                <button
                  type="button"
                  onClick={onOpenSurveyModal}
                  className="py-2.5 px-3 rounded-xl bg-[#EEF4F2] hover:bg-bm-teal hover:text-white text-[#16282E] font-bold text-xs transition-colors"
                >
                  Jadwalkan Survei
                </button>
              )}
              {onOpenSellModal && (
                <button
                  type="button"
                  onClick={onOpenSellModal}
                  className="py-2.5 px-3 rounded-xl bg-[#EEF4F2] hover:bg-bm-teal hover:text-white text-[#16282E] font-bold text-xs transition-colors"
                >
                  Titip Jual Properti
                </button>
              )}
            </div>
          </div>

          {/* Contact Methods (7 cols on PC) */}
          <div className="lg:col-span-7 space-y-3">
            <a
              href={directWa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#EEF4F2] text-[#16282E] border border-[#D8E4E1] hover:bg-[#D8E4E1]/40 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-bm-teal text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#16282E]">WhatsApp Messenger Resmi</div>
                  <div className="text-[11px] sm:text-xs text-bm-teal font-medium">Konsultasi cepat 1-on-1 langsung ke Bu Zahrani</div>
                </div>
              </div>
              <span className="text-xs font-bold bg-bm-teal text-white px-3.5 py-1.5 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                Kirim Chat
              </span>
            </a>

            <a
              href={`tel:${CONSULTANT_INFO.phone}`}
              className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAF9] text-[#16282E] border border-[#D8E4E1] hover:bg-[#EEF4F2] transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-bm-teal-dark text-white flex items-center justify-center shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#16282E]">Telepon Seluler / Langsung</div>
                  <div className="text-[11px] sm:text-xs text-[#50666E]">{CONSULTANT_INFO.phone}</div>
                </div>
              </div>
              <span className="text-xs font-bold bg-bm-teal-dark text-white px-3.5 py-1.5 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                Hubungi
              </span>
            </a>

            <div className="p-4 rounded-2xl bg-[#F8FAF9] text-[#2B454E] border border-[#D8E4E1] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4F2] flex items-center justify-center shrink-0 border border-[#D8E4E1]">
                <MapPin className="w-5 h-5 text-bm-teal" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#16282E]">Area Wilayah Layanan</div>
                <div className="text-[11px] sm:text-xs text-[#50666E] mt-0.5 leading-relaxed">
                  Melayani Transaksi Properti Seluruh Indonesia — Spesialis & Fokus Utama Area Malang Raya & Kota Batu.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
