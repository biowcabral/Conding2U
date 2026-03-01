'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

export default function AmplifyPain() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section className={`py-20 ${variant.sectionAlt}`}>
      <div ref={ref} className="reveal max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 ${variant.badgeBg} ${variant.badgeText}`}>
          The real cost of the problem
        </span>

        <h2 className={`text-3xl sm:text-4xl font-black mb-6 ${variant.textPrimary}`}>
          How much is this problem costing{' '}
          <span className={variant.accentText}>your business?</span>
        </h2>

        {/* Loss calculation — anchoring + loss aversion */}
        <div className={`p-8 rounded-3xl mb-10 shadow-xl ${variant.cardBg} ${variant.cardBorder}`}>
          <p className={`text-lg mb-6 ${variant.textSecondary}`}>
            Let’s be direct. Imagine you get{' '}
            <strong className={variant.textPrimary}>100 visitors per month</strong>{' '}
            on your current profile or website.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                scenario: 'Current page (2% conversion)',
                clients: '2 clients',
                revenue: '$2,000/month',
                color: 'red',
              },
              {
                scenario: 'With professional LP (8% conversion)',
                clients: '8 clients',
                revenue: '$8,000/month',
                color: 'accent',
              },
              {
                scenario: 'Monthly difference',
                clients: '+6 clients',
                revenue: '+$6,000/month',
                color: 'accent',
                highlight: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl transition-all ${
                  item.highlight
                    ? `${variant.sectionDark}`
                    : `${variant.sectionAlt}`
                }`}
                style={item.highlight ? { border: `2px solid ${variant.accentHex}` } : {}}
              >
                <p className={`text-xs font-bold uppercase mb-3 ${
                  item.color === 'red' ? 'text-red-500' : variant.accentText
                }`}>
                  {item.scenario}
                </p>
                <p className={`text-2xl font-black mb-1 ${
                  item.highlight
                    ? variant.accentText
                    : item.color === 'red'
                      ? 'text-red-400'
                      : variant.textPrimary
                }`}>
                  {item.clients}
                </p>
                <p className={`text-sm ${variant.textMuted}`}>{item.revenue}
                  <span className="text-xs block">(average ticket $1,000)</span>
                </p>
              </div>
            ))}
          </div>

          <div className={`p-5 rounded-2xl`} style={{ background: `${variant.accentHex}15`, border: `1px solid ${variant.accentHex}30` }}>
            <p className={`text-xl font-black ${variant.textPrimary}`}>
              In 1 year without a professional LP:{' '}
              <span className="text-red-500">$72,000 left on the table.</span>
            </p>
            <p className={`text-sm mt-2 ${variant.textMuted}`}>
              This calculation is conservative. Businesses with higher ticket prices multiply this number quickly.
            </p>
          </div>
        </div>

        <p className={`text-lg font-semibold italic ${variant.textSecondary}`}>
          &ldquo;The question isn’t whether you can afford a professional landing page.
          <br />The question is: how much will you keep losing without one?&rdquo;
        </p>
      </div>
    </section>
    );
}
