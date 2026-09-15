import React, { useState, useRef } from 'react';
import { ConsultantProfile } from '../../types';
import { usePropertyContext } from '../../context/PropertyContext';
import { processImageFile } from '../../utils/imageUpload';
import { 
  Save, 
  Check, 
  RotateCcw, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  User, 
  ShieldCheck, 
  Instagram,
  Upload,
  FolderOpen,
  Camera,
  Loader2
} from 'lucide-react';

export const AdminContactSection: React.FC = () => {
  const { consultant, updateConsultant } = usePropertyContext();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState<ConsultantProfile>(() => ({
    ...consultant,
    agency: consultant.agency || consultant.brandName || 'Zahrani Property',
    brandName: consultant.brandName || consultant.agency || 'Zahrani Property',
    license: consultant.license || consultant.licenseNumber || 'AREBI Certified Advisor #ZR-8849',
    licenseNumber: consultant.licenseNumber || consultant.license || 'AREBI Certified Advisor #ZR-8849',
    whatsapp: consultant.whatsapp || consultant.whatsappNumber || '6285782909742',
    whatsappNumber: consultant.whatsappNumber || consultant.whatsapp || '6285782909742',
    avatar: consultant.avatar || consultant.avatarUrl || '/avatar.jpg',
    avatarUrl: consultant.avatarUrl || consultant.avatar || '/avatar.jpg',
    serviceArea: consultant.serviceArea || 'Kota Malang (Lowokwaru, Klojen, Blimbing, Sukun, Kedungkandang) & Malang Raya'
  }));
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWa = (formData.whatsapp || formData.whatsappNumber || '6285782909742').replace(/[^0-9]/g, '');
    const payload: ConsultantProfile = {
      ...formData,
      brandName: formData.brandName || formData.agency || 'Zahrani Property',
      agency: formData.agency || formData.brandName || 'Zahrani Property',
      license: formData.license || formData.licenseNumber || 'AREBI Certified Advisor #ZR-8849',
      licenseNumber: formData.licenseNumber || formData.license || 'AREBI Certified Advisor #ZR-8849',
      whatsappNumber: cleanWa,
      whatsapp: cleanWa,
      avatar: formData.avatar || formData.avatarUrl || '/avatar.jpg',
      avatarUrl: formData.avatarUrl || formData.avatar || '/avatar.jpg'
    };
    updateConsultant(payload);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleReset = () => {
    setFormData(consultant);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8E4E1]">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#16282E] flex items-center gap-2">
            <User className="w-5 h-5 text-bm-teal" />
            Edit / Pengaturan Kontak Profil Konsultan
          </h2>
          <p className="text-xs text-[#50666E]">
            Kelola identitas konsultan, nomor WhatsApp, jam aktif operasional (9:00 AM - 6:00 PM), dan domisili kantor Kota Malang.
          </p>
        </div>
        {savedAlert && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold rounded-xl animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Kontak Profil Berhasil Diperbarui!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Utama */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bm-teal" />
            Identitas & Gelar Konsultan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1">
                Nama Lengkap & Gelar:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1">
                Nama Brand / Kantor Agensi:
              </label>
              <input
                type="text"
                required
                value={formData.agency}
                onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1">
                Jabatan / Title Profesional:
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1">
                Nomor Lisensi AREBI:
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Jam Aktif & Lokasi Kota Malang */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-2">
            <Clock className="w-4 h-4 text-bm-teal" />
            Jam Operasional & Domisili Kantor Malang
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-[#EEF4F2]/50 border border-[#D8E4E1] rounded-xl">
              <label className="block text-xs font-bold text-[#16282E] mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-bm-teal" />
                Jam Aktif / Operasional Konsultasi:
              </label>
              <input
                type="text"
                required
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="Contoh: 9:00 AM - 6:00 PM"
                className="w-full p-2 bg-white border border-[#D8E4E1] rounded-lg text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
              <span className="text-[11px] text-[#50666E] mt-1 block">
                Default: <strong>9:00 AM - 6:00 PM</strong> (Senin - Minggu)
              </span>
            </div>

            <div className="p-3 bg-[#EEF4F2]/50 border border-[#D8E4E1] rounded-xl">
              <label className="block text-xs font-bold text-[#16282E] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Alamat / Domisili Wilayah:
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Kota Malang, Jawa Timur 65146"
                className="w-full p-2 bg-white border border-[#D8E4E1] rounded-lg text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
              <span className="text-[11px] text-[#50666E] mt-1 block">
                Default: <strong>Kota Malang, Jawa Timur 65146</strong>
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B454E] mb-1">
              Cakupan Wilayah Layanan Detail:
            </label>
            <input
              type="text"
              value={formData.serviceArea}
              onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
              placeholder="Kota Malang (Lowokwaru, Klojen, Blimbing, Sukun, Kedungkandang) & Malang Raya"
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>
        </div>

        {/* Kontak & Media Komunikasi */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Saluran Komunikasi (WhatsApp, Telepon, Email)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp (Format 62...):
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-bm-teal" />
                Nomor Telepon Seluler:
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B454E] mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                Alamat Email Resmi:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B454E] mb-1">
              Bio / Profil Singkat Konsultan:
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#2B454E]">
                Foto Profil / Avatar Konsultan:
              </label>
              <span className="text-[11px] text-[#50666E]">
                Bisa upload langsung dari HP / Laptop
              </span>
            </div>

            {/* Hidden file input */}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/jpg"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setIsUploadingAvatar(true);
                try {
                  const dataUrl = await processImageFile(file, 600, 600, 0.85);
                  setFormData(prev => ({
                    ...prev,
                    avatar: dataUrl,
                    avatarUrl: dataUrl
                  }));
                } catch (err) {
                  console.error('Gagal memproses avatar:', err);
                } finally {
                  setIsUploadingAvatar(false);
                  if (avatarInputRef.current) avatarInputRef.current.value = '';
                }
              }}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-[#F8FAF9] rounded-2xl border border-[#D8E4E1]">
              <div className="relative shrink-0">
                <img
                  src={formData.avatarUrl || formData.avatar || '/avatar.jpg'}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="px-3 py-1.5 rounded-xl bg-bm-teal hover:bg-bm-teal-hover text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto dari File Lokal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
                    }))}
                    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#EEF4F2] border border-[#D8E4E1] text-[#2B454E] text-xs font-medium"
                  >
                    Pakai Foto Default
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#50666E] shrink-0 font-medium">Atau Link URL:</span>
                  <input
                    type="url"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value, avatar: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 p-1.5 bg-white border border-[#D8E4E1] rounded-lg text-xs font-medium focus:ring-1 focus:ring-bm-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-[#D8E4E1] text-[#2B454E] hover:bg-[#EEF4F2] text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Input</span>
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-bm-teal/20"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Kontak</span>
          </button>
        </div>
      </form>
    </div>
  );
};
