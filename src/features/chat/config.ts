import type {
   ActiveChat,
   ChatMessage,
   FollowedUser,
   InterestedTopic,
   TopicUser,
} from './types'

export const interestedTopics: InterestedTopic[] = [
   { id: 'general', label: 'General', mark: 'G' },
   { id: 'tech', label: 'Teknologi', mark: 'T' },
   { id: 'study', label: 'Belajar', mark: 'B' },
   { id: 'random', label: 'Random', mark: 'R' },
]

export const topicUsers: TopicUser[] = [
   { name: 'Victor Yoga', status: 'Online' },
   { name: 'PM Okta', status: 'Typing...' },
   { name: 'Lead Frans', status: 'Online' },
   { name: 'Devon Lane', status: 'Online' },
   { name: 'Theresa Web', status: 'Online' },
   { name: 'Floyd Miles', status: 'Idle' },
   { name: 'Kristin Watson', status: 'Online' },
   { name: 'Guy Hawkins', status: 'Online' },
]

export const activeChats: ActiveChat[] = [
   {
      name: 'Kretya Studio',
      preview: 'Victor is typing...',
      time: '4m',
      isTyping: true,
      isRead: false,
      unreadCount: 12,
      isPinned: true,
   },
   {
      name: 'PM Okta',
      preview: 'i see, okay noted! i will check it.',
      time: '10m',
      isTyping: false,
      isRead: true,
      unreadCount: 0,
      isPinned: true,
   },
   {
      name: 'Lead Frans',
      preview: 'ok, thanks!',
      time: '1h',
      isTyping: false,
      isRead: false,
      unreadCount: 0,
      isPinned: false,
   },
   {
      name: 'Victor Yoga',
      preview: 'You can check it now.',
      time: 'now',
      isTyping: false,
      isRead: false,
      unreadCount: 1,
      isPinned: false,
   },
   {
      name: 'Devon Lane',
      preview: "i'll try my best von",
      time: '4m',
      isTyping: false,
      isRead: true,
      unreadCount: 0,
      isPinned: false,
   },
   {
      name: 'Guy Hawkins',
      preview: 'okay noted bro!',
      time: '7m',
      isTyping: false,
      isRead: false,
      unreadCount: 0,
      isPinned: false,
   },
   {
      name: 'Kristin Watson',
      preview: 'nice.',
      time: '23m',
      isTyping: false,
      isRead: false,
      unreadCount: 1,
      isPinned: false,
   },
   {
      name: 'Theresa Web',
      preview: "i'll come to you asap...",
      time: '1h',
      isTyping: false,
      isRead: true,
      unreadCount: 0,
      isPinned: false,
   },
   {
      name: 'Floyd Miles',
      preview: 'Sounds cool, Max!',
      time: '12h',
      isTyping: false,
      isRead: false,
      unreadCount: 0,
      isPinned: false,
   },
]

export const followedUsers: FollowedUser[] = [
   { name: 'Maimunah', status: 'online', lastSeen: 'Online' },
   {
      imageUrl: 'https://picsum.photos/id/17/100/100',

      name: 'Yor Tube',
      status: 'offline',
      lastSeen: 'Aktif 12 menit lalu',
   },
   { name: 'Elisabeth Nababan Adm', status: 'online', lastSeen: 'Online' },
   {
      name: 'Risa Azzurri Xander',
      status: 'offline',
      lastSeen: 'Aktif 1 jam lalu',
   },
   {
      imageUrl: 'https://picsum.photos/200',
      name: 'Aril Setiawan Rahman',
      status: 'online',
      lastSeen: 'Online',
   },
   { name: 'Putry Nababan', status: 'offline', lastSeen: 'Aktif kemarin' },
   { name: 'Kaa', status: 'online', lastSeen: 'Online' },
   {
      imageUrl: 'https://picsum.photos/id/57/100/100',

      name: 'DiriKu Novi',
      status: 'offline',
      lastSeen: 'Aktif 2 hari lalu',
   },
   { name: 'Wahyu', status: 'online', lastSeen: 'Online' },
   { name: 'P Napitupulu', status: 'offline', lastSeen: 'Aktif 4 hari lalu' },
   { name: 'Hanny Arsyilla', status: 'online', lastSeen: 'Online' },
   {
      name: 'Serliani Noni',
      status: 'offline',
      lastSeen: 'Aktif 1 minggu lalu',
   },
   {
      imageUrl: 'https://picsum.photos/id/227/200/200',
      name: 'Takim Takim',
      status: 'offline',
      lastSeen: 'Aktif 2 minggu lalu',
   },
   { name: 'Kaleng Adya', status: 'online', lastSeen: 'Online' },
   {
      imageUrl: 'https://picsum.photos/id/137/100/100',
      name: 'Johor Nababan',
      status: 'offline',
      lastSeen: 'Aktif bulan lalu',
   },
]

export const messages: ChatMessage[] = [
   {
      author: 'Guy Hawkins',
      time: '01.25 AM',
      text: "Yes, I've looked it over. Seems like a fun challenge. Do we have any initial ideas brewing?",
      isOwn: false,
   },
   {
      author: 'You',
      time: '01.32 AM',
      text: "I've got a few sketches already. Thinking of incorporating some sleek animations for the website interface. What do you all think?",
      isOwn: true,
   },
   {
      author: 'Theresa Web',
      time: '01.35 AM',
      text: 'Sounds cool. I was playing around with some color palettes and layout references too.',
      isOwn: false,
   },
]
