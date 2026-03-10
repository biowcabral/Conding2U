'use client';

import { useState } from 'react';
import { useVariant } from './VariantProvider';
import { useReveal } from './useReveal';

const FAQS = [
  {
    q: 'How long does it take to complete my landing page?',
    a: 'Our standard delivery is 7 calendar days from briefing approval. For urgent projects, we offer express delivery in 72 hours for an additional fee.',
  },
  {

    q: 'How does the 30-day guarantee work?',
    a: 'Simple: if within 30 days of delivery you\u2019re not satisfied for any reason, just send us an email and we refund 100% of the amount. No questions, no hassle.',
  },
  {
    q: 'Do you handle the content or do I need to provide it?',
    a: 'We handle the full development. After the initial consultation, our team structures all the content based on your input and builds the page end-to-end. You review and approve.',
  },
  {
    q: 'After delivery, can I request changes to the page?',
    a: 'Absolutely. You have 30 days of included technical support after delivery \u2014 just send us an email and our team handles any adjustments for you. No technical knowledge required on your end.',
  },
  {
    q: 'Is the landing page optimized for search engines?',
    a: 'Yes. Our pages are built with semantic HTML, structured data, and optimized meta tags. We also configure Google Analytics so you can track performance from day one.',
  },
  {
    q: 'What\u2019s the difference between a landing page and a website?',
    a: 'A website has multiple pages and goals. A landing page has a single objective: convert. It\u2019s designed to eliminate distractions and guide the visitor to one action, whether that\u2019s buying, scheduling, or getting in touch.',
  },
  {
    q: 'How do I get started?',
    a: 'Simple: fill out the contact form on this page and our team will reach out to schedule a free consultation. Within 24 hours you\u2019ll have a personalized proposal in hand.',
  },
];

export default function FAQ() {
  const { variant } = useVariant();
  const ref = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`py-20 ${variant.sectionAlt}`}>
      <div ref={ref} className="reveal max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${variant.badgeBg} ${variant.badgeText}`}>
            Frequently asked questions
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${variant.textPrimary}`}>
            Everything you need to know{' '}
            <span className={variant.accentText}>before deciding</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${variant.cardBg} ${variant.cardBorder} shadow-sm`}
            >
              <button
                className={`w-full flex items-center justify-between p-6 text-left gap-4 cursor-pointer`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`text-sm font-bold ${variant.textPrimary}`}>
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-transform duration-300"
                  style={{
                    background: `${variant.accentHex}20`,
                    color: variant.accentHex,
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ↓
                </span>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className={`text-sm leading-relaxed ${variant.textSecondary}`}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
