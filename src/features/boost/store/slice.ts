import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import { Boost } from '../types'

export interface BoostsState {
  boosts: Boost[]
  energyRecoveryEffect: string

  passive: {
    points: string
    energy: string
  }

  isBoostUpgrading: boolean

  isBoostsLoaded: boolean
  isBoostsError: boolean
}

export const initialBoostsState: BoostsState = {
  boosts: [],
  energyRecoveryEffect: '0',

  passive: { points: '0', energy: '0' },

  isBoostUpgrading: false,

  isBoostsLoaded: false,
  isBoostsError: false,
}

export const boostsSlice = createSlice({
  name: 'boosts',
  initialState: initialBoostsState,
  reducers: {
    patchBoostsState: (state, action: PayloadAction<Partial<BoostsState>>) => patchStateReducer(state, action),
    resetBoostsState: () => initialBoostsState,
  },
})

export const { patchBoostsState, resetBoostsState } = boostsSlice.actions
