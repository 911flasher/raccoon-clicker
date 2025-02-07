import { createAsyncThunk } from '@reduxjs/toolkit'

import { getFriendsList } from './friends-list'

export const initFriendsState = createAsyncThunk('friends/init', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  await dispatch(getFriendsList())
})
