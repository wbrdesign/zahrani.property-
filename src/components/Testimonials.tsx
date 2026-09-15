import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#16282E] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 sm:h-5 bg-bm-teal rounded-full inline-block"></span>
            Testimoni & Transaksi Sukses
          </h2>
          <p className="text-[11px] sm:text-xs text-[#50666E]">Pengalaman nyata para klien Zahrani Property</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {TESTIMONIALS.map((testi) => (
          <div
            key={testi.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E4E1] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Top row: Avatar + Name + Rating */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={testi.avatarUrl}
                    alt={testi.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#EEF4F2]"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs sm:text-sm font-bold text-[#16282E]">{testi.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-bm-teal fill-[#EEF4F2]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[#50666E] block">{testi.occupation}</span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testi.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review text */}
              <p className="text-xs sm:text-sm text-[#2B454E] leading-relaxed italic mb-3">
                "{testi.review}"
              </p>
            </div>

            {/* Property Bought Tag */}
            <div className="inline-block px-3 py-1.5 rounded-xl bg-[#EEF4F2] text-bm-teal text-[10px] sm:text-xs font-semibold border border-[#D8E4E1] self-start">
              Transaksi: {testi.propertyBought}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
