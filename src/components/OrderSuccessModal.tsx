import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Copy, Check, X, Package } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const OrderSuccessModal: React.FC = () => {
  const { orderCompleted, setOrderCompleted, clearCart, closeCart, formatPrice } = useCart();
  const [copied, setCopied] = useState<boolean>(false);

  if (!orderCompleted) return null;

  const handleClose = () => {
    sounds.playClick();
    setOrderCompleted(null);
    clearCart();
    closeCart();
  };

  const handleCopy = () => {
    sounds.playClick();
    const manifestText = `ORBIT // COLLECTION 04 ORDER MANIFEST
ORDER NUMBER: #${orderCompleted.orderId}
DATE: ${new Date().toLocaleDateString()}
ITEMS: ${orderCompleted.items.map(i => `${i.product.name} [${i.size}] x${i.quantity}`).join('; ')}
TOTAL: ${formatPrice(orderCompleted.total)}
STATUS: ALLOCATED FOR EXPRESS DISPATCH`;

    navigator.clipboard.writeText(manifestText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-mono text-xs select-none">
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      ></div>

      <div className="relative w-full max-w-lg bg-orbit-card border border-orbit-border rounded-xl shadow-2xl z-10 my-6 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-orbit-surface border-b border-orbit-border text-orbit-slate">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orbit-cobalt"></span>
            <span className="text-orbit-bone font-bold text-xs uppercase tracking-wider">
              ORDER CONFIRMATION MANIFEST
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded border border-orbit-border hover:border-orbit-borderLight text-orbit-slate hover:text-orbit-bone"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Header Icon & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orbit-cobalt/20 border border-orbit-cobalt text-orbit-cobaltLight">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                PAYMENT & ALLOCATION CONFIRMED
              </span>
              <h3 className="text-lg font-bold text-orbit-bone mt-2">
                COLLECTION 04: HYDRO-DRIFT
              </h3>
              <p className="text-xs text-orbit-slate font-sans mt-0.5">
                {orderCompleted.method === 'whatsapp'
                  ? 'Your WhatsApp concierge order draft has been generated.'
                  : orderCompleted.method === 'stripe'
                  ? 'Mock Stripe payment successful. Garments allocated to your profile.'
                  : 'Order manifest recorded. Dispatch slot assigned.'}
              </p>
            </div>
          </div>

          {/* Receipt Breakdown Box */}
          <div className="rounded-lg border border-orbit-border bg-orbit-surface overflow-hidden">
            <div className="p-3 border-b border-orbit-border flex justify-between text-orbit-slate text-[11px]">
              <span>MANIFEST ID: <strong className="text-orbit-bone">#{orderCompleted.orderId}</strong></span>
              <span>{orderCompleted.timestamp}</span>
            </div>

            <div className="p-3 space-y-2">
              {orderCompleted.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-orbit-bone text-xs">
                  <div>
                    <span className="font-semibold">{item.product.name}</span>
                    <span className="text-orbit-slate ml-1.5">[{item.size}] x{item.quantity}</span>
                  </div>
                  <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-orbit-border bg-orbit-card space-y-1 text-orbit-slate text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(orderCompleted.subtotal)}</span>
              </div>
              {orderCompleted.discount > 0 && (
                <div className="flex justify-between text-orbit-cobaltLight font-medium">
                  <span>Discount ({orderCompleted.promoCode}):</span>
                  <span>-{formatPrice(orderCompleted.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Global Shipping:</span>
                <span>{orderCompleted.shipping === 0 ? 'FREE' : formatPrice(orderCompleted.shipping)}</span>
              </div>
              <div className="flex justify-between text-orbit-bone font-bold text-sm pt-1 border-t border-orbit-border">
                <span>Total Amount:</span>
                <span className="text-orbit-cobaltLight">{formatPrice(orderCompleted.total)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-orbit-surface hover:bg-orbit-cardHover border border-orbit-border text-orbit-bone text-xs font-bold transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-orbit-slate" />
                  <span>COPY ORDER SUMMARY</span>
                </>
              )}
            </button>

            <button
              onClick={handleClose}
              className="flex-1 py-2.5 px-4 rounded-lg bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white text-xs font-bold uppercase tracking-wider shadow-cobalt-sm transition-all"
            >
              RETURN TO STORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
