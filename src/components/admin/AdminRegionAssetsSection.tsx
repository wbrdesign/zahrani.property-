import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { MALANG_DISTRICTS } from '../../data/listings';
import { formatCompactRupiah } from '../../utils/formatters';
import { 
  MapPin, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const AdminRegionAssetsSection: React.FC = () => {
  const { properties, togglePropertySold } = usePropertyContext();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics per district
  const districtStats = MALANG_DISTRICTS.map((districtName) => {
    const districtProps = properties.filter(
      p => p.district === districtName || p.location.toLowerCase().includes(districtName.toLowerCase())
    );
    const available = districtProps.filter(p => !p.isSold).length;
    const sold = districtProps.filter(p => p.isSold).length;
    const totalValuation = districtProps.reduce((sum, p) => sum + (p.price || 0), 0);

    return {
      name: districtName,
      count: districtProps.length,
      available,
      sold,
      totalValuation
    };
  });

  // Filtered properties for current view
  const currentProperties = properties.filter((p) => {
    const matchDistrict = selectedDistrict === 'all' 
      ? true 
      : (p.district === selectedDistrict || p.location.toLowerCase().includes(selectedDistrict.toLowerCase()));
    
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchDistrict && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#D8E4E1]">
        <h2 className="text-base sm:text-lg font-extrabold text-[#16282E] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-500" />
          Data Aset Properti Berdasarkan Wilayah (Kota Malang & Sekitarnya)
        </h2>
        <p className="text-xs text-[#50666E]">
          Sebaran data listing properti di setiap kecamatan Kota Malang (Lowokwaru, Klojen, Blimbing, Sukun, Kedungkandang, dan Batu).
        </p>
      </div>

      {/* District Cards Grid (Interactive Selection) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-[#16282E] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-bm-teal" />
            Pilih Wilayah Kecamatan:
          </h3>
          <button
            type="button"
            onClick={() => setSelectedDistrict('all')}
            className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
              selectedDistrict === 'all'
                ? 'bg-bm-teal text-white shadow-2xs'
                : 'text-bm-teal hover:underline'
            }`}
          >
            Tampilkan Semua Wilayah ({properties.length} Unit)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {districtStats.map((stat) => {
            const isSelected = selectedDistrict === stat.name;
            return (
              <button
                key={stat.name}
                type="button"
                onClick={() => setSelectedDistrict(stat.name)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-bm-teal bg-[#EEF4F2] shadow-sm ring-2 ring-bm-teal'
                    : 'border-[#D8E4E1] bg-white hover:border-bm-teal/50 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[#50666E] mb-1">
                    <span className="text-[10px] font-extrabold text-bm-teal uppercase">Wilayah</span>
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#16282E] leading-snug">
                    {stat.name}
                  </h4>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#D8E4E1]/80 space-y-1">
                  <div className="text-xs font-extrabold text-[#16282E]">
                    {stat.count} Unit
                  </div>
                  <div className="text-[10px] text-[#50666E] flex items-center justify-between">
                    <span className="text-emerald-700 font-semibold">{stat.available} Aktif</span>
                    <span className="text-rose-700 font-semibold">{stat.sold} Sold</span>
                  </div>
                  <div className="text-[10px] font-bold text-[#2B454E] truncate">
                    {formatCompactRupiah(stat.totalValuation)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected District Info Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#D8E4E1] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#16282E]">
              Wilayah Terpilih: <span className="text-bm-teal font-extrabold">{selectedDistrict === 'all' ? 'Semua Wilayah Kota Malang' : selectedDistrict}</span>
            </div>
            <div className="text-[11px] text-[#50666E]">
              Menampilkan {currentProperties.length} unit aset properti
            </div>
          </div>
        </div>

        {/* Quick Search in Region */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dalam wilayah ini..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
          />
        </div>
      </div>

      {/* Regional Assets Table */}
      <div className="bg-white rounded-2xl border border-[#D8E4E1] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#16282E] text-white">
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Aset Properti</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Kecamatan & Alamat</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Harga Aset</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-center">Status</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E4E1]">
              {currentProperties.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-[#F8FAF9] transition-colors ${
                    item.isSold ? 'bg-rose-50/15' : ''
                  }`}
                >
                  {/* Title & Media */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={`w-12 h-12 rounded-xl object-cover border border-[#D8E4E1] shrink-0 ${
                          item.isSold ? 'grayscale-40 opacity-80' : ''
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div>
                        <span className="text-[10px] font-bold text-bm-teal uppercase block">
                          {item.categoryLabel}
                        </span>
                        <h4 className="font-bold text-[#16282E] line-clamp-1 max-w-xs">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-[#50666E]">
                          Sertifikat: {item.specs.certificate}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* District & Location */}
                  <td className="py-3 px-4 text-[#2B454E]">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#EEF4F2] text-bm-teal font-extrabold text-[10px] mb-1">
                      {item.district || 'Kota Malang'}
                    </span>
                    <div className="text-[11px] text-[#50666E] line-clamp-1">
                      {item.location}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <div className="font-extrabold text-[#16282E]">
                      {item.priceFormatted}
                    </div>
                    <div className="text-[10px] text-[#50666E]">
                      Cicilan: {item.installmentEstimate}
                    </div>
                  </td>

                  {/* Sold Status */}
                  <td className="py-3 px-4 text-center">
                    {item.isSold ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        <span>SUDAH TERJUAL</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>BELUM TERJUAL</span>
                      </span>
                    )}
                  </td>

                  {/* Toggle */}
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => togglePropertySold(item.id)}
                      className={`py-1 px-2.5 rounded-lg text-[10px] font-bold border transition-all ${
                        item.isSold
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                      }`}
                    >
                      {item.isSold ? 'Buka Ketersediaan' : 'Tandai Terjual'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentProperties.length === 0 && (
          <div className="text-center py-10 p-4">
            <p className="text-xs text-slate-500">
              Tidak ada aset terdaftar di wilayah {selectedDistrict}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
