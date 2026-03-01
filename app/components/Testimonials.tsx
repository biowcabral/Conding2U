'use client';

import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const TESTIMONIALS = [
  {
    name: 'Carla Mendonça',
    role: 'Owner — Bem Estar Clinic',
    photo: 'CM',
    stars: 5,
    text: 'I was afraid to invest in a landing page because I thought it wouldn’t work. Result: within 2 weeks of launching the new page, my schedule was fully booked for the next 3 months. The ROI was insane.',
    highlight: 'fully booked in 2 weeks',
    color: '#f59e0b',
  },
  {
    name: 'Rafael Torres',
    role: 'CEO — TechParts Online',
    photo: 'RT',
    stars: 5,
    text: 'Our conversion rate was 0.8%. After Conding2u, it jumped to 6.2%. That translated into over $84,000 in additional revenue in 3 months without increasing our ad spend at all.',
    highlight: '+$84,000 in additional revenue in 3 months',
    color: '#ef4444',
  },
  {
    name: 'Amanda Silva',
    role: 'Coach — Manu Coaching',
    photo: 'AS',
    stars: 5,
    text: 'I never imagined words could make such a difference. The team understood my essence, wrote copy that sounds exactly like me, and leads arrive on WhatsApp already wanting to buy.',
    highlight: 'leads arrive ready to buy',
    color: '#16A34A',
  },
  {
    name: 'Marcos Vinícius',
    role: 'Director — Ativo Real Estate',
    photo: 'MV',
    stars: 5,
    text: 'I was paying $48 per lead with my old site. After the Conding2u landing page, the cost dropped to $11 and the leads are far more qualified. It simply changed the game.',
    highlight: 'cost-per-lead dropped 77%',
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
            { value: '312+', label: 'pages created' },
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
