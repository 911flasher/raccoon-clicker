import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from 'core/store'

import { friendsClient } from '../../client'
import { selectFriendsState } from '../selectors'
import { patchFriendsState } from '../slice'

export const getFriendsList = createAsyncThunk('friends/get-friends-list', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    const state = thunkApi.getState() as RootState
    const { lastUploadedPage, hasNextPage: currentHasNextPage, isFriendsLoading, friends } = selectFriendsState(state)

    if (!currentHasNextPage || isFriendsLoading) return

    dispatch(patchFriendsState({ isFriendsLoading: true }))

    const newPage = lastUploadedPage + 1
    const { list, hasNextPage } = await friendsClient.getFriendsList(newPage)

    dispatch(
      patchFriendsState({
        friends: friends.concat(list),
        hasNextPage,
        isFriendsLoading: false,
        lastUploadedPage: newPage,
      }),
    )
  } catch (e) {
    dispatch(patchFriendsState({ isFriendsLoading: false, isFriendsError: true, hasNextPage: false }))
  }
})
