import { BoostType } from './constants'

export interface Boost {
  id: BoostType
  currentLevel: number
  maxLevel: number
  upgradeCost: string
  effect: string
}

export interface BoostInfo {
  level: number
  cost: string
  effect: number
}
