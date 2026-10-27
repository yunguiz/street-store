import React from 'react';
import { Truck, CreditCard, RotateCcw, ShieldCheck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    {
      icon: <Truck className="w-5 h-5 text-red-500" />,
      title: 'FRETE GRÁTIS BRASIL',
      desc: 'Em compras acima de R$ 399 com Sedex e Jadlog',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-yellow-400" />,
      title: 'ATÉ 10X SEM JUROS',
      desc: 'No cartão ou 5% de desconto imediato no PIX',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-zinc-300" />,
      title: 'PRIMEIRA TROCA GRÁTIS',
      desc: 'Até 30 dias para trocar sem burocracia',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: '100% ORIGINAL & SEGURO',
      desc: 'Produtos autênticos com emissão de nota fiscal',
    },
  ];

  return (
    <section className="bg-[#0A0A0D] border-y border-zinc-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
