'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useVariant } from './VariantProvider';

const MICRO_GUARANTEES = [
  '🛡️ 30-day money-back guarantee',
  '🔒 Secure payment',
  '⚡ Delivered in 7 days',
  '📧 Email support',
];

export default function FinalCTA() {
  const { variant } = useVariant();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visitorIp, setVisitorIp] = useState('');
  const [visitorLocation, setVisitorLocation] = useState('');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setVisitorIp(data.ip ?? '');
        const parts = [data.city, data.region, data.country_name].filter(Boolean);
        setVisitorLocation(parts.join(', '));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('goal') as HTMLTextAreaElement).value,
      ip: visitorIp,
      location: visitorLocation,
    };

    try {
      const res = await fetch('https://coding2u.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-form"
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
          Ready to get started?
        </span>

        {/* No-pressure opener */}
        <p className="text-white/50 text-sm font-medium mb-6 tracking-wide">
          No rush. No pressure.{' '}
          <span className="text-white/70">We&apos;re here when you&apos;re ready.</span>
        </p>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
          Let&apos;s build{' '}
          <span className={variant.shimmerClass}>
            the page your business deserves
          </span>
        </h2>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          Tell us about your project and we&apos;ll get back to you within 24 hours with a{' '}
          <strong className="text-white">free, no-obligation quote.</strong>
        </p>

        {/* The math callout */}
        <div
          className="inline-block w-full max-w-md mx-auto px-7 py-5 rounded-2xl mb-8 text-left"
          style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-4">What you get</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Hand-coded customer acquisition page</span>
              <span className="text-white/80 font-bold">Next.js + Tailwind</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Responsive + SEO-ready</span>
              <span className="text-white/80 font-bold">All devices</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Delivered in</span>
              <span className="text-white/80 font-bold">7 business days</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
              <span className="text-white font-semibold">Investment</span>
              <span className="font-black text-base" style={{ color: variant.accentHex }}>Custom quote</span>
            </div>
          </div>
        </div>

        {/* Reframe */}
        <p className="text-sm text-white/50 mb-10 max-w-sm mx-auto leading-relaxed">
          No templates. No page builders.{' '}
          <span className="text-white/80 font-semibold">
            Just clean, professional code built for your business.
          </span>
        </p>

        {/* Contact Form */}
        {submitted ? (
          <div className="max-w-md mx-auto p-8 rounded-2xl mb-8" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-2xl font-black text-white mb-2">✅ Message sent!</p>
            <p className="text-white/60 text-sm">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4 mb-8">
            {/* Hidden fields — IP and location collected automatically */}
            <input type="hidden" name="ip" value={visitorIp} />
            <input type="hidden" name="location" value={visitorLocation} />

            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Your phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="goal" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Tell us about your project</label>
              <textarea
                id="goal"
                name="goal"
                rows={4}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none disabled:opacity-50"
                placeholder="Describe your project, goals, and any details..."
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black transition-all duration-300 hover:scale-105 shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass}`}
            >
              {loading ? 'Sending…' : 'Send message →'}
            </button>
          </form>
        )}

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
