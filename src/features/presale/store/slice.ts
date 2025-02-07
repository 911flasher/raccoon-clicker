import { createSlice } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils/patch-state-reducer'

export interface PresaleState {
  raised: string
}

const initialState: PresaleState = {
  raised: '0',
}

export const presaleSlice = createSlice({
  name: 'presale',
  initialState,
  reducers: {
    patchPresaleState: patchStateReducer<PresaleState>,
  },
})

export const { patchPresaleState } = presaleSlice.actions
