import React, { useState } from 'react';
import { Property } from '../../types';
import { usePropertyContext } from '../../context/PropertyContext';
import { MALANG_DISTRICTS } from '../../data/listings';
import { formatCompactRupiah, getQuickInstallmentEstimate } from '../../utils/formatters';
import { LocalImageUploader } from './LocalImageUploader';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  ExternalLink, 
  X, 
  AlertTriangle,
  Images,
  UploadCloud,
  FolderOpen
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Rumah Modern Minimalis', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rumah Mezzanine Scandinavian', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rumah Mewah Klasik 2 Lantai', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' },
  { label: 'Villa Asri View Gunung', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ruko Bisnis Komersial', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tanah Kavling Siap Bangun', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' }
];

export const AdminListingsSection: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty, togglePropertySold } = usePropertyContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold'>('all');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [quickPhotoProperty, setQuickPhotoProperty] = useState<Property | null>(null);
  const [quickMainImage, setQuickMainImage] = useState('');
  const [quickGalleryImages, setQuickGalleryImages] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Form state
  const initialFormState = {
    title: '',
    category: 'rumah-baru' as Property['category'],
    categoryLabel: 'Rumah Baru Siap Huni',
    location: '',
    city: 'Kota Malang',
    district: 'Lowokwaru',
    price: 850000000,
    priceFormatted: 'Rp 850 Juta',
    installmentEstimate: 'Rp 4,8 Jt/bln',
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      landArea: 80,
      buildingArea: 70,
      carport: 1,
      certificate: 'SHM + IMB Siap'
    },
    featuresText: 'Free Biaya KPR & Notaris, One Gate System, Dekat Kampus',
    imageUrl: PRESET_IMAGES[0].url,
    galleryImages: [PRESET_IMAGES[0].url, PRESET_IMAGES[1].url],
    isHot: true,
    isSold: false,
    badge: 'PROMO BULAN INI',
    description: 'Hunian nyaman dengan sirkulasi udara optimal di Kota Malang. Lokasi strategis dekat fasilitas umum dan bebas banjir.'
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleOpenAddModal = () => {
    setEditingPropertyId(null);
    setFormState(initialFormState);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (property: Property) => {
    setEditingPropertyId(property.id);
    const existingGallery = property.galleryImages && property.galleryImages.length > 0
      ? property.galleryImages
      : (property.imageUrl ? [property.imageUrl] : []);

    setFormState({
      title: property.title,
      category: property.category,
      categoryLabel: property.categoryLabel,
      location: property.location,
      city: property.city || 'Kota Malang',
      district: property.district || 'Lowokwaru',
      price: property.price,
      priceFormatted: property.priceFormatted,
      installmentEstimate: property.installmentEstimate,
      specs: {
        bedrooms: property.specs.bedrooms,
        bathrooms: property.specs.bathrooms,
        landArea: property.specs.landArea,
        buildingArea: property.specs.buildingArea,
        carport: property.specs.carport,
        certificate: property.specs.certificate
      },
      featuresText: property.features.join(', '),
      imageUrl: property.imageUrl,
      galleryImages: existingGallery,
      isHot: !!property.isHot,
      isSold: !!property.isSold,
      badge: property.badge || '',
      description: property.description
    });
    setIsFormModalOpen(true);
  };

  // Quick photo upload modal opener
  const handleOpenQuickPhotoModal = (property: Property) => {
    setQuickPhotoProperty(property);
    setQuickMainImage(property.imageUrl);
    setQuickGalleryImages(
      property.galleryImages && property.galleryImages.length > 0
        ? property.galleryImages
        : (property.imageUrl ? [property.imageUrl] : [])
    );
  };

  const handleSaveQuickPhotos = () => {
    if (!quickPhotoProperty) return;
    const finalGallery = quickGalleryImages.length > 0 
      ? quickGalleryImages 
      : (quickMainImage ? [quickMainImage] : [PRESET_IMAGES[0].url]);
    const finalMain = quickMainImage || finalGallery[0] || PRESET_IMAGES[0].url;

    updateProperty(quickPhotoProperty.id, {
      imageUrl: finalMain,
      galleryImages: finalGallery
    });

    setSuccessMsg(`Foto listing "${quickPhotoProperty.title}" berhasil diperbarui! (${finalGallery.length} foto tersimpan)`);
    setQuickPhotoProperty(null);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handlePriceChange = (numPrice: number) => {
    const compact = formatCompactRupiah(numPrice);
    const installment = getQuickInstallmentEstimate(numPrice);
    setFormState(prev => ({
      ...prev,
      price: numPrice,
      priceFormatted: compact,
      installmentEstimate: installment
    }));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = formState.featuresText
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    let galleryArray = formState.galleryImages.filter(Boolean);
    if (galleryArray.length === 0 && formState.imageUrl) {
      galleryArray = [formState.imageUrl];
    } else if (galleryArray.length === 0) {
      galleryArray = [PRESET_IMAGES[0].url];
    }

    const mainImageUrl = formState.imageUrl || galleryArray[0] || PRESET_IMAGES[0].url;

    // Category label auto map
    let catLabel = formState.categoryLabel;
    if (formState.category === 'rumah-baru') catLabel = 'Rumah Baru Siap Huni';
    else if (formState.category === 'rumah-second') catLabel = 'Rumah Siap Huni (Second)';
    else if (formState.category === 'komersial') catLabel = 'Komersial / Ruko Usaha';
    else if (formState.category === 'tanah') catLabel = 'Tanah Kavling';

    const propertyPayload = {
      title: formState.title,
      category: formState.category,
      categoryLabel: catLabel,
      location: formState.location,
      city: formState.city || 'Kota Malang',
      district: formState.district,
      price: formState.price,
      priceFormatted: formState.priceFormatted || formatCompactRupiah(formState.price),
      installmentEstimate: formState.installmentEstimate || getQuickInstallmentEstimate(formState.price),
      specs: formState.specs,
      features: featuresArray,
      imageUrl: mainImageUrl,
      galleryImages: galleryArray,
      isHot: formState.isHot,
      isSold: formState.isSold,
      badge: formState.badge,
      description: formState.description
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, propertyPayload);
      setSuccessMsg(`Listing "${formState.title}" berhasil diperbarui! (${galleryArray.length} foto)`);
    } else {
      addProperty(propertyPayload);
      setSuccessMsg(`Listing baru "${formState.title}" berhasil ditambahkan! (${galleryArray.length} foto)`);
    }

    setIsFormModalOpen(false);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDelete = (id: string) => {
    deleteProperty(id);
    setDeleteConfirmId(null);
    setSuccessMsg('Listing berhasil dihapus!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Filter properties
  const filteredListings = properties.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.district && p.district.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchStatus = filterStatus === 'all' || 
      (filterStatus === 'sold' && p.isSold) || 
      (filterStatus === 'available' && !p.isSold);

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8E4E1]">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#16282E] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-bm-teal" />
            Kelola & Tambah Katalog Listing Properti
          </h2>
          <p className="text-xs text-[#50666E]">
            Tambah listing baru, perbarui data harga, ubah foto, dan ganti status Terjual / Belum Terjual secara instan.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-bm-teal/20"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Listing Baru</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filters row */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, cluster, atau wilayah Malang..."
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="py-2 px-3 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-bold text-[#2B454E] focus:outline-none"
            >
              <option value="all">Semua Tipe Properti</option>
              <option value="rumah-baru">Rumah Baru</option>
              <option value="rumah-second">Siap Huni (Second)</option>
              <option value="komersial">Ruko / Komersial</option>
              <option value="tanah">Tanah Kavling</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="py-2 px-3 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-bold text-[#2B454E] focus:outline-none"
            >
              <option value="all">Semua Status (Tersedia & Terjual)</option>
              <option value="available">Hanya Belum Terjual (Tersedia)</option>
              <option value="sold">Hanya Sudah Terjual (SOLD)</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-[#50666E] flex items-center justify-between">
          <span>Menampilkan <strong>{filteredListings.length}</strong> dari total {properties.length} listing</span>
          <span className="text-bm-teal font-semibold">Tersimpan otomatis ke database website</span>
        </div>
      </div>

      {/* Listing Cards Grid for Admin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map((prop) => (
          <div
            key={prop.id}
            className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col ${
              prop.isSold 
                ? 'border-rose-200 bg-slate-50/70 shadow-2xs' 
                : 'border-[#D8E4E1] hover:border-bm-teal/40 shadow-xs'
            }`}
          >
            {/* Image banner & badges */}
            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
              <img
                src={prop.imageUrl}
                alt={prop.title}
                className={`w-full h-full object-cover ${prop.isSold ? 'grayscale-40' : ''}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                }}
              />
              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
                  prop.isSold 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-emerald-600 text-white'
                }`}>
                  {prop.isSold ? 'SUDAH TERJUAL (SOLD)' : 'BELUM TERJUAL (TERSEDIA)'}
                </span>
                {prop.district && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/95 text-[#16282E] shadow-xs">
                    📍 {prop.district}
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                  <Images className="w-2.5 h-2.5 text-bm-teal" />
                  <span>{(prop.galleryImages?.length || 1)} Foto</span>
                </span>
              </div>

              <div className="absolute bottom-2.5 right-2.5 bg-[#16282E]/90 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                {prop.priceFormatted}
              </div>
            </div>

            {/* Body */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-[11px] font-semibold text-bm-teal uppercase tracking-wider mb-0.5">
                  {prop.categoryLabel}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#16282E] line-clamp-1">
                  {prop.title}
                </h3>
                <p className="text-[11px] text-[#50666E] line-clamp-1 mt-0.5">
                  {prop.location}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-1 py-1.5 px-2 bg-[#EEF4F2]/60 rounded-xl text-[10px] text-[#2B454E] font-medium mt-2 text-center border border-[#D8E4E1]/60">
                  <span>KT: {prop.specs.bedrooms}</span>
                  <span>KM: {prop.specs.bathrooms}</span>
                  <span>LT: {prop.specs.landArea}m²</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#D8E4E1] space-y-2">
                {/* Status Toggle Button */}
                <button
                  type="button"
                  onClick={() => togglePropertySold(prop.id)}
                  className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    prop.isSold
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                  }`}
                >
                  {prop.isSold ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ubah Menjadi: Belum Terjual (Tersedia)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Tandai Sebagai: SUDAH TERJUAL</span>
                    </>
                  )}
                </button>

                {/* Quick Photo Upload & Edit/Delete buttons */}
                <button
                  type="button"
                  onClick={() => handleOpenQuickPhotoModal(prop)}
                  className="w-full py-1.5 px-2.5 rounded-xl bg-white border border-[#D8E4E1] hover:border-bm-teal hover:bg-[#EEF4F2] text-xs font-bold text-[#16282E] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-bm-teal" />
                  <span>Upload & Kelola Foto ({(prop.galleryImages?.length || 1)})</span>
                </button>

                {/* Edit & Delete row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(prop)}
                    className="py-1.5 px-3 rounded-xl bg-[#EEF4F2] hover:bg-bm-teal hover:text-white text-[#2B454E] text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Data</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(prop.id)}
                    className="py-1.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#D8E4E1] p-6">
          <p className="text-xs sm:text-sm text-slate-500 mb-2">
            Tidak ada listing yang cocok dengan filter pencarian.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setFilterCategory('all'); setFilterStatus('all'); }}
            className="text-xs font-bold text-bm-teal underline"
          >
            Reset Filter Pencarian
          </button>
        </div>
      )}

      {/* MODAL: Tambah / Edit Listing */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D8E4E1] overflow-hidden my-6">
            <div className="bg-[#16282E] p-4 sm:p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base">
                  {editingPropertyId ? 'Edit Listing Properti' : 'Tambah Listing Properti Baru'}
                </h3>
                <p className="text-[11px] text-slate-300">
                  Isi informasi lengkap properti untuk dipublikasikan ke katalog Zahrani Property
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Judul & Tipe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#16282E] mb-1">
                    Judul Properti / Nama Cluster:
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    placeholder="Contoh: Cluster Modern Golf View Araya"
                    className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16282E] mb-1">
                    Kategori Properti:
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  >
                    <option value="rumah-baru">Rumah Baru (Baru / Indent)</option>
                    <option value="rumah-second">Rumah Siap Huni (Second)</option>
                    <option value="komersial">Komersial / Ruko Bisnis</option>
                    <option value="tanah">Tanah Kavling</option>
                  </select>
                </div>
              </div>

              {/* Wilayah Malang & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#16282E] mb-1">
                    Wilayah / Kecamatan (Kota Malang):
                  </label>
                  <select
                    value={formState.district}
                    onChange={(e) => setFormState({ ...formState, district: e.target.value })}
                    className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  >
                    {MALANG_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16282E] mb-1">
                    Alamat Lengkap / Area:
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    placeholder="Contoh: Jl. Soekarno Hatta, Lowokwaru"
                    className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  />
                </div>
              </div>

              {/* Harga & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#EEF4F2]/50 rounded-2xl border border-[#D8E4E1]">
                <div>
                  <label className="block text-xs font-bold text-[#16282E] mb-1">
                    Harga (Rp Nominal):
                  </label>
                  <input
                    type="number"
                    required
                    min={10000000}
                    step={5000000}
                    value={formState.price}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-[#D8E4E1] rounded-xl text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  />
                  <div className="text-[11px] font-extrabold text-bm-teal mt-1">
                    Tampilan: {formState.priceFormatted} ({formState.installmentEstimate})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16282E] mb-1">
                    Status Penjualan Aset:
                  </label>
                  <select
                    value={formState.isSold ? 'sold' : 'available'}
                    onChange={(e) => setFormState({ ...formState, isSold: e.target.value === 'sold' })}
                    className="w-full p-2.5 bg-white border border-[#D8E4E1] rounded-xl text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  >
                    <option value="available">🟢 Belum Terjual (Unit Tersedia)</option>
                    <option value="sold">🔴 SUDAH TERJUAL (SOLD OUT)</option>
                  </select>

                  <div className="mt-2">
                    <label className="block text-[11px] font-bold text-[#50666E] mb-0.5">
                      Badge Promo (Opsional):
                    </label>
                    <input
                      type="text"
                      value={formState.badge}
                      onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                      placeholder="Cth: PROMO DP 0%, SIAP HUNI, dll."
                      className="w-full p-1.5 bg-white border border-[#D8E4E1] rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Spesifikasi Teknis */}
              <div>
                <label className="block text-xs font-bold text-[#16282E] mb-1.5">
                  Spesifikasi Fisik Properti:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <div>
                    <span className="text-[10px] text-[#50666E] font-bold">Kamar Tidur</span>
                    <input
                      type="number"
                      min={0}
                      value={formState.specs.bedrooms}
                      onChange={(e) => setFormState({
                        ...formState,
                        specs: { ...formState.specs, bedrooms: Number(e.target.value) }
                      })}
                      className="w-full p-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#50666E] font-bold">Kamar Mandi</span>
                    <input
                      type="number"
                      min={0}
                      value={formState.specs.bathrooms}
                      onChange={(e) => setFormState({
                        ...formState,
                        specs: { ...formState.specs, bathrooms: Number(e.target.value) }
                      })}
                      className="w-full p-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#50666E] font-bold">Luas Tanah (m²)</span>
                    <input
                      type="number"
                      min={0}
                      value={formState.specs.landArea}
                      onChange={(e) => setFormState({
                        ...formState,
                        specs: { ...formState.specs, landArea: Number(e.target.value) }
                      })}
                      className="w-full p-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#50666E] font-bold">Luas Bangunan (m²)</span>
                    <input
                      type="number"
                      min={0}
                      value={formState.specs.buildingArea}
                      onChange={(e) => setFormState({
                        ...formState,
                        specs: { ...formState.specs, buildingArea: Number(e.target.value) }
                      })}
                      className="w-full p-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#50666E] font-bold">Carport</span>
                    <input
                      type="number"
                      min={0}
                      value={formState.specs.carport}
                      onChange={(e) => setFormState({
                        ...formState,
                        specs: { ...formState.specs, carport: Number(e.target.value) }
                      })}
                      className="w-full p-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#50666E] font-bold">Sertifikat</span>
                    <input
                      type="text"
                      value={formState.specs.certificate}
                      onChange={(e) => setFormState({
                        ...formState,
                        specs: { ...formState.specs, certificate: e.target.value }
                      })}
                      className="w-full p-1.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Upload Foto Properti (File Lokal Komputer / HP & Multi-Foto) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#16282E] flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-bm-teal" />
                    <span>Upload Foto Properti dari File Lokal (Komputer / HP)</span>
                  </label>
                  <span className="text-[10px] text-[#50666E]">
                    Bisa pilih & upload banyak file sekaligus
                  </span>
                </div>
                <LocalImageUploader
                  mainImage={formState.imageUrl}
                  onMainImageChange={(url) => setFormState(prev => ({ ...prev, imageUrl: url }))}
                  galleryImages={formState.galleryImages}
                  onGalleryImagesChange={(imgs) => setFormState(prev => ({ ...prev, galleryImages: imgs }))}
                  presetImages={PRESET_IMAGES}
                />
              </div>

              {/* Fitur & Deskripsi */}
              <div>
                <label className="block text-xs font-bold text-[#16282E] mb-1">
                  Fitur Unggulan (Pisahkan dengan tanda koma):
                </label>
                <input
                  type="text"
                  value={formState.featuresText}
                  onChange={(e) => setFormState({ ...formState, featuresText: e.target.value })}
                  placeholder="Contoh: Free KPR, Dekat Kampus UB, Row Jalan 8m, Smartlock"
                  className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16282E] mb-1">
                  Deskripsi Lengkap Properti:
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
                />
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#D8E4E1] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#D8E4E1] text-[#2B454E] hover:bg-[#EEF4F2] text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white text-xs font-bold shadow-md shadow-bm-teal/20"
                >
                  {editingPropertyId ? 'Simpan Perubahan' : 'Terbitkan Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK PHOTO UPLOAD MODAL */}
      {quickPhotoProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-6 border border-[#D8E4E1] shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8E4E1]">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#16282E] flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-bm-teal" />
                  Upload & Kelola Foto Unit
                </h3>
                <p className="text-xs text-[#50666E] font-medium truncate max-w-md">
                  {quickPhotoProperty.title} • {quickPhotoProperty.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuickPhotoProperty(null)}
                className="w-8 h-8 rounded-full bg-[#EEF4F2] hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <LocalImageUploader
              mainImage={quickMainImage}
              onMainImageChange={(url) => setQuickMainImage(url)}
              galleryImages={quickGalleryImages}
              onGalleryImagesChange={(imgs) => setQuickGalleryImages(imgs)}
              presetImages={PRESET_IMAGES}
            />

            <div className="pt-3 border-t border-[#D8E4E1] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setQuickPhotoProperty(null)}
                className="px-4 py-2 rounded-xl border border-[#D8E4E1] text-[#2B454E] hover:bg-[#EEF4F2] text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveQuickPhotos}
                className="px-5 py-2 rounded-xl bg-bm-teal hover:bg-bm-teal-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-bm-teal/20"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan Foto</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-[#D8E4E1] shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#16282E]">
              Hapus Listing Ini?
            </h3>
            <p className="text-xs text-[#50666E]">
              Listing yang dihapus akan hilang dari katalog publik website.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2 px-3 rounded-xl border border-[#D8E4E1] text-xs font-bold text-[#2B454E]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="w-1/2 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
