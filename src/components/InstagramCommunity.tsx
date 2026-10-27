import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramCommunity: React.FC = () => {
  const posts = [
    {
      handle: '@lucas.urban',
      piece: 'Hoodie Heavyweight Red',
      image: '/src/assets/images/hero_streetwear_rooftop_1790723698442.jpg',
    },
    {
      handle: '@mariana.hype',
      piece: 'T-Shirt Boxy Raw White',
      image: '/src/assets/images/product_white_tshirt_3d_1790723727981.jpg',
    },
    {
      handle: '@pedro.vortex',
      piece: 'Sneaker CyberVortex 01',
      image: '/src/assets/images/product_sneaker_3d_1790723718466.jpg',
    },
    {
      handle: '@streetstore.br',
      piece: 'Drop 04 Backstage',
      image: '/src/assets/images/product_red_hoodie_3d_1790723708576.jpg',
    },
  ];

  return (
    <section className="py-16 bg-[#08080A] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-1">
              <Instagram className="w-3.5 h-3.5 text-zinc-300" />
              <span>COMMUNITY LOOKBOOK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-syne uppercase tracking-tight text-white">
              #STREETSTOREFAMILY
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Marque <strong className="text-white">@streetstore.br</strong> no seu look para aparecer no feed oficial da marca.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-white rounded-lg transition-colors"
          >
            <Instagram className="w-4 h-4 text-zinc-300" />
            <span>SEGUIR NO INSTAGRAM</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl overflow-hidden bg-[#121215] border border-zinc-800 aspect-square"
            >
              <img
                src={post.image}
                alt={post.piece}
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-white tracking-tight">{post.handle}</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">{post.piece}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
