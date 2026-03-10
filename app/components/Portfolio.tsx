'use client';

import { useState } from 'react';
import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

type Category = 'lp';

const PROJECTS = [
  {
    demo: '/portfolio-site/demos/clinica-estetica.html',
    category: 'lp' as Category,
    tag: 'Landing Page',
    name: 'Premium Aesthetic Clinic',
    result: '+340% in bookings in the first month',
    detail: 'Conversion jumped from 1.4% to 9.2% with persuasive copy + redesign',
    color: '#e879f9',
    stats: [{ label: 'Conversion', value: '9.2%' }, { label: 'Delivery', value: '6 days' }, { label: '3-mo ROI', value: '710%' }],
  },
  {
    demo: '/portfolio-site/demos/infoproduto.html',
    category: 'lp' as Category,
    tag: 'Landing Page',
    name: 'Digital Info-Product',
    result: '$280k in sales at launch',
    detail: 'Page built in 7 days. Sold out first cohort in 18 days with zero paid ads',
    color: '#fb923c',
    stats: [{ label: 'Revenue', value: '$280k' }, { label: 'Days sold out', value: '18' }, { label: '3-mo ROI', value: '1200%' }],
  },
  {
    demo: '/portfolio-site/demos/consultorio-medico.html',
    category: 'lp' as Category,
    tag: 'Landing Page',
    name: 'Medical Practice',
    result: 'Fully booked 48h after launch',
    detail: 'Zero paid traffic. Google SEO LP ranked on page 1 in 3 weeks',
    color: '#a78bfa',
    stats: [{ label: 'Time to full', value: '48h' }, { label: 'Traffic source', value: 'SEO' }, { label: '3-mo ROI', value: '820%' }],
  },
];

export default function Portfolio() {
  const { variant } = useVariant();
  const ref = useReveal();
  const [active, setActive] = useState<number | null>(null);

  const visible = PROJECTS;

  return (
    <section id="portfolio" className={`py-20 ${variant.sectionAlt}`}>
      <div ref={ref} className="reveal max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Our work
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            Projects that are{' '}
            <span className={variant.accentText}>already converting</span>
          </h2>
          <p className={`text-base max-w-lg mx-auto ${variant.textMuted}`}>
            Real demos, real results. Across different niches, for businesses of all sizes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, i) => (
            <div
              key={project.demo}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${variant.cardBg} ${variant.cardBorder} shadow-md`}
              onClick={() => setActive(active === i ? null : i)}
            >
              {/* Real iframe preview */}
              <div className="relative w-full overflow-hidden rounded-t-2xl bg-gray-950"
                style={{ height: '180px' }}>
                {/* Browser chrome bar */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  <div className="flex-1 h-4 rounded bg-white/10 text-white/40 text-[9px] flex items-center px-2 ml-1 truncate">
                    Coding2U.com
                  </div>
                </div>
                {/* Scaled iframe: 400% wide/tall scaled to 25% = fills container exactly */}
                <iframe
                  src={project.demo}
                  loading="lazy"
                  tabIndex={-1}
                  aria-hidden="true"
                  scrolling="no"
                  style={{
                    position: 'absolute',
                    top: '28px',
                    left: 0,
                    width: '400%',
                    height: '400%',
                    transform: 'scale(0.25)',
                    transformOrigin: 'top left',
                    border: 'none',
                    pointerEvents: 'none',
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm z-20">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="px-4 py-2 rounded-full text-xs font-black text-white border border-white/50 hover:bg-white hover:text-black transition-colors"
                  >
                    Open Live Preview ↗
                  </a>
                </div>
                {/* Category tag */}
                <span
                  className="absolute bottom-2 right-2 z-10 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: `${project.color}cc` }}
                >
                  {project.tag}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className={`text-sm font-black mb-0.5 ${variant.textPrimary}`}>
                  {project.name}
                </h3>
                <p
                  className="text-base font-black mt-2 mb-1"
                  style={{ color: project.color }}
                >
                  {project.result}
                </p>
                <p className={`text-xs ${variant.textMuted}`}>{project.detail}</p>

                {/* Stats: expand on click */}
                {active === i && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {project.stats.map((stat, j) => (
                      <div
                        key={j}
                        className="text-center p-2 rounded-xl"
                        style={{ background: `${project.color}12`, border: `1px solid ${project.color}35` }}
                      >
                        <p className="text-sm font-black" style={{ color: project.color }}>
                          {stat.value}
                        </p>
                        <p className={`text-xs ${variant.textMuted}`}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className={`text-xs mt-3 flex items-center gap-1 ${variant.accentText}`}>
                  {active === i ? '▲ Less detail' : '▼ View metrics'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full portfolio CTA */}
        <div className="text-center mt-12">
          <a
            href="/portfolio-site/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${variant.cardBorder} ${variant.textPrimary} hover:${variant.accentText}`}
          >
            View full portfolio site ↗
          </a>
          <p className={`text-xs mt-4 ${variant.textMuted}`}>
            * Demonstrative projects. Real results vary by niche, traffic and marketing strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
