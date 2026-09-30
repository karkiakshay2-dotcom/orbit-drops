import React, { useState } from 'react';
import { ZeroGravityCanvas } from './ZeroGravityCanvas';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Check, ShieldCheck, Droplet, Wind } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HeroSection: React.FC = () => {
  const { addToCart, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isSetAdded, setIsSetAdded] = useState<boolean>(false);

  // Primary set: Puffer (index 0) + Beanie (index 3)
  const puffer = PRODUCTS[0];
  const beanie = PRODUCTS[3];
  const primarySetPriceUSD = puffer.price + beanie.price; // 280 + 45 = 325

  const handleAddPrimarySet = () => {
    sounds.playAddToCart();
    addToCart(puffer, selectedSize, 1);
    addToCart(beanie, 'ONE SIZE', 1);
    setIsSetAdded(true);
    setTimeout(() => setIsSetAdded(false), 1600);
  };

  return (
    <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 border-b border-orbit-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Half: Editorial Narrative & Instant Primary Set */}
        <div className="lg:col-span-6 space-y-6">
          {/* Collection Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orbit-card border border-orbit-border text-xs font-mono text-orbit-slate">
            <span className="w-2 h-2 rounded-full bg-orbit-cobalt animate-pulse"></span>
            <span className="text-orbit-bone font-semibold">COLLECTION 04</span>
            <span className="text-orbit-borderLight">|</span>
            <span>HYDRO-DRIFT CAPSULE</span>
          </div>

          {/* Bold Editorial Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-orbit-bone leading-[1.08] uppercase">
              HYDRO-DYNAMIC <br />
              <span className="text-orbit-cobaltLight">APPAREL SYSTEM.</span>
            </h1>
            <p className="text-sm sm:text-base text-orbit-slate font-sans leading-relaxed max-w-xl">
              Engineered for extreme sub-zero city climates and pressure variations. Merging 3-layer Gore-Tex Infinium™ weather shields, 750-fill hydrophobic down, and German Fidlock® magnetic tethering.
            </p>
          </div>

          {/* Primary Set Allocation Box */}
          <div className="p-5 rounded-xl bg-orbit-card border border-orbit-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-orbit-cobaltLight font-bold uppercase tracking-wider">
                  PRIMARY CAPSULE SET
                </span>
                <h3 className="text-base font-bold text-orbit-bone mt-0.5">
                  Apex Cobalt Puffer + Fidlock Beanie
                </h3>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orbit-bone font-mono">
                  {formatPrice(primarySetPriceUSD)}
                </div>
                <div className="text-[10px] text-orbit-slate line-through font-mono">
                  {formatPrice(425)}
                </div>
              </div>
            </div>

            {/* Size Selector for Puffer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-orbit-slate">
                <span>SELECT PUFFER SIZE:</span>
                <span className="text-orbit-bone font-bold">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSize(size);
                    }}
                    className={`py-2 rounded text-xs font-mono font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-orbit-cobalt text-white border-orbit-cobalt shadow-cobalt-sm'
                        : 'bg-orbit-surface text-orbit-slate border-orbit-border hover:border-orbit-borderLight hover:text-orbit-bone'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Add Primary Set CTA */}
            <button
              onClick={handleAddPrimarySet}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-cobalt-btn ${
                isSetAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white active:scale-98'
              }`}
            >
              {isSetAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>PRIMARY SET ALLOCATED TO BAG</span>
                </>
              ) : (
                <>
                  <span>ADD PRIMARY SET // {formatPrice(primarySetPriceUSD)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Technical Badges Row */}
          <div className="grid grid-cols-3 gap-3 pt-1 text-xs font-mono text-orbit-slate">
            <div className="flex items-center gap-2">
              <Droplet className="w-3.5 h-3.5 text-orbit-cobalt" />
              <span>HYDROPHOBIC</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-orbit-cobalt" />
              <span>WINDPROOF 3L</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-orbit-cobalt" />
              <span>FIDLOCK® DOCK</span>
            </div>
          </div>
        </div>

        {/* Right Half: Antigravity Matter.js Sandbox */}
        <div className="lg:col-span-6">
          <ZeroGravityCanvas />
        </div>
      </div>
    </section>
  );
};
