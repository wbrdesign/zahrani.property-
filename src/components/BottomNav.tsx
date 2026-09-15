import React from 'react';
import { Home, Building, Calculator, MessageSquare } from 'lucide-react';
import { ActiveTab } from '../types';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  className = ''
}) => {
  const directWa = createWhatsAppLink(
    CONSULTANT_INFO.whatsappNumber,
    `Halo Bu ${CONSULTANT_INFO.name}, saya ingin konsultasi seputar properti lewat website Zahrani Property.`
  );

  const tabs = [
    {
      id: 'beranda' as ActiveTab,
      label: 'Beranda',
      icon: Home
    },
    {
      id: 'listing' as ActiveTab,
      label: 'Listing',
      icon: Building
    },
    {
      id: 'kpr' as ActiveTab,
      label: 'Hitung KPR',
      icon: Calculator
    },
    {
      id: 'kontak' as ActiveTab,
      label: 'Chat WA',
      icon: MessageSquare,
      isAction: true
    }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#D8E4E1] py-1.5 px-3 shadow-lg ${className}`}>
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isAction) {
            return (
              <a
                key={tab.id}
                href={directWa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-bm-teal hover:text-bm-teal-hover active:scale-90 transition-transform group"
              >
                <div className="w-10 h-10 rounded-xl bg-bm-teal text-white flex items-center justify-center shadow-md shadow-bm-teal/20 group-hover:bg-bm-teal-hover transition-colors">
                  <Icon className="w-5 h-5 fill-white stroke-[1.8]" />
                </div>
                <span className="text-[10px] font-bold text-bm-teal mt-1">
                  {tab.label}
                </span>
              </a>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all active:scale-90 ${
                isActive
                  ? 'text-bm-teal font-bold'
                  : 'text-[#50666E] hover:text-[#16282E] font-medium'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-bm-teal text-white shadow-xs scale-105'
                    : 'bg-transparent text-[#50666E]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold text-bm-teal' : 'text-[#50666E]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
