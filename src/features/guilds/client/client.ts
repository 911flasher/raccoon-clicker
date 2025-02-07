import axios, { AxiosInstance } from 'axios'

import { envConfig } from 'core/env-config'
import { formatFloatAmount } from 'core/utils/format-balance'
import { getAuthKey } from 'features/tg-api'

import { GetGuildLeadersResponse } from './types'
import { Guild } from '../constants'
import { GuildLeader } from '../types'

class GuildsClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getGuildLeaderList(guild: Guild): Promise<GuildLeader[]> {
    const response = await this.req.get<GetGuildLeadersResponse>(`/leaderboard/${guild}`)

    if (!response.data.success) {
      throw new Error('Failed to load friends list')
    }

    return response.data.response.list.map((item, index) => ({
      id: item.user_id,
      place: index + 1,
      name: item.username || item.first_name || 'User',
      points: formatFloatAmount(item.points),
      avatar: item.username ? `https://t.me/i/userpic/320/${item.username}.jpg` : undefined,
    }))
  }
}

export const guildsClient = new GuildsClient()
