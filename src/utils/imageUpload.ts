/**
 * Image Upload & Compression Helper
 * Reads local file(s) from user device and converts them to optimized Base64 data URLs
 * to ensure fast rendering and prevent localStorage quota issues.
 */

export interface ProcessedImage {
  id: string;
  dataUrl: string;
  name: string;
  sizeKb: number;
}

/**
 * Resizes and compresses an image file to a lightweight JPEG Base64 string
 */
export const processImageFile = (
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih bukan format gambar yang valid.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file lokal.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memproses data gambar.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw base64 if canvas context fails
          resolve(event.target?.result as string);
          return;
        }

        // Use smooth rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web-friendly JPEG data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Process multiple files in parallel
 */
export const processMultipleImageFiles = async (
  files: FileList | File[],
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> => {
  const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
  const total = fileArray.length;
  if (total === 0) return [];

  const results: string[] = [];
  let completed = 0;

  for (const file of fileArray) {
    try {
      const dataUrl = await processImageFile(file);
      results.push(dataUrl);
    } catch (err) {
      console.warn('Gagal memproses gambar:', file.name, err);
    }
    completed++;
    if (onProgress) onProgress(completed, total);
  }

  return results;
};
