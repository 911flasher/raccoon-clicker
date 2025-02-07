import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from 'core/store'

import type { GuildsState } from './slice'
import { Guild } from '../constants'
import { GuildLeader } from '../types'

export const selectGuildsState = (state: RootState): GuildsState => state.guilds

export const selectGuildLeaders = createSelector(
  selectGuildsState,
  (state: GuildsState) =>
    (guild: Guild): GuildLeader[] =>
      state.guildLeaders[guild],
)

export const selectIsLoadingLeaders = createSelector(
  selectGuildsState,
  (state: GuildsState) =>
    (guild: Guild): boolean =>
      state.isGuildLeadersLoading.includes(guild),
)

export const selectIsLoadedLeaders = createSelector(
  selectGuildsState,
  (state: GuildsState) =>
    (guild: Guild): boolean =>
      state.isGuildLeadersLoaded.includes(guild),
)
