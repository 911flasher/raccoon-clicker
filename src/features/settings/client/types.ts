import { BoostType, type BoostInfo, type Boost } from 'features/boost'
import type { ClickerInfo } from 'features/clicker'
import type { DailyRewards } from 'features/daily-rewards'
import { Guild, GuildInfo } from 'features/guilds'

import type { UserInfo } from '../types'

interface GuildInfoResponse {
  id: Guild
  option: {
    reward: number
    position: [number] | [number, number]
  }
}

export interface ConfigResponse {
  boosts: Record<BoostType, BoostInfo[]>
  guilds: GuildInfoResponse[]
  daily_bonus: number[]
}

export interface GetConfigResponse {
  success: true
  response: ConfigResponse
}

export interface GetMePreload {
  boosts: Record<BoostType, Record<string, number>>
  daily: {
    count: number
    action: string
    reward: number
  }
  guild: GuildInfoResponse
  salt: string
}

export interface GetMeResponse {
  success: true
  response: {
    preload: GetMePreload
    user: {
      chat_id: number
      telegram_data: {
        id: number
        first_name: string
        last_name: string
        username: string
        language_code: string
        is_premium: boolean
        allows_write_to_pm: boolean
      }
      referral_link: string
      points: number
      energy: number
      leaderboard_position: number
      passive: {
        energy: number
        points: number
      }
      level: number
      level_percentage: number
      ticket_balance: number
      time_last_wheel: number
      donate_points: number
      custom_points: {
        point_type: string
        points: number
      }[]
    }
  }
}

export interface GetMeInfo {
  userInfo: UserInfo
  clickerInfo: ClickerInfo
  dailyRewards: DailyRewards
  ticketBalance: number
  balances: {
    donuts: string
    beer: string
    otherBalances: {
      [key: string]: string
    }
  }
  boost: {
    boosts: Boost[]
    passive: { points: string; energy: string }
  }
  guilds: {
    current: Guild
    guildsInfo: GuildInfo[]
  }
}
