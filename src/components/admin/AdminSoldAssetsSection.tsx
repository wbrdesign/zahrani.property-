import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { formatCompactRupiah, formatRupiah } from '../../utils/formatters';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  TrendingUp, 
  Building, 
  DollarSign, 
  PieChart, 
  ArrowUpDown,
  Filter
} from 'lucide-react';

export const AdminSoldAssetsSection: React.FC = () => {
  const { 
    properties, 
    soldProperties, 
    unsoldProperties, 
    totalAssetValue, 
    totalSoldValue, 
    totalActiveValue, 
    togglePropertySold 
  } = usePropertyContext();

  const [activeTab, setActiveTab] = useState<'all' | 'unsold' | 'sold'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'title'>('price-desc');

  // Filtered dataset
  const currentList = activeTab === 'all' 
    ? properties 
    : activeTab === 'sold' 
      ? soldProperties 
      : unsoldProperties;

  const filteredItems = currentList
    .filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.district && p.district.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      return a.title.localeCompare(b.title);
    });

  const soldPercentage = properties.length > 0 
    ? Math.round((soldProperties.length / properties.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#D8E4E1]">
        <h2 className="text-base sm:text-lg font-extrabold text-[#16282E] flex items-center gap-2">
          <PieChart className="w-5 h-5 text-bm-teal" />
          Data Aset Terjual vs. Belum Terjual (Status Penjualan)
        </h2>
        <p className="text-xs text-[#50666E]">
          Pantau rasio konversi penjualan properti, nilai omset aset terjual, dan kelola status ketersediaan unit secara langsung.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Total Portfolio */}
        <div className="bg-white p-4 rounded-2xl border border-[#D8E4E1] shadow-2xs">
          <div className="flex items-center justify-between text-[#50666E] text-xs font-semibold mb-1">
            <span>Total Portofolio Aset</span>
            <Building className="w-4 h-4 text-bm-teal" />
          </div>
          <div className="text-xl font-extrabold text-[#16282E]">
            {properties.length} Unit
          </div>
          <div className="text-[11px] text-[#50666E] mt-1">
            Total Valuasi: <strong>{formatCompactRupiah(totalAssetValue)}</strong>
          </div>
        </div>

        {/* Card 2: Belum Terjual (Tersedia) */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs bg-emerald-50/20">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-1">
            <span>Belum Terjual (Tersedia)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-900">
            {unsoldProperties.length} Unit
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">
            Nilai Aktif: <strong>{formatCompactRupiah(totalActiveValue)}</strong>
          </div>
        </div>

        {/* Card 3: Sudah Terjual (Sold) */}
        <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-2xs bg-rose-50/20">
          <div className="flex items-center justify-between text-rose-800 text-xs font-bold mb-1">
            <span>Sudah Terjual (SOLD)</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-extrabold text-rose-900">
            {soldProperties.length} Unit
          </div>
          <div className="text-[11px] text-rose-700 mt-1">
            Omset Closing: <strong>{formatCompactRupiah(totalSoldValue)}</strong>
          </div>
        </div>

        {/* Card 4: Success Ratio */}
        <div className="bg-white p-4 rounded-2xl border border-[#D8E4E1] shadow-2xs">
          <div className="flex items-center justify-between text-[#50666E] text-xs font-semibold mb-1">
            <span>Rasio Terjual (Closing Rate)</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-[#16282E]">
            {soldPercentage}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Switcher Controls */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center p-1 bg-[#EEF4F2] rounded-xl overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-white text-[#16282E] shadow-2xs'
                  : 'text-[#50666E] hover:text-[#16282E]'
              }`}
            >
              Semua Aset ({properties.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('unsold')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'unsold'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Belum Terjual ({unsoldProperties.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sold')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sold'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Sudah Terjual ({soldProperties.length})</span>
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama aset..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-bold text-[#2B454E] focus:outline-none"
            >
              <option value="price-desc">Harga Tertinggi</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="title">Abjad A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-[#D8E4E1] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#16282E] text-white">
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Aset Properti</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Wilayah / Lokasi</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider">Harga</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-center">Status Penjualan</th>
                <th className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-right">Tindakan Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8E4E1]">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-[#F8FAF9] transition-colors ${
                    item.isSold ? 'bg-rose-50/20' : ''
                  }`}
                >
                  {/* Property details */}
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
                        <span className="text-[10px] font-bold text-bm-teal uppercase tracking-wide block">
                          {item.categoryLabel}
                        </span>
                        <h4 className="font-bold text-[#16282E] line-clamp-1 max-w-xs">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-[#50666E]">
                          LT: {item.specs.landArea}m² | LB: {item.specs.buildingArea}m² | {item.specs.bedrooms} KT
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 text-[#2B454E]">
                    <div className="font-bold text-[#16282E]">
                      {item.district || 'Kota Malang'}
                    </div>
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
                      Est. {item.installmentEstimate}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4 text-center">
                    {item.isSold ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        <span>SUDAH TERJUAL</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>BELUM TERJUAL (TERSEDIA)</span>
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => togglePropertySold(item.id)}
                      className={`py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all border ${
                        item.isSold
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                      }`}
                    >
                      {item.isSold ? 'Ubah ke Tersedia' : 'Tandai Terjual'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-10 p-4">
            <p className="text-xs text-slate-500">
              Tidak ada data aset pada kategori status ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
