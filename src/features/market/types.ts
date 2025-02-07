export interface MarketItemInfo {
  id: number
  brand: string | null
  image: {
    alt: string
    url: string
  }
  name: string
  shortName: string
  price: number
  oldPrice: number
  tags: string[]
}

export interface PackItemInfo {
  id: number
  name: string
  description: string
  imageUrl: string
  amountUsd: string
  reward: {
    type: 'points' | 'donate_points' | 'recovery_energy' | 'ticket_balance'
    value: string
  }[]
  currencies: {
    method: 'XTR'
    value: string
  }[]
}
