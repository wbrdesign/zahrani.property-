import React, { useRef, useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  Trash2, 
  Star, 
  Plus, 
  FolderOpen,
  Loader2,
  FileImage,
  AlertCircle
} from 'lucide-react';
import { processImageFile, processMultipleImageFiles } from '../../utils/imageUpload';

interface LocalImageUploaderProps {
  // Main photo
  mainImage: string;
  onMainImageChange: (url: string) => void;
  // Multiple gallery photos
  galleryImages: string[];
  onGalleryImagesChange: (urls: string[]) => void;
  // Optional presets
  presetImages?: { label: string; url: string }[];
}

export const LocalImageUploader: React.FC<LocalImageUploaderProps> = ({
  mainImage,
  onMainImageChange,
  galleryImages,
  onGalleryImagesChange,
  presetImages = []
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const singleCoverInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState<{ current: number; total: number } | null>(null);
  const [activeMode, setActiveMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [tempUrlInput, setTempUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle multiple file upload from local disk
  const handleMultipleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setErrorMsg('');
    setIsProcessing(true);
    setProcessProgress({ current: 0, total: files.length });

    try {
      const processedUrls = await processMultipleImageFiles(files, (curr, total) => {
        setProcessProgress({ current: curr, total });
      });

      if (processedUrls.length > 0) {
        // Append to existing gallery
        const updatedGallery = [...galleryImages, ...processedUrls];
        onGalleryImagesChange(updatedGallery);

        // If main image is empty, set the first uploaded file as main image
        if (!mainImage) {
          onMainImageChange(processedUrls[0]);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memproses file foto.');
    } finally {
      setIsProcessing(false);
      setProcessProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle single main cover direct upload
  const handleCoverUpload = async (file: File) => {
    if (!file) return;
    setErrorMsg('');
    setIsProcessing(true);
    try {
      const dataUrl = await processImageFile(file);
      onMainImageChange(dataUrl);
      // Also add to gallery if not present
      if (!galleryImages.includes(dataUrl)) {
        onGalleryImagesChange([dataUrl, ...galleryImages]);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengupload foto cover.');
    } finally {
      setIsProcessing(false);
      if (singleCoverInputRef.current) singleCoverInputRef.current.value = '';
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const targetUrl = galleryImages[indexToRemove];
    const newGallery = galleryImages.filter((_, idx) => idx !== indexToRemove);
    onGalleryImagesChange(newGallery);

    // If removed image was main image, pick next available
    if (mainImage === targetUrl) {
      onMainImageChange(newGallery[0] || '');
    }
  };

  const handleSetAsMain = (url: string) => {
    onMainImageChange(url);
  };

  const handleAddUrl = () => {
    if (!tempUrlInput.trim()) return;
    const url = tempUrlInput.trim();
    if (!galleryImages.includes(url)) {
      const newGallery = [...galleryImages, url];
      onGalleryImagesChange(newGallery);
      if (!mainImage) onMainImageChange(url);
    }
    setTempUrlInput('');
  };

  const handleClearAll = () => {
    if (window.confirm('Kosongkan semua foto galeri untuk listing ini?')) {
      onGalleryImagesChange([]);
      onMainImageChange('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab switchers: Local Upload (default & highlighted) vs URL / Presets */}
      <div className="flex items-center justify-between gap-2 border-b border-[#D8E4E1] pb-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'upload'
                ? 'bg-bm-teal text-white shadow-xs'
                : 'bg-white text-[#2B454E] hover:bg-[#EEF4F2] border border-[#D8E4E1]'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Upload File Lokal (Komputer / HP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'url'
                ? 'bg-bm-teal text-white shadow-xs'
                : 'bg-white text-[#2B454E] hover:bg-[#EEF4F2] border border-[#D8E4E1]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Input Link URL</span>
          </button>

          {presetImages.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveMode('presets')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'presets'
                  ? 'bg-bm-teal text-white shadow-xs'
                  : 'bg-white text-[#2B454E] hover:bg-[#EEF4F2] border border-[#D8E4E1]'
              }`}
            >
              <span>Foto Contoh</span>
            </button>
          )}
        </div>

        {galleryImages.length > 0 && (
          <span className="text-[11px] font-bold text-bm-teal bg-[#EEF4F2] px-2.5 py-1 rounded-lg">
            {galleryImages.length} Foto Terpilih
          </span>
        )}
      </div>

      {errorMsg && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* MODE 1: LOCAL FILE UPLOAD (DRAG & DROP + MULTI-SELECT) */}
      {activeMode === 'upload' && (
        <div className="space-y-3">
          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/jpg"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleMultipleFiles(e.target.files);
            }}
          />

          <input
            ref={singleCoverInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/jpg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCoverUpload(file);
            }}
          />

          {/* Drag and Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer ${
              isDragging
                ? 'border-bm-teal bg-bm-teal/10 scale-[0.99]'
                : 'border-[#B8C8C5] bg-[#F8FAF9] hover:bg-[#EEF4F2] hover:border-bm-teal'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center space-y-2 py-4">
                <Loader2 className="w-8 h-8 text-bm-teal animate-spin" />
                <div className="text-xs font-bold text-[#16282E]">
                  Memproses & Mengoptimalkan Foto...
                </div>
                {processProgress && (
                  <div className="text-[11px] text-[#50666E]">
                    Mengupload file ke-{processProgress.current} dari {processProgress.total}...
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-white text-bm-teal flex items-center justify-center shadow-xs border border-[#D8E4E1]">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#16282E]">
                    Klik untuk Memilih File atau Tarik & Lepas Foto ke Sini
                  </p>
                  <p className="text-[11px] text-[#50666E] mt-0.5">
                    Mendukung upload <strong>banyak foto sekaligus (Multi-Upload)</strong> dari folder HP / Laptop (JPG, PNG, WEBP)
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-bm-teal hover:bg-bm-teal-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-bm-teal/20"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Pilih Beberapa Foto Sekaligus</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      singleCoverInputRef.current?.click();
                    }}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-[#EEF4F2] border border-[#D8E4E1] text-[#2B454E] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <FileImage className="w-3.5 h-3.5 text-bm-teal" />
                    <span>Upload Foto Sampul Saja</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: INPUT URL */}
      {activeMode === 'url' && (
        <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-[#D8E4E1] space-y-2">
          <label className="block text-xs font-bold text-[#16282E]">
            Masukkan URL Gambar Web:
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={tempUrlInput}
              onChange={(e) => setTempUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/... atau link gambar online"
              className="flex-1 p-2 bg-white border border-[#D8E4E1] rounded-xl text-xs font-medium focus:ring-2 focus:ring-bm-teal focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2 bg-bm-teal text-white rounded-xl text-xs font-bold hover:bg-bm-teal-hover transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambahkan</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: PRESETS */}
      {activeMode === 'presets' && presetImages.length > 0 && (
        <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-[#D8E4E1] space-y-2">
          <div className="text-xs font-bold text-[#16282E]">
            Pilih Foto Contoh / Template:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presetImages.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (!galleryImages.includes(preset.url)) {
                    onGalleryImagesChange([...galleryImages, preset.url]);
                  }
                  if (!mainImage) onMainImageChange(preset.url);
                }}
                className="p-1.5 bg-white border border-[#D8E4E1] hover:border-bm-teal rounded-xl text-left flex items-center gap-2 group transition-all"
              >
                <img
                  src={preset.url}
                  alt={preset.label}
                  className="w-10 h-10 object-cover rounded-lg shrink-0"
                />
                <span className="text-[11px] font-medium text-[#2B454E] group-hover:text-bm-teal line-clamp-2">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PHOTO PREVIEW GRID & GALLERY MANAGEMENT */}
      {galleryImages.length > 0 ? (
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#D8E4E1] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#16282E]">
                Daftar Foto Listing ({galleryImages.length})
              </span>
              <span className="text-[10px] text-[#50666E]">
                (Klik tanda bintang untuk menetapkan foto sampul utama)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-bm-teal hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Foto Lagi</span>
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 ml-2"
              >
                Hapus Semua
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {galleryImages.map((imgUrl, index) => {
              const isMain = mainImage === imgUrl;
              return (
                <div
                  key={index}
                  className={`relative group rounded-xl overflow-hidden border-2 transition-all bg-slate-50 ${
                    isMain ? 'border-bm-teal ring-2 ring-bm-teal/20 shadow-sm' : 'border-slate-200'
                  }`}
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={imgUrl}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Badges and Actions */}
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                    {isMain ? (
                      <span className="px-2 py-0.5 rounded-md bg-bm-teal text-white text-[9px] font-extrabold flex items-center gap-0.5 shadow-sm">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>SAMPUL UTAMA</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetAsMain(imgUrl)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white text-[9px] font-bold hover:bg-bm-teal flex items-center gap-0.5 shadow-xs"
                        title="Jadikan Foto Sampul Utama"
                      >
                        <Star className="w-2.5 h-2.5" />
                        <span>Jadikan Sampul</span>
                      </button>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-sm opacity-90 group-hover:opacity-100"
                    title="Hapus foto ini"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="p-1.5 bg-white/90 text-center border-t border-slate-100 text-[10px] text-[#50666E] truncate">
                    Foto #{index + 1} {isMain && '• (Sampul Depan)'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Belum ada foto yang dipilih. Silakan upload minimal 1 foto dari HP / Komputer Anda sebagai foto sampul listing.</span>
        </div>
      )}
    </div>
  );
};
