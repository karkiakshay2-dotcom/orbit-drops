import { X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans select-none">
      <div 
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      ></div>

      <div className="relative w-full max-w-3xl bg-orbit-card border border-orbit-border rounded-2xl shadow-2xl z-10 my-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-orbit-surface border-b border-orbit-border font-mono text-xs text-orbit-slate">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orbit-cobalt"></span>
            <span className="text-orbit-bone font-bold">LOOKBOOK // COLLECTION 04: HYDRO-DRIFT</span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1 rounded border border-orbit-border hover:border-orbit-borderLight text-orbit-slate hover:text-orbit-bone"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono text-orbit-cobaltLight uppercase tracking-wider font-semibold">
              EDITORIAL CAMPAIGN
            </span>
            <h2 className="text-2xl font-bold text-orbit-bone mt-1 uppercase">
              THE ARCTIC DOCK // HOKKAIDO & BERLIN
            </h2>
            <p className="text-sm text-orbit-slate mt-2 leading-relaxed">
              Photographed during zero-submergence cold chamber trials. Garments layered for modular climate regulation with quick-dock Fidlock® magnetic tethering.
            </p>
          </div>

          {/* Lookbook Visual Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-orbit-border bg-black relative group">
              <img 
                src="/products/cobalt_puffer.jpg" 
                alt="Look 01" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
              />
              <div className="absolute bottom-3 left-3 bg-orbit-bg/85 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-orbit-bone border border-orbit-border">
                LOOK 01: APEX COBALT PUFFER
              </div>
            </div>

            <div className="aspect-[4/5] rounded-xl overflow-hidden border border-orbit-border bg-black relative group">
              <img 
                src="/products/utility_vest.jpg" 
                alt="Look 02" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
              />
              <div className="absolute bottom-3 left-3 bg-orbit-bg/85 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-orbit-bone border border-orbit-border">
                LOOK 02: HYDRO-SHIELD VEST
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
