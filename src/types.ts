export interface Property {
  id: string;
  title: string;
  category: 'rumah-baru' | 'rumah-second' | 'komersial' | 'tanah';
  categoryLabel: string;
  location: string;
  city: string;
  district?: string; // Kecamatan/Wilayah (cth: Lowokwaru, Klojen, Blimbing, Sukun, Kedungkandang, Batu)
  price: number; // in IDR
  priceFormatted: string;
  installmentEstimate: string;
  specs: {
    bedrooms: number;
    bathrooms: number;
    landArea: number; // m2
    buildingArea: number; // m2
    carport: number;
    certificate: string;
  };
  features: string[];
  imageUrl: string;
  galleryImages: string[];
  isHot?: boolean;
  isSold?: boolean;
  badge?: string;
  description: string;
  createdAt?: string;
}

export interface HomeConfig {
  heroTagline: string;
  heroHighlight: string;
  heroBio: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  stats: {
    experienceYears: string;
    soldCount: string;
    rating: string;
    reviewCount: string;
    license: string;
  };
  servicePillars: {
    title: string;
    desc: string;
  }[];
}

export interface ConsultantProfile {
  name: string;
  brandName: string;
  agency?: string;
  title: string;
  license: string;
  licenseNumber?: string;
  phone: string;
  whatsappNumber: string;
  whatsapp?: string;
  email: string;
  location: string;
  serviceArea?: string;
  experienceYears: string;
  soldCount: string;
  rating: string;
  reviewCount: string;
  avatar: string;
  avatarUrl?: string;
  bio: string;
  hours: string;
  socials: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  review: string;
  propertyBought: string;
  rating: number;
  avatarUrl?: string;
  verifiedTransaction: boolean;
}

export interface KprResult {
  propertyPrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  loanAmount: number;
  interestRate: number;
  tenorYears: number;
  monthlyInstallment: number;
  estimatedIncomeRequired: number;
}

export type ActiveTab = 'beranda' | 'listing' | 'kpr' | 'kontak' | 'admin';
export type AdminTab = 'beranda' | 'listing' | 'kontak' | 'terjual' | 'wilayah';
