export type VariantKey = 'purple' | 'dark-blue' | 'black-gold' | 'green-white' | 'orange-navy';

export interface VariantConfig {
  key: VariantKey;
  label: string;
  // Page bg
  pageBg: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // Accent / highlight
  accentText: string;
  accentHex: string;
  // Buttons
  btnPrimary: string;
  btnPrimaryText: string;
  btnSecondary: string;
  btnSecondaryText: string;
  // Sections
  sectionAlt: string;
  sectionDark: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  // Badge
  badgeBg: string;
  badgeText: string;
  // Header
  headerBg: string;
  headerBorder: string;
  // Gradient hero bg
  heroBg: string;
  heroAccent: string;
  // Divider
  divider: string;
  // Shimmer class
  shimmerClass: string;
  // Glow class
  glowClass: string;
  // Check icon color
  checkColor: string;
  // Number stat
  statText: string;
}

export const WHATSAPP_NUMBER = '5511999999999';
export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi! I saw the Coding2U page and I\'d like to know more about getting my landing page built.'
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
