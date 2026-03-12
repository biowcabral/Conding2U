'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'Chiropractor',
    photo: 'SM',
    stars: 5,
    text: 'I was hesitant to invest in a customer acquisition page, but the Coding2U team delivered a beautiful, fast page and within 2 weeks my schedule was fully booked. The quality of the code is impressive.',
    highlight: 'fully booked in 2 weeks',
    color: '#f59e0b',
  },
  {
    name: 'James Chen',
    role: 'E-commerce Owner',
    photo: 'JC',
    stars: 5,
    text: 'Our old site was slow and looked dated. Coding2U rebuilt it from scratch. Lightning fast, works perfectly on mobile, and our conversion rate jumped from 0.8% to 6.2%. Real software developers make a real difference.',
    highlight: 'conversion rate jumped to 6.2%',
    color: '#ef4444',
  },
  {
    name: 'Emily Thompson',
    role: 'Life Coach',
    photo: 'ET',
    stars: 5,
    text: 'The team really understood my brand and built a page that reflects exactly who I am. It loads instantly, looks amazing on any device, and people reach out saying the page gave them confidence to hire me.',
    highlight: 'page generates trust and leads',
    color: '#16A34A',
  },
  {
    name: 'David Patel',
    role: 'Real Estate Agent',
    photo: 'DP',
    stars: 5,
    text: 'We needed a professional page fast. Coding2U delivered in 6 days. Clean code, responsive design, SEO-ready. The quality is miles ahead of what any template could give us.',
    highlight: 'delivered in 6 days',
    color: '#D4AF37',
  },
];

export default function Testimonials() {
  const { variant } = useVariant();
  const ref = useReveal();

  return (
    <section id="testimonials" className={`py-20 ${variant.pageBg}`}>
      <div ref={ref} className="reveal max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Social proof
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            What our clients say{' '}
            <span className={variant.accentText}>after getting their page</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto ${variant.textMuted}`}>
            Not what we say about ourselves. It’s what those who <strong>already used it</strong> and <strong>got results</strong> say.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`relative p-7 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${variant.cardBg} ${variant.cardBorder} shadow-md`}
            >
              {/* Quote icon */}
              <span className="absolute top-5 right-6 text-5xl opacity-10 font-black" style={{ color: t.color }}>&rdquo;</span>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className={`text-sm leading-relaxed mb-5 italic ${variant.textSecondary}`}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Highlight result */}
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}
              >
                📈 {t.highlight}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                  style={{ background: t.color }}
                >
                  {t.photo}
                </div>
                <div>
                  <p className={`text-sm font-bold ${variant.textPrimary}`}>{t.name}</p>
                  <p className={`text-xs ${variant.textMuted}`}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div
          className="mt-12 p-6 rounded-2xl flex flex-wrap items-center justify-center gap-8"
          style={{ background: `${variant.accentHex}08`, border: `1px solid ${variant.accentHex}20` }}
        >
          {[
            { value: '312+', label: 'pages engineered' },
            { value: '4.9⭐', label: 'average rating' },
            { value: '97%', label: 'satisfied clients' },
            { value: '$2.1M+', label: 'generated for clients' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className={`text-2xl font-black ${variant.accentText}`}>{item.value}</p>
              <p className={`text-xs ${variant.textMuted}`}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
