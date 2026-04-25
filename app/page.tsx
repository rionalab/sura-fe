import SetDefaultTheme from '@/src/comps/set-default-theme'
import ThemeSwitcher from '@/src/comps/theme-switcher'

export default function Home() {
   return (
      <div>
         <SetDefaultTheme />
         <div className="main-container">
            <ThemeSwitcher />
         </div>
      </div>
   )
}
