import axios, { AxiosInstance } from 'axios'

import { envConfig } from 'core/env-config'
import { formatFloatAmount } from 'core/utils/format-balance'
import { getAuthKey } from 'features/tg-api'

import { AppStats, Leader, LeaderApiResponse, StatsApiResponse } from '../types'

class LeadersClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getLeadersList(): Promise<Leader[]> {
    const { data } = await this.req.get<LeaderApiResponse>('/leaderboard/list')

    if (!data.success) {
      throw new Error('Cannot get leaderboard list')
    }

    return data.response.list.map((leader, index) => ({
      id: leader.chat_id,
      name: leader.username || leader.first_name || 'User',
      place: index + 1,
      points: formatFloatAmount(leader.points),
      avatar: leader.username ? `https://t.me/i/userpic/320/${leader.username}.jpg` : undefined,
    }))
  }

  async getStats(): Promise<AppStats> {
    const { data } = await this.req.get<StatsApiResponse>('/application/stats')

    if (!data.success) {
      throw new Error('Cannot get leaderboard list')
    }

    return {
      totalUsers: data.response.total_users,
      totalEarnedPoints: data.response.total_earned_points,
      usersToday: data.response.users_today,
      usersOnline: data.response.users_online,
    }
  }
}

export const leadersClient = new LeadersClient()
