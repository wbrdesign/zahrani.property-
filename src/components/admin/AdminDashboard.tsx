import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminHomeSection } from './AdminHomeSection';
import { AdminListingsSection } from './AdminListingsSection';
import { AdminContactSection } from './AdminContactSection';
import { AdminSoldAssetsSection } from './AdminSoldAssetsSection';
import { AdminRegionAssetsSection } from './AdminRegionAssetsSection';
import { 
  Home, 
  ListOrdered, 
  UserCheck, 
  PieChart, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';

interface AdminDashboardProps {
  onClose?: () => void;
  onNavigateHome?: () => void;
}

export type AdminActiveTab = 'beranda' | 'listing' | 'kontak' | 'terjual' | 'wilayah';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onNavigateHome
}) => {
  const { 
    isAdminLoggedIn, 
    logoutAdmin, 
    resetToDefaultData,
    properties,
    soldProperties,
    unsoldProperties
  } = usePropertyContext();

  const [activeTab, setActiveTab] = useState<AdminActiveTab>('listing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isAdminLoggedIn);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // If not logged in, show login gate
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#D8E4E1] shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#16282E] text-bm-teal flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#16282E]">
            Backend Admin Terproteksi
          </h2>
          <p className="text-xs text-[#50666E] leading-relaxed">
            Halaman ini dilindungi dengan kata sandi pengaman admin. Masukkan kata sandi untuk mengelola Beranda, Listing, Kontak Profil, dan Status Aset.
          </p>
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-bm-teal/20 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Buka Form Login Admin</span>
          </button>
          {onNavigateHome && (
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xs text-[#50666E] hover:text-[#16282E] underline pt-2 block mx-auto"
            >
              Kembali ke Beranda Website
            </button>
          )}
        </div>

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            if (onNavigateHome) onNavigateHome();
          }}
          onSuccess={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in">
      {/* Top Banner & Title Bar */}
      <div className="bg-[#16282E] rounded-3xl p-4 sm:p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-bm-teal flex items-center justify-center text-white shrink-0 shadow-lg shadow-bm-teal/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ● TERVERIFIKASI
              </span>
              <span className="text-xs text-slate-300">
                Kota Malang, Jawa Timur
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white mt-0.5">
              Backend Admin — Zahrani Property
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {onNavigateHome && (
            <button
              type="button"
              onClick={onNavigateHome}
              className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            title="Kembalikan data contoh awal"
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            type="button"
            onClick={logoutAdmin}
            className="py-2 px-3.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (5 Core Admin Tasks) */}
      <div className="bg-white p-2 rounded-2xl border border-[#D8E4E1] shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {/* Tab 1: BERANDA */}
          <button
            type="button"
            onClick={() => setActiveTab('beranda')}
            className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'beranda'
                ? 'bg-bm-teal text-white shadow-sm'
                : 'text-[#50666E] hover:text-[#16282E] hover:bg-[#EEF4F2]'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>1. Edit Beranda</span>
          </button>

          {/* Tab 2: LISTING */}
          <button
            type="button"
            onClick={() => setActiveTab('listing')}
            className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'listing'
                ? 'bg-bm-teal text-white shadow-sm'
                : 'text-[#50666E] hover:text-[#16282E] hover:bg-[#EEF4F2]'
            }`}
          >
            <ListOrdered className="w-4 h-4 shrink-0" />
            <span>2. Edit / Tambah Listing</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
              activeTab === 'listing' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {properties.length}
            </span>
          </button>

          {/* Tab 3: KONTAK PROFIL */}
          <button
            type="button"
            onClick={() => setActiveTab('kontak')}
            className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'kontak'
                ? 'bg-bm-teal text-white shadow-sm'
                : 'text-[#50666E] hover:text-[#16282E] hover:bg-[#EEF4F2]'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>3. Kontak Profil</span>
          </button>

          {/* Tab 4: ASET TERJUAL & BELUM TERJUAL */}
          <button
            type="button"
            onClick={() => setActiveTab('terjual')}
            className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'terjual'
                ? 'bg-bm-teal text-white shadow-sm'
                : 'text-[#50666E] hover:text-[#16282E] hover:bg-[#EEF4F2]'
            }`}
          >
            <PieChart className="w-4 h-4 shrink-0" />
            <span>4. Aset Terjual & Belum</span>
            <span className="flex items-center gap-1 text-[10px]">
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {unsoldProperties.length}
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold">
                {soldProperties.length}
              </span>
            </span>
          </button>

          {/* Tab 5: ASET BERDASARKAN WILAYAH */}
          <button
            type="button"
            onClick={() => setActiveTab('wilayah')}
            className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wilayah'
                ? 'bg-bm-teal text-white shadow-sm'
                : 'text-[#50666E] hover:text-[#16282E] hover:bg-[#EEF4F2]'
            }`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>5. Aset Berdasarkan Wilayah</span>
          </button>
        </div>
      </div>

      {/* Active Tab Panel */}
      <div className="bg-[#F8FAF9] p-4 sm:p-6 rounded-3xl border border-[#D8E4E1] shadow-2xs">
        {activeTab === 'beranda' && <AdminHomeSection />}
        {activeTab === 'listing' && <AdminListingsSection />}
        {activeTab === 'kontak' && <AdminContactSection />}
        {activeTab === 'terjual' && <AdminSoldAssetsSection />}
        {activeTab === 'wilayah' && <AdminRegionAssetsSection />}
      </div>

      {/* CONFIRM RESET MODAL */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-[#D8E4E1] shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#16282E]">
              Reset ke Data Default?
            </h3>
            <p className="text-xs text-[#50666E]">
              Tindakan ini akan mengembalikan listing properti, konfigurasi beranda, dan profil kontak ke data default Kota Malang.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="w-1/2 py-2 px-3 rounded-xl border border-[#D8E4E1] text-xs font-bold text-[#2B454E]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaultData();
                  setResetConfirmOpen(false);
                }}
                className="w-1/2 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
              >
                Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
