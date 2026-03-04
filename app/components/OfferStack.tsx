'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';
import { WHATSAPP_URL } from './types';

const OFFER_ITEMS = [
  { name: 'Full landing page (copy + design + code)', value: '$3,500' },
  { name: 'C2U Method copy (behavioral neuroscience)', value: '$1,800' },
  { name: 'Mobile-first responsive design', value: '$800' },
  { name: 'WhatsApp / CRM / Email integration', value: '$400' },
  { name: 'Basic SEO + optimized meta tags', value: '$300' },
  { name: 'Meta + Google Pixel configured', value: '$250' },
  { name: 'SSL + 1-year hosting', value: '$480' },
  { name: '30-day technical support', value: '$600' },
  { name: 'Video editing tutorial', value: '$200' },
  { name: '🎁 BONUS: Paid Traffic Guide for your LP', value: '$497' },
];

const TOTAL_VALUE = '$8,827';
const PRICE = '$597 CAD';
const INSTALLMENTS = '12x $54 CAD';

export default function OfferStack() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section id="pricing" className={`py-20 ${variant.sectionAlt}`}>
      <div ref={ref} className="reveal max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Investment
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            Everything you get{' '}
            <span className={variant.accentText}>in a single offer</span>
          </h2>
          <p className={`text-base max-w-md mx-auto ${variant.textMuted}`}>
            See the real value of each deliverable. Then compare it to what you invest.
          </p>
        </div>

        {/* Offer stack card */}
        <div
          className={`rounded-3xl overflow-hidden shadow-2xl mb-8 ${variant.cardBg}`}
          style={{ border: `2px solid ${variant.accentHex}40` }}
        >
          {/* Header */}
          <div
            className="px-7 py-5 flex items-center justify-between"
            style={{ background: `${variant.accentHex}20` }}
          >
            <h3 className={`text-sm font-black uppercase tracking-wide ${variant.textPrimary}`}>
              What’s included
            </h3>
            <span className={`text-sm font-bold ${variant.textMuted}`}>
              Market value
            </span>
          </div>

          {/* Items */}
          <div className="divide-y" style={{ borderColor: `${variant.accentHex}15` }}>
            {OFFER_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-7 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-base" style={{ color: variant.accentHex }}>✓</span>
                  <span className={`text-sm ${variant.textSecondary}`}>{item.name}</span>
                </div>
                <span className={`text-sm font-bold shrink-0 line-through ${variant.textMuted}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-7 py-5 space-y-4" style={{ background: `${variant.accentHex}08` }}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${variant.textMuted}`}>Total market value:</span>
              <span className={`text-base font-black line-through text-red-500`}>{TOTAL_VALUE}</span>
            </div>
            <div
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{ background: `${variant.accentHex}15`, border: `2px solid ${variant.accentHex}` }}
            >
              <div>
                <p className={`text-xs font-bold uppercase ${variant.textMuted}`}>Your investment today</p>
                <p className={`text-3xl font-black mt-1 ${variant.accentText}`}>{PRICE}</p>
                <p className={`text-xs ${variant.textMuted}`}>or {INSTALLMENTS} on credit card</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-green-500">You save:</p>
                <p className="text-lg font-black text-green-500">$8,230</p>
                <p className="text-xs text-green-600">93% off</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-5 rounded-full text-base font-black transition-all duration-300 hover:scale-105 shadow-2xl ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass}`}
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Start my project — $597 CAD →
          </a>
          <p className={`text-xs mt-3 ${variant.textMuted}`}>
            🔒 100% secure payment · 30-day guarantee · Delivered in 7 days
          </p>
        </div>
      </div>
    </section>
  );
}
