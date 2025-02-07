import axios, { AxiosInstance } from 'axios'
import { nanoid } from 'nanoid'

import { envConfig } from 'core/env-config'
import { formatFloatAmount } from 'core/utils/format-balance'
import { getAuthKey } from 'features/tg-api'

import { Friend, FriendResponse } from '../types'

class FriendsClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getFriendsList(page: number): Promise<{ list: Friend[]; hasNextPage: boolean }> {
    const response = await this.req.get<FriendResponse>('/team/list', { params: { offset: (page - 1) * 50 } })

    if (!response.data.success) {
      throw new Error('Failed to load friends list')
    }

    return {
      list: response.data.response.list.map(
        (item): Friend => ({
          id: nanoid(),
          name: item.first_name,
          profit: formatFloatAmount(item.points_level_1),
          avatar: item.username ? `https://t.me/i/userpic/320/${item.username}.jpg` : undefined,
        }),
      ),
      hasNextPage: response.data.response.list.length >= 50,
    }
  }
}

export const friendsClient = new FriendsClient()
