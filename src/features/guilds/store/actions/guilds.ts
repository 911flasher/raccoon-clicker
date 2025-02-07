import { createAsyncThunk } from '@reduxjs/toolkit'

import { Guild } from '../../constants'
import type { GuildInfo } from '../../types'
import { patchGuildsState } from '../slice'

export const setGuildsInfo = createAsyncThunk(
  'guilds/set-guilds-info',
  async (guilds: GuildInfo[], thunkApi): Promise<void> => {
    const { dispatch } = thunkApi

    dispatch(patchGuildsState({ guilds }))
  },
)

export const setCurrentGuild = createAsyncThunk(
  'guilds/set-current-guild',
  async (currentGuild: Guild, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi

    dispatch(patchGuildsState({ currentGuild }))
  },
)
