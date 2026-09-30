import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.playSuccess();
    setIsSent(true);
    setEmail('');
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <footer id="about" className="w-full bg-[#060A14] border-t border-orbit-border py-12 text-xs font-mono text-orbit-slate select-none">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-orbit-border">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orbit-cobalt"></span>
              <span className="text-sm font-bold text-orbit-bone">ORBIT // ATELIER</span>
            </div>
            <p className="text-xs text-orbit-slate font-sans leading-relaxed">
              Pioneering hydrodynamic technical garments and zero-gravity architectural streetwear. Every release is produced in limited, serialized quantities.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="text-orbit-bone font-bold uppercase tracking-wider text-[11px]">
              COLLECTION 04
            </div>
            <ul className="space-y-1 text-xs text-orbit-slate">
              <li>Orbit Apex Cobalt Puffer</li>
              <li>Hydro-Shield Modular Vest</li>
              <li>Zero-G Utility Cargo</li>
              <li>Magnetic Fidlock Beanie</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="text-orbit-bone font-bold uppercase tracking-wider text-[11px]">
              CUSTOMER DISPATCH
            </div>
            <ul className="space-y-1 text-xs text-orbit-slate">
              <li>Free Global Express over $200</li>
              <li>WhatsApp Concierge Hotline</li>
              <li>Stripe Encrypted Payment Portal</li>
              <li>Code: <strong className="text-orbit-cobaltLight">GRAVITY20</strong> (20% Off)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="text-orbit-bone font-bold uppercase tracking-wider text-[11px]">
              DROP 05 TELEMETRY
            </div>
            <p className="text-xs text-orbit-slate">
              Receive confidential coordinate alerts 15 minutes before the next release drops.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 pt-1">
              <input
                type="email"
                placeholder="client@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-md bg-orbit-card border border-orbit-border text-orbit-bone placeholder-orbit-slateDark text-xs focus:outline-none focus:border-orbit-cobalt"
                required
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md bg-orbit-cobalt hover:bg-orbit-cobaltHover text-white font-bold transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {isSent && (
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>COMMS ENCRYPTED & LOGGED</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-orbit-slateDark">
          <div>
            © 2026 ORBIT ATELIER // ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>TOKYO // BERLIN // HOKKAIDO</span>
            <span>SECURE PROTOCOL v4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
