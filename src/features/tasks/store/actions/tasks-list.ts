import { createAsyncThunk } from '@reduxjs/toolkit'

import { tasksClient } from '../../client'
import { patchTasksState } from '../slice'

export const getTasksList = createAsyncThunk('tasks/get-tasks-list', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    const tasks = await tasksClient.getTasksList()

    dispatch(patchTasksState({ tasks, isTasksLoaded: true }))
  } catch (e) {
    dispatch(patchTasksState({ isTasksLoaded: true, isTasksError: true }))
  }
})
