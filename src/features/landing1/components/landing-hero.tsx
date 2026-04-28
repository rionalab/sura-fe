// import Button from '@/src/comps/button'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { TYPING_CONFIG } from '../config'
import styles from '../styles.module.scss'
import type { TypingState } from '../types'

interface LandingHeroProps {
   typing: TypingState
}

export function LandingHero({ typing }: LandingHeroProps) {
   const router = useRouter()

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

         {/* <Button label={'Mualai Chat Sekarang'} /> */}

         <Button
            className={styles.heroButton}
            shape="round"
            variant="solid"
            color="default"
            iconPlacement="end"
            icon={<ArrowRightOutlined />}
            onClick={() => router.push('/login')}
            size="large"
         >
            Mulai Chat Sekarang
         </Button>
      </main>
   )
}
