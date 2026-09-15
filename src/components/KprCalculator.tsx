import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Percent, 
  Calendar, 
  Wallet, 
  Building2, 
  MessageSquare, 
  TrendingDown
} from 'lucide-react';
import { calculateKprMonthly, formatRupiah, formatCompactRupiah, createWhatsAppLink } from '../utils/formatters';
import { BANK_PARTNERS, CONSULTANT_INFO } from '../data/mockData';

interface KprCalculatorProps {
  initialPrice?: number;
}

export const KprCalculator: React.FC<KprCalculatorProps> = ({
  initialPrice = 1200000000
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [dpPercent, setDpPercent] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(4.25);
  const [tenorYears, setTenorYears] = useState<number>(20);

  const pricePresets = [
    { label: '500 Jt', value: 500000000 },
    { label: '800 Jt', value: 800000000 },
    { label: '1.2 M', value: 1200000000 },
    { label: '1.5 M', value: 1500000000 },
    { label: '2 M', value: 2000000000 }
  ];

  const tenorPresets = [10, 15, 20, 25];
  const dpPresets = [0, 5, 10, 20];

  const result = useMemo(() => {
    return calculateKprMonthly(propertyPrice, dpPercent, interestRate, tenorYears);
  }, [propertyPrice, dpPercent, interestRate, tenorYears]);

  const waConsultText = `Halo Bu ${CONSULTANT_INFO.name}, saya telah menghitung simulasi KPR di website Zahrani Property:
- Harga Properti: ${formatRupiah(propertyPrice)}
- DP (${dpPercent}%): ${formatRupiah(result.downPaymentAmount)}
- Plafon KPR: ${formatRupiah(result.loanAmount)}
- Tenor: ${tenorYears} Tahun (Bunga ${interestRate}%)
- Estimasi Cicilan: ${formatRupiah(result.monthlyInstallment)}/bulan

Apakah bisa dibantu cek bank mana yang paling cocok dengan profil keuangan saya?`;

  const waLink = createWhatsAppLink(CONSULTANT_INFO.whatsappNumber, waConsultText);

  return (
    <section className="py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#16282E] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 sm:h-5 bg-bm-teal rounded-full inline-block"></span>
            Simulasi KPR Instan
          </h2>
          <p className="text-[11px] sm:text-xs text-[#50666E]">Hitung estimasi cicilan rumah impian Anda secara real-time</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-[#EEF4F2] border border-[#D8E4E1] flex items-center justify-center text-bm-teal">
          <Calculator className="w-4 h-4" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#D8E4E1] shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Controls (7 cols on PC) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Price Section */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-bm-teal" />
                  Harga Properti
                </label>
                <span className="text-sm sm:text-base font-extrabold text-bm-teal">
                  {formatCompactRupiah(propertyPrice)}
                </span>
              </div>

              <div className="relative mb-2.5">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  step={50000000}
                  min={200000000}
                  max={10000000000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold text-[#16282E] focus:outline-none focus:ring-2 focus:ring-bm-teal"
                />
              </div>

              {/* Quick presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {pricePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setPropertyPrice(preset.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                      propertyPrice === preset.value
                        ? 'bg-bm-teal text-white font-bold'
                        : 'bg-[#EEF4F2] text-[#2B454E] hover:bg-[#D8E4E1]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment (DP) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-bm-teal" />
                  Uang Muka (DP)
                </label>
                <span className="text-xs sm:text-sm font-semibold text-[#50666E]">
                  {dpPercent}% ({formatCompactRupiah(result.downPaymentAmount)})
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {dpPresets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDpPercent(p)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      dpPercent === p
                        ? 'bg-bm-teal text-white shadow-xs'
                        : 'bg-[#EEF4F2] text-[#2B454E] hover:bg-[#D8E4E1]'
                    }`}
                  >
                    {p === 0 ? 'DP 0%' : `${p}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenor & Bunga */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Tenor */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-4 h-4 text-bm-teal" />
                  Jangka Waktu
                </label>
                <select
                  value={tenorYears}
                  onChange={(e) => setTenorYears(Number(e.target.value))}
                  className="w-full py-2.5 px-3 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold text-[#16282E] focus:outline-none focus:ring-2 focus:ring-bm-teal"
                >
                  {tenorPresets.map((y) => (
                    <option key={y} value={y}>
                      {y} Tahun ({y * 12} bln)
                    </option>
                  ))}
                </select>
              </div>

              {/* Suku Bunga */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-1.5 mb-1.5">
                  <TrendingDown className="w-4 h-4 text-bm-teal" />
                  Bunga Bank (%/Thn)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.1}
                    min={2}
                    max={15}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="w-full py-2.5 pl-3 pr-7 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold text-[#16282E] focus:outline-none focus:ring-2 focus:ring-bm-teal"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Result Box & Bank Partners (5 cols on PC) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Result Card: Deep Bermuda Teal Gradient */}
            <div className="bg-gradient-to-br from-bm-teal-dark via-bm-teal to-[#174550] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden border border-[#174550]">
              <div className="text-[11px] sm:text-xs text-[#D8E4E1] uppercase tracking-wider font-semibold mb-1">
                Estimasi Angsuran / Bulan
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3 drop-shadow-xs">
                {formatRupiah(result.monthlyInstallment)}
                <span className="text-xs sm:text-sm text-[#D8E4E1] font-normal"> /bln</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20 text-xs">
                <div>
                  <div className="text-[#D8E4E1]">Plafon Pinjaman:</div>
                  <div className="font-bold text-white text-sm">
                    {formatCompactRupiah(result.loanAmount)}
                  </div>
                </div>
                <div>
                  <div className="text-[#D8E4E1]">Min. Gaji Bersih:</div>
                  <div className="font-bold text-[#D8E4E1] text-sm">
                    ~{formatCompactRupiah(result.estimatedMinIncome)}/bln
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Partner Promo */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#16282E] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-bm-teal" />
                  Bank Rekanan Pilihan:
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {BANK_PARTNERS.slice(0, 3).map((b) => (
                  <div
                    key={b.name}
                    className="p-2 sm:p-2.5 rounded-xl bg-[#EEF4F2]/60 border border-[#D8E4E1]"
                  >
                    <div className="text-xs font-bold text-[#16282E] truncate">
                      {b.name}
                    </div>
                    <div className="text-xs font-extrabold text-bm-teal">
                      {b.rate}
                    </div>
                    <div className="text-[10px] text-[#50666E] truncate">{b.type}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button to Consult */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-bm-teal/20"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Konsultasikan KPR Ini ke Bu Zahrani</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
