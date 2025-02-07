import { createAsyncThunk } from '@reduxjs/toolkit'
import i18next from 'i18next'

import { formatFloatAmount } from 'core/utils/format-balance'
import { initBoostsState } from 'features/boost'
import { initClickerState } from 'features/clicker'
import { setDailyBonuses, setDailyRewardsInfo, setSpinTicketsCount } from 'features/daily-rewards'
import { setCurrentGuild, setGuildsInfo } from 'features/guilds'

import { settingsClient } from '../../client'
import { getLanguage, setLanguage } from '../../utils/language'
import { patchSettingsState } from '../slice'

export const initApp = createAsyncThunk('settings/init-app', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI

  const config = await settingsClient.getConfig()
  const { userInfo, clickerInfo, boost, guilds, dailyRewards, balances, ticketBalance } =
    await settingsClient.getUserInfo(config)

  const { donuts, beer, otherBalances } = balances
  const dailyBonuses = config.daily_bonus.map((bonus, index) => ({
    day: index + 1,
    bonus: formatFloatAmount(bonus),
  }))

  const dogecoin = otherBalances?.dogecoin || '0'
  const pepecoin = otherBalances?.pepecoin || '0'

  dispatch(patchSettingsState({ userInfo, donuts, beer, dogecoin, pepecoin }))

  const previousLanguage = getLanguage()

  if (!previousLanguage) {
    void i18next.changeLanguage(userInfo.language)
    setLanguage(userInfo.language)
  }

  await dispatch(initClickerState(clickerInfo))
  await dispatch(initBoostsState(boost))
  await dispatch(setDailyRewardsInfo(dailyRewards))
  await dispatch(setDailyBonuses(dailyBonuses))
  await dispatch(setCurrentGuild(guilds.current))
  await dispatch(setGuildsInfo(guilds.guildsInfo))
  await dispatch(setSpinTicketsCount(ticketBalance))

  dispatch(patchSettingsState({ isAppInitialized: true }))
})
