import React, { useEffect, useState } from 'react'

export default function useTheme() {
   const [activeTheme, setActiveTheme] = useState(() => {
      if (typeof window !== 'undefined') {
         return localStorage.getItem('theme') || 'light'
      }

      return 'light'
   })

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', activeTheme)
      localStorage.setItem('theme', activeTheme)
   }, [activeTheme])

   useEffect(() => {
      const savedTheme = localStorage.getItem('theme')
      setActiveTheme(savedTheme || 'light')
   }, [])

   return [activeTheme, setActiveTheme] as const
}
