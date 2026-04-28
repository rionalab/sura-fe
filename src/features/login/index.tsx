'use client'

import {
   ArrowRightOutlined,
   GoogleOutlined,
   UserOutlined,
} from '@ant-design/icons'
import { Button, Divider, Form, Input, message } from 'antd'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

export function LoginPage() {
   const router = useRouter()

   const handleLogin = () => {
      message.success('Login berhasil')
      router.push('/interests')
   }

   const handleGoogleLogin = () => {
      message.info('Login Google belum dikonfigurasi, lanjut ke pilihan minat')
      router.push('/interests?provider=google')
   }

   const handleGuestStart = () => {
      router.push('/interests?mode=guest')
   }

   return (
      <main className={styles.root}>
         <section className={styles.panel}>
            <div className={styles.brand}>
               <span className={styles.brandMark}>S</span>
               <span>Sura</span>
            </div>

            <div className={styles.header}>
               <h1>Masuk untuk mulai chat</h1>
               <p>Pilih akunmu, atau langsung coba sebagai tamu.</p>
            </div>

            <Form
               layout="vertical"
               className={styles.form}
               onFinish={handleLogin}
               requiredMark={false}
            >
               <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                     { required: true, message: 'Email wajib diisi' },
                     { type: 'email', message: 'Format email belum benar' },
                  ]}
               >
                  <Input size="large" placeholder="nama@email.com" />
               </Form.Item>

               <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Password wajib diisi' }]}
               >
                  <Input.Password size="large" placeholder="Password" />
               </Form.Item>

               <Button
                  block
                  className={styles.primaryButton}
                  htmlType="submit"
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                  size="large"
                  type="primary"
               >
                  Masuk
               </Button>
            </Form>

            <Divider plain>atau</Divider>

            <div className={styles.actions}>
               <Button
                  block
                  icon={<GoogleOutlined />}
                  onClick={handleGoogleLogin}
                  size="large"
               >
                  Masuk dengan Google
               </Button>

               <Button
                  block
                  icon={<UserOutlined />}
                  onClick={handleGuestStart}
                  size="large"
                  type="text"
               >
                  Mulai sebagai tamu
               </Button>
            </div>
         </section>
      </main>
   )
}
