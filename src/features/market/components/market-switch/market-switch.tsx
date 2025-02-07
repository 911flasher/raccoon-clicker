import { FC } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props {
  isMerch: boolean
  onChooseIsMerch: (isMerch: boolean) => void
}

export const MarketSwitch: FC<Props> = ({ isMerch, onChooseIsMerch }) => {
  const { t } = useTranslation()

  const handleChoose = (value: boolean) => () => onChooseIsMerch(value)

  return (
    <div className={styles.container}>
      <button type='button' onClick={handleChoose(false)}>
        <Text className={clsx(styles.item, { [styles.itemActive]: !isMerch })} textStyle='menuText'>
          {t('Electronic')}
        </Text>
      </button>

      {/* <button type='button' onClick={handleChoose(true)}>
        <Text className={clsx(styles.item, { [styles.itemActive]: isMerch })} textStyle='menuText'>
          {t('Merch')}
        </Text>
      </button> */}
    </div>
  )
}
