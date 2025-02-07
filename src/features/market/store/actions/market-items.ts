import { createAsyncThunk } from '@reduxjs/toolkit'

import { marketClient } from '../../client'
import { patchMarketState } from '../slice'

export const getMarketItems = createAsyncThunk('market/get-market-items', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    const { merch, electronic } = await marketClient.getMarketItems()

    dispatch(patchMarketState({ merchItems: merch, electronicItems: electronic, isMarketItemsLoaded: true }))
  } catch (e) {
    dispatch(patchMarketState({ isMarketItemsLoaded: true, isMarketItemsError: true }))
  }
})

export const getPacks = createAsyncThunk('market/get-packs', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  try {
    const packs = await marketClient.getPacks()

    dispatch(patchMarketState({ packs, isPacksLoaded: true }))
  } catch (e) {
    dispatch(patchMarketState({ isPacksLoaded: true, isPacksError: true }))
  }
})
