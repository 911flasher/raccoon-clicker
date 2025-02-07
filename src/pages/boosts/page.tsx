import type { FC } from 'react'

import { BoostList } from 'features/boost'
import { SectionHeader } from 'features/page-layout'

export const BoostsPage: FC = () => (
  <>
    <SectionHeader name='boosts' />

    <BoostList />
  </>
)
