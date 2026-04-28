import { SearchOutlined } from '@ant-design/icons'
import { UserPresenceItem } from '@/src/comps/user-presence-item'
import type { FollowedUser } from '../types'
import styles from '../styles.module.scss'

type FollowingPanelProps = {
   users: FollowedUser[]
}

export function FollowingPanel({ users }: FollowingPanelProps) {
   return (
      <aside className={styles.followPanel}>
         <div className={styles.followHeader}>
            <div>
               <span className={styles.followLabel}>Following</span>
               <strong>Teman yang diikuti</strong>
            </div>
            <SearchOutlined />
         </div>

         <div className={styles.followList}>
            {users.map((user) => (
               <article className={styles.followItem} key={user.name}>
                  <UserPresenceItem
                     name={user.name}
                     subtitle={user.lastSeen}
                     online={user.status === 'online'}
                     imageUrl={user.imageUrl}
                  />
               </article>
            ))}
         </div>
      </aside>
   )
}
