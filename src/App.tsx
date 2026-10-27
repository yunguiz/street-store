import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { TickerMarquee } from './components/TickerMarquee';
import { CategoryQuickGrid } from './components/CategoryQuickGrid';
import { PromoDualBanners } from './components/PromoDualBanners';
import { ExclusiveCollection } from './components/ExclusiveCollection';
import { InstagramCommunity } from './components/InstagramCommunity';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Footer } from './components/Footer';
import { EXCLUSIVE_PRODUCTS } from './data/products';
import { Lookbook } from './components/Lookbook';
import { Product, CartItem, GenderFilter, ProductCategory } from './types';
import { Check } from 'lucide-react';
import { fetchNuvemshopProducts } from './services/nuvemshop';

export default function App() {
  const [products, setProducts] = useState<Product[]>(EXCLUSIVE_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: EXCLUSIVE_PRODUCTS[0],
      selectedSize: 'G',
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    EXCLUSIVE_PRODUCTS[1].id,
  ]);
  const [activeGender, setActiveGender] = useState<GenderFilter>('ALL');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'ALL'>('ALL');
  
  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Integração automática com a Nuvemshop ao carregar a página
  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const liveProducts = await fetchNuvemshopProducts();
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
      } catch (error) {
        console.log('Mantendo catálogo local (Modo Offline / Fallback Nuvemshop)');
      }
    }

    loadLiveProducts();
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart actions
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });

    showToast(`Adicionado: ${product.name} (Tam: ${size})`);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removido dos favoritos: ${product.name}`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Salvo nos favoritos: ${product.name}`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCollection = () => {
    const section = document.getElementById('exclusive-collection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (category: ProductCategory | 'ALL') => {
    setActiveCategory(category);
    scrollToCollection();
  };

  // Funções atualizadas para usar as categorias válidas ('ROUPAS' e 'CALÇADOS')
  const handleShopHoodies = () => {
    setActiveCategory('ROUPAS');
    scrollToCollection();
  };

  const handleShopSneakers = () => {
    setActiveCategory('CALÇADOS');
    scrollToCollection();
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 1. TOP NAVIGATION BAR */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />

      <main className="flex-1">
        {/* 2. CINEMATIC HERO SECTION */}
        <HeroSection onExploreClick={scrollToCollection} />

        {/* 3. BRAZILIAN E-COMMERCE TRUST BAR */}
        <TrustBar />

        {/* 4. INFINITE TICKER MARQUEE */}
        <TickerMarquee />

        {/* 5. QUICK CATEGORY EXPLORATION GRID */}
        <CategoryQuickGrid
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 6. DUAL CAMPAIGN BANNERS */}
        <PromoDualBanners
          onShopHoodies={handleShopHoodies}
          onShopSneakers={handleShopSneakers}
        />

        {/* 7. EXCLUSIVE COLLECTION */}
        <div id="exclusive-collection">
          <ExclusiveCollection
            products={products}
            currentGender={activeGender}
            onSelectGender={(gender) => setActiveGender(gender)}
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            onAddToCart={handleAddToCart}
            onQuickView={(product) => setQuickViewProduct(product)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>

        {/* 8. EDITORIAL MANIFESTO SECTION */}
        <section className="py-20 bg-[#0C0C10] border-t border-zinc-800/80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-8 sm:p-12 lg:p-16">
              
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  <span>MANIFESTO STREET STORE</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne uppercase tracking-tight text-white leading-tight">
                  NÃO SEGUIMOS TENDÊNCIAS. <br />
                  <span className="text-zinc-400">DEFINIMOS O PADRÃO.</span>
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Cada peça da Street Store é projetada no cruzamento entre a cultura underground e a alfaiataria contemporânea. Malhas pesadas com toque macio, tingimentos ecológicos e silhuetas arquitetônicas feitas para durar e marcar presença.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToCollection}
                    className="px-6 py-3.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    CONHECER COLEÇÃO
                  </button>

                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded border border-zinc-700 transition-colors cursor-pointer"
                  >
                    ENTRAR NO CLUB VIP
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8.5. LOOKBOOK INTERATIVO */}
        <Lookbook 
          onQuickView={(product) => setQuickViewProduct(product)} 
          onAddToCart={handleAddToCart}
        />

        {/* 9. COMMUNITY LOOKBOOK & INSTAGRAM FEED */}
        <InstagramCommunity />
      </main>

      {/* 10. COMPLETE FOOTER */}
      <Footer />

      {/* 11. SLIDE-OVER CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 12. WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* 13. INSTANT SEARCH MODAL */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => {
          setQuickViewProduct(product);
          setIsSearchOpen(false);
        }}
      />

      {/* 14. USER ACCOUNT / AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* 15. CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={() => {
          setCart([]);
          showToast('Pedido realizado com sucesso!');
        }}
      />

      {/* 16. QUICK VIEW PRODUCT DETAIL MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 17. FLOATING WHATSAPP BUTTON */}
      <WhatsAppFloatingButton />

      {/* 18. FLOATING TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-700/80 text-white text-xs font-bold rounded-lg shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="truncate max-w-xs">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-red-400 hover:text-red-300 underline text-[11px] cursor-pointer"
          >
            Ver Sacola
          </button>
        </div>
      )}
    </div>
  );
}