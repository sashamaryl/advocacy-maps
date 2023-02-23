import { Timestamp } from "functions/src/firebase"

export type Flag = {
  id: string
  flagTime: string | Timestamp
  testimonyId: string
  testimonyText: string
  userId: string
  userReason?: string
  moderatorId?: string
  status: "unread" | "inProcess" | "resolved"
  moderatorComment?: string
  moderationDate: string | Timestamp
  removed: boolean
  removedDate: string | Timestamp
  resolved: boolean
  resolvedDate?: string | Timestamp
  messages: FlagMessage[]
}

export type FlagMessage = {
  messageId: string
  flagId: string
  authorId: string
  recipient?: string
  messageDate: string | Timestamp
  messageText: string
}