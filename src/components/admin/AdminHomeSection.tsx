import React, { useState } from 'react';
import { HomeConfig } from '../../types';
import { usePropertyContext } from '../../context/PropertyContext';
import { Save, Check, RotateCcw, Megaphone, Sparkles, Award, ShieldCheck } from 'lucide-react';

export const AdminHomeSection: React.FC = () => {
  const { homeConfig, updateHomeConfig } = usePropertyContext();
  const [formData, setFormData] = useState<HomeConfig>(homeConfig);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeConfig(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleResetToCurrent = () => {
    setFormData(homeConfig);
  };

  return (
    <div className="space-y-6">
      {/* Header section description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8E4E1]">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#16282E] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-bm-teal" />
            Edit / Pengaturan Bagian Beranda
          </h2>
          <p className="text-xs text-[#50666E]">
            Kelola tagline utama, teks hero, running banner pengumuman promo, dan data statistik beranda.
          </p>
        </div>
        {savedAlert && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold rounded-xl animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Perubahan Beranda Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Pengumuman / Running Promo Banner */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-500" />
              Banner Pengumuman / Promo Teratas
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#2B454E] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnnouncementActive}
                onChange={(e) => setFormData({ ...formData, isAnnouncementActive: e.target.checked })}
                className="w-4 h-4 rounded text-bm-teal focus:ring-bm-teal"
              />
              <span>Tampilkan Banner di Beranda</span>
            </label>
          </div>
          <input
            type="text"
            value={formData.announcementText}
            onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
            placeholder="Tulis pengumuman atau promo (cth: Promo KPR Bunga Spesial Mulai 3.75% di Kota Malang)..."
            className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
          />
        </div>

        {/* 2. Hero Headline & Subtitle */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#16282E]">
            Headline & Teks Kartu Profil Hero
          </h3>
          
          <div>
            <label className="block text-xs font-bold text-[#2B454E] mb-1">
              Tagline Utama (Headline):
            </label>
            <input
              type="text"
              required
              value={formData.heroTagline}
              onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B454E] mb-1">
              Sorotan Sub-Headline:
            </label>
            <input
              type="text"
              required
              value={formData.heroHighlight}
              onChange={(e) => setFormData({ ...formData, heroHighlight: e.target.value })}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B454E] mb-1">
              Bio / Penjelasan Singkat Beranda:
            </label>
            <textarea
              rows={3}
              required
              value={formData.heroBio}
              onChange={(e) => setFormData({ ...formData, heroBio: e.target.value })}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>
        </div>

        {/* 3. Angka Statistik Beranda */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-2">
            <Award className="w-4 h-4 text-bm-teal" />
            Statistik & Reputasi Konsultan (Pencapaian Beranda)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#50666E] mb-1">
                Lama Pengalaman:
              </label>
              <input
                type="text"
                value={formData.stats.experienceYears}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, experienceYears: e.target.value }
                  })
                }
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#50666E] mb-1">
                Aset Berhasil Terjual:
              </label>
              <input
                type="text"
                value={formData.stats.soldCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, soldCount: e.target.value }
                  })
                }
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#50666E] mb-1">
                Skor Rating (cth: 4.9):
              </label>
              <input
                type="text"
                value={formData.stats.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, rating: e.target.value }
                  })
                }
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#50666E] mb-1">
                Jumlah Ulasan Klien:
              </label>
              <input
                type="text"
                value={formData.stats.reviewCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, reviewCount: e.target.value }
                  })
                }
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#50666E] mb-1">
              Lisensi Sertifikasi Resmi:
            </label>
            <input
              type="text"
              value={formData.stats.license}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: { ...formData.stats, license: e.target.value }
                })
              }
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
          </div>
        </div>

        {/* 4. Pilar Layanan Mengapa Memilih Zahrani */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D8E4E1] shadow-2xs space-y-4">
          <h3 className="text-xs sm:text-sm font-bold text-[#16282E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bm-teal" />
            4 Pilar Layanan Unggulan (Mengapa Pilih Kami)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.servicePillars.map((pillar, idx) => (
              <div key={idx} className="p-3.5 bg-[#F8FAF9] rounded-xl border border-[#D8E4E1] space-y-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-bm-teal/10 text-bm-teal">
                  Pilar #{idx + 1}
                </span>
                <input
                  type="text"
                  value={pillar.title}
                  onChange={(e) => {
                    const nextPillars = [...formData.servicePillars];
                    nextPillars[idx] = { ...nextPillars[idx], title: e.target.value };
                    setFormData({ ...formData, servicePillars: nextPillars });
                  }}
                  className="w-full p-2 bg-white border border-[#D8E4E1] rounded-lg text-xs font-bold focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  placeholder="Judul Pilar..."
                />
                <textarea
                  rows={2}
                  value={pillar.desc}
                  onChange={(e) => {
                    const nextPillars = [...formData.servicePillars];
                    nextPillars[idx] = { ...nextPillars[idx], desc: e.target.value };
                    setFormData({ ...formData, servicePillars: nextPillars });
                  }}
                  className="w-full p-2 bg-white border border-[#D8E4E1] rounded-lg text-xs font-medium text-[#50666E] focus:ring-2 focus:ring-bm-teal focus:outline-none"
                  placeholder="Deskripsi pilar..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetToCurrent}
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
            <span>Simpan Perubahan Beranda</span>
          </button>
        </div>
      </form>
    </div>
  );
};
