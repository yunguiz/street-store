import React, { useState } from 'react';
import { Product, GenderFilter, ProductCategory } from '../types';
import { ProductCard3D } from './ProductCard3D';
import { InteractiveFilters } from './InteractiveFilters';
import { ArrowUpDown, Flame } from 'lucide-react';

interface ExclusiveCollectionProps {
  products: Product[];
  currentGender: GenderFilter;
  onSelectGender: (gender: GenderFilter) => void;
  activeCategory: ProductCategory | 'ALL';
  onSelectCategory: (category: ProductCategory | 'ALL') => void;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const ExclusiveCollection: React.FC<ExclusiveCollectionProps> = ({
  products,
  currentGender,
  onSelectGender,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'badge'>('featured');

  // Filter products by gender & flexible category matching
  const filteredProducts = products.filter((p) => {
    const matchesGender =
      currentGender === 'ALL' ||
      p.gender === currentGender ||
      p.gender === 'UNISSEX';

    if (activeCategory === 'ALL' || activeCategory === 'NOVIDADES') {
      return matchesGender;
    }

    // Comparação flexível para aceitar variações vindas da API da Nuvemshop
    const productCat = (p.category || '').toUpperCase();
    const targetCat = String(activeCategory).toUpperCase();

    const matchesCategory =
      productCat === targetCat ||
      productCat.includes(targetCat) ||
      targetCat.includes(productCat);

    return matchesGender && matchesCategory;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'badge') return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section id="exclusive-collection" className="py-20 bg-[#0A0A0C] relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>DROP 04 // SEASON 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-red-500">ESTOQUE LIMITADO</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne uppercase tracking-tight text-white">
              COLEÇÃO EXCLUSIVA
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Sorting control */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-semibold text-zinc-300">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar produtos"
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-zinc-900 text-white">Destaques & Hype</option>
                <option value="price-asc" className="bg-zinc-900 text-white">Menor Preço</option>
                <option value="price-desc" className="bg-zinc-900 text-white">Maior Preço</option>
                <option value="badge" className="bg-zinc-900 text-white">Edições Limitadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* INTERACTIVE FILTERS: MASCULINO, FEMININO, UNISSEX */}
        <InteractiveFilters
          currentGender={currentGender}
          onSelectGender={onSelectGender}
          productCount={sortedProducts.length}
        />

        {/* PRODUCT BLOCKS GRID */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard3D
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/40 rounded-xl border border-zinc-800 my-8">
            <p className="text-zinc-300 font-bold text-base">Nenhum produto encontrado neste filtro.</p>
            <p className="text-zinc-500 text-xs mt-1">Experimente selecionar outro gênero ou categoria.</p>
            <button
              onClick={() => {
                onSelectGender('ALL');
                onSelectCategory('ALL');
              }}
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
            >
              Resetar Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};