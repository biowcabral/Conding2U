'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';
import { WHATSAPP_URL } from './types';

export default function Guarantee() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section className={`py-20 ${variant.pageBg}`}>
      <div ref={ref} className="reveal max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="relative overflow-hidden p-10 rounded-3xl shadow-2xl"
          style={{ background: `${variant.accentHex}08`, border: `2px solid ${variant.accentHex}30` }}
        >
          {/* Decoration */}
          <div
            className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-10 blur-2xl"
            style={{ background: variant.accentHex }}
          />

          <div className="text-7xl mb-6">🛡️</div>

          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${variant.badgeBg} ${variant.badgeText}`}>
            Zero Risk for You
          </span>

          <h2 className={`text-2xl sm:text-3xl font-black mb-5 ${variant.textPrimary}`}>
            Unconditional{' '}
            <span className={variant.accentText}>30-Day Guarantee</span>
          </h2>

          <p className={`text-base leading-relaxed mb-8 ${variant.textSecondary}`}>
            If within 30 days you’re not 100% satisfied with your landing page — whether it’s the design, the copy, or any other reason — just let us know.
            <br /><br />
            <strong className={variant.textPrimary}>We refund every cent you invested.</strong> No bureaucracy, no questions, no hassle.
            <br /><br />
            This guarantee exists because we have{' '}
            <strong className={variant.textPrimary}>total confidence</strong> in our work. You have absolutely nothing to lose.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '✅', text: 'No red tape' },
              { icon: '✅', text: 'Full refund' },
              { icon: '✅', text: 'No questions asked' },
            ].map((item, i) => (
              <div
                key={i}
                className="py-3 px-4 rounded-2xl text-sm font-semibold"
                style={{ background: `${variant.accentHex}10` }}
              >
                <span className="mr-2">{item.icon}</span>
                <span className={variant.textPrimary}>{item.text}</span>
              </div>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-black transition-all duration-300 hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText}`}
          >
            I want my LP with guarantee
          </a>
        </div>
      </div>
    </section>
  );
}
