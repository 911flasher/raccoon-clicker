import type { RootState } from 'core/store'

import type { MarketState } from './slice'

export const selectMarketState = (state: RootState): MarketState => state.market
