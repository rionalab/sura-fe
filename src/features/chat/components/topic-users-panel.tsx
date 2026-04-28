import { CloseOutlined } from '@ant-design/icons'
import { UserPresenceItem } from '@/src/comps/user-presence-item'
import type { InterestedTopic, TopicUser } from '../types'
import styles from '../styles.module.scss'

type TopicUsersPanelProps = {
   selectedTopic: InterestedTopic | null
   users: TopicUser[]
   onClose: () => void
}

export function TopicUsersPanel({
   selectedTopic,
   users,
   onClose,
}: TopicUsersPanelProps) {
   return (
      <aside
         className={`${styles.topicUsersPanel} ${
            selectedTopic ? styles.topicUsersPanelOpen : ''
         }`}
      >
         {selectedTopic ? (
            <>
               <div className={styles.topicUsersHeader}>
                  <div>
                     <span>Interest server</span>
                     <strong>{selectedTopic.label}</strong>
                  </div>
                  <button
                     type="button"
                     onClick={onClose}
                     aria-label="Tutup list user aktif"
                  >
                     <CloseOutlined />
                  </button>
               </div>
               <div className={styles.topicUsersList}>
                  {users.map((user) => (
                     <article className={styles.topicUserItem} key={user.name}>
                        <UserPresenceItem
                           name={user.name}
                           subtitle={user.status}
                           online={user.status !== 'Idle'}
                           isTyping={user.status === 'Typing...'}
                        />
                     </article>
                  ))}
               </div>
            </>
         ) : null}
      </aside>
   )
}
