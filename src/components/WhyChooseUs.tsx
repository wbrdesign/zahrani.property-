import React from 'react';
import { ShieldCheck, Building2, FileCheck, Handshake, CheckCircle2 } from 'lucide-react';
import { SERVICE_PILLARS } from '../data/mockData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-bm-teal" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-bm-slate" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-bm-sage" />;
      case 'Handshake':
        return <Handshake className="w-5 h-5 text-bm-teal-light" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-bm-teal" />;
    }
  };

  return (
    <section className="py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#16282E] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 sm:h-5 bg-bm-teal rounded-full inline-block"></span>
            Mengapa Memilih Zahrani Property?
          </h2>
          <p className="text-[11px] sm:text-xs text-[#50666E]">Standar profesionalisme tinggi & ketenangan transaksi Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SERVICE_PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E4E1] shadow-2xs flex flex-col justify-start hover:border-bm-slate hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#EEF4F2] border border-[#D8E4E1] flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
              {getIcon(pillar.iconName)}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#16282E] leading-snug mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#50666E] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
