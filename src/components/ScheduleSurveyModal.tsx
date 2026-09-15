import React, { useState } from 'react';
import { X, CalendarCheck2, Clock, MapPin, User, MessageSquare } from 'lucide-react';
import { CONSULTANT_INFO, PROPERTIES } from '../data/mockData';
import { createWhatsAppLink } from '../utils/formatters';

interface ScheduleSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleSurveyModal: React.FC<ScheduleSurveyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]?.title || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Pagi (09.00 - 12.00)');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Bu ${CONSULTANT_INFO.name}, saya ingin membuat janji temu / survei lokasi properti:
- Nama: ${name || 'Calon Pembeli'}
- Properti yang Ingin Dilihat: ${selectedProperty}
- Rencana Tanggal: ${date || 'Menyesuaikan jadwal Bu Zahrani'}
- Waktu Pilihan: ${time}
- Catatan Tambahan: ${notes || 'Tidak ada'}

Apakah di waktu tersebut Bu Zahrani available untuk mendampingi? Terima kasih!`;

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
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#16282E]">Jadwalkan Survei Lokasi</h3>
              <p className="text-[11px] text-[#50666E]">Gratis & didampingi langsung oleh Bu Zahrani</p>
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
          <div>
            <label className="font-bold text-[#16282E] block mb-1">Nama Lengkap Anda</label>
            <input
              type="text"
              required
              placeholder="Contoh: Ibu Amanda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
            />
          </div>

          <div>
            <label className="font-bold text-[#16282E] block mb-1">Pilih Properti / Kawasan</label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
            >
              {PROPERTIES.map((p) => (
                <option key={p.id} value={p.title}>
                  {p.title} ({p.location})
                </option>
              ))}
              <option value="Properti Lain di Area BSD / Bintaro">Area Lain di BSD / Bintaro</option>
              <option value="Konsultasi Lokasi Rekomendasi">Butuh Rekomendasi Lokasi Baru</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-[#16282E] block mb-1">Pilihan Hari / Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
              />
            </div>

            <div>
              <label className="font-bold text-[#16282E] block mb-1">Pilihan Jam Survei</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
              >
                <option value="Pagi (09.00 - 12.00)">Pagi (09.00 - 12.00)</option>
                <option value="Siang (13.00 - 15.00)">Siang (13.00 - 15.00)</option>
                <option value="Sore (15.30 - 17.30)">Sore (15.30 - 17.30)</option>
                <option value="Weekend Fleksibel">Weekend (Sabtu / Minggu)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#16282E] block mb-1">Catatan Tambahan (Opsional)</label>
            <input
              type="text"
              placeholder="Contoh: Datang bersama keluarga / butuh info KPR bank"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-[#F8FAF9] border border-[#D8E4E1] rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-bm-teal text-[#16282E]"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-[#EEF4F2] text-[11px] text-bm-teal border border-[#D8E4E1]">
            ✓ Bebas biaya survei. Bu Zahrani siap menemani hingga melihat kondisi lingkungan, arah hadap rumah, fasilitas cluster, dan cek kelengkapan legalitas.
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-bm-teal hover:bg-bm-teal-hover active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-bm-teal/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Konfirmasi Janji Temu via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
