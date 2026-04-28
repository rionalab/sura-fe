import {
   CheckOutlined,
   EditOutlined,
   EllipsisOutlined,
   SearchOutlined,
   UserOutlined,
} from '@ant-design/icons'
import { Input } from 'antd'
import { UserPresenceItem } from '@/src/comps/user-presence-item'
import type { ActiveChat } from '../types'
import styles from '../styles.module.scss'

type ActiveChatSidebarProps = {
   chats: ActiveChat[]
}

export function ActiveChatSidebar({ chats }: ActiveChatSidebarProps) {
   const pinnedChats = chats.filter((chat) => chat.isPinned)
   const regularChats = chats.filter((chat) => !chat.isPinned)

   return (
      <aside className={styles.sidebar}>
         <div className={styles.messagesHeader}>
            <strong>Messages</strong>
            <div className={styles.messagesActions}>
               <button type="button" aria-label="Buat chat baru">
                  <EditOutlined />
               </button>
               <button type="button" aria-label="Menu chat">
                  <EllipsisOutlined />
               </button>
            </div>
         </div>

         <div className={styles.chatSearch}>
            <Input prefix={<SearchOutlined />} placeholder="Search" />
         </div>

         <div className={styles.activeChatList}>
            <ChatGroup chats={pinnedChats} label="Pinned" selectedFirst />
            <ChatGroup chats={regularChats} label="All Messages" />
         </div>

         <div className={styles.profile}>
            <span className={styles.avatar}>
               <UserOutlined />
            </span>
            <div>
               <strong>Guest</strong>
               <span>Online</span>
            </div>
         </div>
      </aside>
   )
}

type ChatGroupProps = {
   chats: ActiveChat[]
   label: string
   selectedFirst?: boolean
}

function ChatGroup({ chats, label, selectedFirst = false }: ChatGroupProps) {
   return (
      <section className={styles.chatGroup}>
         <span className={styles.chatGroupLabel}>{label}</span>
         {chats.map((chat, index) => (
            <button
               className={`${styles.activeChatItem} ${
                  selectedFirst && index === 0
                     ? styles.activeChatItemSelected
                     : ''
               }`}
               key={chat.name}
               type="button"
            >
               <UserPresenceItem
                  name={chat.name}
                  subtitle={chat.preview}
                  online
                  isTyping={chat.isTyping}
                  meta={chat.time}
                  suffix={
                     <>
                        {chat.isRead ? (
                           <CheckOutlined className={styles.readIndicator} />
                        ) : null}
                        {chat.unreadCount > 0 ? (
                           <span className={styles.unreadBadge}>
                              {chat.unreadCount}
                           </span>
                        ) : null}
                     </>
                  }
               />
            </button>
         ))}
      </section>
   )
}
