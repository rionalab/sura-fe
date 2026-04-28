import { NumberOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import type { ChatMessage } from '../types'
import styles from '../styles.module.scss'

type ChatThreadProps = {
   messages: ChatMessage[]
}

export function ChatThread({ messages }: ChatThreadProps) {
   return (
      <>
         <header className={styles.chatHeader}>
            <div className={styles.channelTitle}>
               <NumberOutlined />
               <strong>general</strong>
            </div>
            <Input
               className={styles.search}
               prefix={<SearchOutlined />}
               placeholder="Cari"
            />
         </header>

         <div className={styles.thread}>
            <div className={styles.welcome}>
               <span className={styles.welcomeIcon}>
                  <NumberOutlined />
               </span>
               <h1>Selamat datang di general</h1>
               <p>Ruang awal untuk mulai ngobrol dengan Sura.</p>
            </div>

            <div className={styles.messageList}>
               {messages.map((message) => (
                  <article
                     className={`${styles.message} ${
                        message.isOwn ? styles.ownMessage : ''
                     }`}
                     key={message.text}
                  >
                     {!message.isOwn ? (
                        <span className={styles.messageAvatar}>
                           {message.author.slice(0, 1)}
                        </span>
                     ) : null}
                     <div className={styles.messageBody}>
                        <div className={styles.messageBubble}>
                           <strong>{message.author}</strong>
                           <p>{message.text}</p>
                        </div>
                        <span className={styles.messageTime}>
                           {message.time}
                        </span>
                     </div>
                     {message.isOwn ? (
                        <span className={styles.messageAvatar}>
                           {message.author.slice(0, 1)}
                        </span>
                     ) : null}
                  </article>
               ))}
            </div>
         </div>
      </>
   )
}
