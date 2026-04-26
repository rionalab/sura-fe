import SetDefaultTheme from '@/src/comps/set-default-theme'
import ThemeSwitcher from '@/src/comps/theme-switcher'
import { Landing1Page } from '@/src/features/landing1'

export default function Home() {
   return <Landing1Page />

   /*    return (
      <div>
         <SetDefaultTheme />
         <div className="main-container">
            <ThemeSwitcher />
         </div>
      </div>
   ) */
}
