'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';
import { WHATSAPP_URL } from './types';

const STEPS = [
  {
    step: '01',
    icon: '💬',
    title: 'Free Diagnosis',
    duration: 'Day 1',
    desc: 'You talk with our team on WhatsApp. We learn about your business, your ideal customer, your competitors, and your goals. No cost, no commitment.',
    detail: 'Market analysis + your ideal customer’s pains and desires mapped out',
  },
  {
    step: '02',
    icon: '✍️',
    title: 'Strategic Creation',
    duration: 'Days 2–6',
    desc: 'Our team writes the copy, designs and builds your landing page using the C2U Method. You follow progress and approve.',
    detail: 'Copy + Design + Development + Basic SEO + Integrations',
  },
  {
    step: '03',
    icon: '🚀',
    title: 'Delivery & Support',
    duration: 'Day 7',
    desc: 'Your page goes live. You get full access, a usage walkthrough, and 30 days of support for any adjustments. Ready to sell.',
    detail: '30-day support + user guide + delivery call',
  },
];

export default function HowItWorks() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section id="how-it-works" className={`py-20 ${variant.sectionAlt}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Simple process
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            From zero to your{' '}
            <span className={variant.accentText}>sales machine</span>
            <br />in just 3 steps
          </h2>
          <p className={`text-base max-w-lg mx-auto ${variant.textMuted}`}>
            No complexity, no hours lost explaining things. We take care of everything.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-0.5 -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, ${variant.accentHex}60, transparent)` }}
          />

          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 p-7 rounded-3xl transition-all duration-300 hover:shadow-xl ${variant.cardBg} ${variant.cardBorder} shadow-md`}
              >
                {/* Step number */}
                <div
                  className="shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-sm"
                  style={{ background: `${variant.accentHex}20`, border: `2px solid ${variant.accentHex}40` }}
                >
                  <span className={variant.accentText}>{step.step}</span>
                  <span className="text-2xl mt-0.5">{step.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className={`text-lg font-black ${variant.textPrimary}`}>
                      {step.title}
                    </h3>
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: `${variant.accentHex}20`, color: variant.accentHex }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-3 ${variant.textSecondary}`}>
                    {step.desc}
                  </p>
                  <p className={`text-xs font-medium ${variant.textMuted}`}>
                    ✓ {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA after steps */}
        <div className="text-center mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-black transition-all duration-300 hover:scale-105 shadow-xl ${variant.btnPrimary} ${variant.btnPrimaryText}`}
          >
            Start my free diagnosis →
          </a>
          <p className={`text-xs mt-3 ${variant.textMuted}`}>
            No diagnosis fee. No commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
