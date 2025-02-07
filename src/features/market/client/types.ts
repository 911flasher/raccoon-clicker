export interface MarketItemData {
  brand: string
  image: {
    alt: string
    url: string
  }
  name: string
  name_short: string
  price: number
  price_old: number
  tag: 'merch' | 'electronic'
  tags: string[]
}

export interface GetMarketItemsResponse {
  success: boolean
  response: MarketItemData[]
}

export interface PackItemData {
  id: number
  name: string
  description: string
  image_url: string
  amount_usd: number
  reward: {
    type: 'points' | 'donate_points' | 'recovery_energy' | 'ticket_balance'
    value: number
  }[]
  currencies: {
    method: 'XTR'
    value: number
  }[]
}

export interface GetPacksResponse {
  success: boolean
  response: PackItemData[]
}

export interface GetInvoiceResponse {
  success: boolean
  response: {
    payment: {
      id: number
      user_id: number
      payload: string
      pack_id: number
      method: 'XTR'
      platform: 'telegram'
      amount: number
      time_created: number
      time_updated: number | null
      status: number
    }
    data: string
  }
}
