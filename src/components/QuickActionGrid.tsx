import React from 'react';
import { 
  MessageSquareText, 
  Home, 
  Calculator, 
  KeyRound, 
  CalendarCheck2, 
  PhoneCall 
} from 'lucide-react';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface QuickActionGridProps {
  onSelectListingTab: () => void;
  onSelectKprTab: () => void;
  onOpenSellModal: () => void;
  onOpenSurveyModal: () => void;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({
  onSelectListingTab,
  onSelectKprTab,
  onOpenSellModal,
  onOpenSurveyModal
}) => {
  const waConsultLink = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Bu Zahrani, saya ingin konsultasi langsung untuk mencari properti sesuai budget saya.`
  );

  const actions = [
    {
      id: 'wa',
      title: 'Chat Konsultasi',
      subtitle: 'Tanya gratis 1-on-1',
      icon: MessageSquareText,
      color: 'bg-[#EEF4F2] text-bm-teal border-[#D8E4E1]',
      badge: 'Respons Cepat',
      badgeColor: 'bg-[#EEF4F2] text-bm-teal border border-[#D8E4E1]',
      href: waConsultLink,
      isExternal: true
    },
    {
      id: 'katalog',
      title: 'Listing Pilihan',
      subtitle: 'Rumah, Ruko & Tanah',
      icon: Home,
      color: 'bg-[#EEF4F2] text-bm-teal border-[#D8E4E1]',
      badge: 'Terkurasi',
      badgeColor: 'bg-bm-teal text-white border border-bm-teal',
      onClick: onSelectListingTab
    },
    {
      id: 'kpr',
      title: 'Simulasi KPR',
      subtitle: 'Hitung cicilan per bln',
      icon: Calculator,
      color: 'bg-[#F8FAF9] text-[#2B454E] border-[#D8E4E1]',
      badge: '12+ Bank',
      badgeColor: 'bg-[#F3EFE6] text-[#2B454E] border border-[#E7DECC]',
      onClick: onSelectKprTab
    },
    {
      id: 'titip-jual',
      title: 'Titip Jual / Sewa',
      subtitle: 'Bantu pasarkan cepat',
      icon: KeyRound,
      color: 'bg-[#EEF4F2] text-[#6B8B9B] border-[#D8E4E1]',
      badge: 'Bebas Ribet',
      badgeColor: 'bg-[#EEF4F2] text-[#6B8B9B] border border-[#D8E4E1]',
      onClick: onOpenSellModal
    },
    {
      id: 'survei',
      title: 'Janji Survei',
      subtitle: 'Cek lokasi bersama',
      icon: CalendarCheck2,
      color: 'bg-[#F3EFE6] text-[#8EA79C] border-[#E7DECC]',
      badge: 'Gratis Antar',
      badgeColor: 'bg-[#EEF4F2] text-[#8EA79C] border border-[#D8E4E1]',
      onClick: onOpenSurveyModal
    },
    {
      id: 'call',
      title: 'Hubungi Telepon',
      subtitle: `Langsung ke ${CONSULTANT_INFO.name}`,
      icon: PhoneCall,
      color: 'bg-[#F8FAF9] text-[#2B454E] border-[#D8E4E1]',
      badge: '08:00 - 21:00',
      badgeColor: 'bg-[#F3EFE6] text-[#50666E] border border-[#E7DECC]',
      href: `tel:${CONSULTANT_INFO.phone}`,
      isExternal: true
    }
  ];

  return (
    <section className="py-3 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#16282E] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 sm:h-5 bg-bm-teal rounded-full inline-block"></span>
            Akses Cepat & Layanan Utama
          </h2>
          <p className="text-[11px] sm:text-xs text-[#50666E]">Pilih kebutuhan Anda dengan sekali sentuh / klik</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4">
        {actions.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="h-full flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-[#D8E4E1] shadow-2xs hover:shadow-md hover:border-bm-teal transition-all active:scale-[0.98] text-left relative overflow-hidden group">
              {/* Corner badge & icon */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center ${item.color} border group-hover:scale-105 transition-transform shrink-0`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>
                <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#16282E] group-hover:text-bm-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#50666E] mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );

          if (item.isExternal && item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.id === 'wa' ? '_blank' : undefined}
                rel={item.id === 'wa' ? 'noopener noreferrer' : undefined}
                className="block focus:outline-none"
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className="block w-full focus:outline-none text-left"
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
};
