import { createAsyncThunk } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

import { type RootState } from 'core/store'
import { setMaxEnergy } from 'features/clicker'
import { selectDailyRewardsState, setSpinTicketsCount } from 'features/daily-rewards'
import { selectSettingsState, setDonuts, setBeer } from 'features/settings'

import { marketClient } from '../../client'
import { selectMarketState } from '../selectors'

export const buyPack = createAsyncThunk('market/buy-pack', async (packId: number): Promise<string> => {
  const invoiceUrl = await marketClient.buyPack(packId)

  return invoiceUrl
})

export const getPackRewards = createAsyncThunk(
  'market/get-pack-rewards',
  async (packId: number, thunkAPI): Promise<void> => {
    const { dispatch } = thunkAPI
    const state = thunkAPI.getState() as RootState
    const { packs } = selectMarketState(state)
    const { donuts, beer } = selectSettingsState(state)
    const { spinTicketsCount } = selectDailyRewardsState(state)

    const pack = packs.find((p) => p.id === packId)

    if (!pack) {
      throw new Error('Pack not found')
    }

    pack.reward.forEach((reward) => {
      switch (reward.type) {
        case 'points': {
          const newCount = BigNumber(donuts).plus(reward.value).toString()
          void dispatch(setDonuts(newCount))
          break
        }

        case 'donate_points': {
          const newCount = BigNumber(beer).plus(reward.value).toString()
          void dispatch(setBeer(newCount))
          break
        }

        case 'recovery_energy': {
          void dispatch(setMaxEnergy())
          break
        }

        case 'ticket_balance': {
          const newCount = BigNumber(spinTicketsCount).plus(reward.value).toNumber()
          void dispatch(setSpinTicketsCount(newCount))
          break
        }

        default:
      }
    })
  },
)
