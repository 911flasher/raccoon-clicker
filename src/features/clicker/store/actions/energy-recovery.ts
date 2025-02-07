import { createAsyncThunk } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

import type { RootState } from 'core/store'
import { selectBoostsState } from 'features/boost/store/selectors'

import { selectClickerState } from '../selectors'
import { patchClickerState } from '../slice'

export const startEnergyRecovery = createAsyncThunk('clicker/bullet-recovery', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi
  const state = thunkApi.getState() as RootState
  const { remainingEnergy, totalEnergy } = selectClickerState(state)
  const { energyRecoveryEffect } = selectBoostsState(state)

  // recoveryEnergy := int(float64(energyRecoverySpeed.Effect) * (float64(elapsed) / float64(EnergyRecoveryRate)))
  // EnergyRecoveryRate = 10
  // elapsed - time elapsed since last energy recovery (1sec)
  const receivedEnergy = BigNumber(1).div(10).times(energyRecoveryEffect).toFixed(0, 1)
  const newAmmo = BigNumber(remainingEnergy).plus(receivedEnergy)

  dispatch(patchClickerState({ remainingEnergy: newAmmo.gte(totalEnergy) ? totalEnergy : newAmmo.toString() }))

  setTimeout(() => dispatch(startEnergyRecovery()), 1000)
})

export const setMaxEnergy = createAsyncThunk('clicker/set-max-energy', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi
  const state = thunkApi.getState() as RootState
  const { totalEnergy } = selectClickerState(state)

  dispatch(patchClickerState({ remainingEnergy: totalEnergy }))
})
