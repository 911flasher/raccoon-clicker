import { Language } from 'features/localization'

export enum TaskType {
  Instagram = 'instagram',
  Telegram = 'telegram',
  Discord = 'discord',
  Unknown = 'unknown',
}

export interface LocaleInfo {
  name: string
  description: string
  buttonCheck: string
  buttonLink: string
}

export interface Task {
  id: string
  price: string
  type: TaskType
  isHot: boolean
  link: string
  localeInfo: Record<Language, LocaleInfo>
}
