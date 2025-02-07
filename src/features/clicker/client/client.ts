import axios, { AxiosInstance } from 'axios'
import dayjs from 'dayjs'

import { envConfig } from 'core/env-config'
import { sha1 } from 'core/utils/crypto'
import { formatFloatAmount } from 'core/utils/format-balance'
import { getAuthKey } from 'features/tg-api'

import type { NewClicksInfo, PostClicksApply } from './types'

class ClickerClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async requestMoreClicks(body: { count: number; salt: string }): Promise<NewClicksInfo> {
    if (!body.count) throw new Error('Incorrect count')

    const hash = body.salt ? await sha1(`${body.salt}:${body.count}`) : ''
    const { data } = await this.req.post<PostClicksApply>('/click/apply', {
      count: body.count,
      hash,
    })
    
    const event: NewClicksInfo['event'] = data.response.event
      ? {
          type: data.response.event.type,
          data: {
            token: data.response.event.data.token,
            expired: data.response.event.expired,
            value: formatFloatAmount(data.response.event.data.value),
          },
        }
      : null

    const isCorrectEvent = dayjs(event?.data?.expired).isAfter(dayjs())

    return {
      event: isCorrectEvent ? event : null,
      clicksApplied: data.response.points_earned,
      currentPoints: formatFloatAmount(data.response.points),
      salt: data.response.salt,
      energy: formatFloatAmount(data.response.current_energy),
    }
  }
}

export const clickerClient = new ClickerClient()
