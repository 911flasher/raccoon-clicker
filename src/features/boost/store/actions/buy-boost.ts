import { createAsyncThunk } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

import type { RootState } from 'core/store'
import { selectSettingsState, setBeer } from 'features/settings'

import { getBoostsList } from './boosts-list'
import { boostClient } from '../../client'
import { Boost } from '../../types'
import { patchBoostsState } from '../slice'

export const buyBoost = createAsyncThunk('boosts/buyBoost', async (boost: Boost, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    dispatch(patchBoostsState({ isBoostUpgrading: true }))

    await boostClient.buyBoost(boost.id)
    await dispatch(getBoostsList())

    const state = thunkApi.getState() as RootState
    const { beer } = selectSettingsState(state)

    await dispatch(setBeer(BigNumber(beer).minus(boost.upgradeCost).toString()))
    dispatch(patchBoostsState({ isBoostUpgrading: false }))
  } catch (e) {
    dispatch(patchBoostsState({ isBoostUpgrading: false }))

    throw e
  }
})
