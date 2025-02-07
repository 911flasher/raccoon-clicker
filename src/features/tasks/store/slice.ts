import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import { Task } from '../types'

export interface TasksState {
  tasks: Task[]

  isTaskChecking: boolean
  isTasksLoaded: boolean
  isTasksError: boolean
}

export const initialTasksState: TasksState = {
  tasks: [],

  isTaskChecking: false,
  isTasksLoaded: false,
  isTasksError: false,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    patchTasksState: (state, action: PayloadAction<Partial<TasksState>>) => patchStateReducer(state, action),
    resetTasksState: () => initialTasksState,
  },
})

export const { patchTasksState, resetTasksState } = tasksSlice.actions
