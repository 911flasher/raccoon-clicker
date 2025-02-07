import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { LanguageSelector } from 'features/localization'
import { GoBack } from 'features/page-layout'
import { BalancesList } from 'features/settings'

import styles from './styles.module.scss'

export const ProfilePage: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className={styles.header}>
        <GoBack title={t('Profile')} />

        <LanguageSelector />
      </div>

      <BalancesList />
    </>
  )
}
