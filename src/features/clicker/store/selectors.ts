import type { RootState } from 'core/store'

import type { ClickerState } from './slice'

export const selectClickerState = (state: RootState): ClickerState => state.clicker
