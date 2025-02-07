import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

export const EarnPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <Text textStyle='h1'>{t('Coming soon')}</Text>
      <img src='/images/earn/earn.png' draggable={false} alt='earn' />
      <Text textStyle='h1'>{t('Play-to-earn')}</Text>
    </div>
  )
}
