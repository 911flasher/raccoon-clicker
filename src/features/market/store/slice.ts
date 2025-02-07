import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { patchStateReducer } from 'core/store/utils'

import type { MarketItemInfo, PackItemInfo } from '../types'

export interface MarketState {
  merchItems: MarketItemInfo[]
  electronicItems: MarketItemInfo[]
  packs: PackItemInfo[]

  isMarketItemsLoaded: boolean
  isMarketItemsError: boolean
  isPacksLoaded: boolean
  isPacksError: boolean
}

export const initialMarketState: MarketState = {
  merchItems: [],
  electronicItems: [],
  packs: [],

  isMarketItemsLoaded: false,
  isMarketItemsError: false,
  isPacksLoaded: false,
  isPacksError: false,
}

export const marketSlice = createSlice({
  name: 'market',
  initialState: initialMarketState,
  reducers: {
    patchMarketState: (state, action: PayloadAction<Partial<MarketState>>) => patchStateReducer(state, action),
  },
})

export const { patchMarketState } = marketSlice.actions
