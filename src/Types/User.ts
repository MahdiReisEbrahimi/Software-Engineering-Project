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
  id: number
  name: string
  experience: number
  imgLink: string
  ratingScore: number
  reviews: string[]
  services: string[]
  coordinates: [number, number]
}

export interface LowyerSignupForm {
  name: string | null
  fatherName: string | null
  nationalityCode: number | null
  birthDate: Date | null
  sex: string | null
  // jobData
  experience: number | null
  img: File | null
  services: string[] | null
  coordinates: [number, number] | null
  // securityData
  password: string | null
}

export interface IdentityRuleForm {
  name: string | null
  fatherName: string | null
  nationalityCode: number | null
  birthDate: Date | null
  sex: 'man' | 'woman'
}

export interface JobRuleForm {
  id?: string
  experience: number
  img: File | null
  services: string[]
  coordinates: [number, number]
}
