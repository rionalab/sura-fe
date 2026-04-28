export type InterestedTopic = {
   id: string
   label: string
   mark: string
}

export type TopicUser = {
   name: string
   status: string
}

export type ActiveChat = {
   name: string
   preview: string
   time: string
   isTyping: boolean
   isRead: boolean
   unreadCount: number
   isPinned: boolean
}

export type FollowedUser = {
   name: string
   status: 'online' | 'offline'
   lastSeen: string
   imageUrl?: string
}

export type ChatMessage = {
   author: string
   time: string
   text: string
   isOwn: boolean
}
