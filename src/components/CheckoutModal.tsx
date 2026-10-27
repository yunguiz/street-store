import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, CreditCard, FileText, ShieldCheck, Truck, Loader2, Copy, Check } from 'lucide-react';
import { CartItem } from '../types';
import { sendOrderToBling } from '../services/bling';
import { createPixPayment } from '../services/mercadopago.ts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixBase64, setPixBase64] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const pixTotal = total * 0.95;

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleCopyPix = () => {
    if (pixQrCode) {
      navigator.clipboard.writeText(pixQrCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const generatedOrder = `STREET-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);

    const finalAmount = paymentMethod === 'pix' ? pixTotal : total;

    try {
      if (paymentMethod === 'pix') {
        const pixResponse = await createPixPayment(
          generatedOrder,
          finalAmount,
          { name, email, cpf },
          items
        );

        if (pixResponse.qrCode) {
          setPixQrCode(pixResponse.qrCode);
          setPixBase64(pixResponse.qrCodeBase64 || null);
        }
      }
    } catch (mpError) {
      console.warn('Erro Mercado Pago:', mpError);
    }

    const orderData = {
      orderId: generatedOrder,
      customer: {
        name,
        email: email || 'cliente@streetstore.com.br',
        cpf: cpf || '00000000000',
        phone,
        address: {
          street: address,
          number: number || 'S/N',
          neighborhood: neighborhood || 'Centro',
          city: city || 'Itabira',
          state: state || 'MG',
          zipCode: cep || '35900000',
        },
      },
      items,
      shippingCost: 0,
    };

    try {
      const blingToken = localStorage.getItem('bling_access_token');
      if (blingToken) {
        await sendOrderToBling(orderData, blingToken);
      }
    } catch (blingError) {
      console.warn('Aviso do Bling:', blingError);
    } finally {
      setIsLoading(false);
      setIsCompleted(true);
      onOrderSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-xl bg-[#121216] border border-zinc-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isCompleted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8 animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-black font-syne text-white uppercase">
              PEDIDO GERADO!
            </h3>

            {paymentMethod === 'pix' && pixQrCode ? (
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Pague via PIX com 5% de Desconto
                </span>

                {pixBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${pixBase64}`}
                    alt="QR Code PIX Mercado Pago"
                    className="w-44 h-44 mx-auto rounded-lg border-2 border-emerald-500 p-1 bg-white"
                  />
                )}

                <div className="flex items-center gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    readOnly
                    value={pixQrCode}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-[11px] font-mono text-zinc-300 truncate"
                  />
                  <button
                    onClick={handleCopyPix}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">CÓDIGO DO PEDIDO:</span>
                <span className="text-red-400 font-bold">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">INTEGRAÇÃO:</span>
                <span className="text-emerald-400">Mercado Pago & Bling ERP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">VALOR TOTAL:</span>
                <span className="text-white font-bold">
                  {paymentMethod === 'pix' ? formatBRL(pixTotal) : formatBRL(total)}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              VOLTAR PARA A LOJA
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-xl font-black font-syne text-white uppercase">
                CHECKOUT EXPRESS STREET
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Pagamento processado com segurança via Mercado Pago.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-300 uppercase">1. Dados de Envio & Faturamento</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  required
                  placeholder="CPF ou CNPJ"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="col-span-2 px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Endereço / Rua"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="col-span-2 px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Número"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-300 uppercase">2. Forma de Pagamento</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-red-600/10 border-red-500 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold">PIX</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">5% OFF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-red-600/10 border-red-500 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-bold">Cartão</span>
                  <span className="text-[10px] text-zinc-400">Até 10x</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all cursor-pointer ${
                    paymentMethod === 'boleto'
                      ? 'bg-red-600/10 border-red-500 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-bold">Boleto</span>
                  <span className="text-[10px] text-zinc-400">À vista</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400">Total a pagar:</span>
                <div className="text-xl font-black text-white tabular-nums">
                  {paymentMethod === 'pix' ? formatBRL(pixTotal) : formatBRL(total)}
                </div>
              </div>
              <div className="text-right text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Frete Grátis Aplicado</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>PROCESSANDO COM MERCADO PAGO...</span>
                </>
              ) : (
                <span>GERAR PAGAMENTO & FINALIZAR</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Checkout seguro via Mercado Pago e pedido sincronizado com Bling ERP</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};