import type { RgbColor } from '../types'

export function interpolateColor(colors: readonly RgbColor[], progress: number) {
   const t = Math.max(0, Math.min(1, progress))
   const index = Math.floor(t * (colors.length - 1))
   const nextIndex = Math.min(colors.length - 1, index + 1)
   const local = (t - index / (colors.length - 1)) * (colors.length - 1)
   const from = colors[index]
   const to = colors[nextIndex]

   return {
      r: Math.round(from.r + (to.r - from.r) * local),
      g: Math.round(from.g + (to.g - from.g) * local),
      b: Math.round(from.b + (to.b - from.b) * local),
   }
}
