import { createAsyncThunk } from '@reduxjs/toolkit'

import { BoostType } from 'features/boost/constants'

import type { Boost } from '../../types'
import { type BoostsState, patchBoostsState } from '../slice'

interface InitArgs {
  boosts: Boost[]
  passive: BoostsState['passive']
}

export const initBoostsState = createAsyncThunk(
  'boosts/init',
  async ({ boosts, passive }: InitArgs, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi

    const energyRecoveryEffect = boosts.find((boost) => boost.id === BoostType.EnergyRecoverySpeed)?.effect

    dispatch(patchBoostsState({ boosts, passive, energyRecoveryEffect, isBoostsLoaded: true }))
  },
)
