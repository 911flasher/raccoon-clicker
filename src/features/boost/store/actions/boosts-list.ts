import { createAsyncThunk } from '@reduxjs/toolkit'

import { boostClient } from '../../client'
import { BoostType } from '../../constants'
import { patchBoostsState } from '../slice'

export const getBoostsList = createAsyncThunk('boosts/get-boosts-list', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    const boosts = await boostClient.getBoostsList()
    const energyRecoveryEffect = boosts.find((boost) => boost.id === BoostType.EnergyRecoverySpeed)?.effect

    dispatch(patchBoostsState({ boosts, energyRecoveryEffect, isBoostsLoaded: true }))
  } catch (e) {
    dispatch(patchBoostsState({ isBoostsError: true, isBoostsLoaded: true }))
  }
})
