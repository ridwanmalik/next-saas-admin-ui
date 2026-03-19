export type Message = {
  id: string
  text: string
  time: string
  sent: boolean
  read?: boolean
}

export type Conversation = {
  id: string
  name: string
  handle: string
  avatar: string
  avatarFallback: string
  avatarColor: string
  online: boolean
  lastMessage: string
  lastTime: string
  unread: number
  messages: Message[]
}
