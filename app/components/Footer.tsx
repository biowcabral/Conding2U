'use client';

import Image from 'next/image';
import { useVariant } from './VariantProvider';
import { WHATSAPP_URL } from './types';

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
              alt="Conding2u"
              width={140}
              height={40}
              className="h-10 w-auto object-contain mb-1"
            />
            <p className={`text-xs mt-1 ${variant.textMuted}`}>
              Landing pages that actually sell.
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

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        <div className={`mt-8 pt-6 border-t ${variant.divider} text-center`}>
          <p className={`text-xs ${variant.textMuted}`}>
            © {year} Conding2u. All rights reserved.
            {' '} · Made with ♥ for businesses that want to grow.
          </p>
        </div>
      </div>
    </footer>
  );
}
