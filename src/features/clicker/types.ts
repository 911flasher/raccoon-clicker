import { BalanceType } from 'features/settings'

export interface ClickerInfo {
  remainingEnergy: string
  totalEnergy: string
  salt?: string
}

export type EventType = BalanceType.Dogecoin | BalanceType.Pepecoin | BalanceType.ShibaInu | null
