import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      message.trim() || 'Olá! Gostaria de tirar uma dúvida sobre os produtos da Street Store.'
    );
    window.open(`https://wa.me/5511999999999?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Popover chat preview */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#121216] border border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                SS
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Suporte Street Store</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online agora para tirar dúvidas</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 text-xs text-zinc-300 space-y-2 bg-[#0E0E11]">
            <div className="p-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 leading-relaxed">
              👋 Salve! Precisa de ajuda com tabela de medidas, prazos do Sedex ou confirmação de estoque do Drop 04?
            </div>
          </div>

          <form onSubmit={handleSend} className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              placeholder="Digite sua dúvida..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#111114] hover:bg-zinc-900 text-white border border-zinc-700 hover:border-zinc-500 rounded-full shadow-xl transition-all cursor-pointer"
        aria-label="Atendimento via WhatsApp"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white">
          <MessageCircle className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
          Dúvidas? Fale Conosco
        </span>
      </button>
    </div>
  );
};
