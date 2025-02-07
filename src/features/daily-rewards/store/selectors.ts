import type { RootState } from 'core/store'

import type { DailyRewardsState } from './slice'

export const selectDailyRewardsState = (state: RootState): DailyRewardsState => state.dailyRewards
