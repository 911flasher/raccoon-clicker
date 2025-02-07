import type { RootState } from 'core/store'

import type { FriendsState } from './slice'

export const selectFriendsState = (state: RootState): FriendsState => state.friends
