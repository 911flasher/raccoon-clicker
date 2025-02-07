import { Guild } from './constants'

export interface GuildInfo {
  id: Guild
  option: {
    reward: string
    startPosition?: number
    endPosition?: number
  }
}

export interface GuildLeader {
  id: number
  name: string
  points: string
  place: number
  avatar?: string
}
