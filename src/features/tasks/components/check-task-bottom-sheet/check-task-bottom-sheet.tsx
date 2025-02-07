import { FC } from 'react'

import { postEvent } from '@telegram-apps/sdk'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from 'core/components/bottom-sheet'
import { Button } from 'core/components/button'
import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'
import { Language } from 'features/localization'
import { selectSettingsState } from 'features/settings'

import linkImg from './assets/link.svg'
import styles from './styles.module.scss'
import { checkTaskComplete } from '../../store/actions/check-task'
import { selectTasksState } from '../../store/selectors'
import type { Task } from '../../types'
import { TasksIcon } from '../tasks-icon'

interface Props {
  task: Task
  isOpened: boolean
  onClose: () => void
}

const text = encodeURIComponent(`💸RaccoonCoin Airdrop app: play-to-get-airdrop\n🎉Click and hit the raccoon`)

export const CheckTaskBottomSheet: FC<Props> = ({ task, isOpened, onClose }) => {
  const { userInfo } = useAppSelector(selectSettingsState)
  const { isTaskChecking } = useAppSelector(selectTasksState)

  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()
  const language = i18n.language as Language

  const handleCheckComplete = async (): Promise<void> => {
    try {
      await dispatch(checkTaskComplete(task.id)).unwrap()
      onClose()
      toast.success(t('Task is done!'), { duration: 2000 })
    } catch (e) {
      toast.error(t('Task is not completed'))
    }
  }

  const handleGoTo = (): void => {
    try {
      if (task.link === 'invite') {
        postEvent('web_app_open_tg_link', {
          path_full: `/share/url?url=${encodeURIComponent(userInfo?.referralLink || '')}&text=${text}`,
        })

        return
      }

      if (task.link.startsWith('https://t.me/')) {
        postEvent('web_app_open_tg_link', {
          path_full: task.link.replace('https://t.me', ''),
        })

        return
      }

      postEvent('web_app_open_link', { url: task.link })
    } catch (e) {
      toast.error(t('Something went wrong'))
    }
  }

  return (
    <BottomSheet isOpened={isOpened} onClose={onClose}>
      <div className={styles.container}>
        <TasksIcon task={task} containerClassName={styles.icon} />
        <Text className={styles.title} textStyle='h2'>
          {task.localeInfo[language].name}
        </Text>
        <Text className={styles.description}>{task.localeInfo[language].description}</Text>

        <Text className={styles.priceTitle}>Reward</Text>

        <Price className={styles.price} textStyle='h1' price={task.price} iconSize={32} iconMarginRight={8} />

        <Button className={styles.link} onClick={handleGoTo}>
          {task.link === 'invite' ? t('INVITE') : t('GO TO CHANNEL')}

          <img src={linkImg} alt='link' draggable={false}/>
        </Button>

        <Button className={styles.button} onClick={handleCheckComplete} disabled={isTaskChecking}>
          {isTaskChecking ? t('LOADING...') : t('CHECK')}
        </Button>
      </div>
    </BottomSheet>
  )
}
