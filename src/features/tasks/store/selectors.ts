import type { RootState } from 'core/store'

import type { TasksState } from './slice'

export const selectTasksState = (state: RootState): TasksState => state.tasks
