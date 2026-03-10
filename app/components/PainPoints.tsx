'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const PAINS = [
  {
    icon: '😤',
    title: 'A template site that looks like everyone else',
    desc: 'You used a drag-and-drop builder and ended up with something generic. Visitors can’t tell you apart from the competition.',
  },
  {
    icon: '💸',
    title: 'Slow page that drives visitors away',
    desc: 'Your site takes too long to load, especially on mobile. Every extra second costs you visitors who simply leave.',
  },
  {
    icon: '😰',
    title: 'Broken on mobile devices',
    desc: 'Over 70% of your visitors are on a phone, but your page wasn’t built mobile-first. Buttons overlap, text is unreadable.',
  },
  {
    icon: '🤯',
    title: 'No idea how to get online properly',
    desc: 'You have a great product or service but no professional online presence. Building a page from scratch feels overwhelming.',
  },
  {
    icon: '⏳',
    title: 'Wasting hours with DIY tools',
    desc: 'You’ve spent weekends fighting with Wix or WordPress, and still don’t have something you’re proud of.',
  },
  {
    icon: '📉',
    title: 'No trust from potential clients',
    desc: 'Without a professional page, leads doubt your credibility. A polished web presence is the first impression you make.',
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
            Sound familiar?
          </h2>
          <p className={`text-base max-w-xl mx-auto ${variant.textMuted}`}>
            If any of these hit close to home, it’s time to invest in a properly built page.
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

        {/* Transition bridge */}
        <div className={`mt-14 p-8 rounded-3xl text-center ${variant.sectionAlt}`}>
          <p className={`text-xl sm:text-2xl font-black mb-3 ${variant.textPrimary}`}>
            ✅ All of these are solved with a professionally built page.
          </p>
          <p className={`text-base max-w-lg mx-auto ${variant.textSecondary}`}>
            You don’t need to learn to code. You need developers who build it right.
          </p>
        </div>
      </div>
    </section>
  );
}
