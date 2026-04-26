import type { RgbColor } from './types'

export const TYPING_CONFIG = {
   typingSpeed: 111,
   displayDuration: 5000,
   fadeDuration: 555,
} as const

export const TYPING_TEXTS = ['Hello!', 'hi...', 'Welcome', 'Greetings'] as const

export const ONLINE_COUNT = 37232382

export const NAV_LINKS = [
   'Product',
   'Use Cases',
   'Pricing',
   'Blog',
   'Resources',
] as const

export const FOOTER_LINKS = [
   'About',
   'Contact',
   'Privacy',
   'Terms',
   'Support',
] as const

export const ANIMATION_CONFIG = {
   rings: 17,
   dotsBase: 20,
   minCenterRadius: 96,
   outerMargin: 124,
   dotRadius: 1.2,
   hoverColor: { r: 170, g: 170, b: 170 } satisfies RgbColor,
   mouseInfluenceRadius: 320,
   maxDisplacement: 110,
   waveSpeed: 0.14,
   rippleStrength: 0.82,
   neighborRadius: 11,
   warpStrength: 0.12,
   cursorDriftSmooth: 0.12,
   cursorDriftPower: 8.9,
   hoverRadius: 222,
   lineConnectRadius: 96,
   lineConnectOpacity: 0.14,
   lineConnectChance: 0.08,
   lineConnectDensity: 0.12,
   colors: [
      { r: 47, g: 122, b: 255 },
      { r: 216, g: 220, b: 232 },
      { r: 191, g: 33, b: 70 },
      { r: 214, g: 131, b: 29 },
      { r: 86, g: 139, b: 77 },
   ] satisfies RgbColor[],
   activeOpacity: 1,
   edgeOpacity: 0.05,
   idleFloatAmplitude: 3,
} as const
