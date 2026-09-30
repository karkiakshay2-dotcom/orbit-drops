import React, { useState } from 'react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Check, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleOpenQuickView = () => {
    sounds.playClick();
    setQuickViewProduct(product);
  };

  return (
    <div className="group bg-orbit-card hover:bg-orbit-cardHover border border-orbit-border hover:border-orbit-borderLight rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-card-subtle">
      {/* Product Visual Container */}
      <div 
        onClick={handleOpenQuickView}
        className="relative w-full aspect-square bg-[#0B111E] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Info Tags */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-orbit-bg/85 backdrop-blur-sm border border-orbit-border text-[10px] font-mono text-orbit-slate">
            {product.code}
          </span>

          <span className="px-2 py-0.5 rounded bg-orbit-bg/85 backdrop-blur-sm border border-orbit-border text-[10px] font-mono font-medium text-orbit-cobaltLight flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>{product.stockLeft} LEFT</span>
          </span>
        </div>

        {/* Inspect Specs Trigger on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenQuickView();
          }}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-orbit-bg/90 backdrop-blur-sm border border-orbit-border text-orbit-bone text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity hover:border-orbit-cobalt shadow-sm"
          title="Inspect product specifications"
        >
          <Eye className="w-3 h-3 text-orbit-cobaltLight" />
          <span>INSPECT</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-mono text-orbit-slate uppercase tracking-wider">
            {product.category}
          </div>
          <h3 
            onClick={handleOpenQuickView}
            className="text-base font-bold text-orbit-bone group-hover:text-orbit-cobaltLight transition-colors cursor-pointer mt-0.5"
          >
            {product.name}
          </h3>
          <p className="text-xs text-orbit-slate line-clamp-2 mt-1 font-sans leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Savings */}
        <div className="flex items-baseline justify-between pt-1 border-t border-orbit-border">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-orbit-bone font-mono">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs line-through text-orbit-slate font-mono">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <span className="text-[11px] font-mono text-orbit-slate">
            {product.weight}
          </span>
        </div>

        {/* Variant Size Pills */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-orbit-slate">
            <span>SIZE:</span>
            <span className="text-orbit-bone font-semibold">{selectedSize}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSelectedSize(size);
                }}
                className={`py-1.5 rounded text-xs font-mono font-bold border transition-all ${
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

        {/* Solid Cobalt Add to Bag Button */}
        <div className="pt-1">
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-cobalt-btn active:scale-98 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG // {formatPrice(product.price)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
