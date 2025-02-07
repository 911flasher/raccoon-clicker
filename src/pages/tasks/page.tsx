import type { FC } from 'react'

import { SectionHeader } from 'features/page-layout'
import { TasksList } from 'features/tasks'

export const TasksPage: FC = () => (
  <>
    <SectionHeader name='tasks' />
    {/* <LinkChannelIcon /> */}
    <TasksList />
  </>
)
