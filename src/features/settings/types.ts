import { Language } from 'features/localization'

export enum BalanceType {
  Donuts = 'donuts',
  Beer = 'beer',
  Dogecoin = 'dogecoin',
  Pepecoin = 'pepecoin',
  ShibaInu = 'shiba-inu',
}

export interface UserInfo {
  id: number
  name: string
  avatar: string
  referralLink: string
  points: string
  leaderboardPosition: number
  level: number
  language: Language
  username?: string
}
