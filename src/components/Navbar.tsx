import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { StreetStoreLogo } from './StreetStoreLogo';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenWishlist?: () => void;
  activeCategory: ProductCategory | 'ALL';
  onSelectCategory: (cat: ProductCategory | 'ALL') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount = 0,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  onOpenWishlist,
  activeCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lista de itens do menu incluindo MOLETONS explicitamente
const navItems: { label: string; value: ProductCategory | 'ALL' }[] = [
    { label: 'NOVIDADES', value: 'NOVIDADES' },
    { label: 'ROUPAS', value: 'ROUPAS' },
    { label: 'CALÇADOS', value: 'CALÇADOS' as ProductCategory },
    { label: 'ACESSÓRIOS', value: 'ACESSÓRIOS' },
    { label: 'MARCAS', value: 'MARCAS' },
  ];

  const handleNavClick = (cat: ProductCategory | 'ALL') => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    
    // Scroll suave até a coleção
    const target = document.getElementById('exclusive-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/95 backdrop-blur-md border-b border-zinc-800 transition-all duration-200">
      {/* Clean top announcement strip */}
      <div className="bg-[#111114] border-b border-zinc-800 text-zinc-300 text-[11px] font-semibold tracking-wider py-1.5 px-4 text-center flex items-center justify-center gap-2 uppercase">
        <span>FRETE GRÁTIS ACIMA DE R$ 399 · EM ATÉ 10X SEM JUROS · 5% OFF NO PIX</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* ZONE 1: BRAND LOGO */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 rounded p-1"
          >
            <StreetStoreLogo variant="navbar" className="h-9 sm:h-11 w-auto" />
          </a>
        </div>

        {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest text-zinc-300">
          {navItems.map((item) => {
            const isActive = activeCategory === item.value;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.value)}
                className={`relative py-1 whitespace-nowrap uppercase transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ZONE 3: ACTIONS (Integrated search trigger, Wishlist, Account, Cart) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Desktop Search trigger button resembling a search input */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Buscar produtos"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] pr-4">Buscar moletom, tênis...</span>
            <kbd className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors cursor-pointer"
            aria-label="Buscar produtos"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors cursor-pointer"
            aria-label={`Favoritos (${wishlistCount})`}
            title="Favoritos"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
            )}
          </button>

          {/* Account Button */}
          <button
            onClick={onOpenAuth}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors cursor-pointer"
            aria-label="Minha conta"
            title="Minha Conta"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            aria-label={`Carrinho de compras com ${cartCount} itens`}
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden sm:inline text-xs font-bold tracking-wider">SACOLA</span>
            
            {/* Clean cart badge */}
            <span
              className={`inline-flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[10px] font-bold rounded ${
                cartCount > 0
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.value)}
              className={`w-full text-left px-3 py-2 text-xs font-bold tracking-wider rounded transition-colors ${
                activeCategory === item.value
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};