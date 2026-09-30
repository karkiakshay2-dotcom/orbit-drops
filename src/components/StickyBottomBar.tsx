import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const LIVE_ORDERS = [
  "Order #2041 shipped to Tokyo // 3 min ago",
  "Order #2042 shipped to London // 7 min ago",
  "Order #2043 shipped to New York // 11 min ago",
  "Order #2044 shipped to Berlin // 15 min ago",
  "Order #2045 shipped to Seoul // 19 min ago"
];

export const StickyBottomBar: React.FC = () => {
  const { totalItemsCount, total, formatPrice, subtotal, openCart } = useCart();
  const [orderIndex, setOrderIndex] = useState<number>(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setOrderIndex(prev => (prev + 1) % LIVE_ORDERS.length);
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  const freeShippingThresholdUSD = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUSD - subtotal);
  const freePercent = Math.min(100, Math.round((subtotal / freeShippingThresholdUSD) * 100));

  return (
    <div className="sticky bottom-0 z-30 w-full bg-[#080D1A]/95 backdrop-blur-md border-t border-orbit-border select-none">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Live Order Dispatch Ticker */}
        <div className="flex items-center gap-2 text-orbit-slate overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-orbit-bone font-medium transition-all duration-500">
            {LIVE_ORDERS[orderIndex]}
          </span>
        </div>

        {/* Center: Free Global Delivery Tracker */}
        <div className="hidden md:flex items-center gap-3 bg-orbit-card px-3 py-1.5 rounded-full border border-orbit-border">
          <Truck className="w-3.5 h-3.5 text-orbit-cobalt" />
          <div className="flex items-center gap-2 text-[11px]">
            {remainingForFreeShipping === 0 ? (
              <span className="text-orbit-cobaltLight font-bold">
                FREE GLOBAL EXPRESS FREIGHT UNLOCKED
              </span>
            ) : (
              <span className="text-orbit-slate">
                Add <strong className="text-orbit-bone">{formatPrice(remainingForFreeShipping)}</strong> for free global shipping
              </span>
            )}
          </div>
          <div className="w-16 h-1.5 bg-orbit-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-orbit-cobalt rounded-full transition-all duration-500"
              style={{ width: `${freePercent}%` }}
            ></div>
          </div>
        </div>

        {/* Right: Dynamic Checkout Drawer Trigger */}
        <button
          onClick={() => {
            sounds.playClick();
            openCart();
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white font-bold tracking-wide shadow-cobalt-sm transition-all active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>VIEW BAG [{totalItemsCount}]</span>
          {totalItemsCount > 0 && (
            <>
              <span className="text-orbit-borderLight">|</span>
              <span>{formatPrice(total)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
