import { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

export const AppInitLoader: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <img src='/images/raccoonfield.png' alt='logo' draggable={false} />
      <Text className={styles.text} textStyle='h2'>{t('Loading...')}</Text>
    </div>
  )
}
