import { FC, useEffect } from 'react'

import { IceCreamLoader } from 'core/components/ice-cream-loader'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'

import styles from './styles.module.scss'
import { selectTasksState } from '../../store'
import { getTasksList } from '../../store/actions/tasks-list'
import { TaskBlock } from '../task-block'

export const TasksList: FC = () => {
  const { tasks, isTasksLoaded } = useAppSelector(selectTasksState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getTasksList())
  }, [dispatch])

  if (!isTasksLoaded) {
    return (
      <div className={styles.loaderContainer}>
        <IceCreamLoader />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <TaskBlock key={task.id} task={task} />
      ))}
    </div>
  )
}
