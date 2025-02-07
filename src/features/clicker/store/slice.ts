import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventType } from '../types'

export interface ClickerState {
  remainingEnergy: string
  totalEnergy: string
  currentClicks: number
  salt: string
  activeEvent: EventType | null
  eventEndTime: string | null
  timeoutId: number | null

  isNextClickResultsLoading: boolean
  isInitialized: boolean
}

export const initialClickerState: ClickerState = {
  remainingEnergy: '0',
  totalEnergy: '0',
  currentClicks: 0,
  salt: '',
  activeEvent: null,
  eventEndTime: null,
  timeoutId: null,
  isNextClickResultsLoading: false,
  isInitialized: false,
}

export const clickerSlice = createSlice({
  name: 'clicker',
  initialState: initialClickerState,
  reducers: {
    patchClickerState: (state, action: PayloadAction<Partial<ClickerState>>) => {
      // Используем встроенный механизм мутаций для частичного обновления состояния
      Object.assign(state, action.payload);
    },
  },
})

//

export const { patchClickerState } = clickerSlice.actions
