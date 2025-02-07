import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import BigNumber from 'bignumber.js'

import type { RootState } from 'core/store'
import { selectSettingsState, setDonuts } from 'features/settings'

import { dailyRewardsClient } from '../../client'
import { RouletteItem } from '../../types'
import { selectDailyRewardsState } from '../selectors'
import { patchDailyRewardsState } from '../slice'

export const setSpinTicketsCount = createAsyncThunk(
  'daily-rewards/set-spin-tickets-count',
  async (count: number, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi

    dispatch(patchDailyRewardsState({ spinTicketsCount: count }))
  },
)

export const spinRoulette = createAsyncThunk(
  'daily-rewards/spin-roulette',
  async (_, thunkApi): Promise<RouletteItem> => {
    const { dispatch } = thunkApi

    try {
      dispatch(patchDailyRewardsState({ isLoadingSpinPrize: true, isSpinPrizeError: false }))

      const spinPrize = await dailyRewardsClient.spinRoulette()

      const state = thunkApi.getState() as RootState

      const { spinTicketsCount } = selectDailyRewardsState(state)
      dispatch(patchDailyRewardsState({ spinPrize, spinTicketsCount: spinTicketsCount - 1, isLoadingSpinPrize: false }))

      const { donuts } = selectSettingsState(state)
      const donutsWithReward = BigNumber(donuts).plus(spinPrize.value).toString()
      await dispatch(setDonuts(donutsWithReward))

      return spinPrize
    } catch (error) {
      dispatch(patchDailyRewardsState({ isLoadingSpinPrize: false, isSpinPrizeError: true }))

      if (axios.isAxiosError(error)) {
        const errType = error.response?.data?.error?.type

        if (errType === 'insufficiently_ticket') {
          throw new Error('insufficiently_ticket')
        }
      }

      throw error
    }
  },
)
