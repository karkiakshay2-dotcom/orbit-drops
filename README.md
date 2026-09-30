# ORBIT // 01 — COLLECTION 04: HYDRO-DRIFT

A high-end, designer streetwear e-commerce experience inspired by **Nike Lab, Arc'teryx, and Ader Error**. Features a sophisticated **Cobalt & Deep Navy** architectural palette, split hero with a bounded **Matter.js Antigravity Physics Sandbox**, full-bleed 4-column product grid, sticky live dispatch ticker, and a slide-over checkout drawer.

---

## ⚡ 3-Step Setup Instructions

Run this project on any machine with Node.js (v18+ recommended):

### Step 1: Clone or Navigate to Directory
```bash
cd orbit-drops
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
# or
npm start
```
Open your browser at `http://localhost:5173` (or `http://localhost:5174`) to experience the live designer store.

To generate an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 🎨 Design System & Palette

- **Primary Background**: Deep Midnight Navy (`#080D1A` / `#0B111E`)
- **Surface & Cards**: Muted Steel-Navy containers (`#131B2E`) with crisp 1px borders (`#1F2E4D`)
- **Primary Accent**: Electric Cobalt / Royal Blue (`#2563EB` / `#3B82F6`)
- **Typography**: Bone White (`#F8FAFC`) with cool slate secondary accents (`#94A3B8`) in clean modern sans-serif
- **Finish**: Zero aggressive neon glow blur. Architectural borders, tactile micro-interactions, and ultra-sharp product cutouts.

---

## 🛰️ Key Features

### 1. Split Hero & Matter.js Antigravity Sandbox
- **Left Hero Editorial**: "HYDRO-DYNAMIC APPAREL", curated technical description, and instant **Add Primary Set** action (Apex Cobalt Puffer + Fidlock Beanie combo).
- **Right Antigravity Sandbox**: Bounded Matter.js 2D physics playfield floating actual product cards, material badges (`GORE-TEX INFINIUM™`), and `GRAVITY20` coupon voucher.
- **Gravity Switch**: Toggle flips between Zero-G floating drift (`0.00g`) and Earth gravity drop (`0.95g`) where items settle on the floor line with natural bounce.

### 2. Full-Bleed 4-Column Product Grid
Edge-to-edge product grid featuring:
1. **Orbit Apex Cobalt Puffer** — $280 (Gore-Tex Infinium™ & 750-fill hydrophobic down)
2. **Hydro-Shield Modular Vest** — $190 (1000D Cordura® & Fidlock® V-Buckles)
3. **Zero-G Utility Cargo** — $160 (Kevlar® ripstop blend & 8 modular pockets)
4. **Magnetic Fidlock Beanie** — $45 (Merino wool blend with magnetic Fidlock® latch)

Each card features:
- Photo preview with clean borders
- Multi-currency formatted pricing (USD, EUR, JPY)
- Variant size pills (S / M / L / XL)
- Scarcity stock indicators ("8 left")
- Solid Cobalt "Add to Bag" button

### 3. Sticky Bottom Status Bar
- Live order dispatch updates ("Order #2041 shipped to Tokyo // 3 min ago")
- Free global express delivery tracker ($200 threshold)
- Dynamic cart drawer trigger (`VIEW BAG [X] // $TOTAL`)

### 4. Slide-Over Cart Drawer & Dual Checkout
- Smooth slide-over panel from the right edge
- Quantity steppers (+ / -) and item removal
- Promo code input with instant validation (**`GRAVITY20`** unlocks 20% off with confetti burst)
- Checkout pathways: **WhatsApp Direct Concierge Order** + **Stripe Payment Gateway** + **Order Manifest Receipt Modal**

---

## 🔑 Promo Code
Use coupon code **`GRAVITY20`** at checkout or click **APPLY -20%** in the sandbox for an instant 20% order reduction.
