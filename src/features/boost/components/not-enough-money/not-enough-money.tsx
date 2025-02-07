import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'core/components/button'
import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props {
  isVisible: boolean
  amount: number
  onClose: () => void
}

export const NotEnoughMoney: FC<Props> = ({ isVisible, amount, onClose }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoShop = (): void => navigate('/market')

  if (!isVisible) return null

  return (
    <div className={styles.container}>
      <div role='presentation' className={styles.bgShadow} onClick={onClose} />

      <div className={styles.innerContainer}>
        <button type='button' onClick={onClose} className={styles.closeButton}>
          <img src='/images/icons/close.svg' alt='close'  draggable="false"/>
        </button>

        <Text textStyle='h2' className={styles.title}>
          {t('Not enough beer!')}
        </Text>
        <img className={styles.img}  draggable="false" src='/images/boosts/not-enough.png' alt='not enough' />

        <div>
          <Text>{t('You need {{amount}} more beer.', { amount })}</Text>
          <Text>{t('Would you like get more?')}</Text>
        </div>

        <Button className={styles.button} onClick={handleGoShop}>
          <Text textStyle='h3'>{t('R-shop')}</Text>
        </Button>
      </div>
    </div>
  )
}
