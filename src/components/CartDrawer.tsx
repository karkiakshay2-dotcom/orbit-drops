import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, Trash2, Plus, Minus, MessageSquare, 
  CreditCard, Tag, ShieldCheck, Truck, ShoppingBag 
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    promoCode, 
    discountPercent, 
    discountAmount, 
    applyPromoCode, 
    removePromoCode, 
    subtotal, 
    shipping, 
    total, 
    totalItemsCount,
    currency,
    formatPrice,
    setOrderCompleted
  } = useCart();

  const [inputCode, setInputCode] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const res = applyPromoCode(inputCode);
    setPromoMessage({
      text: res.message,
      error: !res.success
    });

    if (res.success) {
      setInputCode('');
    }
  };

  const generateOrderId = () => {
    return 'HYDRO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    sounds.playSuccess();

    const orderId = generateOrderId();
    const itemsList = cart
      .map((item, idx) => `${idx + 1}. *${item.product.name}* [${item.size}] x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`)
      .join('\n');

    const msg = 
`🛍️ *ORBIT STORE // HYDRO-DRIFT ORDER*
━━━━━━━━━━━━━━━━━━━━
*Order ID:* #${orderId}
*Date:* ${new Date().toLocaleDateString()}

*ITEMS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
*Subtotal:* ${formatPrice(subtotal)}
${discountPercent > 0 ? `*Promo (${promoCode}):* -${discountPercent}% (-${formatPrice(discountAmount)})\n` : ''}*Global Shipping:* ${shipping === 0 ? 'FREE' : formatPrice(shipping)}
*TOTAL DUE:* ${formatPrice(total)}

━━━━━━━━━━━━━━━━━━━━
Please confirm shipping address and dispatch slot!`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;

    setOrderCompleted({
      orderId,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      promoCode,
      currency,
      timestamp: new Date().toLocaleTimeString(),
      method: 'whatsapp'
    });

    window.open(url, '_blank');
  };

  const handleStripeCheckout = () => {
    if (cart.length === 0) return;
    sounds.playSuccess();

    const orderId = generateOrderId();
    setOrderCompleted({
      orderId,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      promoCode,
      currency,
      timestamp: new Date().toLocaleTimeString(),
      method: 'stripe'
    });
  };

  const freeShippingThresholdUSD = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUSD - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThresholdUSD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-orbit-card border-l border-orbit-border shadow-2xl flex flex-col font-mono text-xs">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-orbit-surface border-b border-orbit-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-orbit-cobalt" />
              <div>
                <h2 className="text-sm font-bold text-orbit-bone uppercase tracking-wider">
                  YOUR BAG
                </h2>
                <div className="text-[11px] text-orbit-slate">
                  {totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'} ALLOCATED
                </div>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-md border border-orbit-border hover:border-orbit-borderLight text-orbit-slate hover:text-orbit-bone transition-all"
              title="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-5 py-2.5 bg-[#0E1729] border-b border-orbit-border text-[11px]">
            <div className="flex items-center justify-between mb-1.5 text-orbit-slate">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-orbit-cobalt" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-orbit-cobaltLight font-semibold">FREE GLOBAL DELIVERY UNLOCKED</span>
                ) : (
                  <span>Add <strong className="text-orbit-bone">{formatPrice(remainingForFreeShipping)}</strong> for free global shipping</span>
                )}
              </span>
              <span className="text-orbit-bone font-bold">{freeShippingPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-orbit-card rounded-full overflow-hidden">
              <div 
                className="h-full bg-orbit-cobalt rounded-full transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-12 h-12 rounded-full bg-orbit-surface border border-orbit-border flex items-center justify-center text-orbit-slate">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-orbit-bone">
                  YOUR BAG IS CURRENTLY EMPTY
                </div>
                <p className="text-xs text-orbit-slate max-w-xs font-sans">
                  Browse Collection 04: Hydro-Drift to allocate pieces before limited batch units deplete.
                </p>
                <button
                  onClick={closeCart}
                  className="px-4 py-2 rounded-lg bg-orbit-cobalt text-white text-xs font-bold transition-all shadow-cobalt-sm"
                >
                  DISCOVER COLLECTION
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3.5 p-3 rounded-xl bg-orbit-surface border border-orbit-border hover:border-orbit-borderLight transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-black border border-orbit-border shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-orbit-bone truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-orbit-slate hover:text-red-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-orbit-slate">
                        <span className="px-1.5 py-0.5 rounded bg-orbit-card border border-orbit-border text-orbit-bone">
                          SIZE {item.size}
                        </span>
                        <span>{formatPrice(item.product.price)} ea</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-orbit-border/60 text-[11px]">
                      <div className="flex items-center border border-orbit-border rounded bg-orbit-card">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, -1)}
                          className="w-5 h-5 flex items-center justify-center text-orbit-slate hover:text-orbit-bone"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-orbit-bone">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, 1)}
                          className="w-5 h-5 flex items-center justify-center text-orbit-slate hover:text-orbit-bone"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="font-bold text-orbit-bone">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-orbit-surface border-t border-orbit-border space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-orbit-slate" />
                    <input
                      type="text"
                      placeholder='Coupon (try "GRAVITY20")'
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-orbit-card border border-orbit-border rounded-lg text-xs text-orbit-bone placeholder-orbit-slate uppercase focus:outline-none focus:border-orbit-cobalt"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-orbit-card hover:bg-orbit-cardHover border border-orbit-border text-orbit-bone text-xs font-bold transition-all"
                  >
                    APPLY
                  </button>
                </div>

                {promoMessage && (
                  <div className={`text-[11px] ${promoMessage.error ? 'text-red-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </div>
                )}

                {discountPercent > 0 && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-orbit-cobalt/15 border border-orbit-cobalt/40 text-[11px] text-orbit-cobaltLight font-medium">
                    <span>COUPON APPLIED: {promoCode} (-{discountPercent}%)</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-orbit-slate hover:text-white"
                      title="Remove coupon"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </form>

              {/* Ledger Summary */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-orbit-border">
                <div className="flex justify-between text-orbit-slate">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-orbit-cobaltLight font-medium">
                    <span>PROMO DAMPENER (-20%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-orbit-slate">
                  <span>ESTIMATED SHIPPING</span>
                  <span>{shipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-orbit-bone pt-2 border-t border-orbit-border">
                  <span>TOTAL DUE</span>
                  <span className="text-base text-orbit-cobaltLight">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleStripeCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white text-xs font-bold uppercase tracking-wider shadow-cobalt-btn transition-all active:scale-98"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>PROCEED TO CHECKOUT // {formatPrice(total)}</span>
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP INSTANT CONCIERGE ORDER</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-orbit-slate pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-orbit-cobalt" />
                <span>SECURE ENCRYPTED CHECKOUT</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
