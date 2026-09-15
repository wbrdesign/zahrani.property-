import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle, ArrowRight } from 'lucide-react';
import { usePropertyContext } from '../../context/PropertyContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { loginAdmin } = usePropertyContext();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const isSuccess = loginAdmin(password);
      setIsLoading(false);

      if (isSuccess) {
        setPassword('');
        setError('');
        onSuccess();
      } else {
        setError('Password admin salah! Silakan periksa kembali kata sandi pengaman.');
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#D8E4E1] overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#16282E] p-5 sm:p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-bm-teal flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                Akses Backend Admin
              </h3>
              <p className="text-xs text-slate-300">
                Panel Manajemen Zahrani Property
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="text-xs text-[#50666E] leading-relaxed">
            Halaman ini khusus untuk pengelola Zahrani Property guna mengatur konten beranda, katalog listing, status aset terjual, dan kontak profil.
          </div>

          <div>
            <label className="block text-xs font-bold text-[#16282E] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-bm-teal" />
              Kata Sandi Pengaman (Password):
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Masukkan kata sandi admin..."
                className="w-full pl-3.5 pr-11 py-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal focus:border-transparent text-[#16282E]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-3 rounded-xl border border-[#D8E4E1] text-[#2B454E] hover:bg-[#EEF4F2] text-xs font-bold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || !password}
              className="flex-1 py-2.5 px-4 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-bm-teal/20"
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk Backend</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
