import { createAsyncThunk } from '@reduxjs/toolkit'

import { leadersClient } from '../../client'
import { patchLeadersState } from '../slice'

export const getAppStats = createAsyncThunk('leaders/get-app-stats', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  const stats = await leadersClient.getStats()
  dispatch(patchLeadersState({ stats }))
})
