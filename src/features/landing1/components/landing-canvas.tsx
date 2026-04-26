import { useDotFieldAnimation } from '../hooks/use-dot-field-animation'
import styles from '../styles.module.scss'

export function LandingCanvas() {
   const canvasRef = useDotFieldAnimation()

   return <canvas ref={canvasRef} className={styles.canvas} />
}
