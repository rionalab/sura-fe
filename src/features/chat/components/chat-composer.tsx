import { PlusOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import styles from '../styles.module.scss'

export function ChatComposer() {
   return (
      <footer className={styles.composer}>
         <Button icon={<PlusOutlined />} shape="circle" type="text" />
         <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            placeholder="Tulis pesan ke #general"
         />
         <Button icon={<SmileOutlined />} shape="circle" type="text" />
         <Button icon={<SendOutlined />} shape="circle" type="primary" />
      </footer>
   )
}
