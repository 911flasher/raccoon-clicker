import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import type { Friend } from '../types'

export interface FriendsState {
  friends: Friend[]

  isFriendsLoading: boolean
  isFriendsError: boolean
  lastUploadedPage: number
  hasNextPage: boolean
}

export const initialTasksState: FriendsState = {
  friends: [],

  isFriendsLoading: false,
  isFriendsError: false,
  lastUploadedPage: 0,
  hasNextPage: true,
}

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: initialTasksState,
  reducers: {
    patchFriendsState: (state, action: PayloadAction<Partial<FriendsState>>) => patchStateReducer(state, action),
    resetFriendsState: () => initialTasksState,
  },
})

export const { patchFriendsState, resetFriendsState } = friendsSlice.actions
