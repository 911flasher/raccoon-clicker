import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { GoBack } from 'features/page-layout'
import { RaisedMoney, SwapWidget, TransferAddress } from 'features/presale'

export const PresalePage: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoBack title={t('Presale')} />

      <RaisedMoney />
      <TransferAddress />
      <SwapWidget />
    </>
  )
}
