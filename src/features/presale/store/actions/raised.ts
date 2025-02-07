import { createAsyncThunk } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'

import { fromMinorUnit } from 'core/utils/minor-unit'

import { patchPresaleState } from '../slice'

const FUND = 1000000

export const getRaised = createAsyncThunk('settings/set-donuts', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI

  const query = `
      query MyQuery {
        networks {
          id
          rcn
        }
      }
    `

  const response = await fetch('https://raccoon.squids.live/pedro-squid/v/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()

  if (response.ok) {
    const networks = data?.data?.networks

    if (!networks) {
      throw new Error('Incorrect response')
    }

    const total = networks
      .reduce((sum: BigNumber, item: { rcn: string }) => sum.plus(item.rcn), BigNumber(0))
      .toString()
    const rcn = fromMinorUnit(total, 18)
    const raised = rcn.multipliedBy(0.00000004).plus(FUND).toString()

    dispatch(patchPresaleState({ raised }))
  }

  throw new Error(data.errors ? data.errors[0].message : 'Unknown error')
})
