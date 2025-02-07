import axios, { AxiosInstance } from 'axios'

import { envConfig } from 'core/env-config'
import { getAuthKey } from 'features/tg-api'

import type { GetBoosts, PostUpgradeBoost } from './types'
import { BoostType } from '../constants'
import type { Boost } from '../types'
import { formatBoosts } from '../utils/format-boosts'

class BoostClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getBoostsList(): Promise<Boost[]> {
    const { data } = await this.req.get<GetBoosts>('/boosts')

    if (!data.success) throw new Error('Cannot get boosts list')

    return formatBoosts({
      boostsInfo: data.response.list,
      userBoosts: data.response.my,
    })
  }

  async buyBoost(boostId: BoostType): Promise<void> {
    const { data } = await this.req.post<PostUpgradeBoost>('/boost/upgrade', {
      boost_type: boostId,
    })

    if (!data.success) throw new Error('Cannot upgrade boost')
  }
}

export const boostClient = new BoostClient()
