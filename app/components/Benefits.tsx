'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const BENEFITS = [
  { icon: '📱', title: 'Mobile-First Responsive', desc: '73% of traffic comes from mobile. Your page loads perfectly on any device.' },
  { icon: '⚡', title: 'Speed Optimized', desc: 'Every second of delay cuts conversion by 7%. Our pages load in under 2 seconds.' },
  { icon: '🧠', title: 'Conversion-Focused Structure', desc: 'Every section is strategically structured to guide the visitor through your page. Built for results, not just looks.' },
  { icon: '💬', title: 'Contact Form Integration', desc: 'Built-in contact forms and integrations so leads reach you directly.' },
  { icon: '🔍', title: 'On-page SEO Included', desc: 'Semantic HTML, optimized meta tags, and structured data. Built for search engines from the ground up.' },
  { icon: '📊', title: 'Analytics Integration', desc: 'Google Analytics installed and configured so you can track your page performance.' },
  { icon: '🔒', title: 'SSL + 1-Year Hosting', desc: 'Security certificate and hosting included. Zero technical headaches for you.' },
  { icon: '🛠️', title: '30-Day Support', desc: 'After delivery you have 30 days to request adjustments at no extra cost. You’re never alone.' },
  { icon: '📹', title: 'Onboarding Walkthrough', desc: 'Video call walking you through everything delivered: how the page works, what\'s connected, and how to request changes.' },
];

export default function Benefits() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section className={`py-20 ${variant.pageBg}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            What you get
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            Everything your page needs to{' '}
            <span className={variant.accentText}>truly convert</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto ${variant.textMuted}`}>
            Professional development, clean code, and everything configured. Ready to go live.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className={`group flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${variant.cardBg} ${variant.cardBorder}`}
            >
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${variant.accentHex}15` }}
              >
                {benefit.icon}
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-1 ${variant.textPrimary}`}>
                  {benefit.title}
                </h3>
                <p className={`text-xs leading-relaxed ${variant.textMuted}`}>
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
