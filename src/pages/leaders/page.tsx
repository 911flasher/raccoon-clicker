import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { LeadersList, TotalUsers } from 'features/leaders'
import { GoBack, SectionHeader } from 'features/page-layout'

export const LeadersPage: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoBack title={t('Leaders')} />
      <SectionHeader name='leaders' />
      <TotalUsers />
      <LeadersList />
    </>
  )
}
