import { createAsyncThunk } from '@reduxjs/toolkit'

import { getMarketItems, getPacks } from './market-items'

export const initMarketState = createAsyncThunk('boosts/init', async (_, thunkApi): Promise<void> => {
  const { dispatch } = thunkApi

  await dispatch(getPacks())
  await dispatch(getMarketItems())
})
