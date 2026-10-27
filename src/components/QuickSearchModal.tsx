import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 3);

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-[#121216] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-500" />
          <input
            type="text"
            placeholder="Buscar por moletom, sneaker, camiseta, oversized..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm font-medium focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-500 mb-2">
            {query.trim() ? `Resultados (${filtered.length})` : 'Sugestões Populares'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-zinc-400 text-sm">
              Nenhuma peça encontrada para "{query}".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/80 cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 bg-black rounded-lg p-1 flex items-center justify-center shrink-0 border border-zinc-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {product.name}
                  </h4>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                    <span>{product.category}</span>
                    <span>·</span>
                    <span className="text-white font-bold tabular-nums">
                      {formatBRL(product.price)}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-zinc-950 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
          <span>Pressione ESC para fechar</span>
          <span className="text-red-500 font-bold">STREET STORE · HYPE REFINED</span>
        </div>
      </div>
    </div>
  );
};
