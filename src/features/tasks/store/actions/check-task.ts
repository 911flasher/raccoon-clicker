import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from 'core/store'

import { tasksClient } from '../../client'
import { selectTasksState } from '../selectors'
import { patchTasksState } from '../slice'

export const checkTaskComplete = createAsyncThunk(
  'tasks/checkTaskComplete',
  async (taskId: string, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi
    const state = thunkApi.getState() as RootState
    const { tasks } = selectTasksState(state)

    dispatch(patchTasksState({ isTaskChecking: true }))

    try {
      await tasksClient.checkTaskStatus(taskId)
      const filteredTasks = tasks.filter((task) => task.id !== taskId)

      dispatch(patchTasksState({ tasks: filteredTasks, isTaskChecking: false }))
    } catch (e) {
      dispatch(patchTasksState({ isTaskChecking: false }))

      throw e
    }
  },
)
