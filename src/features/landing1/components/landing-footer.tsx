import { FOOTER_LINKS } from '../config'
import styles from '../styles.module.scss'

interface LandingFooterProps {
   onlineCount: number
}

export function LandingFooter({ onlineCount }: LandingFooterProps) {
   return (
      <footer className={styles.footer}>
         <div className={styles.footerContainer}>
            <div className={styles.footerLeft}>
               <p className={styles.onlineCount}>
                  <span className={styles.onlineDot} />
                  <span className={styles.onlineLabel}>
                     <span className={styles.onlineNumber}>
                        {onlineCount.toLocaleString()}
                     </span>
                     <span className={styles.onlineText}>online</span>
                  </span>
               </p>
            </div>

            <div className={styles.footerRight}>
               {FOOTER_LINKS.map((link) => (
                  <a key={link} href="#" className={styles.footerLink}>
                     {link}
                  </a>
               ))}
            </div>
         </div>
      </footer>
   )
}
