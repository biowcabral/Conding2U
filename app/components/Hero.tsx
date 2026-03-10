'use client';

import { useVariant } from './VariantProvider';

const STATS = [
          { value: '150+', label: 'projects delivered' },
  { value: '< 2s', label: 'avg. load time' },
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
            Your competitors already have a professional page. Do you?
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up">
          Your business deserves
          <br />
          <span className={variant.shimmerClass}>
            a page built by developers
          </span>
          <br />
          <span className="text-white">not a DIY template</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-4 animate-fade-in-up delay-200"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          We build{' '}
          <strong className="text-white">fast, responsive, hand-coded</strong>{' '}
          landing pages that look professional and perform.{' '}
          <strong className="text-white">delivered in 7 days</strong>.
        </p>

        <p
          className={`text-base italic mb-10 animate-fade-in-up delay-300 ${variant.heroAccent}`}
        >
          &ldquo;Clean code, pixel-perfect design, and a page that actually works. Built by real developers.&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-400">
          <a
            href="#contact-form"
            className={`group flex items-center gap-3 px-8 py-4 rounded-full text-base font-black transition-all duration-300 hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass} shadow-2xl`}
          >
            Get a free quote
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
