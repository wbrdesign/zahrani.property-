import React, { useState } from 'react';
import { X, KeyRound, MessageSquare, Building, MapPin, Tag } from 'lucide-react';
import { CONSULTANT_INFO } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface SellPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellPropertyModal: React.FC<SellPropertyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [propertyType, setPropertyType] = useState('Rumah Tinggal');
  const [location, setLocation] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [dealType, setDealType] = useState<'Jual' | 'Sewa'>('Jual');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Bu ${CONSULTANT_INFO.name}, saya ingin menitipkan properti saya untuk di-${dealType}kan melalui Zahrani Property:
- Nama Pemilik: ${name || 'Pemilik Langsung'}
- Tipe Properti: ${propertyType}
- Rencana: Titip ${dealType}
- Lokasi: ${location || 'Belum diisi'}
- Ekspektasi Harga: ${expectedPrice || 'Sesuai appraisal pasar'}

Mohon informasi langkah dan kerja sama pemasarannya. Terima kasih!`;

    const waLink = createWhatsAppLink(CONSULTANT_INFO.whatsappNumber, msg);
    window.open(waLink, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EEF4F2] border border-[#D8E4E1] flex items-center justify-center text-bm-teal">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#16282E]">Titip Jual / Sewa Properti</h3>
              <p className="text-[11px] text-[#50666E]">Dipasarkan langsung oleh Zahrani Property</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Deal Type Switch */}
          <div className="grid grid-cols-2 gap-2 bg-[#EEF4F2] p-1 rounded-xl font-bold">
            <button
              type="button"
              onClick={() => setDealType('Jual')}
              className={`py-2 rounded-lg transition-all ${
                dealType === 'Jual'
                  ? 'bg-bm-teal text-white shadow-xs'
                  : 'text-[#50666E] hover:text-[#16282E]'
              }`}
            >
              Titip Jual Properti
            </button>
            <button
              type="button"
              onClick={() => setDealType('Sewa')}
              className={`py-2 rounded-lg transition-all ${
                dealType === 'Sewa'
                  ? 'bg-bm-teal text-white shadow-xs'
                  : 'text-[#50666E] hover:text-[#16282E]'
              }`}
            >
              Titip Sewakan Properti
            </button>
          </div>

          <div>
            <label className="font-bold text-[#16282E] block mb-1">Nama Pemilik Properti</label>
            <input
              type="text"
              required
              placeholder="Contoh: Pak Budi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-[#16282E] block mb-1">Jenis Properti</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
              >
                <option value="Rumah Tinggal">Rumah Tinggal</option>
                <option value="Ruko / Komersial">Ruko / Toko</option>
                <option value="Tanah Kavling">Tanah Kavling</option>
                <option value="Apartemen">Apartemen</option>
                <option value="Gudang / Pabrik">Gudang</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[#16282E] block mb-1">Target Harga ({dealType})</label>
              <input
                type="text"
                placeholder="Cth: Rp 1,5 Miliar"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#16282E] block mb-1">Lokasi Properti & Alamat Ringkas</label>
            <input
              type="text"
              required
              placeholder="Contoh: Perumahan Araya, Kota Malang"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-[#EEF4F2] text-[11px] text-bm-teal border border-[#D8E4E1]">
            ✓ Tim Zahrani Property siap membantu foto visual listing, verifikasi legalitas, promosi ke database pembeli aktif, dan penyaringan pembeli serius.
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-bm-teal/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Kirim & Terhubung ke WhatsApp Bu Zahrani</span>
          </button>
        </form>
      </div>
    </div>
  );
};
