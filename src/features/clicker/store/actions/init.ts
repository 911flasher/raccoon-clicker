import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ClickerInfo } from '../../types';
import { patchClickerState } from '../slice';
import { clickerService } from './clicks';
import { startEnergyRecovery } from './energy-recovery';

export const initClickerState = createAsyncThunk(
  'clicker/init',
  async (clickerInfo: ClickerInfo, thunkApi): Promise<void> => {
    const { dispatch } = thunkApi
    const { salt, remainingEnergy, totalEnergy } = clickerInfo
    dispatch(patchClickerState({ salt, remainingEnergy, totalEnergy }))

    void dispatch(startEnergyRecovery()).unwrap()
    void dispatch(submitClicks()).unwrap()

    dispatch(patchClickerState({ isInitialized: true }))
  },
)

export const submitClicks = createAsyncThunk('clicker/submitClicks', async (_, thunkApi): Promise<void> => {
  const { dispatch, getState } = thunkApi;
  await clickerService.submitClicks(dispatch, getState);
});

export const increment = createAsyncThunk('clicker/increment', async (_, thunkApi): Promise<string> => {
  const { dispatch, getState } = thunkApi;
  return await clickerService.increment(dispatch, getState);
});
