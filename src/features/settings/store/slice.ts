import { createSlice } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils/patch-state-reducer'

import type { UserInfo } from '../types'

export interface SettingsState {
  userInfo?: UserInfo

  donuts: string
  beer: string
  dogecoin: string
  pepecoin: string
  shibaInu: string

  isAppInitialized: boolean
}

const initialState: SettingsState = {
  userInfo: undefined,

  donuts: '0',
  beer: '0',
  dogecoin: '0',
  pepecoin: '0',
  shibaInu: '0',

  isAppInitialized: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    patchSettingsState: patchStateReducer<SettingsState>,
  },
})

export const { patchSettingsState } = settingsSlice.actions
