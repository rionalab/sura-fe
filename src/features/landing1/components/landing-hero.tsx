import { TYPING_CONFIG } from '../config'
import styles from '../styles.module.scss'
import type { TypingState } from '../types'

interface LandingHeroProps {
   typing: TypingState
}

export function LandingHero({ typing }: LandingHeroProps) {
   return (
      <main className={styles.hero}>
         <h1
            className={styles.heroText}
            style={{
               opacity: typing.isVisible ? 1 : 0,
               transition: `opacity ${TYPING_CONFIG.fadeDuration}ms ease-in-out`,
            }}
         >
            {typing.displayText}
         </h1>
      </main>
   )
}
