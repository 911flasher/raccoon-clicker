import { createAsyncThunk } from '@reduxjs/toolkit'

import { getLeadersList } from './leaders-list'
import { getAppStats } from './stats'

export const initLeadersState = createAsyncThunk('boosts/init', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  await dispatch(getAppStats())
  await dispatch(getLeadersList())
})
