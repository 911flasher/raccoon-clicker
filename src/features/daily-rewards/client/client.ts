import axios, { AxiosInstance } from 'axios'

import { envConfig } from 'core/env-config'
import { formatFloatAmount } from 'core/utils/format-balance'
import { getAuthKey } from 'features/tg-api'

import { SpinRouletteResponse, GetRouletteResponse } from './types'
import { RouletteItem } from '../types'

class DailyRewardsClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getAvailablePrizes(): Promise<RouletteItem[]> {
    const response = await this.req.get<GetRouletteResponse>(`/user/roulette`)

    if (!response.data.success) {
      throw new Error('Roulette is unavaliable')
    }

    return response.data.response.available.map((item) => ({
      type: item.type,
      value: formatFloatAmount(item.value),
    }))
  }

  async spinRoulette(): Promise<RouletteItem> {
    const response = await this.req.post<SpinRouletteResponse>(`/user/roulette`)

    if (!response.data.success) {
      throw new Error('Failed to load friends list')
    }

    const { won } = response.data.response

    return {
      type: won.type,
      value: formatFloatAmount(won.value),
    }
  }
}

export const dailyRewardsClient = new DailyRewardsClient()
