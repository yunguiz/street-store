import React from 'react';
import { ProductCategory } from '../types';
import { Flame, ArrowUpRight } from 'lucide-react';

interface CategoryQuickGridProps {
  onSelectCategory: (category: ProductCategory | 'ALL') => void;
  activeCategory: ProductCategory | 'ALL';
}

export const CategoryQuickGrid: React.FC<CategoryQuickGridProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const categories: { name: string; category: ProductCategory; tag: string; image: string; count: string }[] = [
    {
      name: 'ROUPAS',
      category: 'ROUPAS',
      tag: 'PURE COTTON',
      image: '/src/assets/images/product_white_tshirt_3d_1790723727981.jpg',
      count: 'Camisetas, Calças & Shorts',
    },
    {
      name: 'CALÇADOS',
      category: 'CALÇADOS' as ProductCategory,
      tag: 'DROP LIMITADO',
      image: '/src/assets/images/product_sneaker_3d_1790723718466.jpg',
      count: 'Tênis, Chinelos & Meias',
    },
    {
      name: 'ACESSÓRIOS & BAGS',
      category: 'ACESSÓRIOS',
      tag: 'CORDURA NYLON',
      image: '/src/assets/images/product_white_tshirt_3d_1790723727981.jpg',
      count: 'Bonés, Óculos & Bags',
    },
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    const target = document.getElementById('exclusive-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-12 bg-[#09090C] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              NAVEGUE POR CATEGORIAS
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-syne uppercase tracking-tight text-white mt-1">
              DESTAQUES DO STREETWEAR
            </h2>
          </div>

          <button
            onClick={() => handleCategoryClick('ROUPAS')}
            className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Ver tudo</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory === cat.category;
            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.category)}
                className={`group relative overflow-hidden rounded-xl bg-[#121215] border cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected
                    ? 'border-red-600 shadow-lg shadow-red-950/40 ring-1 ring-red-600'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Image backdrop */}
                <div className="aspect-[4/3] bg-[#0E0E10] flex items-center justify-center p-4 relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-black/80 border border-zinc-700 text-zinc-300 rounded">
                    {cat.tag}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3.5 sm:p-4 bg-[#141418] flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-[200px]">
                      {cat.count}
                    </p>
                  </div>

                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-red-600 border-red-600 text-white' 
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 group-hover:bg-white group-hover:text-black'
                  }`}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};