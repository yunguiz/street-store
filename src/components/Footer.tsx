import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Instagram, Youtube, Twitter, ShieldCheck } from 'lucide-react';
import { StreetStoreLogo } from './StreetStoreLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050507] border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Top Newsletter & Hype Club section */}
      <div className="border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold">
              STREET CLUB // VIP ACCESS
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-syne text-white uppercase mt-1 tracking-tight">
              RECEBA OS DROPS ANTES DE TODO MUNDO
            </h3>
            <p className="text-zinc-400 mt-1 max-w-lg text-xs">
              Cadastre-se na nossa lista secreta e tenha 15 minutos de antecedência para garantir peças de tiragem limitada.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 rounded-xl text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>INSCRIÇÃO CONFIRMADA! VOCÊ ESTÁ NA LISTA VIP.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>ENTRAR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="md:col-span-2 space-y-4">
            <StreetStoreLogo variant="navbar" className="h-10 w-auto" />
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              A <strong className="text-white">Street Store</strong> é a autoridade máxima em streetwear de ponta no Brasil. Criamos e distribuímos peças autênticas que conectam design arquitetônico, música urbana e atitude das ruas.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-red-600 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Instagram da Street Store"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-red-600 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="YouTube da Street Store"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 hover:bg-red-600 hover:text-white border border-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Twitter da Street Store"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: Coleções */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-syne">
              COLEÇÕES
            </h4>
            <ul className="space-y-2">
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Drop 04 Exclusivo</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Moletom Heavyweight</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Linha Sneaker Vortex</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Camisetas Boxy Fit</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Calças Cargo Ripstop</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Acessórios & Bags</a></li>
            </ul>
          </div>

          {/* Col 2: Ajuda & Suporte */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-syne">
              AJUDA & SUPORTE
            </h4>
            <ul className="space-y-2">
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Rastreamento de Pedidos</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Guia de Tamanhos (Size Chart)</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Política de Trocas e Devoluções</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Prazos e Formas de Envio</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Fale Conosco / WhatsApp</a></li>
            </ul>
          </div>

          {/* Col 3: Institucional */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-syne">
              INSTITUCIONAL
            </h4>
            <ul className="space-y-2">
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Sobre a Street Store</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Manifesto da Marca</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Lojas Físicas</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Termos de Serviço</a></li>
              <li><a href="#exclusive-collection" className="hover:text-white transition-colors">Privacidade & Cookies</a></li>
            </ul>
          </div>

        </div>

        {/* Payment & Security Badges */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-semibold">
            <span>PAGAMENTO:</span>
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-300">PIX (5% OFF)</span>
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-300">CARTÃO ATÉ 10X</span>
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-300">BOLETO BANCÁRIO</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Compra Segura SSL 256-Bit</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-zinc-500 text-[11px]">
          © {new Date().getFullYear()} Street Store Inc. Todos os direitos reservados. Autoridade no Streetwear.
        </div>
      </div>
    </footer>
  );
};
