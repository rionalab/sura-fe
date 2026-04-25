'use client'

import { Layout, Button, Menu, theme } from 'antd'
import React, { useState } from 'react'
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   UploadOutlined,
   UserOutlined,
   VideoCameraOutlined,
} from '@ant-design/icons'
import Sidebar from '@/src/comps/sidebar'

const { Sider, Header, Content } = Layout

export default function LayoutWrapper({
   children,
}: {
   children: React.ReactNode
}) {
   const [collapsed, setCollapsed] = useState(false)

   return (
      <>
         <Layout>
            <Sidebar collapsed={collapsed} />
            <Layout>
               <Header style={{ padding: 0 }}>
                  <Button
                     type="text"
                     icon={
                        collapsed ? (
                           <MenuUnfoldOutlined />
                        ) : (
                           <MenuFoldOutlined />
                        )
                     }
                     onClick={() => setCollapsed(!collapsed)}
                     style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                     }}
                  />
               </Header>

               <Content
                  style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 280,
                  }}
               >
                  {children}
               </Content>
            </Layout>
         </Layout>
      </>
   )
}
