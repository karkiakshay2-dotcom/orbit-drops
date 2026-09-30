import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, ShoppingBag } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    quickViewProduct ? quickViewProduct.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!quickViewProduct) return null;

  const handleClose = () => {
    sounds.playClick();
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize || quickViewProduct.sizes[0], quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans select-none">
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      ></div>

      <div className="relative w-full max-w-4xl bg-orbit-card border border-orbit-border rounded-2xl shadow-2xl z-10 my-6 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-orbit-surface border-b border-orbit-border text-xs font-mono text-orbit-slate">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orbit-cobalt"></span>
            <span className="text-orbit-bone font-semibold">{quickViewProduct.code}</span>
            <span>// {quickViewProduct.collection}</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded border border-orbit-border hover:border-orbit-borderLight text-orbit-slate hover:text-orbit-bone"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Image */}
          <div className="md:col-span-6 bg-[#0B111E] p-6 border-b md:border-b-0 md:border-r border-orbit-border flex flex-col justify-between">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-orbit-border bg-black">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-orbit-bg/90 border border-orbit-border text-xs font-mono text-orbit-bone">
                {quickViewProduct.colorway}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 text-center font-mono text-[11px] text-orbit-slate">
              <div className="p-2 rounded bg-orbit-surface border border-orbit-border">
                <div className="text-[10px] text-orbit-slateDark">MASS</div>
                <div className="text-orbit-bone font-bold">{quickViewProduct.weight}</div>
              </div>
              <div className="p-2 rounded bg-orbit-surface border border-orbit-border">
                <div className="text-[10px] text-orbit-slateDark">STOCK</div>
                <div className="text-orbit-cobaltLight font-bold">{quickViewProduct.stockLeft} LEFT</div>
              </div>
              <div className="p-2 rounded bg-orbit-surface border border-orbit-border">
                <div className="text-[10px] text-orbit-slateDark">STATUS</div>
                <div className="text-emerald-400 font-bold">READY</div>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Controls */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="text-xs font-mono text-orbit-slate uppercase tracking-wider">
                {quickViewProduct.category}
              </div>
              <h2 className="text-2xl font-bold text-orbit-bone tracking-tight mt-1">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-orbit-slate font-sans mt-2 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 p-3 rounded-lg bg-orbit-surface border border-orbit-border font-mono">
              <span className="text-2xl font-bold text-orbit-bone">
                {formatPrice(quickViewProduct.price)}
              </span>
              <span className="text-sm line-through text-orbit-slate">
                {formatPrice(quickViewProduct.originalPrice)}
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                SAVE {formatPrice(quickViewProduct.originalPrice - quickViewProduct.price)}
              </span>
            </div>

            {/* Specifications Matrix */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-orbit-slate uppercase tracking-wider font-semibold">
                TECHNICAL HIGHLIGHTS:
              </div>
              <ul className="space-y-1.5 text-xs text-orbit-slate font-mono">
                {quickViewProduct.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orbit-cobalt">▹</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials List */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-orbit-slate uppercase tracking-wider font-semibold">
                MATERIALS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.materials.map((mat, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-orbit-surface border border-orbit-border text-[11px] font-mono text-orbit-bone">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Size & Quantity Selector */}
            <div className="pt-3 border-t border-orbit-border space-y-3">
              <div>
                <div className="text-xs font-mono text-orbit-slate mb-1.5">SELECT SIZE:</div>
                <div className="flex gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setSelectedSize(size);
                      }}
                      className={`flex-1 py-2 rounded text-xs font-mono font-bold border transition-all ${
                        (selectedSize || quickViewProduct.sizes[0]) === size
                          ? 'bg-orbit-cobalt text-white border-orbit-cobalt shadow-cobalt-sm'
                          : 'bg-orbit-surface text-orbit-slate border-orbit-border hover:border-orbit-borderLight hover:text-orbit-bone'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-orbit-border rounded-lg bg-orbit-surface p-0.5">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="w-8 h-8 flex items-center justify-center text-orbit-slate hover:text-orbit-bone font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-xs text-orbit-bone">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setQuantity(quantity + 1);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-orbit-slate hover:text-orbit-bone font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-cobalt-btn active:scale-98 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ALLOCATED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG // {formatPrice(quickViewProduct.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
