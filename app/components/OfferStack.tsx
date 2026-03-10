'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const OFFER_ITEMS = [
  { name: 'Full landing page (design + code)', value: '$3,500' },
  { name: 'Strategic UX/UI design', value: '$1,800' },
  { name: 'Mobile-first responsive development', value: '$800' },
  { name: 'Contact form + integrations', value: '$400' },
  { name: 'On-page SEO + structured data', value: '$300' },
  { name: 'Analytics integration', value: '$250' },
  { name: 'SSL + 1-year hosting', value: '$480' },
  { name: '30-day technical support', value: '$600' },
  { name: 'Onboarding call + delivery walkthrough', value: '$200' },
];

const TOTAL_VALUE = '$8,330';
const PRICE = '$997 CAD';
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
                <p className="text-lg font-black text-green-500">$7,333</p>
                <p className="text-xs text-green-600">88% off</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact-form"
            className={`inline-flex items-center gap-3 px-8 py-5 rounded-full text-base font-black transition-all duration-300 hover:scale-105 shadow-2xl ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass}`}
          >
            Start my project - $997 CAD →
          </a>
          <p className={`text-xs mt-3 ${variant.textMuted}`}>
            🔒 100% secure payment · 30-day guarantee · Delivered in 7 days
          </p>
        </div>
      </div>
    </section>
  );
}
