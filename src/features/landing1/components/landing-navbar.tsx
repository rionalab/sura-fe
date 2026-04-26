import { NAV_LINKS } from '../config'
import styles from '../styles.module.scss'

export function LandingNavbar() {
   return (
      <nav className={styles.nav}>
         <div className={styles.navLogo}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
               <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
            <span className={styles.navBrand}>Suraelle</span>
         </div>

         <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
               <a key={link} href="#" className={styles.navLink}>
                  {link}
               </a>
            ))}
         </div>

         <button className={styles.navButton}>
            Download
            <svg
               width="14"
               height="14"
               viewBox="0 0 24 24"
               fill="none"
               className={styles.navButtonIcon}
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
   )
}
