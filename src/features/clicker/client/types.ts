import { BalanceType } from 'features/settings'

export interface PostClicksApply {
  success: boolean
  response: {
    points_earned: number
    points: number
    current_energy: number
    salt: string
    event: {
      type: 'custom_points'
      expired: string
      data: {
        token: BalanceType.Dogecoin | BalanceType.Pepecoin | BalanceType.ShibaInu
        value: number
      }
    } | null
  }
}

export interface NewClicksInfo {
  clicksApplied: number
  currentPoints: string
  energy: string
  salt: string
  event: {
    type: 'custom_points'
    data: {
      token: BalanceType.Dogecoin | BalanceType.Pepecoin | BalanceType.ShibaInu
      expired: string
      value: string
    }
  } | null
}
