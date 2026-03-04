'use client';

import { useVariant } from './VariantProvider';
import { WHATSAPP_URL } from './types';

const MICRO_GUARANTEES = [
  '🛡️ 30-day money-back guarantee',
  '🔒 Secure payment',
  '⚡ Delivered in 7 days',
  '💬 WhatsApp support',
];

export default function FinalCTA() {
  const { variant } = useVariant();

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${variant.accentHex}15 0%, transparent 50%, ${variant.accentHex}10 100%)`,
      }}
    >
      {/* heavy BG */}
      <div className={`absolute inset-0 ${variant.heroBg} opacity-95 -z-10`} />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full opacity-15 blur-3xl -z-10"
        style={{ background: variant.accentHex }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* Section label */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-8"
          style={{ background: `${variant.accentHex}20`, color: variant.accentHex }}
        >
          One question before you go
        </span>

        {/* No-pressure opener */}
        <p className="text-white/50 text-sm font-medium mb-6 tracking-wide">
          No rush. No deadline. No pressure of any kind.{' '}
          <span className="text-white/70">We&apos;ll be here whenever you&apos;re ready.</span>
        </p>

        {/* The pivoting headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
          But ask yourself honestly —
          <br />
          <span className={variant.shimmerClass}>
            how much are you leaving on the table
          </span>{' '}
          right now?
        </h2>

        {/* Cost of inaction */}
        <p className="text-base sm:text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          Every day your current page fails to convert is a day your competitor wins the client you deserved.
          Not because your offer is worse —{' '}
          <strong className="text-white">because their page speaks louder.</strong>
        </p>

        {/* The math callout — anchoring + loss aversion */}
        <div
          className="inline-block w-full max-w-md mx-auto px-7 py-5 rounded-2xl mb-8 text-left"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-4">The silent cost of waiting</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Visitors lost to poor conversion</span>
              <span className="text-red-400 font-bold">~94% bounce</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Revenue gap per month</span>
              <span className="text-red-400 font-bold">~ $6,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Revenue gap per year</span>
              <span className="text-red-400 font-bold">~ $72,000</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
              <span className="text-white font-semibold">Investment to fix it today</span>
              <span className="font-black text-base" style={{ color: variant.accentHex }}>$597 CAD</span>
            </div>
          </div>
        </div>

        {/* Reframe — temporal discounting */}
        <p className="text-sm text-white/50 mb-10 max-w-sm mx-auto leading-relaxed">
          The question was never whether $597 CAD is worth it.{' '}
          <span className="text-white/80 font-semibold">
            The question is how long you can afford to keep waiting.
          </span>
        </p>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 px-10 py-5 rounded-full text-lg font-black transition-all duration-300 hover:scale-105 shadow-2xl ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass}`}
          >
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Let&apos;s talk — when you&apos;re ready
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Micro-commitments */}
        <div className="flex flex-wrap justify-center gap-4 text-white/60 text-xs">
          {MICRO_GUARANTEES.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
