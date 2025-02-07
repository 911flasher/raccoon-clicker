import { FC } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Language } from 'features/localization'

import styles from './styles.module.scss'
import { Task, TaskType } from '../../types'

interface Props {
  task: Task
  containerClassName?: string
}

const icons: Record<TaskType, string> = {
  [TaskType.Instagram]: 'images/social/instagram.svg',
  [TaskType.Discord]: 'images/social/discord.svg',
  [TaskType.Telegram]: 'images/social/telegram.svg',
  [TaskType.Unknown]: 'images/social/telegram.svg',
}

export const TasksIcon: FC<Props> = ({ task, containerClassName }) => {
  const { i18n } = useTranslation()

  const language = i18n.language as Language
  const icon = icons[task.type]

  return <img src={icon} alt={task.localeInfo[language].name} draggable={false} className={clsx(styles.icon, containerClassName)} />
}
