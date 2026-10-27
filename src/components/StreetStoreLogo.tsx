import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'navbar' | 'hero' | 'footer';
}

export const StreetStoreLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const sizeClasses = 
    variant === 'hero' 
      ? 'w-72 sm:w-84 md:w-96 lg:w-[420px] h-auto' 
      : 'h-12 sm:h-14 md:h-16 w-auto';

  return (
    <>
      {/* Estilo CSS customizado para a flutuação lenta e elegante */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>

      <div className={`inline-flex items-center select-none group cursor-pointer ${className}`}>
        {/* Container com a flutuação lenta e zoom suave ao passar o mouse */}
        <div className="animate-float-slow transition-transform duration-300 group-hover:scale-105">
          <img
            src="/logo.png"
            alt="Street Store Logo"
            className={`${sizeClasses} object-contain block`}
          />
        </div>
      </div>
    </>
  );
};