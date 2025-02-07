import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { BaseBlock } from 'core/components/base-block'
import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { Language } from 'features/localization'

import styles from './styles.module.scss'
import { Task } from '../../types'
import { CheckTaskBottomSheet } from '../check-task-bottom-sheet'
import { TasksIcon } from '../tasks-icon'

interface Props {
  task: Task
}

export const TaskBlock: FC<Props> = ({ task }) => {
  const [isOpened, setIsOpened] = useState(false)

  const { i18n } = useTranslation()
  const language = i18n.language as Language

  const handleOpen = (): void => setIsOpened(true)
  const handleClose = (): void => setIsOpened(false)

  return (
    <>
      <BaseBlock
        className={styles.container}
        borderColor={task.isHot ? 'secondary' : undefined}
        onClick={handleOpen}
        isAnimated
      >
        <TasksIcon task={task} />

        <div>
          <Text>{task.localeInfo[language].name}</Text>
          <Price price={task.price} />
        </div>

        {task.isHot && <img className={styles.hotTask} src='/images/icons/hot-task.png' draggable={false} alt='hot task' />}
      </BaseBlock>

      <CheckTaskBottomSheet task={task} isOpened={isOpened} onClose={handleClose} />
    </>
  )
}
