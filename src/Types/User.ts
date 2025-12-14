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

export interface LowyerInfoType {
  name: string
  experience: number
  imgLink: string
  ratingScore: number
  reviews: string[]
  services: string[]
}

