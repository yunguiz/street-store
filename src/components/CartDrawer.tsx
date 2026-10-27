import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate calculations
  const rawSubtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountRate = appliedCoupon === 'STREET10' ? 0.1 : 0;
  const discountAmount = rawSubtotal * discountRate;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 399;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'STREET10') {
      setAppliedCoupon('STREET10');
      setCouponError('');
    } else {
      setCouponError('Cupom inválido. Tente STREET10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F12] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          
          {/* HEADER */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-black font-syne uppercase tracking-wider">
                SACOLA DE COMPRAS ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FREE SHIPPING BAR */}
          <div className="px-6 py-3 bg-[#141418] border-b border-zinc-800 text-xs">
            {freeShippingLeft === 0 ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Check className="w-4 h-4" />
                <span>PARABÉNS! VOCÊ GANHOU FRETE GRÁTIS!</span>
              </div>
            ) : (
              <div className="text-zinc-300">
                Faltam <span className="font-bold text-white tabular-nums">{formatBRL(freeShippingLeft)}</span> para <span className="text-yellow-400 font-bold">FRETE GRÁTIS</span>
              </div>
            )}
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-red-600 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-zinc-200">Sua sacola está vazia</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Adicione as peças exclusivas do Drop 04 para garantir seu estilo streetwear.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Explorar Drop
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 items-center justify-between"
                >
                  <div className="w-16 h-16 bg-[#09090B] rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-zinc-800">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                      <span>Tam: <strong className="text-zinc-200">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span className="text-white font-bold tabular-nums">
                        {formatBRL(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-zinc-700 rounded-md bg-zinc-950">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-l cursor-pointer"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-r cursor-pointer"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Remover"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs font-black text-white tabular-nums text-right">
                    {formatBRL(item.product.price * item.quantity)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & CHECKOUT SUMMARY */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-[#0C0C0F] space-y-4">
              
              {/* Promo code */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Cupom (ex: STREET10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg uppercase tracking-wider text-white transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>

              {appliedCoupon && (
                <div className="text-[11px] text-emerald-400 flex items-center justify-between font-bold">
                  <span>Cupom {appliedCoupon} aplicado!</span>
                  <span>-10%</span>
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-red-400 font-bold">{couponError}</div>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold tabular-nums">{formatBRL(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Desconto Cupom</span>
                    <span className="tabular-nums">- {formatBRL(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-emerald-400 font-semibold">
                    {freeShippingLeft === 0 ? 'GRÁTIS' : 'Calculado no checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>TOTAL</span>
                  <span className="text-red-500 tabular-nums">{formatBRL(subtotal)}</span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>FINALIZAR PEDIDO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Checkout 100% Criptografado & Seguro</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
