import axios, { AxiosInstance } from 'axios'
import BigNumber from 'bignumber.js'

import { envConfig } from 'core/env-config'
import { deleteDecimalPart } from 'core/utils/delete-decimal-part'
import { formatFloatAmount } from 'core/utils/format-balance'
import { type Boost, BoostType, formatBoosts } from 'features/boost'
import { Guild } from 'features/guilds'
import { Language } from 'features/localization'
import { getAuthKey } from 'features/tg-api'

import type { ConfigResponse, GetConfigResponse, GetMeInfo, GetMeResponse } from './types'

class SettingsClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth':getAuthKey(),
      },
    })
  }

  async getConfig(): Promise<ConfigResponse> {
    const { data } = await this.req.get<GetConfigResponse>('/config')

    if (!data.success) throw new Error('Cannot get app config')

    return data.response
  }

  async getUserInfo({ boosts: boostsInfo, guilds }: ConfigResponse): Promise<GetMeInfo> {
    const { data } = await this.req.get<GetMeResponse>('/user/getMe')

    if (!data.success) throw new Error('Cannot get user info')

    const boost = this.formatBoost(data, boostsInfo)

    return {
      boost,
      balances: this.formatBalances(data),
      userInfo: this.formatUserInfo(data),
      clickerInfo: this.formatClickerInfo(data, boost.boosts),
      dailyRewards: this.formatDailyReward(data),
      ticketBalance: data.response.user.ticket_balance,
      guilds: this.formatGuilds(data, guilds),
    }
  }

  private formatUserInfo(data: GetMeResponse): GetMeInfo['userInfo'] {
    let language = data.response.user.telegram_data.language_code as Language

    if (!Object.values(Language).includes(language)) {
      language = Language.English
    }

    return {
      language,
      id: data.response.user.telegram_data.id,
      name: this.formatName(data.response.user.telegram_data.first_name, data.response.user.telegram_data.last_name),
      referralLink: `https://t.me/raccooncoinbot?start=r-${data.response.user.telegram_data.id}`,
      leaderboardPosition: data.response.user.leaderboard_position,
      points: formatFloatAmount(data.response.user.points),
      username: data.response.user.telegram_data.username,
      level: data.response.user.level,
      avatar: `https://t.me/i/userpic/320/${data.response.user.telegram_data.username || 'user'}.jpg`,
    }
  }

  private formatClickerInfo(data: GetMeResponse, boosts: Boost[]): GetMeInfo['clickerInfo'] {
    const salt = data.response.preload ? data.response.preload.salt : undefined
    const maxEnergyBoost = boosts.find((boost) => boost.id === BoostType.MaxEnergy)

    return {
      salt,
      remainingEnergy: formatFloatAmount(data.response.user.energy),
      totalEnergy: maxEnergyBoost?.effect || '1000',
    }
  }

  private formatDailyReward(data: GetMeResponse): GetMeInfo['dailyRewards'] {
    return {
      day: BigNumber(data.response?.preload?.daily?.count || 0).toNumber(),
      reward: formatFloatAmount(data.response.preload?.daily?.reward || 0),
      isAlreadyCollected: data.response.preload?.daily?.action === 'already_collected',
    }
  }

  private formatBoost(data: GetMeResponse, boostsInfo: ConfigResponse['boosts']): GetMeInfo['boost'] {
    return {
      boosts: formatBoosts({ boostsInfo, userBoosts: data.response.preload.boosts }),
      passive: {
        energy: formatFloatAmount(data.response.user.passive.energy),
        points: formatFloatAmount(data.response.user.passive.points),
      },
    }
  }

  private formatGuilds(data: GetMeResponse, guilds: ConfigResponse['guilds']): GetMeInfo['guilds'] {
    const guildsInfo = [Guild.Maggie, Guild.Lisa, Guild.Bart, Guild.Marge, Guild.Homer].map((guild) => {
      const info = guilds.find((g) => g.id === guild)

      if (!info) throw new Error('Cannot get guilds info')

      let startPosition: number | undefined = info.option.position[0]
      let endPosition: number | undefined =
        info.option.position.length === 2 ? info.option.position[1] : info.option.position[0]

      if (guild === Guild.Maggie) startPosition = undefined

      if (guild === Guild.Homer) endPosition = undefined

      return {
        id: guild,
        option: {
          reward: formatFloatAmount(info.option.reward),
          startPosition: startPosition ? Number(deleteDecimalPart(formatFloatAmount(startPosition))) : undefined,
          endPosition: endPosition ? Number(deleteDecimalPart(formatFloatAmount(endPosition))) : undefined,
        },
      }
    })

    return {
      current: data.response.preload.guild.id,
      guildsInfo,
    }
  }

  private formatBalances(data: GetMeResponse): GetMeInfo['balances'] {
    return {
      donuts: formatFloatAmount(data.response.user.points),
      beer: String(data.response.user.donate_points),
      otherBalances: data.response.user.custom_points.reduce(
        (acc, point) => ({
          ...acc,
          [point.point_type]: formatFloatAmount(point.points),
        }),
        {},
      ),
    }
  }

  private formatName(firstName?: string, lastName?: string): string {
    if (firstName && lastName) return `${firstName} ${lastName}`

    if (lastName) return lastName

    return firstName || 'Unknown user'
  }
}

export const settingsClient = new SettingsClient()
