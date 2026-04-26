import { ANIMATION_CONFIG } from '../config'
import type { Dot } from '../types'

export function buildDotGrid(width: number, height: number) {
   const { rings, dotsBase, minCenterRadius, outerMargin } = ANIMATION_CONFIG
   const dots: Dot[] = []
   const cx = width / 2
   const cy = height / 2
   const maxRadiusX = width / 2 - outerMargin
   const maxRadiusY = height / 2 - outerMargin
   const minRadius = Math.min(width, height) * 0.08 + minCenterRadius

   for (let ring = 0; ring < rings; ring++) {
      const ringRatio = ring / Math.max(1, rings - 1)
      const ringRadiusX = minRadius + ringRatio * (maxRadiusX - minRadius)
      const ringRadiusY = minRadius + ringRatio * (maxRadiusY - minRadius)
      const count = dotsBase + ring * 6

      for (let i = 0; i < count; i++) {
         const angle =
            (Math.PI * 2 * i) / Math.max(1, count) + Math.random() * 0.12 - 0.06
         const baseX = cx + ringRadiusX * Math.cos(angle)
         const baseY = cy + ringRadiusY * Math.sin(angle)
         const angleProgress =
            ((angle % (Math.PI * 2)) + Math.PI * 2) / (Math.PI * 2)
         const colorProgress =
            (ringRatio * 0.55 + angleProgress * 0.45 + Math.random() * 0.04) %
            1

         dots.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            ringRatio,
            colorProgress,
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: 0.52 + Math.random() * 0.88,
         })
      }
   }

   const extraEdge = 24
   for (let i = 0; i < extraEdge; i++) {
      const edgeX =
         i % 4 === 0
            ? outerMargin
            : i % 4 === 1
              ? width - outerMargin
              : Math.random() * width
      const edgeY =
         i % 4 === 2
            ? outerMargin
            : i % 4 === 3
              ? height - outerMargin
              : Math.random() * height
      const edgeProgress = (Math.random() * 0.15 + 0.85) % 1

      dots.push({
         baseX: edgeX + (Math.random() - 0.5) * 26,
         baseY: edgeY + (Math.random() - 0.5) * 26,
         x: edgeX,
         y: edgeY,
         ringRatio: 0,
         colorProgress: edgeProgress,
         phase: Math.random() * Math.PI * 2,
         phaseSpeed: 0.3 + Math.random() * 0.4,
      })
   }

   return dots
}
