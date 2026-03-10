'use client';

import Image from 'next/image';
import { useVariant } from './VariantProvider';

export default function Footer() {
  const { variant } = useVariant();
  const year = new Date().getFullYear();

  return (
    <footer className={`py-12 ${variant.pageBg} border-t ${variant.divider}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Coding2U"
              width={140}
              height={40}
              className="h-10 w-auto object-contain mb-1"
            />
            <p className={`text-xs mt-1 ${variant.textMuted}`}>
              Custom-built landing pages by real developers.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            {[
              { label: 'How it works', href: '#how-it-works', external: false },
              { label: 'Portfolio', href: '/portfolio-site/', external: true },
              { label: 'Pricing', href: '#pricing', external: false },
            ].map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={`transition-colors duration-200 ${variant.textMuted} hover:${variant.accentText}`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <a
            href="#contact-form"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText}`}
          >
            Contact Us
          </a>
        </div>

        <div className={`mt-8 pt-6 border-t ${variant.divider} text-center`}>
          <p className={`text-xs ${variant.textMuted}`}>
            © {year} Coding2U. All rights reserved.
            {' '} · Hand-coded with ♥ in Canada.
          </p>
        </div>
      </div>
    </footer>
  );
}
