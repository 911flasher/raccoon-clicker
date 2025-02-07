import { createAsyncThunk } from '@reduxjs/toolkit'

import { leadersClient } from '../../client'
import { patchLeadersState } from '../slice'

export const getLeadersList = createAsyncThunk('leaders/get-leaders-list', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    const leaders = await leadersClient.getLeadersList()

    dispatch(patchLeadersState({ leaders, isLeadersLoaded: true }))
  } catch (e) {
    dispatch(patchLeadersState({ isLeadersLoaded: true, isLeadersError: true }))
  }
})
