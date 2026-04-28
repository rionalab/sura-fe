import type { ReactNode } from 'react'
import styles from './styles.module.scss'

const avatarGradientClasses = [
   styles.gradientPink,
   styles.gradientBlue,
   styles.gradientGreen,
   styles.gradientOrange,
   styles.gradientPurple,
   styles.gradientCyan,
]

type UserPresenceItemProps = {
   name: string
   subtitle: string
   imageUrl?: string
   imageAlt?: string
   online?: boolean
   isTyping?: boolean
   meta?: ReactNode
   suffix?: ReactNode
   className?: string
}

export function UserPresenceItem({
   name,
   subtitle,
   imageUrl,
   imageAlt,
   online = false,
   isTyping = false,
   meta,
   suffix,
   className = '',
}: UserPresenceItemProps) {
   const avatarClassName = imageUrl
      ? styles.avatar
      : `${styles.avatar} ${avatarGradientClasses[getNameHash(name)]}`

   return (
      <div className={`${styles.root} ${className}`}>
         <span className={avatarClassName}>
            {imageUrl ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={imageUrl} alt={imageAlt ?? name} />
            ) : (
               name.slice(0, 1)
            )}
            <span
               className={`${styles.statusDot} ${
                  online ? styles.onlineDot : styles.offlineDot
               }`}
            />
         </span>

         <span className={styles.content}>
            <span className={styles.topLine}>
               <strong>{name}</strong>
               {meta ? <span className={styles.meta}>{meta}</span> : null}
            </span>
            <span className={styles.bottomLine}>
               <span
                  className={`${styles.subtitle} ${
                     isTyping ? styles.typingSubtitle : ''
                  }`}
               >
                  {subtitle}
               </span>
               {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
            </span>
         </span>
      </div>
   )
}

function getNameHash(name: string) {
   return (
      Array.from(name).reduce((total, char) => total + char.charCodeAt(0), 0) %
      avatarGradientClasses.length
   )
}
