import { FC, useCallback, useEffect, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'core/components/button'
import { Tablet } from 'core/components/tablet'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { DailyBonus, selectDailyRewardsState } from 'features/daily-rewards'

import styles from './styles.module.scss'

const CHUNK_SIZE = 6

export const DailyRewardPage: FC = () => {
  const { dailyRewards, dailyBonuses } = useAppSelector(selectDailyRewardsState)

  const shownChunk = useMemo(
    () => (dailyRewards?.day ? Math.floor(dailyRewards.day / CHUNK_SIZE) : 0),
    [dailyRewards?.day],
  )
  const dailyBonusesShown = useMemo(() => {
    const chunks = dailyBonuses.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / CHUNK_SIZE)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // начинаем новый подмассив
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [] as DailyBonus[][])

    const shownArray = chunks.length && chunks[shownChunk] ? [...chunks[shownChunk]] : []

    if (shownArray.length < CHUNK_SIZE && shownChunk > 0) {
      const prevChunk = chunks[shownChunk - 1]

      if (prevChunk) {
        const addtionalLen = CHUNK_SIZE - shownArray.length
        shownArray.unshift(...prevChunk.slice(-1 * addtionalLen))
      }
    }

    return shownArray
  }, [dailyBonuses, shownChunk])

  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoNextPage = useCallback((): void => navigate('/clicker'), [navigate])

  useEffect(() => {
    if (dailyRewards?.isAlreadyCollected || !dailyRewards) {
      handleGoNextPage()
    }
  }, [dailyRewards, handleGoNextPage])

  return (
    <div className={styles.container}>
      <img className={styles.modalHeaderImage} src='/images/daily-reward/raccoon.png' alt='raccoon' />

      <Tablet title={t('Check Daily')} className={styles.tablet}>
        <Text className={styles.checkInDays} textStyle='h4'>
          {t('Continuous Check-in Days: {{days}}', { days: dailyRewards?.day || 1 })}
        </Text>

        <div className={styles.rewardsContainer}>
          {dailyBonusesShown.map((bonus) => (
            <div key={bonus.day} className={styles.reward}>
              <img src='/images/daily-reward/donuts.png' draggable={false} alt='donuts' />

              <Text>x{bonus.bonus}</Text>

              <Text className={styles.day} textStyle='h3'>
                {t('Day')} {bonus.day}
              </Text>
            </div>
          ))}
        </div>
      </Tablet>

      <div className={styles.prizeContainer}>
        <Text textStyle='h4'>{t('Daily check-ins unlock Ultimate prize')}</Text>
        <img src='/images/daily-reward/prize.svg' draggable={false} alt='prize' />
      </div>

      <Button className={styles.collectButton} onClick={handleGoNextPage}>
        <Text textStyle='button'>{t('Collect')}</Text>
      </Button>
    </div>
  )
}
