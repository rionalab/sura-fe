'use client'

import { ONLINE_COUNT } from './config'
import { LandingCanvas } from './components/landing-canvas'
import { LandingFooter } from './components/landing-footer'
import { LandingHero } from './components/landing-hero'
import { LandingNavbar } from './components/landing-navbar'
import { useTypingText } from './hooks/use-typing-text'
import styles from './styles.module.scss'

export function Landing1Page() {
   const typing = useTypingText()

   return (
      <div className={styles.root}>
         <LandingCanvas />
         <LandingNavbar />
         <LandingHero typing={typing} />
         <LandingFooter onlineCount={ONLINE_COUNT} />
      </div>
   )
}
