'use client'

import useTheme from '@/src/hooks/useTheme'
import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SetDefaultTheme() {
   const [] = useTheme()
   const [containerStyle, setContainerStyle] = useState(style.container)

   useEffect(() => {
      setTimeout(() => {
         setContainerStyle(`${style.container} ${style.hidden}`)
      }, 1000)
   }, [])
   return (
      <Flex
         className={containerStyle}
         align="center"
         justify="center"
         gap="middle"
      >
         <Image
            className={style.logo}
            width={155}
            height={155}
            alt=""
            src={'/images/logo.jpg'}
         />
      </Flex>
   )
}
