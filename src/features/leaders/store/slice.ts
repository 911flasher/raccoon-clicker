import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import { AppStats, Leader } from '../types'

export interface LeadersState {
  leaders: Leader[]
  stats?: AppStats

  isLeadersLoaded: boolean
  isLeadersError: boolean
}

export const initialLeadersState: LeadersState = {
  leaders: [],

  isLeadersLoaded: false,
  isLeadersError: false,
}

export const leadersSlice = createSlice({
  name: 'leaders',
  initialState: initialLeadersState,
  reducers: {
    patchLeadersState: (state, action: PayloadAction<Partial<LeadersState>>) => patchStateReducer(state, action),
    resetLeadersState: () => initialLeadersState,
  },
})

export const { patchLeadersState, resetLeadersState } = leadersSlice.actions
