import React, { useState } from 'react';
import { Product } from '../types';

interface LookItem {
  id: number;
  title: string;
  category: string;
  mainImage: string;
  tag: string;
  products: (Product & { position: { x: number; y: number } })[];
}

const lookbookData: LookItem[] = [
  {
    id: 1,
    title: 'Urban Oversized Drop',
    category: 'Coleção Inverno',
    mainImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    tag: 'DESTAQUE',
    products: [
      {
        id: 'look-prod-1',
        name: 'Hoodie Heavyweight Black',
        price: 349.90,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
        description: 'Hoodie premium em moletom pesado com capuz duplo e modelagem streetwear.',
        category: 'ROUPAS',
        gender: 'UNISEX',
        sizes: ['P', 'M', 'G', 'GG'],
        inStock: true,
        position: { x: 45, y: 40 },
      } as any,
      {
        id: 'look-prod-2',
        name: 'Calça Parachute Urban',
        price: 289.90,
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=600&auto=format&fit=crop',
        description: 'Calça cargo utilitária com regulagens e tecido de alta resistência.',
        category: 'ROUPAS',
        gender: 'UNISEX',
        sizes: ['P', 'M', 'G', 'GG'],
        inStock: true,
        position: { x: 50, y: 75 },
      } as any,
    ],
  },
  {
    id: 2,
    title: 'Street Graffiti Vibes',
    category: 'Hoodies & Tees',
    mainImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    tag: 'NOVIDADE',
    products: [
      {
        id: 'look-prod-3',
        name: 'T-Shirt Acid Wash',
        price: 159.90,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
        description: 'Camiseta com lavagem estonada exclusiva e algodão egípcio.',
        category: 'ROUPAS',
        gender: 'UNISEX',
        sizes: ['P', 'M', 'G', 'GG'],
        inStock: true,
        position: { x: 52, y: 35 },
      } as any,
    ],
  },
  {
    id: 3,
    title: 'Night Runner Aesthetic',
    category: 'Streetwear 2026',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    tag: 'LIMITADO',
    products: [
      {
        id: 'look-prod-4',
        name: 'Jaqueta Corta-Vento Reflective',
        price: 429.90,
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
        description: 'Jaqueta com detalhes refletivos para visibilidade noturna e proteção total.',
        category: 'ROUPAS',
        gender: 'UNISEX',
        sizes: ['P', 'M', 'G', 'GG'],
        inStock: true,
        position: { x: 50, y: 45 },
      } as any,
    ],
  },
];

interface LookbookProps {
  onQuickView: (product: Product) => void;
  onAddToCart?: (product: Product, size: string) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ onQuickView, onAddToCart }) => {
  const [activeLookId, setActiveLookId] = useState<number>(1);

  const currentLook = lookbookData.find((l) => l.id === activeLookId) || lookbookData[0];

  const handleAddBundle = (look: LookItem) => {
    look.products.forEach((p) => {
      if (onAddToCart) {
        onAddToCart(p, 'G');
      }
    });
  };

  return (
    <section className="py-20 bg-neutral-950 text-white" id="lookbook">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-800 pb-6">
          <div>
            <span className="text-yellow-500 font-mono text-sm tracking-widest uppercase mb-2 block">
              // VITRINE INTERATIVA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              Lookbook & Combos
            </h2>
          </div>
          <p className="text-neutral-400 mt-4 md:mt-0 max-w-md text-sm">
            Clique nas coroas fixas sobre as peças para abrir os detalhes, escolher o tamanho e comprar.
          </p>
        </div>

        {/* Abas dos Looks */}
        <div className="flex flex-wrap gap-3 mb-8">
          {lookbookData.map((look) => (
            <button
              key={look.id}
              onClick={() => setActiveLookId(look.id)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeLookId === look.id
                  ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/20'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {look.title}
            </button>
          ))}
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Foto Principal com Coroas Fixas */}
          <div className="lg:col-span-7 relative h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
            <img 
              src={currentLook.mainImage} 
              alt={currentLook.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-yellow-400 font-mono text-xs px-3 py-1.5 rounded-md border border-yellow-500/30 uppercase tracking-wider">
              {currentLook.tag}
            </span>

            {/* COROAS ESTÁTICAS POSICIONADAS NAS PEÇAS */}
            {currentLook.products.map((prod) => (
              <button
                key={prod.id}
                onClick={() => onQuickView(prod)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/crown cursor-pointer z-20 focus:outline-none"
                style={{ left: `${prod.position.x}%`, top: `${prod.position.y}%` }}
              >
                <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-black/90 border-2 border-yellow-400 text-yellow-400 shadow-2xl transition-transform duration-300 group-hover/crown:scale-110 group-hover/crown:bg-yellow-400 group-hover/crown:text-black">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
                  </svg>
                </div>
                
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/95 border border-neutral-700 text-xs text-white whitespace-nowrap rounded shadow-xl opacity-0 group-hover/crown:opacity-100 transition-opacity pointer-events-none">
                  <span className="font-bold text-yellow-400">{prod.name}</span>
                  <span className="block text-[10px] text-neutral-400">Clique para escolher o tamanho</span>
                </div>
              </button>
            ))}
          </div>

          {/* Painel lateral de Peças */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-mono text-yellow-500 uppercase tracking-widest block mb-1">
                {currentLook.category}
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
                {currentLook.title}
              </h3>

              <p className="text-xs text-neutral-400 mb-6">
                Clique em qualquer peça abaixo (ou na coroa correspondente na foto) para abrir os tamanhos disponíveis.
              </p>

              {/* Lista de Peças */}
              <div className="space-y-4 mb-8">
                {currentLook.products.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onQuickView(item)}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 hover:border-yellow-500/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-neutral-800" />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">{item.name}</h4>
                        <span className="text-xs font-mono text-yellow-400 font-semibold">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[11px] font-bold text-neutral-300 group-hover:text-black group-hover:bg-yellow-400 bg-neutral-800 px-3 py-1.5 rounded transition-colors shrink-0">
                      Ver Tamanhos
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Combo Completo */}
            <div className="pt-6 border-t border-neutral-800">
              <button
                onClick={() => handleAddBundle(currentLook)}
                className="w-full py-4 bg-white hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Adicionar Look Completo (Tamanho G)</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};