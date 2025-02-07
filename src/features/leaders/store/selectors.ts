import type { RootState } from 'core/store'

import type { LeadersState } from './slice'

export const selectLeadersState = (state: RootState): LeadersState => state.leaders
