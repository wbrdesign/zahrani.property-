import React, { useState, useRef } from 'react';
import { 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Property } from '../types';
import { usePropertyContext } from '../context/PropertyContext';
import { ListingCard } from './ListingCard';

interface FeaturedListingsProps {
  onSelectProperty: (property: Property) => void;
  onOpenKprWithPrice?: (price: number) => void;
}

const ITEMS_PER_PAGE = 9;

export const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  onSelectProperty,
  onOpenKprWithPrice
}) => {
  const { properties } = usePropertyContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const galleryTopRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Semua Unit' },
    { id: 'rumah-baru', label: 'Rumah Baru' },
    { id: 'rumah-second', label: 'Siap Huni' },
    { id: 'komersial', label: 'Ruko / Usaha' },
    { id: 'tanah', label: 'Tanah Kavling' }
  ];

  const filteredProperties = properties.filter((prop) => {
    const matchesCategory =
      selectedCategory === 'all' || prop.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      prop.title.toLowerCase().includes(query) ||
      prop.location.toLowerCase().includes(query) ||
      prop.city.toLowerCase().includes(query) ||
      (prop.district && prop.district.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (galleryTopRef.current) {
      galleryTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section ref={galleryTopRef} className="py-4 sm:py-6">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 px-1">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#16282E] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 sm:h-5 bg-bm-teal rounded-full inline-block"></span>
            Listing Pilihan Zahrani
          </h2>
          <p className="text-[11px] sm:text-xs text-[#50666E]">
            Legalitas aman & rekomendasi unit terbaik (9 unit per halaman)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs font-semibold text-[#3E5259] bg-[#F3EFE6] px-2.5 py-1 rounded-full border border-[#E7DECC]">
            {filteredProperties.length} Unit Tersedia
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-bm-teal bg-[#EEF4F2] border border-[#D8E4E1] px-2.5 py-1 rounded-full">
            Hal. {safeCurrentPage} dari {totalPages}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Row on Desktop */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
        {/* Quick Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari lokasi, cluster, atau area (cth: Araya, Ijen, Soekarno-Hatta, Dieng, Lowokwaru)..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-[#D8E4E1] rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-bm-teal focus:border-transparent shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-bm-teal text-white shadow-xs'
                  : 'bg-white text-[#3E5259] border border-[#D8E4E1] hover:bg-[#EEF4F2] hover:text-bm-teal'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Responsive Cards Grid (9 Kotak Gallery per Halaman) */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#D8E4E1] p-6">
          <p className="text-xs sm:text-sm text-slate-500 mb-3">
            Tidak ada properti yang cocok dengan pencarian "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="text-xs sm:text-sm font-semibold text-bm-teal underline"
          >
            Reset Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Grid 9 Kotak Gallery (2 kolom di HP/tablet untuk menghemat scroll, 3 kolom di layar PC besar) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
            {currentProperties.map((prop, idx) => (
              <ListingCard
                key={prop.id}
                property={prop}
                itemNumber={startIndex + idx + 1}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>

          {/* Kotak Kontrol Bawah: Angka Halaman di Pojok Bawah Sisi Kanan Kotak Gallery */}
          <div className="flex items-center justify-between gap-2 pt-3 px-1">
            {/* Info Unit di Sisi Kiri */}
            <div className="text-[11px] sm:text-xs text-[#50666E] font-medium truncate">
              Menampilkan <span className="font-bold text-[#16282E]">{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredProperties.length)}</span> dari <span className="font-bold text-[#16282E]">{filteredProperties.length}</span> unit
            </div>

            {/* Angka Halaman di Pojok Bawah Sisi Kanan Kotak Gallery */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-[#D8E4E1] shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 pl-2 pr-1 hidden sm:inline">
                Halaman:
              </span>

              {/* Tombol Sebelumnya */}
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                aria-label="Halaman Sebelumnya"
                className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                  safeCurrentPage <= 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-[#2B454E] hover:bg-[#EEF4F2] active:scale-90'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Angka-Angka Halaman */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === safeCurrentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center shadow-xs active:scale-95 ${
                      isActive
                        ? 'bg-bm-teal text-white shadow-md ring-2 ring-bm-teal/30'
                        : 'bg-[#EEF4F2] text-[#2B454E] hover:bg-[#D8E4E1] border border-[#D8E4E1]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Tombol Selanjutnya */}
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                aria-label="Halaman Selanjutnya"
                className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                  safeCurrentPage >= totalPages
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-[#2B454E] hover:bg-[#EEF4F2] active:scale-90'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

