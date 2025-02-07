import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { formatNumber } from 'core/utils/format-number'

import styles from './styles.module.scss'
import { selectLeadersState } from '../../store/selectors'

interface Props {}

export const TotalUsers: FC<Props> = () => {
  const { stats } = useAppSelector(selectLeadersState)

  const { t } = useTranslation()

  if (!stats) return null

  return (
    <div className={styles.container}>
      <Text textStyle='bodyText'>{t('Total MMM, DONUTS balance:')}</Text>

      <Price price='15732049663' iconSize={34} iconMarginRight={12} textStyle='h1' className={styles.price} />

      <div className={styles.stats}>
        <img src='/images/leaders/total-players.png' alt='total' draggable={false}/>

        <div className={styles.part}>
          <Text>{formatNumber(38876)}</Text>
          <Text textStyle='h4'>{t('Total Players')}</Text>
        </div>
      </div>

      <div className={styles.stats}>
        <img src='/images/leaders/daily-users.png' alt='daily users' draggable={false}/>

        <div className={styles.part}>
          <Text>{formatNumber(135)}</Text>
          <Text textStyle='h4'>{t('Daily Users')}</Text>
        </div>
      </div>

      <div className={styles.stats}>
        <img src='/images/leaders/online.png' alt='online' draggable={false}/>

        <div className={styles.part}>
          <Text>{formatNumber(9)}</Text>
          <Text textStyle='h4'>{t('Online')}</Text>
        </div>
      </div>
    </div>
  )
}
