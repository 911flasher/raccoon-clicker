import type { RootState } from 'core/store'

import type { PresaleState } from './slice'

export const selectPresaleState = (state: RootState): PresaleState => state.presale
