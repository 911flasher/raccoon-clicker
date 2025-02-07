import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'

import styles from './styles.module.scss'
import { formatAmount, goal } from './utils'
import { selectPresaleState } from '../../store/selectors'

export const RaisedMoney: FC = () => {
  const { raised } = useAppSelector(selectPresaleState)

  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <Text className={styles.title} textStyle='h1'>
        {t('USD VALUE RAISED')}
      </Text>

      <Text className={styles.amount}>
        ${formatAmount(raised)} /<br /> ${formatAmount(goal)} {t('GOAL')}
      </Text>
    </div>
  )
}
