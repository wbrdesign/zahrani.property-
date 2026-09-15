export interface Property {
  id: string;
  title: string;
  category: 'rumah-baru' | 'rumah-second' | 'komersial' | 'tanah';
  categoryLabel: string;
  location: string;
  city: string;
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
}

export interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  review: string;
  propertyBought: string;
  rating: number;
  avatarUrl: string;
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

export type ActiveTab = 'beranda' | 'listing' | 'kpr' | 'kontak';
