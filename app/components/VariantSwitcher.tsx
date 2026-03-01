'use client';

import { useState } from 'react';
import { useVariant, variants } from './VariantProvider';
import type { VariantKey } from './types';

const COLORS: Record<VariantKey, string> = {
  purple: 'bg-purple-600',
  'dark-blue': 'bg-cyan-400',
  'black-gold': 'bg-yellow-500',
  'green-white': 'bg-green-600',
};

export default function VariantSwitcher() {
  const { variant, setVariant } = useVariant();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {open && (
        <div className="flex flex-col gap-2 mb-2 animate-fade-in">
          {(Object.keys(variants) as VariantKey[]).map((key) => (
            <button
              key={key}
              onClick={() => { setVariant(key); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg transition-all duration-200 ${
                variant.key === key
                  ? 'ring-2 ring-white scale-105'
                  : 'opacity-80 hover:opacity-100'
              } ${
                key === 'purple' ? 'bg-purple-600 text-white' :
                key === 'dark-blue' ? 'bg-gray-900 text-cyan-400 border border-cyan-400' :
                key === 'black-gold' ? 'bg-black text-yellow-400 border border-yellow-400' :
                'bg-green-600 text-white'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${COLORS[key]}`} />
              {variants[key].label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold shadow-xl hover:bg-white/20 transition-all duration-200"
        title="Switch theme"
      >
        <span className="text-base">🎨</span>
        <span className="hidden sm:inline">Theme</span>
      </button>
    </div>
  );
}
