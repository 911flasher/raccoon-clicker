import type { RootState } from 'core/store'

import type { BoostsState } from './slice'

export const selectBoostsState = (state: RootState): BoostsState => state.boosts
