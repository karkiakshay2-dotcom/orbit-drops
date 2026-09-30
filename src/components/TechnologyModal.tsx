import { X, ShieldCheck, Droplets, Layers } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TechnologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnologyModal: React.FC<TechnologyModalProps> = ({ isOpen, onClose }) => {
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
            <span className="text-orbit-bone font-bold">MATERIAL RESEARCH & TECH SPEC</span>
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
              LABORATORY STANDARDS
            </span>
            <h2 className="text-2xl font-bold text-orbit-bone mt-1 uppercase">
              HYDRO-DYNAMIC TEXTILE MATRIX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-orbit-surface border border-orbit-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orbit-cobalt/20 text-orbit-cobaltLight flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-orbit-bone">Gore-Tex Infinium™</h4>
              <p className="text-xs text-orbit-slate font-sans leading-relaxed">
                Hydrophobic microporous ePTFE membrane blocking moisture while maximizing dynamic breathability.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-orbit-surface border border-orbit-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orbit-cobalt/20 text-orbit-cobaltLight flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-orbit-bone">German Fidlock®</h4>
              <p className="text-xs text-orbit-slate font-sans leading-relaxed">
                Patented magnetic mechanical closure systems allowing 1-handed docking under heavy gloves.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-orbit-surface border border-orbit-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orbit-cobalt/20 text-orbit-cobaltLight flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-orbit-bone">Zero-G Ergonomics</h4>
              <p className="text-xs text-orbit-slate font-sans leading-relaxed">
                Articulated kinetic multi-panel seams preventing fabric bunching during low-drag physical movement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
