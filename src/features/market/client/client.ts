import axios, { AxiosInstance } from 'axios'
import BigNumber from 'bignumber.js'

import { envConfig } from 'core/env-config'
import { formatFloatAmount } from 'core/utils/format-balance'
import { getAuthKey } from 'features/tg-api'

import type {
  GetInvoiceResponse,
  GetMarketItemsResponse,
  GetPacksResponse,
  MarketItemData,
  PackItemData,
} from './types'
import type { MarketItemInfo, PackItemInfo } from '../types'

class MarketClient {
  req: AxiosInstance

  constructor() {
    this.req = axios.create({
      baseURL: envConfig.apiUrl,
      headers: {
        'x-telegram-auth': getAuthKey(),
      },
    })
  }

  async getMarketItems(): Promise<{ merch: MarketItemInfo[]; electronic: MarketItemInfo[] }> {
    const { data } = await this.req.get<GetMarketItemsResponse>('/shop/items')

    if (!data.success) {
      throw new Error('Cannot get leaderboard list')
    }

    const merch = data.response.filter(({ tag }) => tag === 'merch').map(this.mapMarketItem)
    const electronic = data.response.filter(({ tag }) => tag === 'electronic').map(this.mapMarketItem)

    return { merch, electronic }
  }

  async getPacks(): Promise<PackItemInfo[]> {
    const { data } = await this.req.get<GetPacksResponse>('/shop/packs')

    if (!data.success) {
      throw new Error('Cannot get leaderboard list')
    }

    return data.response.map(this.mapPackItem)
  }

  async buyPack(packId: number): Promise<string> {
    const { data } = await this.req.post<GetInvoiceResponse>('/invoice', {
      pack_id: packId,
      method: 'XTR',
    })

    if (!data.success) {
      throw new Error('Cannot get invoice')
    }

    return data.response.data
  }

  private mapMarketItem(item: MarketItemData, index: number): MarketItemInfo {
    return {
      id: index,
      brand: item.brand,
      image: item.image,
      name: item.name,
      shortName: item.name_short,
      price: item.price,
      oldPrice: item.price_old,
      tags: item.tags,
    }
  }

  private mapPackItem(item: PackItemData): PackItemInfo {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      imageUrl: item.image_url,
      amountUsd: formatFloatAmount(item.amount_usd),
      reward: item.reward.map(({ type, value }) => {
        const bigValue = BigNumber(value)

        return { type, value: type === 'points' ? formatFloatAmount(bigValue) : bigValue.toString() }
      }),
      currencies: item.currencies.map(({ method, value }) => ({ method, value: BigNumber(value).toString() })),
    }
  }
}

export const marketClient = new MarketClient()
