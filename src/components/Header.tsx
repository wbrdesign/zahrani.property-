import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Home, Building, Calculator, UserCheck, Calendar } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSurveyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenSurveyModal
}) => {
  const quickWaUrl = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Bu ${CONSULTANT_INFO.name}, saya ingin konsultasi seputar properti dari website Zahrani Property.`
  );

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'listing', label: 'Listing Pilihan' },
    { id: 'kpr', label: 'Simulasi KPR' },
    { id: 'kontak', label: 'Kontak & Profil' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D8E4E1] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div 
          onClick={() => onTabChange('beranda')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-bm-teal-dark to-bm-teal flex items-center justify-center text-white shadow-sm ring-1 ring-bm-teal/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">ZP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-[#16282E]">
                ZAHRANI <span className="text-bm-teal">PROPERTY</span>
              </h1>
              <ShieldCheck className="w-4 h-4 text-bm-teal shrink-0 fill-[#EEF4F2]" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#50666E]">
              <span className="w-2 h-2 rounded-full bg-bm-sage animate-pulse"></span>
              <span className="font-medium">Konsultan Properti • Siap Melayani</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (PC) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-bm-teal text-white shadow-xs'
                    : 'text-[#50666E] hover:text-bm-teal hover:bg-[#EEF4F2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action CTAs (PC & Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Survey booking button on desktop */}
          <button
            type="button"
            onClick={onOpenSurveyModal}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EEF4F2] hover:bg-bm-teal hover:text-white text-[#2B454E] font-semibold text-xs border border-[#D8E4E1] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-bm-teal" />
            <span>Janji Survei</span>
          </button>

          {/* Direct Phone button on tablet & desktop */}
          <a
            href={`tel:${CONSULTANT_INFO.phone}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D8E4E1] hover:border-bm-slate text-[#2B454E] font-semibold text-xs transition-colors"
            title="Telepon Zahrani"
          >
            <Phone className="w-3.5 h-3.5 text-bm-slate" />
            <span className="hidden xl:inline">{CONSULTANT_INFO.phone}</span>
            <span className="xl:hidden">Telepon</span>
          </a>

          {/* Quick WhatsApp CTA */}
          <a
            href={quickWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-bm-teal/20"
            aria-label="Chat WhatsApp Zahrani"
          >
            <MessageCircle className="w-4 h-4 fill-white shrink-0" />
            <span className="whitespace-nowrap">Chat WA</span>
          </a>
        </div>
      </div>
    </header>
  );
};
