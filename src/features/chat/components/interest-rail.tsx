import { NumberOutlined, PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import type { InterestedTopic } from '../types'
import styles from '../styles.module.scss'

type InterestRailProps = {
   topics: InterestedTopic[]
   selectedTopic: InterestedTopic | null
   onSelectTopic: (topic: InterestedTopic) => void
}

export function InterestRail({
   topics,
   selectedTopic,
   onSelectTopic,
}: InterestRailProps) {
   return (
      <aside className={styles.serverRail}>
         <Link className={styles.serverMark} href="/landing1">
            S
         </Link>
         <div className={styles.topicRailList}>
            {topics.map((topic) => (
               <button
                  className={`${styles.topicButton} ${
                     selectedTopic?.id === topic.id
                        ? styles.topicButtonActive
                        : ''
                  }`}
                  key={topic.id}
                  type="button"
                  onClick={() => onSelectTopic(topic)}
                  aria-label={`Buka topik ${topic.label}`}
               >
                  <NumberOutlined />
                  <span>{topic.mark}</span>
               </button>
            ))}
            <button className={styles.serverButton} type="button">
               <PlusOutlined />
            </button>
         </div>
      </aside>
   )
}
