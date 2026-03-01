'use client';

import { useVariant } from './VariantProvider';

const TICKER_ITEMS = [
  '✅ Dr. Leonardo just signed up',
  '⭐ Estudio Forma tripled their conversions',
  '🔥 Only 3 spots left this month',
  '✅ Manu Coaching sold out in 18 days',
  '📈 TechParts generated +$84K in 90 days',
  '✅ Ativo Imóveis cut cost-per-lead by 77%',
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
