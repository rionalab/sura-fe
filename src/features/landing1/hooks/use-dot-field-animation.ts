import { useEffect, useRef } from 'react'

import { ANIMATION_CONFIG } from '../config'
import { buildDotGrid } from '../lib/build-dot-grid'
import { interpolateColor } from '../lib/color'
import type { Dot } from '../types'

export function useDotFieldAnimation() {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const mouseRef = useRef({ x: -9999, y: -9999 })
   const cursorDriftRef = useRef({ x: -9999, y: -9999 })
   const dotsRef = useRef<Dot[]>([])
   const rafRef = useRef<number>(0)
   const timeRef = useRef(0)

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const resize = () => {
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight
         dotsRef.current = buildDotGrid(canvas.width, canvas.height)
      }

      const onMouseMove = (event: MouseEvent) => {
         mouseRef.current = { x: event.clientX, y: event.clientY }
      }

      const draw = () => {
         const { width, height } = canvas
         const {
            dotRadius,
            mouseInfluenceRadius,
            maxDisplacement,
            waveSpeed,
            rippleStrength,
            colors,
            activeOpacity,
            edgeOpacity,
            idleFloatAmplitude,
            neighborRadius,
            warpStrength,
            cursorDriftSmooth,
            cursorDriftPower,
            hoverRadius,
            hoverColor,
            lineConnectRadius,
            lineConnectOpacity,
            lineConnectChance,
            lineConnectDensity,
         } = ANIMATION_CONFIG

         ctx.clearRect(0, 0, width, height)
         timeRef.current += waveSpeed

         const t = timeRef.current * 0.68
         const mx = mouseRef.current.x
         const my = mouseRef.current.y
         const drift = cursorDriftRef.current
         drift.x += (mx - drift.x) * cursorDriftSmooth
         drift.y += (my - drift.y) * cursorDriftSmooth

         const cx = width / 2
         const cy = height / 2
         const maxCircle = Math.min(width, height) / 2 - 70

         if (mx >= 0 && my >= 0 && mx <= width && my <= height) {
            const glow = ctx.createRadialGradient(mx, my, 0, mx, my, hoverRadius)
            glow.addColorStop(
               0,
               `rgba(${hoverColor.r},${hoverColor.g},${hoverColor.b},0.18)`
            )
            glow.addColorStop(
               0.45,
               `rgba(${hoverColor.r},${hoverColor.g},${hoverColor.b},0.08)`
            )
            glow.addColorStop(
               1,
               `rgba(${hoverColor.r},${hoverColor.g},${hoverColor.b},0)`
            )
            ctx.fillStyle = glow
            ctx.fillRect(0, 0, width, height)
         }

         for (let i = 0; i < dotsRef.current.length; i++) {
            const dot = dotsRef.current[i]
            const distFromCenter = Math.hypot(dot.baseX - cx, dot.baseY - cy)
            const centerFactor = 1 - Math.min(1, distFromCenter / maxCircle)
            const smoothCenter =
               centerFactor * centerFactor * (3 - 2 * centerFactor)

            const idleOffsetX =
               Math.sin(t * dot.phaseSpeed + dot.phase) *
               idleFloatAmplitude *
               (0.4 + smoothCenter * 1.3)
            const idleOffsetY =
               Math.cos(t * dot.phaseSpeed * 0.8 + dot.phase + 1.8) *
               idleFloatAmplitude *
               (0.45 + smoothCenter * 1.15)

            const dx = dot.baseX - drift.x
            const dy = dot.baseY - drift.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const influence = Math.max(0, 1 - dist / mouseInfluenceRadius)
            const ease = influence * influence * (3 - 2 * influence)
            const angle = Math.atan2(dy, dx)
            const repulse =
               ease * maxDisplacement * rippleStrength * cursorDriftPower

            let targetX = dot.baseX + idleOffsetX + Math.cos(angle) * repulse
            let targetY = dot.baseY + idleOffsetY + Math.sin(angle) * repulse
            let warpX = 0
            let warpY = 0

            for (let j = 0; j < dotsRef.current.length; j++) {
               if (j === i) continue
               const other = dotsRef.current[j]
               const ox = targetX - other.x
               const oy = targetY - other.y
               const d = Math.hypot(ox, oy)

               if (d > 0 && d < neighborRadius) {
                  const push = (1 - d / neighborRadius) ** 2
                  warpX += (ox / d) * push * warpStrength * 8
                  warpY += (oy / d) * push * warpStrength * 8
               }
            }

            targetX += warpX
            targetY += warpY
            dot.x += (targetX - dot.x) * 0.22
            dot.y += (targetY - dot.y) * 0.22

            if (ease > 0.16 && Math.random() < lineConnectChance) {
               for (let j = i + 1; j < dotsRef.current.length; j++) {
                  const other = dotsRef.current[j]
                  const dxLine = dot.x - other.x
                  const dyLine = dot.y - other.y
                  const distLine = Math.hypot(dxLine, dyLine)

                  if (
                     distLine > 0 &&
                     distLine < lineConnectRadius &&
                     Math.random() < lineConnectDensity
                  ) {
                     const lineAlpha =
                        lineConnectOpacity *
                        ease *
                        (1 - distLine / lineConnectRadius)
                     ctx.strokeStyle = `rgba(${hoverColor.r},${hoverColor.g},${hoverColor.b},${lineAlpha.toFixed(
                        3
                     )})`
                     ctx.lineWidth = 1
                     ctx.beginPath()
                     ctx.moveTo(dot.x, dot.y)
                     ctx.lineTo(other.x, other.y)
                     ctx.stroke()
                  }
               }
            }

            const color = interpolateColor(colors, dot.colorProgress)
            const hoverMix = Math.min(1, ease * 1.25)
            const fillR = Math.round(
               color.r * (1 - hoverMix) + hoverColor.r * hoverMix
            )
            const fillG = Math.round(
               color.g * (1 - hoverMix) + hoverColor.g * hoverMix
            )
            const fillB = Math.round(
               color.b * (1 - hoverMix) + hoverColor.b * hoverMix
            )
            const opacity =
               edgeOpacity +
               smoothCenter * (activeOpacity - edgeOpacity) +
               ease * 0.22
            const radius =
               dotRadius * (0.75 + smoothCenter * 1.65) +
               ease * 3.1 * smoothCenter

            ctx.beginPath()
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${fillR},${fillG},${fillB},${opacity.toFixed(3)})`
            ctx.fill()
         }

         rafRef.current = requestAnimationFrame(draw)
      }

      resize()
      window.addEventListener('resize', resize)
      window.addEventListener('mousemove', onMouseMove)
      draw()

      return () => {
         cancelAnimationFrame(rafRef.current)
         window.removeEventListener('resize', resize)
         window.removeEventListener('mousemove', onMouseMove)
      }
   }, [])

   return canvasRef
}
