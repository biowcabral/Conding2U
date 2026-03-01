'use client';

import { useVariant } from './VariantProvider';
import { WHATSAPP_URL } from './types';

const STATS = [
          { value: '312+', label: 'pages delivered' },
  { value: '7x', label: 'avg. conversion boost' },
  { value: '7 days', label: 'delivery time' },
  { value: '97%', label: 'satisfied clients' },
];

export default function Hero() {
  const { variant } = useVariant();

  return (
    <section className={`relative min-h-screen flex flex-col justify-center ${variant.heroBg} overflow-hidden pt-20`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: variant.accentHex }}
        />
        <div
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: variant.accentHex }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${variant.accentHex} 1px, transparent 1px), linear-gradient(90deg, ${variant.accentHex} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Pattern interrupt banner */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8 animate-fade-in"
          style={{ background: `${variant.accentHex}20`, border: `1px solid ${variant.accentHex}40` }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: variant.accentHex }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: variant.accentHex }} />
          </span>
          <span style={{ color: variant.accentHex }}>
            ATTENTION: While you’re reading this, your competitors are closing new clients online
          </span>
        </div>

        {/* Main headline — loss aversion + pattern interrupt */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up">
          Your business is
          <br />
          <span className={variant.shimmerClass}>
            losing sales every day
          </span>
          <br />
          <span className="text-white">because of a weak page</span>
        </h1>

        {/* Subheadline — desire + relief */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-4 animate-fade-in-up delay-200"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          We build landing pages that use{' '}
          <strong className="text-white">behavioral neuroscience</strong>{' '}
          to turn visitors into paying customers —{' '}
          <strong className="text-white">in just 7 days</strong>.
        </p>

        <p
          className={`text-base italic mb-10 animate-fade-in-up delay-300 ${variant.heroAccent}`}
        >
          &ldquo;No more guessing. Your competitors already have a page that sells — yours will too.&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-400">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 px-8 py-4 rounded-full text-base font-black transition-all duration-300 hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass} shadow-2xl`}
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            I want my page now
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>

          <a
            href="#portfolio"
            className="flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
          >
            View portfolio
            <span>↓</span>
          </a>
        </div>

        {/* Social proof stats */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up delay-600 px-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-4 px-2 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span
                className="text-2xl sm:text-3xl font-black mb-1"
                style={{ color: variant.accentHex }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-white/70 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap animate-fade-in-up delay-700">
          {['🔒 100% Secure', '⚡ Delivered in 7 days', '💰 30-day guarantee'].map((item) => (
            <span key={item} className="text-xs text-white/60 flex items-center gap-1">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-float">
          <span className="text-xs tracking-widest uppercase">scroll down</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
