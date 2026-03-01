'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const BENEFITS = [
  { icon: '📱', title: 'Mobile-First Responsive', desc: '73% of traffic comes from mobile. Your page loads perfectly on any device.' },
  { icon: '⚡', title: 'Speed Optimized', desc: 'Every second of delay cuts conversion by 7%. Our pages load in under 2 seconds.' },
  { icon: '🧠', title: 'High-Conversion Copy', desc: 'Every word is strategically chosen to guide the visitor toward the click. No guesswork.' },
  { icon: '💬', title: 'WhatsApp / CRM Integration', desc: 'Direct button to your WhatsApp or email funnel. Leads arrive ready to convert.' },
  { icon: '🔍', title: 'Basic SEO Included', desc: 'Optimized meta tags, titles, and structure that Google loves. Show up where your clients search.' },
  { icon: '📊', title: 'Pixel & Analytics', desc: 'Google Analytics and Meta Pixel installed and configured. Real data for informed decisions.' },
  { icon: '🔒', title: 'SSL + 1-Year Hosting', desc: 'Security certificate and hosting included. Zero technical headaches for you.' },
  { icon: '🛠️', title: '30-Day Support', desc: 'After delivery you have 30 days to request adjustments at no extra cost. You’re never alone.' },
  { icon: '📹', title: 'Editing Tutorial', desc: 'Video walkthrough showing how you can update text and images yourself in the future.' },
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
            We don’t just deliver code. We deliver a complete conversion strategy.
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

        {/* Bonus highlight */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: `${variant.accentHex}10`, border: `1px dashed ${variant.accentHex}50` }}
        >
          <span className="text-2xl">🎁</span>
          <p className={`mt-2 font-black text-lg ${variant.textPrimary}`}>
            EXCLUSIVE BONUS: Paid Traffic Guide for Your LP
          </p>
          <p className={`text-sm mt-1 ${variant.textMuted}`}>
            Included for free — learn how to drive qualified visitors to your new page from day one.
          </p>
        </div>
      </div>
    </section>
  );
}
