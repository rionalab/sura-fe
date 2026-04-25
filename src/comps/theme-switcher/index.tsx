'use client'

import { Dropdown, MenuProps, Space, theme } from 'antd'
import NoSSR from '../no-ssr'
import { DownOutlined } from '@ant-design/icons'
import useTheme from '@/src/hooks/useTheme'

const themes = [
   { key: 'light', label: 'Light' },
   { key: 'dark', label: 'Dark' },
   { key: 'blue', label: 'Blue' },
]

const items: MenuProps['items'] = themes.map((theme) => ({
   key: theme.key,
   label: theme.label,
}))

function ThemeSwitcher() {
   const [activeTheme, setActiveTheme] = useTheme()

   const handleMenuClick: MenuProps['onClick'] = (e) => {
      setActiveTheme(e.key)
   }

   return (
      <NoSSR>
         <br />
         <br />
         <p>Change theme from button below</p>
         <Dropdown
            menu={{
               items,
               onClick: handleMenuClick,
            }}
         >
            <a className="capitalized" onClick={(e) => e.preventDefault()}>
               <Space>
                  Theme : {activeTheme}
                  <DownOutlined />
               </Space>
            </a>
         </Dropdown>
      </NoSSR>
   )
}

export default ThemeSwitcher
