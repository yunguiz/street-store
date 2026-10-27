import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F12] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          
          {/* HEADER */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h2 className="text-base font-bold font-syne uppercase tracking-wider">
                FAVORITOS ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-zinc-200">Nenhum favorito salvo</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Clique no ícone de coração dos produtos para salvá-los na sua lista de desejos.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 items-center justify-between"
                >
                  <div className="w-16 h-16 bg-[#09090B] rounded-lg p-1 flex items-center justify-center shrink-0 border border-zinc-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {product.name}
                    </h4>
                    <div className="text-xs text-zinc-300 font-bold tabular-nums mt-0.5">
                      {formatBRL(product.price)}
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product, product.sizes[0]);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold uppercase cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Mover p/ Sacola</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
