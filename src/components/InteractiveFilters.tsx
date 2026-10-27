import React from 'react';
import { Layers, User, Users } from 'lucide-react';
import { GenderFilter } from '../types';

interface InteractiveFiltersProps {
  currentGender: GenderFilter;
  onSelectGender: (gender: GenderFilter) => void;
  productCount: number;
}

export const InteractiveFilters: React.FC<InteractiveFiltersProps> = ({
  currentGender,
  onSelectGender,
  productCount,
}) => {
  const filterOptions: { id: GenderFilter; label: string; icon: React.ReactNode }[] = [
    {
      id: 'ALL',
      label: 'TODOS',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'MASCULINO',
      label: 'MASCULINO',
      icon: <User className="w-3.5 h-3.5" />,
    },
    {
      id: 'FEMININO',
      label: 'FEMININO',
      icon: <User className="w-3.5 h-3.5" />,
    },
    {
      id: 'UNISSEX',
      label: 'UNISSEX',
      icon: <Users className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-zinc-800">
      {/* Clean Segmented Filter Control */}
      <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-lg w-full sm:w-auto overflow-x-auto">
        {filterOptions.map((opt) => {
          const isActive = currentGender === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectGender(opt.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors duration-150 cursor-pointer whitespace-nowrap flex-1 sm:flex-initial ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Showing count indicator (clean unboxed text as per frontend rules) */}
      <div className="text-xs font-medium text-zinc-400 flex items-center gap-2">
        <span>Exibindo</span>
        <span className="text-white font-bold tabular-nums">{productCount}</span>
        <span>peças exclusivas</span>
      </div>
    </div>
  );
};
