import React from 'react';
import { ShoppingBag, Volume2, VolumeX, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  onOpenLookbook?: () => void;
  onOpenTechModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenLookbook, 
  onOpenTechModal 
}) => {
  const { 
    totalItemsCount, 
    openCart, 
    currency, 
    setCurrency, 
    isMuted, 
    toggleMute 
  } = useCart();

  const handleNavClick = (sectionId: string) => {
    sounds.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080D1A]/90 backdrop-blur-md border-b border-orbit-border">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand wordmark & Drop status */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orbit-cobalt"></span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-orbit-bone">
              ORBIT <span className="text-orbit-cobalt">//</span> 01
            </span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-orbit-border"></div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono tracking-wider text-orbit-slate uppercase">
              COLLECTION 04: <strong className="text-orbit-bone font-medium">HYDRO-DRIFT</strong>
            </span>
          </div>
        </div>

        {/* Center: Clean menu links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium tracking-wide">
          <button
            onClick={() => handleNavClick('catalog')}
            className="text-orbit-slate hover:text-orbit-bone transition-colors py-1"
          >
            CATALOG
          </button>
          <button
            onClick={() => {
              if (onOpenLookbook) onOpenLookbook();
              else handleNavClick('lookbook');
            }}
            className="text-orbit-slate hover:text-orbit-bone transition-colors py-1"
          >
            LOOKBOOK
          </button>
          <button
            onClick={() => {
              if (onOpenTechModal) onOpenTechModal();
              else handleNavClick('technology');
            }}
            className="text-orbit-slate hover:text-orbit-bone transition-colors py-1"
          >
            TECHNOLOGY
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-orbit-slate hover:text-orbit-bone transition-colors py-1"
          >
            ATELIER
          </button>
        </nav>

        {/* Right: Currency, Sound & Cart counter pill */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Currency Selector */}
          <div className="flex items-center bg-orbit-card border border-orbit-border rounded-md px-1.5 py-1 text-xs">
            <Globe className="w-3 h-3 text-orbit-slate mr-1.5 hidden sm:inline" />
            <select
              value={currency}
              onChange={(e) => {
                sounds.playClick();
                setCurrency(e.target.value as 'USD' | 'EUR' | 'JPY');
              }}
              className="bg-transparent text-orbit-bone font-mono text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="USD" className="bg-[#0B111E] text-white">USD ($)</option>
              <option value="EUR" className="bg-[#0B111E] text-white">EUR (€)</option>
              <option value="JPY" className="bg-[#0B111E] text-white">JPY (¥)</option>
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleMute();
              sounds.playClick();
            }}
            className="p-2 rounded-md bg-orbit-card border border-orbit-border text-orbit-slate hover:text-orbit-bone hover:border-orbit-borderLight transition-all"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-orbit-cobalt" />}
          </button>

          {/* Cart Counter Pill */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white text-xs font-semibold tracking-wide transition-all shadow-cobalt-sm active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BAG</span>
            <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-white text-orbit-cobalt font-bold text-[10px]">
              {totalItemsCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
