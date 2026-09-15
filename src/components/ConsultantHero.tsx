import React, { useRef } from 'react';
import { 
  Star, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  CalendarCheck2,
  BadgePercent,
  Sparkles,
  Camera,
  RotateCcw
} from 'lucide-react';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface ConsultantHeroProps {
  onExploreListings: () => void;
  onOpenKpr: () => void;
  onOpenSurveyModal?: () => void;
  avatarUrl?: string;
  onUploadAvatar?: (newUrl: string) => void;
  onResetAvatar?: () => void;
}

export const ConsultantHero: React.FC<ConsultantHeroProps> = ({
  onExploreListings,
  onOpenKpr,
  onOpenSurveyModal,
  avatarUrl,
  onUploadAvatar,
  onResetAvatar
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentAvatar = avatarUrl || CONSULTANT_INFO.avatar;
  const isCustomAvatar = Boolean(avatarUrl && avatarUrl !== CONSULTANT_INFO.avatar);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && onUploadAvatar) {
        onUploadAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const directConsultWa = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Ibu ${CONSULTANT_INFO.name}, saya ingin konsultasi pencarian properti dan informasi unit pilihan di Zahrani Property.`
  );

  return (
    <section className="pt-2 sm:pt-4 pb-2">
      <div className="bg-[#EEF4F2] rounded-3xl p-6 sm:p-10 lg:p-12 text-[#16282E] shadow-xs relative overflow-hidden border border-[#D8E4E1]">
        {/* Glow ambient background lights in In Your Eyes (715) and Cable Knit Sweater (CSP-650) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D8E4E1]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#6B8B9B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Centered Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          
          {/* Top Status & Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#16282E] text-xs font-semibold border border-[#D8E4E1] shadow-2xs mb-5">
            <Award className="w-3.5 h-3.5 text-bm-teal" />
            <span>{CONSULTANT_INFO.license}</span>
            <span className="w-1 h-1 rounded-full bg-[#8EA79C]" />
            <span className="text-[#16282E] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-bm-sage animate-pulse" />
              Siap Melayani Konsultasi
            </span>
          </div>

          {/* FOTO PROFIL KONSULTAN CENTER TENGAH */}
          <div className="relative mb-5 group">
            {/* Ambient halo ring in Bermuda Turquoise & Cable Knit */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-bm-teal via-[#6B8B9B] to-[#D8E4E1] opacity-70 blur-xs group-hover:opacity-90 transition duration-500" />
            
            {/* Foto Lingkaran Utama */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white ring-offset-2 ring-offset-bm-teal shadow-xl bg-slate-100">
              <img
                src={currentAvatar}
                alt={CONSULTANT_INFO.name}
                className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay hint */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
                title="Ganti Foto Profil"
              >
                <Camera className="w-6 h-6 mb-1 drop-shadow" />
                <span className="text-[10px] font-bold tracking-tight drop-shadow">Ubah Foto</span>
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.jfif"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Tombol Kamera di pojok bawah lingkaran */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Unggah atau ganti foto profil"
              className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 w-8 h-8 rounded-full bg-white text-bm-teal hover:bg-[#EEF4F2] shadow-md border border-[#D8E4E1] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 z-20"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Reset ke Foto Bawaan if custom photo is loaded */}
            {isCustomAvatar && onResetAvatar && (
              <button
                type="button"
                onClick={onResetAvatar}
                title="Kembalikan ke foto bawaan"
                className="absolute top-0 right-0 w-7 h-7 rounded-full bg-white text-[#50666E] hover:text-red-600 hover:bg-red-50 shadow-md border border-[#D8E4E1] flex items-center justify-center cursor-pointer transition-transform hover:scale-110 z-20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Centered bottom verified badge */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bm-teal text-white text-[10px] font-bold shadow-md ring-2 ring-white whitespace-nowrap z-10">
              <CheckCircle className="w-3 h-3 text-[#D8E4E1] fill-bm-teal" />
              <span>Certified Advisor</span>
            </div>
          </div>

          {/* Nama Konsultan & Title (Center) */}
          <div className="space-y-1 mb-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#16282E] leading-tight">
              {CONSULTANT_INFO.name}
            </h1>
            <p className="text-xs sm:text-base text-bm-teal font-bold tracking-wide">
              {CONSULTANT_INFO.title}
            </p>
            <div className="inline-flex items-center justify-center gap-1.5 text-xs text-[#50666E] pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-bm-teal shrink-0" />
              <span>Area Layanan: {CONSULTANT_INFO.location}</span>
            </div>
          </div>

          {/* Statement Bio (Center Box) */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-[#D8E4E1] mb-6 max-w-2xl shadow-2xs">
            <p className="text-xs sm:text-sm text-[#3E5259] leading-relaxed italic">
              "{CONSULTANT_INFO.bio}"
            </p>
          </div>

          {/* Key Metrics Strip (Center 3 Kolom) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-xl py-3.5 px-3 sm:px-6 mb-7 bg-white/95 rounded-2xl border border-[#D8E4E1] shadow-2xs">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-black text-[#16282E]">
                {CONSULTANT_INFO.experienceYears}
              </div>
              <div className="text-[10px] sm:text-xs text-[#50666E] uppercase tracking-wider font-semibold mt-0.5">
                Pengalaman
              </div>
            </div>

            <div className="text-center border-x border-[#D8E4E1]">
              <div className="text-lg sm:text-2xl font-black text-bm-teal">
                {CONSULTANT_INFO.soldCount}
              </div>
              <div className="text-[10px] sm:text-xs text-[#50666E] uppercase tracking-wider font-semibold mt-0.5">
                Unit Terjual
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg sm:text-2xl font-black text-[#16282E]">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{CONSULTANT_INFO.rating}</span>
              </div>
              <div className="text-[10px] sm:text-xs text-[#50666E] uppercase tracking-wider font-semibold mt-0.5">
                {CONSULTANT_INFO.reviewCount}+ Klien Puas
              </div>
            </div>
          </div>

          {/* Action Buttons Row (Center) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full mb-8">
            <a
              href={directConsultWa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-5 sm:px-6 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-bm-teal/20"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Konsultasi WA Langsung</span>
            </a>

            {onOpenSurveyModal && (
              <button
                type="button"
                onClick={onOpenSurveyModal}
                className="flex items-center justify-center gap-2 py-3 px-5 sm:px-6 rounded-xl bg-bm-teal-dark hover:bg-bm-teal active:scale-95 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <CalendarCheck2 className="w-4 h-4 text-[#D8E4E1]" />
                <span>Jadwalkan Survei</span>
              </button>
            )}

            <a
              href={`tel:${CONSULTANT_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 sm:px-5 rounded-xl bg-white hover:bg-[#F3EFE6] active:scale-95 text-[#16282E] font-semibold text-xs sm:text-sm border border-[#D8E4E1] shadow-2xs transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-bm-slate" />
              <span>Telepon</span>
            </a>

            <button
              type="button"
              onClick={onExploreListings}
              className="flex items-center justify-center gap-1.5 py-3 px-4 sm:px-5 rounded-xl bg-white hover:bg-[#EEF4F2] text-bm-teal font-semibold text-xs sm:text-sm border border-[#D8E4E1] transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-bm-teal" />
              <span>Lihat Unit Pilihan</span>
            </button>
          </div>

          {/* 3 Keunggulan Konsultan (Center 3 Kolom di PC, 1-2 Kolom di HP) */}
          <div className="w-full pt-6 border-t border-[#D8E4E1]">
            <p className="text-[11px] uppercase tracking-wider text-[#50666E] font-bold mb-3">
              Komitmen Layanan Personal Zahrani Property:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/95 border border-[#D8E4E1] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#EEF4F2] flex items-center justify-center shrink-0 border border-[#D8E4E1]">
                  <ShieldCheck className="w-4 h-4 text-bm-teal" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16282E]">100% Legalitas Aman</div>
                  <div className="text-[10px] text-[#50666E]">Cek Sertifikat & IMB di Notaris</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/95 border border-[#D8E4E1] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#EEF4F2] flex items-center justify-center shrink-0 border border-[#D8E4E1]">
                  <Building2 className="w-4 h-4 text-bm-slate" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16282E]">12+ Bank Rekanan KPR</div>
                  <div className="text-[10px] text-[#50666E]">Bunga Promo & Bantuan Berkas</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/95 border border-[#D8E4E1] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#F3EFE6] flex items-center justify-center shrink-0 border border-[#E7DECC]">
                  <BadgePercent className="w-4 h-4 text-[#8EA79C]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#16282E]">Bebas Biaya Pembeli</div>
                  <div className="text-[10px] text-[#50666E]">Konsultasi & Survei 100% Gratis</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

