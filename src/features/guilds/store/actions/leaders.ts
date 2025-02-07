import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from 'core/store'

import { guildsClient } from '../../client'
import { Guild } from '../../constants'
import { selectGuildsState } from '../selectors'
import { patchGuildsState } from '../slice'

export const getGuildLeaders = createAsyncThunk(
  'guilds/get-guilds-leaders',
  async (guild: Guild, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi
    const initialState = thunkApi.getState() as RootState
    const initialGuildsState = selectGuildsState(initialState)

    if (
      initialGuildsState.isGuildLeadersLoading.includes(guild) ||
      initialGuildsState.isGuildLeadersLoaded.includes(guild)
    ) {
      return
    }

    dispatch(
      patchGuildsState({
        isGuildLeadersLoading: Array.from(new Set([...initialGuildsState.isGuildLeadersLoading, guild])),
      }),
    )

    const leaders = await guildsClient.getGuildLeaderList(guild)

    const state = thunkApi.getState() as RootState
    const guildsState = selectGuildsState(state)

    const isGuildLeadersLoading = Array.from(new Set(guildsState.isGuildLeadersLoading.filter((g) => g !== guild)))
    const isGuildLeadersLoaded = Array.from(new Set([...guildsState.isGuildLeadersLoaded, guild]))

    const guildLeaders = {
      ...guildsState.guildLeaders,
      [guild]: leaders,
    }

    dispatch(patchGuildsState({ isGuildLeadersLoading, isGuildLeadersLoaded, guildLeaders }))
  },
)
