import { BoostType } from '../constants'
import type { BoostInfo } from '../types'

export interface GetBoosts {
  success: boolean
  response: {
    list: Record<BoostType, BoostInfo[]>
    my: Record<BoostType, Record<string, number>>
  }
}

export interface PostUpgradeBoostSuccess {
  success: true
  response: {
    boost: BoostInfo
  }
}

export interface PostUpgradeBoostError {
  success: false
  error: {
    code: number
    type: 'insufficient_funds' | 'boost_max_level' | string
    message: string
    path: string
  }
}

export type PostUpgradeBoost = PostUpgradeBoostSuccess | PostUpgradeBoostError
