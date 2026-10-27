import React, { useState } from 'react';
import { X, ShoppingBag, Check, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#121215] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-black/60 hover:bg-black rounded-full transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 bg-[#09090B] p-8 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-72 md:max-h-96 w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 text-[11px] font-mono text-zinc-500">
            RENDER 3D OFICIAL · DROP 04
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
              <span>{product.category}</span>
              <span className="text-zinc-600">·</span>
              <span>{product.gender}</span>
              {product.badge && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="text-yellow-400">{product.badge}</span>
                </>
              )}
            </div>

            <h3 className="text-2xl font-black font-syne text-white uppercase tracking-tight">
              {product.name}
            </h3>

            <div className="text-2xl font-black text-white mt-2 tabular-nums">
              {formattedPrice}
            </div>

            <p className="text-xs text-zinc-300 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications list */}
            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-zinc-400">Especificações:</span>
              <ul className="text-xs text-zinc-400 space-y-1">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-2 uppercase">
                <span>Selecione o Tamanho:</span>
                <span className="text-red-400">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-9 px-3.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons & perks */}
          <div className="mt-8 pt-6 border-t border-zinc-800 space-y-4">
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`w-full py-3.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>ADICIONADO À SACOLA!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADICIONAR À SACOLA</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-zinc-400">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-zinc-500" />
                <span>Envio Express</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-zinc-500" />
                <span>Original Garantido</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-zinc-500" />
                <span>Troca Grátis 30d</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
