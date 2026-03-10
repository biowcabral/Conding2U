'use client';

import { useVariant } from './VariantProvider';

const TICKER_ITEMS = [
  '✅ New project delivered for Dr. Leonardo',
  '⭐ Estudio Forma: page loads in 1.2s',
  '⚡ Hand-coded, no templates, no page builders',
  '✅ Manu Coaching: launched in 5 days',
  '💻 Built with Next.js, Tailwind & modern stack',
  '✅ Ativo Real Estate: mobile-first responsive',
  '⚡ Guaranteed delivery in 7 days',
  '🛡️ Unconditional 30-day guarantee',
];

export default function SocialTicker() {
  const { variant } = useVariant();

  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop

  return (
    <div
      className="py-3 overflow-hidden"
      style={{ background: variant.accentHex }}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 text-xs font-bold text-white px-8 shrink-0"
          >
            {item}
            <span className="mx-4 opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
