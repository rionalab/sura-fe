'use client'

import { useState } from 'react'
import { ActiveChatSidebar } from './components/active-chat-sidebar'
import { ChatComposer } from './components/chat-composer'
import { ChatThread } from './components/chat-thread'
import { FollowingPanel } from './components/following-panel'
import { InterestRail } from './components/interest-rail'
import { TopicUsersPanel } from './components/topic-users-panel'
import {
   activeChats,
   followedUsers,
   interestedTopics,
   messages,
   topicUsers,
} from './config'
import styles from './styles.module.scss'
import type { InterestedTopic } from './types'

export function ChatPage() {
   const [selectedTopic, setSelectedTopic] = useState<InterestedTopic | null>(
      null
   )

   console.log({ followedUsers })

   return (
      <main className={styles.root}>
         <InterestRail
            topics={interestedTopics}
            selectedTopic={selectedTopic}
            onSelectTopic={setSelectedTopic}
         />
         <TopicUsersPanel
            selectedTopic={selectedTopic}
            users={topicUsers}
            onClose={() => setSelectedTopic(null)}
         />
         <ActiveChatSidebar chats={activeChats} />

         <section className={styles.chat}>
            <ChatThread messages={messages} />
            <ChatComposer />
         </section>

         <FollowingPanel users={followedUsers} />
      </main>
   )
}
