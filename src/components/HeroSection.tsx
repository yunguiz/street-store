import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { StreetStoreLogo } from './StreetStoreLogo';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_streetwear_rooftop_1790723698442.jpg"
          alt="Modelos de streetwear em telhado industrial com vista panorâmica da cidade"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Clean, architectural dark scrims without neon flares */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full flex flex-col items-center text-center">
        
        {/* Clean Drop Tag & Authenticity Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/80 border border-zinc-800 text-zinc-300 mb-6 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
          <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-200 uppercase">
            DROP 04 · LIMITED RUN
          </span>
          <span className="text-zinc-700">|</span>
          <span className="text-[11px] font-medium tracking-wider text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            100% ORIGINAL
          </span>
        </div>

        {/* GRAFFITI STORE NAME (Clean, crisp presentation) */}
        <div className="relative my-2 select-none">
          <div className="flex flex-col items-center justify-center">
            <StreetStoreLogo variant="hero" withMotionBlur={true} />
            
            {/* Clean subtle horizontal line */}
            <div className="w-24 sm:w-32 h-[1px] bg-zinc-700 mt-2" aria-hidden="true" />
          </div>
        </div>

        {/* SLOGAN: "AUTORIDADE NO STREETWEAR" IN CLEAN CRISP 3D WHITE FONT */}
        <div className="mt-5 mb-8 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-syne uppercase tracking-tight text-white text-3d-white leading-none text-balance">
            AUTORIDADE NO STREETWEAR
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-zinc-300 max-w-2xl mx-auto text-balance leading-relaxed">
            Modelagens oversized, tecidos de alta gramatura e silhuetas que redefinem o lifestyle urbano. Feito para quem lidera o movimento.
          </p>
        </div>

        {/* CLEAN LUXURY STREETWEAR CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          {/* Main Clean CTA Button */}
          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-zinc-100 text-black font-black text-xs uppercase tracking-widest rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            {/* Clean Minimalist Crown SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-black group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 17l2-9 4.5 4L12 4l3.5 8L20 8l2 9H2z" fill="currentColor" fillOpacity="0.15" />
            </svg>

            <span>EXPLORAR COLEÇÃO</span>

            {/* Clean Minimal Arrow SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Clean Secondary Button */}
          <a
            href="#exclusive-collection"
            className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white bg-black/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-lg transition-all duration-200"
          >
            VER LOOKBOOK
          </a>
        </div>

        {/* Quick features bar at bottom of hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-14 pt-8 border-t border-zinc-800/80 max-w-4xl w-full text-zinc-400 text-xs sm:text-sm font-semibold">
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-base tabular-nums">480g/m²</span>
            <span className="text-zinc-400 text-xs">Algodão Heavyweight</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-base">Boxy & Oversized</span>
            <span className="text-zinc-400 text-xs">Corte Arquitetônico</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-base tabular-nums">100% Original</span>
            <span className="text-zinc-400 text-xs">Edições Numeradas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-base">Envio Express</span>
            <span className="text-zinc-400 text-xs">Rastreamento Sedex</span>
          </div>
        </div>

      </div>
    </section>
  );
};
