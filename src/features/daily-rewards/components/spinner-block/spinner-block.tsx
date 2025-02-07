import { FC, useState } from 'react'

import { postEvent } from '@telegram-apps/sdk'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { useAppDispatch, useAppSelector } from 'core/store/hooks'
import { selectSettingsState } from 'features/settings'

import styles from './styles.module.scss'
import { spinRoulette } from '../../store/actions/spinner'
import { selectDailyRewardsState } from '../../store/selectors'
import { Spinner } from '../spinner'

const text = `💸RaccoonCoin Airdrop app: play-to-get-airdrop\n🎉Click and hit the raccoon`
const textEncoded = encodeURIComponent(text)

export const SpinnerBlock: FC = () => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [isWin, setIsWin] = useState<boolean>(false)

  const { userInfo } = useAppSelector(selectSettingsState)
  const { isLoadingSpinPrize, spinTicketsCount, spinPrize } = useAppSelector(selectDailyRewardsState)

  const isLoading = isLoadingSpinPrize || isSpinning

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const handleSpin = async (): Promise<void> => {
    try {
      const prize = await dispatch(spinRoulette()).unwrap()

      setIsWin(prize.type !== 'nothing')
      setIsSpinning(true)
    } catch (error) {
      if ((error as Error).message === 'insufficiently_ticket') {
        toast.error(t("You don't have tickets"))

        return
      }

      toast.error(t('Something went wrong'))
    }
  }

  const handleSpinEnd = (): void => setIsSpinning(false)

  const handleShareInTelegram = async (): Promise<void> => {
    try {
      postEvent('web_app_open_tg_link', {
        path_full: `/share/url?url=${encodeURIComponent(userInfo?.referralLink || '')}&text=${textEncoded}`,
      })
    } catch (e) {
      toast.error(`Something went wrong`, { duration: 2000 })
    }
  }

  return (
    <div className={styles.container}>
      <Text className={styles.title} textStyle='h2'>
        {t('Fortune wheel')}
      </Text>

      <Spinner isSpinning={isSpinning} isWin={isWin} onSpinEnd={handleSpinEnd} />

      <Text className={styles.subtitle}>{t('Spin the wheel and get a bonus for your coin production')}</Text>

      <Text className={styles.tickets} textStyle='h1'>
        <img src='/images/daily-reward/ticket.svg' alt='ticket' draggable={false}/>
        <span>{spinTicketsCount}</span>
      </Text>

      {spinPrize && !isLoading && (
        <div className={styles.prize}>
          <Text textStyle='h3'>{t('Your prize: ')}</Text>
          <Price textStyle='h3' price={spinPrize.value} />
        </div>
      )}

      {/* {spinTicketsCount === 0 && !isLoading && !spinPrize && <Text textStyle='h3'>{t('You have no more spins')}</Text>} */}

      {(spinTicketsCount > 0 || isLoading) && (
        <button className={styles.button} type='button' onClick={handleSpin} disabled={isLoading}>
          {isLoading && <Text textStyle='h3'>{t('Loading...')}</Text>}
          {!isLoading && spinTicketsCount > 0 && <Text textStyle='h3'>{t('Spin the wheel')}</Text>}
          {/* {!isLoading && isSpinPrizeError && <Text textStyle='h3'>{t('Error')}</Text>} */}
        </button>
      )}

      {spinTicketsCount === 0 && !isLoading && (
        <button className={styles.button} type='button' onClick={handleShareInTelegram} disabled={isLoading}>
          <Text textStyle='h3'>{t('Invite a friend')}</Text>
        </button>
      )}
    </div>
  )
}
