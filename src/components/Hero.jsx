import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/xm1zyUmdIZRP4-d1/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient tint to enhance legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-950/40 to-black/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">
          Cyber Blackjack
        </h1>
        <p className="mt-4 max-w-2xl text-emerald-200/80 text-base sm:text-lg">
          A sleek, dark‑green casino table with a matrix‑style vibe. Try your luck against the dealer.
        </p>
        <a
          href="#play"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-emerald-950 font-semibold px-6 py-3 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-colors"
        >
          Play Now
        </a>
      </div>
    </section>
  );
}
