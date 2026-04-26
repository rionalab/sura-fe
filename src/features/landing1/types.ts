export interface RgbColor {
   r: number
   g: number
   b: number
}

export interface Dot {
   baseX: number
   baseY: number
   x: number
   y: number
   ringRatio: number
   colorProgress: number
   phase: number
   phaseSpeed: number
}

export interface TypingState {
   displayText: string
   isVisible: boolean
}
