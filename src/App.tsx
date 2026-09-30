import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { StickyBottomBar } from './components/StickyBottomBar';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { LookbookModal } from './components/LookbookModal';
import { TechnologyModal } from './components/TechnologyModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Sparkles, Layers, ShieldCheck } from 'lucide-react';

const MainApp: React.FC = () => {
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-orbit-bg text-orbit-bone font-sans antialiased overflow-x-hidden selection:bg-orbit-cobalt selection:text-white">
      {/* Top Navigation Bar */}
      <Header 
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenTechModal={() => setIsTechOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Split Hero & Matter.js Antigravity Sandbox */}
        <HeroSection />

        {/* 4-Column Full-Bleed Product Grid */}
        <section id="catalog" className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-orbit-border pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-orbit-cobaltLight uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-orbit-cobalt"></span>
                <span>COLLECTION 04 CATALOG // 4 ESSENTIAL PIECES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-orbit-bone uppercase mt-1">
                HYDRO-DRIFT ALLOCATIONS
              </h2>
            </div>

            <p className="text-xs font-mono text-orbit-slate max-w-md">
              Constructed in Tokyo and Berlin labs. Every garment is individually serialized with magnetic Fidlock® tension clasps and weatherproofing.
            </p>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Atelier Engineering Highlights */}
        <section id="technology" className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-orbit-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-orbit-card border border-orbit-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orbit-cobalt/20 text-orbit-cobaltLight flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-orbit-bone uppercase">
                Hydrophobic Down & Gore-Tex
              </h3>
              <p className="text-xs text-orbit-slate font-sans leading-relaxed">
                Dual-membrane moisture barrier ensuring thermal retention down to -35°C without compromising kinetic breathability.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-orbit-card border border-orbit-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orbit-cobalt/20 text-orbit-cobaltLight flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-orbit-bone uppercase">
                German Fidlock® Magnetic Hardware
              </h3>
              <p className="text-xs text-orbit-slate font-sans leading-relaxed">
                Aerospace-grade magnetic mechanical docking buckles providing effortless one-handed release and fail-safe latching.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-orbit-card border border-orbit-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orbit-cobalt/20 text-orbit-cobaltLight flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-orbit-bone uppercase">
                Zero-Gravity Matter.js Engine
              </h3>
              <p className="text-xs text-orbit-slate font-sans leading-relaxed">
                Interactive real-time 2D physics sandbox simulating orbital drift, natural restitution, and gravity equalization.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Ticker / Bar */}
      <StickyBottomBar />

      {/* Footer */}
      <Footer />

      {/* Global Modals & Slide-over Drawer */}
      <CartDrawer />
      <ProductQuickView />
      <LookbookModal 
        isOpen={isLookbookOpen} 
        onClose={() => setIsLookbookOpen(false)} 
      />
      <TechnologyModal 
        isOpen={isTechOpen} 
        onClose={() => setIsTechOpen(false)} 
      />
      <OrderSuccessModal />
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

export default App;
