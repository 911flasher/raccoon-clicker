// donuts: BigNumber(donuts).plus(1).toString(),

import { createAsyncThunk } from '@reduxjs/toolkit'

import { patchSettingsState } from '../slice'

export const setDonuts = createAsyncThunk('settings/set-donuts', async (donuts: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(patchSettingsState({ donuts }))
})

export const setBeer = createAsyncThunk('settings/set-beer', async (beer: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(patchSettingsState({ beer }))
})

export const setDogecoin = createAsyncThunk('settings/set-dogecoin', async (dogecoin: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(patchSettingsState({ dogecoin }))
})

export const setPepecoin = createAsyncThunk('settings/set-pepecoin', async (pepecoin: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(patchSettingsState({ pepecoin }))
})

export const setShibaInu = createAsyncThunk('settings/set-shiba-inu', async (shibaInu: string, thunkAPI) => {
  const { dispatch } = thunkAPI

  dispatch(patchSettingsState({ shibaInu }))
})
