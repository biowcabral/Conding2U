'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const PILLARS = [
  {
    icon: '🧠',
    title: 'Conversion-Driven Architecture',
    desc: 'We engineer every page with proven UX patterns: strategic layout, clear CTAs, and trust signals to guide visitors toward action naturally and effectively.',
  },
  {
    icon: '⌨️',
    title: 'Clean Code & Performance',
    desc: 'Hand-crafted code, optimized assets, and modern frameworks. Our pages load fast, rank well, and work flawlessly on every device.',
  },
  {
    icon: '🎯',
    title: 'Pixel-Perfect Design',
    desc: 'Strategic visual hierarchy, responsive layouts, and polished UI components built with attention to every detail.',
  },
];

export default function Solution() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section className={`py-20 ${variant.pageBg}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Our approach
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            Introducing the{' '}
            <span className={variant.accentText}>C2U Development Method</span>
          </h2>
          <p className={`text-base max-w-xl mx-auto ${variant.textMuted}`}>
            It’s not about having a pretty page. It’s about having a page{' '}
            <strong className={variant.textPrimary}>engineered by developers</strong>{' '}
            to perform and convert.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${variant.cardBg} ${variant.cardBorder} shadow-md`}
            >
              {/* Number badge */}
              <span
                className="absolute -top-4 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                style={{ background: variant.accentHex, color: '#fff' }}
              >
                {i + 1}
              </span>
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className={`text-lg font-bold mb-3 ${variant.textPrimary}`}>
                {pillar.title}
              </h3>
              <p className={`text-sm leading-relaxed ${variant.textMuted}`}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Unique promise */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${variant.accentHex}15, ${variant.accentHex}05)`,
            border: `1px solid ${variant.accentHex}30`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: variant.accentHex }}
          />
          <p className={`relative text-xl sm:text-2xl font-black mb-4 ${variant.textPrimary}`}>
            The result?{' '}
            <span className={variant.accentText}>
              A sales machine working 24/7
            </span>
            {' '}while you focus on what matters.
          </p>
          <p className={`relative text-base ${variant.textSecondary}`}>
            Our clients report, on average, <strong>7x more conversions</strong> compared to the pages they had before.
          </p>
        </div>
      </div>
    </section>
  );
}
