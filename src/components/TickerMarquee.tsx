import React from 'react';

export const TickerMarquee: React.FC = () => {
  const tickerItems = [
    'DROP 04 EXCLUSIVE',
    'AUTORIDADE NO STREETWEAR',
    'FRETE GRÁTIS ACIMA DE R$ 399',
    'MODELAGENS OVERSIZED',
    '100% ORIGINAL',
    'DESIGN 3D INSPECTION',
    'PARCELAMENTO EM ATÉ 10X',
  ];

  return (
    <div className="w-full bg-[#08080A] border-y border-zinc-800 py-3 overflow-hidden select-none">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-10">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((text, i) => (
          <div key={i} className="flex items-center gap-10 text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            <span className="text-zinc-300 hover:text-white transition-colors">{text}</span>
            <span className="text-zinc-700" aria-hidden="true">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
