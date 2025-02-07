import type { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'core/components/button'
import { Price } from 'core/components/price'
import { Tablet } from 'core/components/tablet'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { selectBoostsState } from 'features/boost/store'

import styles from './styles.module.scss'

export const OfflineEarningsPage: FC = () => {
  const { passive } = useAppSelector(selectBoostsState)
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleGoNextPage = (): void => navigate('/daily-reward')

  return (
    <div className={styles.container}>
      <img className={styles.modalHeaderImage} src='/images/offline-earning/raccoon.svg' alt='raccoon' />

      <Tablet title={t('Offline Earning')} className={styles.tablet}>
        <img src='/images/offline-earning/donuts.png' draggable={false} alt='donuts' />

        <Text textStyle='h3'>{t('You have earned!!!')}</Text>

        <div className={styles.price}>
          <Price iconSize={24} textStyle='h3' price={passive.points} />
        </div>

        <Button onClick={handleGoNextPage}>
          <Text textStyle='button'>{t('collect')}</Text>
        </Button>

        <button type='button' className={styles.free}>
          <Text textStyle='h3'>{t('Free')}</Text>
        </button>
      </Tablet>

      <img className={styles.junk} src='/images/offline-earning/junk-food.png' draggable={false} alt='junk food' />
    </div>
  )
}
