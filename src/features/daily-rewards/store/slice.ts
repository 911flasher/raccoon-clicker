import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import type { DailyRewards, RouletteItem, DailyBonus } from '../types'

export interface DailyRewardsState {
  dailyBonuses: DailyBonus[]
  dailyRewards?: DailyRewards

  spinPrize?: RouletteItem
  isSpinPrizeError: boolean
  isLoadingSpinPrize: boolean

  spinTicketsCount: number
}

export const initialClickerState: DailyRewardsState = {
  dailyBonuses: [],
  isLoadingSpinPrize: false,
  isSpinPrizeError: false,
  spinTicketsCount: 0,
}

export const dailyRewardsSlice = createSlice({
  name: 'daily-rewards',
  initialState: initialClickerState,
  reducers: {
    patchDailyRewardsState: (state, action: PayloadAction<Partial<DailyRewardsState>>) =>
      patchStateReducer(state, action),
  },
})

export const { patchDailyRewardsState } = dailyRewardsSlice.actions
