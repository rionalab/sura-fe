import { Layout, Button, Menu, theme } from 'antd'
import React, { useState } from 'react'
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   UploadOutlined,
   UserOutlined,
   VideoCameraOutlined,
} from '@ant-design/icons'
import { ISidebar } from '../types'
import Image from 'next/image'
import styles from './style.module.scss'

const { Sider, Header, Content } = Layout

export default function Sidebar({ collapsed }: ISidebar) {
   return (
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
         <div className="demo-logo-vertical">
            <Image
               className={styles.logo}
               alt=""
               width={100}
               height={100}
               src={'/images/logo.jpg'}
            />
         </div>

         <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
               {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1',
               },
               {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2',
               },
               {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3',
               },
            ]}
         />
      </Sider>
   )
}
