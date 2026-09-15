import React, { useState } from 'react';
import { Header } from './components/Header';
import { ConsultantHero } from './components/ConsultantHero';
import { QuickActionGrid } from './components/QuickActionGrid';
import { FeaturedListings } from './components/FeaturedListings';
import { KprCalculator } from './components/KprCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { DesktopFooter } from './components/DesktopFooter';
import { BottomNav } from './components/BottomNav';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { SellPropertyModal } from './components/SellPropertyModal';
import { ScheduleSurveyModal } from './components/ScheduleSurveyModal';
import { ActiveTab, Property } from './types';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [calcInitialPrice, setCalcInitialPrice] = useState<number>(1200000000);

  // View mode switcher on desktop: 'responsive' (full PC layout) or 'phone-sim' (preview simulated phone)
  const [viewMode, setViewMode] = useState<'responsive' | 'phone-sim'>('responsive');

  // Profile photo state with local storage persistence
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem('zahrani_custom_avatar') || '';
  });

  const handleUpdateAvatar = (newAvatar: string) => {
    setAvatarUrl(newAvatar);
    try {
      localStorage.setItem('zahrani_custom_avatar', newAvatar);
    } catch {
      // ignore storage quota errors
    }
  };

  const handleResetAvatar = () => {
    setAvatarUrl('');
    localStorage.removeItem('zahrani_custom_avatar');
  };

  const handleOpenKprWithPrice = (price: number) => {
    setCalcInitialPrice(price);
    setActiveTab('kpr');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSimulatingPhone = viewMode === 'phone-sim';

  return (
    <div className={`min-h-screen font-sans antialiased text-[#16282E] ${
      isSimulatingPhone 
        ? 'bg-[#E5EBEA] flex flex-col items-center justify-start py-4 sm:py-8 px-2' 
        : 'bg-[#F8FAF9] flex flex-col'
    }`}>
      {/* Floating Device Mode Switcher (Visible on Desktop / Tablet) */}
      <aside 
        aria-label="Pengalih Mode Tampilan" 
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-1.5 p-1.5 bg-white/95 text-slate-800 rounded-2xl shadow-xl backdrop-blur-md border border-[#D8E4E1] text-xs font-semibold"
      >
        <span className="px-2.5 text-slate-500 text-[11px] font-medium hidden lg:inline">
          Pratinjau Layar:
        </span>
        <button
          type="button"
          onClick={() => setViewMode('responsive')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            viewMode === 'responsive'
              ? 'bg-bm-teal text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-[#EEF4F2]'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Layar PC / Laptop</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('phone-sim')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            viewMode === 'phone-sim'
              ? 'bg-bm-teal text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-[#EEF4F2]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Simulasi HP</span>
        </button>
      </aside>

      {/* Main Wrapper: Conditional Simulated Phone Frame vs Full-Width Responsive */}
      <div
        className={`w-full transition-all duration-300 ${
          isSimulatingPhone
            ? 'max-w-md bg-[#F8FAF9] min-h-screen rounded-[40px] ring-8 ring-[#B8C8C5] shadow-2xl overflow-hidden relative flex flex-col pb-24 border border-[#D8E4E1]'
            : 'flex-1 flex flex-col'
        }`}
      >
        {/* Responsive Header (PC & Mobile) */}
        <Header 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
        />

        {/* Content Container */}
        <main className={`flex-1 ${
          isSimulatingPhone
            ? 'px-4'
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'
        }`}>
          {/* Tab 1: Beranda (Home Overview) */}
          {activeTab === 'beranda' && (
            <div className="space-y-2 sm:space-y-4 animate-in fade-in duration-200">
              {/* Personal Branding Hero Card */}
              <ConsultantHero
                onExploreListings={() => handleTabChange('listing')}
                onOpenKpr={() => handleTabChange('kpr')}
                onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
                avatarUrl={avatarUrl}
                onUploadAvatar={handleUpdateAvatar}
                onResetAvatar={handleResetAvatar}
              />

              {/* Large Icon Fast Action Grid */}
              <QuickActionGrid
                onSelectListingTab={() => handleTabChange('listing')}
                onSelectKprTab={() => handleTabChange('kpr')}
                onOpenSellModal={() => setIsSellModalOpen(true)}
                onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
              />

              {/* Featured Properties Preview */}
              <FeaturedListings
                onSelectProperty={(prop) => setSelectedProperty(prop)}
                onOpenKprWithPrice={handleOpenKprWithPrice}
              />

              {/* Why Choose Consultant Zahrani */}
              <WhyChooseUs />

              {/* Client Testimonials & Social Proof */}
              <Testimonials />

              {/* Direct Contact Card */}
              <ContactSection 
                onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
                onOpenSellModal={() => setIsSellModalOpen(true)}
                avatarUrl={avatarUrl}
              />
            </div>
          )}

          {/* Tab 2: Listing Katalog */}
          {activeTab === 'listing' && (
            <div className="pt-2 sm:pt-4 animate-in fade-in duration-200">
              <FeaturedListings
                onSelectProperty={(prop) => setSelectedProperty(prop)}
                onOpenKprWithPrice={handleOpenKprWithPrice}
              />
              <WhyChooseUs />
            </div>
          )}

          {/* Tab 3: Simulasi KPR */}
          {activeTab === 'kpr' && (
            <div className="pt-2 sm:pt-4 animate-in fade-in duration-200">
              <KprCalculator initialPrice={calcInitialPrice} />
              <WhyChooseUs />
            </div>
          )}

          {/* Tab 4: Kontak & Profil */}
          {activeTab === 'kontak' && (
            <div className="pt-2 sm:pt-4 animate-in fade-in duration-200">
              <ContactSection 
                onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
                onOpenSellModal={() => setIsSellModalOpen(true)}
                avatarUrl={avatarUrl}
              />
              <WhyChooseUs />
            </div>
          )}
        </main>

        {/* Desktop Footer (Visible on full layout, hidden in simulated phone) */}
        {!isSimulatingPhone && (
          <DesktopFooter
            onTabChange={handleTabChange}
            onOpenSellModal={() => setIsSellModalOpen(true)}
            onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
          />
        )}

        {/* Minimalist Bottom Navigation Bar: Visible on mobile devices OR simulated phone mode */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className={isSimulatingPhone ? 'block' : 'md:hidden'}
        />
      </div>

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenKprWithPrice={handleOpenKprWithPrice}
      />

      <SellPropertyModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      <ScheduleSurveyModal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
      />
    </div>
  );
}
