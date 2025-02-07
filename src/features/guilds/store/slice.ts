import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import { Guild } from '../constants'
import type { GuildInfo, GuildLeader } from '../types'

export interface GuildsState {
  currentGuild: Guild
  guilds: GuildInfo[]
  guildLeaders: Record<Guild, GuildLeader[]>
  isGuildLeadersLoading: Guild[]
  isGuildLeadersLoaded: Guild[]
}

export const initialGuildsState: GuildsState = {
  currentGuild: Guild.Maggie,
  guilds: [],
  guildLeaders: {
    [Guild.Maggie]: [],
    [Guild.Lisa]: [],
    [Guild.Bart]: [],
    [Guild.Marge]: [],
    [Guild.Homer]: [],
  },
  isGuildLeadersLoading: [],
  isGuildLeadersLoaded: [],
}

export const guildsSlice = createSlice({
  name: 'guilds',
  initialState: initialGuildsState,
  reducers: {
    patchGuildsState: (state, action: PayloadAction<Partial<GuildsState>>) => patchStateReducer(state, action),
  },
})

export const { patchGuildsState } = guildsSlice.actions
