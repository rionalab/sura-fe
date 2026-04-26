'use client'

import { useEffect, useRef, useState } from 'react'

// ============================================================
// 🎨 ANIMATION CONFIG — tweak these variables freely!
// ============================================================
const ANIMATION_CONFIG = {
   RINGS: 17, // total ring
   DOTS_BASE: 20, //dot per ring
   MIN_CENTER_RADIUS: 96, // area putih tidak ada ring / dots nya
   OUTER_MARGIN: 124, // not sure coba ganti 1000 biar kelihatan hasilnya
   DOT_RADIUS: 1.2, // ukuran dots
   HOVER_COLOR: { r: 170, g: 170, b: 170 }, // warna yg ngikuti cursor & warna dot ketika di area hover
   MOUSE_INFLUENCE_RADIUS: 320, // efek hover terhadap dots
   MAX_DISPLACEMENT: 110, //efek kekuatan tendang dots terhadap cursor
   WAVE_SPEED: 0.14, // kecepatan goyang dots ketika standby
   RIPPLE_STRENGTH: 0.82, // efek hover terhadap dots
   NEIGHBOR_RADIUS: 11, // not sure
   WARP_STRENGTH: 0.12, // reactive dots terhadap cursor
   CURSOR_DRIFT_SMOOTH: 0.12, // 2 ga gerak dots nya

   CURSOR_DRIFT_POWER: 8.9, // radius yg dijauhi dot terhadap cursor

   HOVER_RADIUS: 222, // radius object yg ngikuti kursor

   LINE_CONNECT_RADIUS: 96,
   LINE_CONNECT_OPACITY: 0.14,
   LINE_CONNECT_CHANCE: 0.08,
   LINE_CONNECT_DENSITY: 0.12,

   COLORS: [
      { r: 47, g: 122, b: 255 },
      { r: 216, g: 220, b: 232 },
      { r: 191, g: 33, b: 70 },
      { r: 214, g: 131, b: 29 },
      { r: 86, g: 139, b: 77 },
   ],

   BASE_OPACITY: 0.1,
   ACTIVE_OPACITY: 1,
   EDGE_OPACITY: 0.05,

   IDLE_FLOAT_AMPLITUDE: 3,
}
// ============================================================

const interpolateColor = (
   colors: Array<{ r: number; g: number; b: number }>,
   progress: number
) => {
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

interface Dot {
   baseX: number
   baseY: number
   x: number
   y: number
   ringRatio: number
   colorProgress: number
   phase: number
   phaseSpeed: number
}

export default function LandingPage() {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const mouseRef = useRef({ x: -9999, y: -9999 })
   const cursorDriftRef = useRef({ x: -9999, y: -9999 })
   const dotsRef = useRef<Dot[]>([])
   const rafRef = useRef<number>(0)
   const timeRef = useRef(0)
   const [onlineCount] = useState(28542)

   // Build circular dot layout
   const buildGrid = (w: number, h: number) => {
      const { RINGS, DOTS_BASE, MIN_CENTER_RADIUS, OUTER_MARGIN, COLORS } =
         ANIMATION_CONFIG
      const dots: Dot[] = []
      const cx = w / 2
      const cy = h / 2
      const maxRadiusX = w / 2 - OUTER_MARGIN
      const maxRadiusY = h / 2 - OUTER_MARGIN
      const minRadius = Math.min(w, h) * 0.08 + MIN_CENTER_RADIUS

      for (let ring = 0; ring < RINGS; ring++) {
         const ringRatio = ring / Math.max(1, RINGS - 1)
         const ringRadiusX = minRadius + ringRatio * (maxRadiusX - minRadius)
         const ringRadiusY = minRadius + ringRatio * (maxRadiusY - minRadius)
         const count = DOTS_BASE + ring * 6

         for (let i = 0; i < count; i++) {
            const angle =
               (Math.PI * 2 * i) / Math.max(1, count) +
               Math.random() * 0.12 -
               0.06
            const bx = cx + ringRadiusX * Math.cos(angle)
            const by = cy + ringRadiusY * Math.sin(angle)

            const angleProgress =
               ((angle % (Math.PI * 2)) + Math.PI * 2) / (Math.PI * 2)
            const colorProgress =
               (ringRatio * 0.55 +
                  angleProgress * 0.45 +
                  Math.random() * 0.04) %
               1
            dots.push({
               baseX: bx,
               baseY: by,
               x: bx,
               y: by,
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
               ? OUTER_MARGIN
               : i % 4 === 1
                 ? w - OUTER_MARGIN
                 : i % 4 === 2
                   ? Math.random() * w
                   : Math.random() * w
         const edgeY =
            i % 4 === 2
               ? OUTER_MARGIN
               : i % 4 === 3
                 ? h - OUTER_MARGIN
                 : Math.random() * h
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

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')!

      const resize = () => {
         canvas.width = window.innerWidth
         canvas.height = window.innerHeight
         dotsRef.current = buildGrid(canvas.width, canvas.height)
      }

      resize()
      window.addEventListener('resize', resize)

      const onMouseMove = (e: MouseEvent) => {
         mouseRef.current = { x: e.clientX, y: e.clientY }
      }
      window.addEventListener('mousemove', onMouseMove)

      const draw = () => {
         const { width, height } = canvas
         ctx.clearRect(0, 0, width, height)

         const {
            DOT_RADIUS,
            MOUSE_INFLUENCE_RADIUS,
            MAX_DISPLACEMENT,
            WAVE_SPEED,
            RIPPLE_STRENGTH,
            COLORS,
            BASE_OPACITY,
            ACTIVE_OPACITY,
            EDGE_OPACITY,
            IDLE_FLOAT_AMPLITUDE,
            NEIGHBOR_RADIUS,
            WARP_STRENGTH,
            CURSOR_DRIFT_SMOOTH,
            CURSOR_DRIFT_POWER,
            HOVER_RADIUS,
            HOVER_COLOR,
            LINE_CONNECT_RADIUS,
            LINE_CONNECT_OPACITY,
            LINE_CONNECT_CHANCE,
            LINE_CONNECT_DENSITY,
         } = ANIMATION_CONFIG

         timeRef.current += WAVE_SPEED
         const t = timeRef.current * 0.68
         const mx = mouseRef.current.x
         const my = mouseRef.current.y
         const drift = cursorDriftRef.current
         drift.x += (mx - drift.x) * CURSOR_DRIFT_SMOOTH
         drift.y += (my - drift.y) * CURSOR_DRIFT_SMOOTH
         const dxDrift = drift.x
         const dyDrift = drift.y
         const cx = width / 2
         const cy = height / 2
         const maxCircle = Math.min(width, height) / 2 - 70

         if (mx >= 0 && my >= 0 && mx <= width && my <= height) {
            const glow = ctx.createRadialGradient(
               mx,
               my,
               0,
               mx,
               my,
               HOVER_RADIUS
            )
            glow.addColorStop(
               0,
               `rgba(${HOVER_COLOR.r},${HOVER_COLOR.g},${HOVER_COLOR.b},0.18)`
            )
            glow.addColorStop(
               0.45,
               `rgba(${HOVER_COLOR.r},${HOVER_COLOR.g},${HOVER_COLOR.b},0.08)`
            )
            glow.addColorStop(
               1,
               `rgba(${HOVER_COLOR.r},${HOVER_COLOR.g},${HOVER_COLOR.b},0)`
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
            const edgeFactor = 1 - smoothCenter

            const idleOffsetX =
               Math.sin(t * dot.phaseSpeed + dot.phase) *
               IDLE_FLOAT_AMPLITUDE *
               (0.4 + smoothCenter * 1.3)
            const idleOffsetY =
               Math.cos(t * dot.phaseSpeed * 0.8 + dot.phase + 1.8) *
               IDLE_FLOAT_AMPLITUDE *
               (0.45 + smoothCenter * 1.15)

            const dx = dot.baseX - dxDrift
            const dy = dot.baseY - dyDrift
            const dist = Math.sqrt(dx * dx + dy * dy)
            const influence = Math.max(0, 1 - dist / MOUSE_INFLUENCE_RADIUS)
            const ease = influence * influence * (3 - 2 * influence)
            const angle = Math.atan2(dy, dx)
            const repulse =
               ease * MAX_DISPLACEMENT * RIPPLE_STRENGTH * CURSOR_DRIFT_POWER

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
               if (d > 0 && d < NEIGHBOR_RADIUS) {
                  const push = (1 - d / NEIGHBOR_RADIUS) ** 2
                  warpX += (ox / d) * push * WARP_STRENGTH * 8
                  warpY += (oy / d) * push * WARP_STRENGTH * 8
               }
            }
            targetX += warpX
            targetY += warpY

            dot.x += (targetX - dot.x) * 0.22
            dot.y += (targetY - dot.y) * 0.22

            if (ease > 0.16 && Math.random() < LINE_CONNECT_CHANCE) {
               for (let j = i + 1; j < dotsRef.current.length; j++) {
                  const other = dotsRef.current[j]
                  const dxLine = dot.x - other.x
                  const dyLine = dot.y - other.y
                  const distLine = Math.hypot(dxLine, dyLine)
                  if (
                     distLine > 0 &&
                     distLine < LINE_CONNECT_RADIUS &&
                     Math.random() < LINE_CONNECT_DENSITY
                  ) {
                     const lineAlpha =
                        LINE_CONNECT_OPACITY *
                        ease *
                        (1 - distLine / LINE_CONNECT_RADIUS)
                     ctx.strokeStyle = `rgba(${HOVER_COLOR.r},${HOVER_COLOR.g},${HOVER_COLOR.b},${lineAlpha.toFixed(
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

            const c = interpolateColor(COLORS, dot.colorProgress)
            const hoverMix = Math.min(1, ease * 1.25)
            const fillR = Math.round(
               c.r * (1 - hoverMix) + HOVER_COLOR.r * hoverMix
            )
            const fillG = Math.round(
               c.g * (1 - hoverMix) + HOVER_COLOR.g * hoverMix
            )
            const fillB = Math.round(
               c.b * (1 - hoverMix) + HOVER_COLOR.b * hoverMix
            )
            const opacity =
               EDGE_OPACITY +
               smoothCenter * (ACTIVE_OPACITY - EDGE_OPACITY) +
               ease * 0.22
            const radius =
               DOT_RADIUS * (0.75 + smoothCenter * 1.65) +
               ease * 3.1 * smoothCenter

            ctx.beginPath()
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${fillR},${fillG},${fillB},${opacity.toFixed(3)})`
            ctx.fill()
         }

         rafRef.current = requestAnimationFrame(draw)
      }

      draw()

      return () => {
         cancelAnimationFrame(rafRef.current)
         window.removeEventListener('resize', resize)
         window.removeEventListener('mousemove', onMouseMove)
      }
   }, [])

   return (
      <div style={styles.root}>
         {/* Animated canvas background */}
         <canvas ref={canvasRef} style={styles.canvas} />

         {/* Navbar */}
         <nav style={styles.nav}>
            <div style={styles.navLogo}>
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                     d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                     stroke="#111"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
               <span style={styles.navBrand}>Antigravity</span>
            </div>

            <div style={styles.navLinks}>
               {['Product', 'Use Cases', 'Pricing', 'Blog', 'Resources'].map(
                  (link) => (
                     <a key={link} href="#" style={styles.navLink}>
                        {link}
                     </a>
                  )
               )}
            </div>

            <button style={styles.navButton}>
               Download
               <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginLeft: 6 }}
               >
                  <path
                     d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </button>
         </nav>

         {/* Hero */}
         <main style={styles.hero}>
            <h1 style={styles.heroText}>Hi ...</h1>
            <p style={styles.onlineCount}>
               <span style={styles.onlineDot} />
               {onlineCount.toLocaleString()} Online
            </p>
         </main>
      </div>
   )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
   root: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background:
         'radial-gradient(circle at center, #ffffff 0%, #f4f4f4 46%, #bbb 100%)',
      fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
   },
   canvas: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
   },

   // Navbar
   nav: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 40px',
   },
   navLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
   },
   navBrand: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '-0.3px',
      color: '#111',
   },
   navLinks: {
      display: 'flex',
      gap: 32,
   },
   navLink: {
      fontSize: 14,
      color: '#444',
      textDecoration: 'none',
      fontWeight: 450,
      letterSpacing: '0.01em',
      transition: 'color 0.2s',
   },
   navButton: {
      display: 'flex',
      alignItems: 'center',
      background: '#111',
      color: '#fff',
      border: 'none',
      borderRadius: 100,
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      letterSpacing: '0.01em',
   },

   // Hero
   hero: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5,
      pointerEvents: 'none',
      userSelect: 'none',
   },
   heroText: {
      fontSize: 'clamp(120px, 6vw, 120px)',
      fontWeight: 400,
      letterSpacing: '-2px',
      color: '#111',
      margin: 0,
      lineHeight: 1.1,
      textAlign: 'center',
   },
   onlineCount: {
      marginTop: 20,
      fontSize: 14,
      color: '#666',
      fontWeight: 400,
      letterSpacing: '0.02em',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
   },
   onlineDot: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#34a853',
      display: 'inline-block',
      boxShadow: '0 0 0 2px rgba(52,168,83,0.25)',
      animation: 'pulse 2s ease-in-out infinite',
   },
}
