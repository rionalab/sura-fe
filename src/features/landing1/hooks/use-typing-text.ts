import { useEffect, useState } from 'react'

import { TYPING_CONFIG, TYPING_TEXTS } from '../config'
import type { TypingState } from '../types'

export function useTypingText(): TypingState {
   const [displayText, setDisplayText] = useState('')
   const [currentIndex, setCurrentIndex] = useState(0)
   const [isVisible, setIsVisible] = useState(true)

   useEffect(() => {
      const text = TYPING_TEXTS[currentIndex]
      let charIndex = 0
      let displayTimeout: ReturnType<typeof setTimeout> | undefined
      let fadeTimeout: ReturnType<typeof setTimeout> | undefined

      const typingInterval = setInterval(() => {
         if (charIndex < text.length) {
            setDisplayText(text.slice(0, charIndex + 1))
            charIndex++
            return
         }

         clearInterval(typingInterval)
         displayTimeout = setTimeout(() => {
            setIsVisible(false)
            fadeTimeout = setTimeout(() => {
               setCurrentIndex((prev) => (prev + 1) % TYPING_TEXTS.length)
               setDisplayText('')
               setIsVisible(true)
            }, TYPING_CONFIG.fadeDuration)
         }, TYPING_CONFIG.displayDuration)
      }, TYPING_CONFIG.typingSpeed)

      return () => {
         clearInterval(typingInterval)
         if (displayTimeout) clearTimeout(displayTimeout)
         if (fadeTimeout) clearTimeout(fadeTimeout)
      }
   }, [currentIndex])

   return { displayText, isVisible }
}
