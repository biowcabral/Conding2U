'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const PAINS = [
  {
    icon: '😤',
    title: 'A generic site no one trusts',
    desc: 'You have a pretty website, but no persuasive copy. People arrive, don’t understand your value proposition, and leave within 30 seconds.',
  },
  {
    icon: '💸',
    title: 'Spending on ads with no results',
    desc: 'You invest money in paid traffic, but the landing page doesn’t convert. Every visitor that bounces is money thrown away.',
  },
  {
    icon: '😰',
    title: 'Losing clients to competitors',
    desc: 'While you’re using an Instagram link or a makeshift page, your competitor has a page that sells while they sleep.',
  },
  {
    icon: '🤯',
    title: 'No idea why nobody buys',
    desc: 'You have a great product, but somewhere along the way trust breaks. And you never figure out what went wrong.',
  },
  {
    icon: '⏳',
    title: 'Wasting hours explaining everything',
    desc: 'You repeat the same pitch on WhatsApp for hours. A landing page does that work for you, 24 hours a day.',
  },
  {
    icon: '📉',
    title: 'Cold leads that never close',
    desc: 'Without a page that qualifies and warms leads, you get contacts with no purchase intent — wasting your time and energy.',
  },
];

export default function PainPoints() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section className={`py-20 ${variant.pageBg}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Does this sound familiar?
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            Do you recognize any of these situations?
          </h2>
          <p className={`text-base max-w-xl mx-auto ${variant.textMuted}`}>
            If you identified with even one of these problems, you’re leaving money on the table right now.
          </p>
        </div>

        {/* Pain grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAINS.map((pain, i) => (
            <div
              key={i}
              className={`group p-6 rounded-2xl transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-xl ${variant.cardBg} ${variant.cardBorder} shadow-sm`}
            >
              <div className="text-3xl mb-3">{pain.icon}</div>
              <h3 className={`text-base font-bold mb-2 ${variant.textPrimary}`}>
                {pain.title}
              </h3>
              <p className={`text-sm leading-relaxed ${variant.textMuted}`}>
                {pain.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Transition bridge — dopamine hook */}
        <div className={`mt-14 p-8 rounded-3xl text-center ${variant.sectionAlt}`}>
          <p className={`text-xl sm:text-2xl font-black mb-3 ${variant.textPrimary}`}>
            ❌ These problems have a solution.
          </p>
          <p className={`text-base max-w-lg mx-auto ${variant.textSecondary}`}>
            But while you don’t act, every day that passes is one more day losing clients to whoever already solved this.
          </p>
        </div>
      </div>
    </section>
  );
}
