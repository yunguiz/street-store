import React, { useState, useRef } from 'react';
import { ShoppingBag, Eye, Check, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCard3DProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Fallback de imagem de segurança caso o produto venha sem imagem da API
  const fallbackImage = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop';
  const productImage = product.image && product.image.trim() !== '' ? product.image : fallbackImage;

  // 3D tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates from center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    
    // Smooth gentle tilt
    const rotateY = mouseX * 10;
    const rotateX = -mouseY * 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const formattedPrice = formatBRL(product.price);
  const pixPrice = formatBRL(product.price * 0.95);
  const installmentPrice = formatBRL(product.price / 10);

  // Discount percentage
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="perspective-container relative group h-full flex flex-col"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-2px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className="preserve-3d flex-1 flex flex-col bg-[#111114] hover:bg-[#141418] border border-zinc-800/90 hover:border-zinc-700 rounded-xl overflow-hidden transition-colors duration-200 shadow-md"
      >
        {/* CARD IMAGE CONTAINER */}
        <div className="relative w-full aspect-square bg-[#0C0C0F] overflow-hidden flex items-center justify-center p-6">
          {/* Top Left Badges: Drop tag & Discount % */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
            {discountPct && (
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded">
                -{discountPct}% OFF
              </span>
            )}
            {product.badge && (
              <span className="px-2 py-0.5 bg-black/85 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase tracking-wider rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* Top Right Action Icons: Wishlist & Quick View */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
            <button
              onClick={() => onToggleWishlist && onToggleWishlist(product)}
              className={`p-2 rounded-lg border backdrop-blur-md transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-black'
              }`}
              title="Favoritar"
              aria-label="Adicionar aos favoritos"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => onQuickView(product)}
              className="p-2 bg-black/60 hover:bg-black text-zinc-400 hover:text-white rounded-lg border border-zinc-800 opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer"
              title="Visualização Rápida"
              aria-label={`Visualizar detalhes de ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3D PRODUCT RENDER IMAGE WITH GENTLE ROTATION */}
          <div
            style={{
              transform: isHovered
                ? `translateZ(30px) scale(1.05) rotate(${rotate.y * 0.3}deg)`
                : 'translateZ(0px) scale(1) rotate(0deg)',
              transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
            }}
            className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
          >
            <img
              src={productImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain filter drop-shadow-md"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>

          <div className="absolute bottom-2.5 right-2.5 z-10 text-[9px] font-mono tracking-wider text-zinc-500 bg-black/70 px-1.5 py-0.5 rounded border border-zinc-800">
            3D VIEW
          </div>
        </div>

        {/* CARD DETAILS & CONTROLS */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
          <div>
            {/* Category / Gender unboxed metadata */}
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-1">
              <span>{product.category}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">{product.gender}</span>
            </div>

            {/* Product Name */}
            <h3 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-red-400 transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
              {product.subtitle}
            </p>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400 mb-1.5 uppercase">
              <span>Tamanho:</span>
              <span className="text-white font-bold">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`h-6.5 px-2 text-[11px] font-bold rounded border transition-all duration-150 cursor-pointer ${
                    selectedSize === size
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Installments (classic Brazilian streetwear e-commerce) */}
          <div className="pt-3 border-t border-zinc-800/80">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-white tabular-nums">
                {formattedPrice}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through tabular-nums">
                  {formatBRL(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
              <span>{pixPrice}</span> <span className="text-[10px] text-zinc-400 font-normal">no PIX (5% off)</span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5">
              ou até <strong className="text-zinc-300">10x de {installmentPrice}</strong> sem juros
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white active:scale-98 shadow-sm'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>ADICIONADO!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADICIONAR À SACOLA</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};