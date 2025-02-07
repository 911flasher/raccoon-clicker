import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { MarketItems } from 'features/market'
import { GoBack } from 'features/page-layout'

export const MarketPage: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoBack title={t('R-shop')} />
      <MarketItems />
    </>
  )
}
