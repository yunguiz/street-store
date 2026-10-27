import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PromoDualBannersProps {
  onShopHoodies: () => void;
  onShopSneakers: () => void;
}

export const PromoDualBanners: React.FC<PromoDualBannersProps> = ({
  onShopHoodies,
  onShopSneakers,
}) => {
  return (
    <section className="py-12 bg-[#08080A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Banner 1: Heavyweight Hoodie Campaign */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#17171C] via-[#121216] to-[#0A0A0C] border border-zinc-800 p-8 sm:p-10 flex flex-col justify-between min-h-[300px] group">
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                <Sparkles className="w-3 h-3" />
                LANÇAMENTO DROP 04
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-syne uppercase tracking-tight text-white leading-tight">
                HEAVYWEIGHT <br />
                <span className="text-red-500">COTTON 480GSM</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Caimento amplo e estruturado. A sensação de vestir um streetwear de padrão internacional.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={onShopHoodies}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-black text-xs font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <span>VER COLEÇÃO DE MOLETOM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Product Image Background */}
            <div className="absolute right-2 -bottom-6 w-52 sm:w-64 h-52 sm:h-64 opacity-85 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 pointer-events-none">
              <img
                src="/src/assets/images/product_red_hoodie_3d_1790723708576.jpg"
                alt="Moletom Vermelho Heavyweight"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Banner 2: Sneaker CyberVortex Campaign */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#17171C] via-[#121216] to-[#0A0A0C] border border-zinc-800 p-8 sm:p-10 flex flex-col justify-between min-h-[300px] group">
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                EDIÇÃO NUMERADA
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-syne uppercase tracking-tight text-white leading-tight">
                SNEAKER <br />
                <span className="text-white">CYBERVORTEX 01</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Linhas aerodinâmicas esculpidas e sola com máxima absorção de impacto para o asfalto.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={onShopSneakers}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <span>GARANTIR SEU PAR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Product Image Background */}
            <div className="absolute right-0 -bottom-6 w-52 sm:w-64 h-52 sm:h-64 opacity-85 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 pointer-events-none">
              <img
                src="/src/assets/images/product_sneaker_3d_1790723718466.jpg"
                alt="Sneaker CyberVortex 01"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
