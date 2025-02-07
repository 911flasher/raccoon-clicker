import { createAsyncThunk } from '@reduxjs/toolkit'

import type { DailyRewards, DailyBonus } from '../../types'
import { patchDailyRewardsState } from '../slice'

export const setDailyRewardsInfo = createAsyncThunk(
  'daily-rewards/set-daily-rewards',
  async (dailyRewards: DailyRewards, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi

    dispatch(patchDailyRewardsState({ dailyRewards }))
  },
)

export const setDailyBonuses = createAsyncThunk(
  'daily-rewards/set-daily-bonuses',
  async (dailyBonuses: DailyBonus[], thunkApi): Promise<void> => {
    const { dispatch } = thunkApi

    dispatch(patchDailyRewardsState({ dailyBonuses }))
  },
)
