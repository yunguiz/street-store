import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2, Crown } from 'lucide-react';
import { StreetStoreLogo } from './StreetStoreLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="w-full max-w-md bg-[#121215] border border-zinc-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <StreetStoreLogo variant="navbar" className="h-10 w-auto mb-2" />
          <h3 className="text-xl font-black font-syne text-white uppercase mt-2">
            {isLogin ? 'ENTRAR NA SUA CONTA' : 'FAZER PARTE DO CLUB STREET'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span>Acesso antecipado a Drops e promoções secretas</span>
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Bem-vindo(a) à Street Store!</h4>
            <p className="text-xs text-zinc-400">Login autenticado com sucesso.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              {isLogin ? 'ACESSAR MINHA CONTA' : 'CRIAR CONTA STREET'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {isLogin
                  ? 'Não tem conta? Cadastre-se com 1 clique'
                  : 'Já possui cadastro? Clique para entrar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
