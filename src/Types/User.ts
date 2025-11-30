export interface User {
  phone_number: number
  email?: string
  name: string
  credit: number
  history: {
    chats_history: number[] //id of chats.
    weblog_history: number[] //id of weblogs.
  }
}

