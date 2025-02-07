import { createAsyncThunk } from '@reduxjs/toolkit'

import { getTasksList } from './tasks-list'

export const initTasksState = createAsyncThunk('tasks/init', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  await dispatch(getTasksList())
})
