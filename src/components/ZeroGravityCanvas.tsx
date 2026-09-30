import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useCart } from '../context/CartContext';
import { RotateCcw, Zap, Tag, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SandboxItem {
  id: string;
  name: string;
  sub: string;
  price?: string;
  imageSrc?: string;
  width: number;
  height: number;
  isPromo?: boolean;
}

const SANDBOX_ITEMS: SandboxItem[] = [
  {
    id: 'puffer',
    name: 'Apex Cobalt Puffer',
    sub: 'COLLECTION 04',
    price: '$280',
    imageSrc: '/products/cobalt_puffer.jpg',
    width: 220,
    height: 72
  },
  {
    id: 'voucher',
    name: 'VOUCHER: GRAVITY20',
    sub: '-20% DISCOUNT UNLOCKED',
    price: 'SAVE 20%',
    width: 210,
    height: 64,
    isPromo: true
  },
  {
    id: 'beanie',
    name: 'Fidlock Beanie',
    sub: 'MERINO / MAGNETIC',
    price: '$45',
    imageSrc: '/products/fidlock_beanie.jpg',
    width: 190,
    height: 68
  },
  {
    id: 'vest',
    name: 'Hydro-Shield Vest',
    sub: 'CORDURA 1000D',
    price: '$190',
    imageSrc: '/products/utility_vest.jpg',
    width: 205,
    height: 68
  },
  {
    id: 'cargo',
    name: 'Zero-G Utility Cargo',
    sub: 'KEVLAR RIPSTOP',
    price: '$160',
    imageSrc: '/products/cargo_pant.jpg',
    width: 200,
    height: 68
  }
];

export const ZeroGravityCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isZeroGravity, toggleGravity, applyPromoCode } = useCart();
  const [gravityLabel, setGravityLabel] = useState<string>('0.00g');

  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<{ body: Matter.Body; item: SandboxItem }[]>([]);
  const wallsRef = useRef<Matter.Body[]>([]);
  const loadedImagesRef = useRef<Record<string, HTMLImageElement>>({});

  // Preload product images for canvas rendering
  useEffect(() => {
    SANDBOX_ITEMS.forEach(item => {
      if (item.imageSrc && !loadedImagesRef.current[item.imageSrc]) {
        const img = new Image();
        img.src = item.imageSrc;
        img.onload = () => {
          loadedImagesRef.current[item.imageSrc!] = img;
        };
      }
    });
  }, []);

  useEffect(() => {
    setGravityLabel(isZeroGravity ? '0.00g' : '1.00g');
    if (engineRef.current) {
      engineRef.current.gravity.y = isZeroGravity ? 0 : 0.95;
      engineRef.current.gravity.x = 0;

      if (isZeroGravity) {
        bodiesRef.current.forEach(({ body }) => {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.012,
            y: (Math.random() - 0.5) * 0.012
          });
        });
      }
    }
  }, [isZeroGravity]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

    const engine = Engine.create({
      gravity: {
        x: 0,
        y: isZeroGravity ? 0 : 0.95,
        scale: 0.001
      }
    });
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const wallThickness = 80;
    const createWalls = (w: number, h: number) => {
      return [
        Bodies.rectangle(w / 2, -wallThickness / 2, w * 2, wallThickness, { isStatic: true, restitution: 0.5 }),
        Bodies.rectangle(w / 2, h + wallThickness / 2, w * 2, wallThickness, { isStatic: true, restitution: 0.5 }),
        Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h * 2, { isStatic: true, restitution: 0.5 }),
        Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h * 2, { isStatic: true, restitution: 0.5 })
      ];
    };

    wallsRef.current = createWalls(width, height);
    Composite.add(engine.world, wallsRef.current);

    const itemBodies: { body: Matter.Body; item: SandboxItem }[] = [];

    SANDBOX_ITEMS.forEach((item, idx) => {
      const x = (width * 0.25) + ((idx % 2) * (width * 0.45)) + (Math.random() * 20 - 10);
      const y = (height * 0.2) + (Math.floor(idx / 2) * (height * 0.28)) + (Math.random() * 20 - 10);

      const body = Bodies.rectangle(x, y, item.width, item.height, {
        chamfer: { radius: 8 },
        restitution: 0.55,
        friction: 0.15,
        frictionAir: isZeroGravity ? 0.006 : 0.02,
        density: 0.0025,
        angle: (Math.random() - 0.5) * 0.2
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.8,
        y: (Math.random() - 0.5) * 1.8
      });

      itemBodies.push({ body, item });
      Composite.add(engine.world, body);
    });

    bodiesRef.current = itemBodies;

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);

    Events.on(mouseConstraint, 'startdrag', () => {
      sounds.playClick();
    });

    const ctx = canvas.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      // Floor line indicator
      ctx.save();
      ctx.strokeStyle = '#1F2E4D';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - 1);
      ctx.lineTo(width, height - 1);
      ctx.stroke();
      ctx.restore();

      // Render Each Card
      itemBodies.forEach(({ body, item }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const w = item.width;
        const h = item.height;
        const radius = 8;

        // Subtle Drop Shadow
        ctx.shadowColor = item.isPromo ? 'rgba(37, 99, 235, 0.4)' : 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = item.isPromo ? 16 : 10;
        ctx.shadowOffsetY = 4;

        // Card Background Fill
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, radius);
        ctx.fillStyle = item.isPromo ? '#1D4ED8' : '#131B2E';
        ctx.fill();

        // Crisp 1px Border
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 1;
        ctx.strokeStyle = item.isPromo ? '#60A5FA' : '#1F2E4D';
        ctx.stroke();

        // Render Product Image Thumbnail (if available)
        const img = item.imageSrc ? loadedImagesRef.current[item.imageSrc] : null;
        const imgSize = h - 14;
        const imgX = -w / 2 + 7;
        const imgY = -h / 2 + 7;

        if (img) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(imgX, imgY, imgSize, imgSize, 5);
          ctx.clip();
          ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
          ctx.restore();

          // Image Border
          ctx.strokeStyle = '#1F2E4D';
          ctx.lineWidth = 1;
          ctx.strokeRect(imgX, imgY, imgSize, imgSize);
        }

        // Text Info Block
        const textStartX = img ? imgX + imgSize + 10 : -w / 2 + 14;

        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // Title
        ctx.font = 'bold 12px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#F8FAFC';
        ctx.fillText(item.name, textStartX, -h / 2 + 12);

        // Subtitle
        ctx.font = '500 9px "JetBrains Mono", monospace';
        ctx.fillStyle = item.isPromo ? '#DBEAFE' : '#94A3B8';
        ctx.fillText(item.sub, textStartX, -h / 2 + 28);

        // Price Badge
        if (item.price) {
          ctx.font = 'bold 11px "Space Grotesk", sans-serif';
          ctx.fillStyle = item.isPromo ? '#FFFFFF' : '#3B82F6';
          ctx.fillText(item.price, textStartX, -h / 2 + 42);
        }

        ctx.restore();
      });

      // Subtle float nudge in zero-g
      if (isZeroGravity && Math.random() < 0.02) {
        itemBodies.forEach(({ body }) => {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.0003,
            y: (Math.random() - 0.5) * 0.0003
          });
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      Composite.remove(engine.world, wallsRef.current);
      wallsRef.current = createWalls(width, height);
      Composite.add(engine.world, wallsRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  const triggerScatter = () => {
    sounds.playClick();
    bodiesRef.current.forEach(({ body }) => {
      const angle = Math.random() * Math.PI * 2;
      const force = 0.03 + Math.random() * 0.02;
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force
      });
    });
  };

  const handleApplyVoucher = () => {
    sounds.playClick();
    applyPromoCode('GRAVITY20');
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[380px] lg:h-[460px] bg-orbit-card border border-orbit-border rounded-xl overflow-hidden shadow-card-subtle select-none"
    >
      {/* Top Header Strip */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3.5 py-2.5 bg-orbit-surface/90 border-b border-orbit-border text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orbit-cobalt"></span>
          <span className="font-mono text-[11px] font-semibold text-orbit-bone">
            ANTIGRAVITY SANDBOX // {gravityLabel}
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-orbit-slate">
            {isZeroGravity ? '[WEIGHTLESS DRIFT]' : '[EARTH 0.95G]'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Apply 20% Voucher */}
          <button
            onClick={handleApplyVoucher}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-orbit-cobalt/20 hover:bg-orbit-cobalt/30 border border-orbit-cobalt/40 text-orbit-cobaltLight text-[10px] font-mono font-bold transition-all active:scale-95"
            title="Redeem GRAVITY20 voucher"
          >
            <Sparkles className="w-3 h-3 text-orbit-cobaltLight" />
            <span>APPLY -20%</span>
          </button>

          {/* Scatter Pulse */}
          <button
            onClick={triggerScatter}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-orbit-surface hover:bg-orbit-cardHover border border-orbit-border text-orbit-slate hover:text-orbit-bone text-[10px] font-mono transition-all active:scale-95"
            title="Kinetic pulse scatter"
          >
            <Zap className="w-3 h-3 text-orbit-cobalt" />
            <span className="hidden sm:inline">PULSE</span>
          </button>

          {/* Gravity Mode Toggle */}
          <button
            onClick={toggleGravity}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-mono font-bold transition-all active:scale-95 ${
              isZeroGravity
                ? 'bg-orbit-cobalt text-white shadow-cobalt-sm'
                : 'bg-orbit-card border border-orbit-border text-orbit-bone'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isZeroGravity ? 'ZERO-G' : 'EARTH-G'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Hint Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-3.5 py-1.5 bg-orbit-surface/90 border-t border-orbit-border text-[10px] font-mono text-orbit-slateDark pointer-events-none">
        <div className="flex items-center gap-1.5 text-orbit-slate">
          <Tag className="w-3 h-3 text-orbit-cobalt" />
          <span>DRAG, FLICK & TOSS REAL PRODUCT CARDS</span>
        </div>
        <div className="hidden sm:block">
          <span>MATTER.JS v0.20 // COLLISION RESTITUTION: 0.55</span>
        </div>
      </div>

      {/* Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />
    </div>
  );
};
