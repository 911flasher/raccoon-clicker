import type { PayloadAction } from '@reduxjs/toolkit'

export function patchStateReducer<T>(state: T, action: PayloadAction<Partial<T>>): void {
  const keys = Object.keys(action.payload) as (keyof T)[]
  keys.forEach((key) => {
    state[key] = action.payload[key] as T[keyof T]
  })
}
