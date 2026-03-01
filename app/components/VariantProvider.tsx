'use client';

import React, { createContext, useContext, useState } from 'react';
import type { VariantKey, VariantConfig } from './types';

export const variants: Record<VariantKey, VariantConfig> = {
  purple: {
    key: 'purple',
    label: 'Purple & White',
    pageBg: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    accentText: 'text-purple-600',
    accentHex: '#7C3AED',
    btnPrimary: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800',
    btnPrimaryText: 'text-white',
    btnSecondary: 'border-2 border-purple-600 hover:bg-purple-50',
    btnSecondaryText: 'text-purple-600',
    sectionAlt: 'bg-purple-50',
    sectionDark: 'bg-purple-900',
    cardBg: 'bg-white',
    cardBorder: 'border border-purple-100 hover:border-purple-300',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    headerBg: 'bg-white/90 backdrop-blur-md',
    headerBorder: 'border-b border-purple-100',
    heroBg: 'bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900',
    heroAccent: 'text-purple-200',
    divider: 'border-purple-100',
    shimmerClass: 'shimmer-text',
    glowClass: 'animate-pulse-glow-purple',
    checkColor: 'text-purple-600',
    statText: 'text-purple-600',
  },
  'dark-blue': {
    key: 'dark-blue',
    label: 'Dark Blue & Neon',
    pageBg: 'bg-gray-950',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-500',
    accentText: 'text-cyan-400',
    accentHex: '#00F5FF',
    btnPrimary: 'bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500',
    btnPrimaryText: 'text-gray-950 font-bold',
    btnSecondary: 'border-2 border-cyan-400 hover:bg-cyan-400/10',
    btnSecondaryText: 'text-cyan-400',
    sectionAlt: 'bg-gray-900',
    sectionDark: 'bg-gray-900',
    cardBg: 'bg-gray-900',
    cardBorder: 'border border-gray-800 hover:border-cyan-500',
    badgeBg: 'bg-cyan-400/10',
    badgeText: 'text-cyan-400',
    headerBg: 'bg-gray-950/90 backdrop-blur-md',
    headerBorder: 'border-b border-gray-800',
    heroBg: 'bg-linear-to-br from-gray-950 via-blue-950 to-gray-950',
    heroAccent: 'text-cyan-300',
    divider: 'border-gray-800',
    shimmerClass: 'shimmer-text-cyan',
    glowClass: 'animate-pulse-glow-cyan',
    checkColor: 'text-cyan-400',
    statText: 'text-cyan-400',
  },
  'black-gold': {
    key: 'black-gold',
    label: 'Black & Gold',
    pageBg: 'bg-zinc-950',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-500',
    accentText: 'text-yellow-400',
    accentHex: '#D4AF37',
    btnPrimary: 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600',
    btnPrimaryText: 'text-black font-bold',
    btnSecondary: 'border-2 border-yellow-500 hover:bg-yellow-500/10',
    btnSecondaryText: 'text-yellow-400',
    sectionAlt: 'bg-black',
    sectionDark: 'bg-black',
    cardBg: 'bg-zinc-900',
    cardBorder: 'border border-zinc-800 hover:border-yellow-600',
    badgeBg: 'bg-yellow-500/10',
    badgeText: 'text-yellow-400',
    headerBg: 'bg-zinc-950/90 backdrop-blur-md',
    headerBorder: 'border-b border-zinc-800',
    heroBg: 'bg-linear-to-br from-black via-zinc-900 to-black',
    heroAccent: 'text-yellow-300',
    divider: 'border-zinc-800',
    shimmerClass: 'shimmer-text-gold',
    glowClass: 'animate-pulse-glow-gold',
    checkColor: 'text-yellow-400',
    statText: 'text-yellow-400',
  },
  'green-white': {
    key: 'green-white',
    label: 'Green & White',
    pageBg: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    accentText: 'text-green-600',
    accentHex: '#16A34A',
    btnPrimary: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
    btnPrimaryText: 'text-white',
    btnSecondary: 'border-2 border-green-600 hover:bg-green-50',
    btnSecondaryText: 'text-green-600',
    sectionAlt: 'bg-green-50',
    sectionDark: 'bg-green-900',
    cardBg: 'bg-white',
    cardBorder: 'border border-green-100 hover:border-green-400',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    headerBg: 'bg-white/90 backdrop-blur-md',
    headerBorder: 'border-b border-green-100',
    heroBg: 'bg-linear-to-br from-green-900 via-green-800 to-emerald-900',
    heroAccent: 'text-green-200',
    divider: 'border-green-100',
    shimmerClass: 'shimmer-text-green',
    glowClass: 'animate-pulse-glow-green',
    checkColor: 'text-green-600',
    statText: 'text-green-600',
  },
  'orange-navy': {
    key: 'orange-navy',
    label: 'Orange & Navy',
    pageBg: 'bg-[#0B1628]',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-500',
    accentText: 'text-orange-500',
    accentHex: '#F97316',
    btnPrimary: 'bg-orange-500 hover:bg-orange-400 active:bg-orange-600',
    btnPrimaryText: 'text-white font-bold',
    btnSecondary: 'border-2 border-orange-500 hover:bg-orange-500/10',
    btnSecondaryText: 'text-orange-400',
    sectionAlt: 'bg-[#0E1C30]',
    sectionDark: 'bg-black',
    cardBg: 'bg-[#131F33]',
    cardBorder: 'border border-[#1E2D45] hover:border-orange-500',
    badgeBg: 'bg-orange-500/15',
    badgeText: 'text-orange-400',
    headerBg: 'bg-[#0B1628]/90 backdrop-blur-md',
    headerBorder: 'border-b border-[#1E2D45]',
    heroBg: 'bg-linear-to-br from-[#0B1628] via-[#0E1C30] to-black',
    heroAccent: 'text-orange-300',
    divider: 'border-[#1E2D45]',
    shimmerClass: 'shimmer-text-orange',
    glowClass: 'animate-pulse-glow-orange',
    checkColor: 'text-orange-500',
    statText: 'text-orange-400',
  },
};

interface VariantContextType {
  variant: VariantConfig;
  setVariant: (key: VariantKey) => void;
}

const VariantContext = createContext<VariantContextType>({
  variant: variants['orange-navy'],
  setVariant: () => {},
});

export function VariantProvider({ children }: { children: React.ReactNode }) {
  const [variantKey, setVariantKey] = useState<VariantKey>(() => {
    if (typeof window === 'undefined') return 'orange-navy';
    const saved = localStorage.getItem('c2u-variant') as VariantKey | null;
    return saved && variants[saved] ? saved : 'orange-navy';
  });

  const setVariant = (key: VariantKey) => {
    setVariantKey(key);
    localStorage.setItem('c2u-variant', key);
  };

  return (
    <VariantContext.Provider value={{ variant: variants[variantKey], setVariant }}>
      {children}
    </VariantContext.Provider>
  );
}

export const useVariant = () => useContext(VariantContext);
