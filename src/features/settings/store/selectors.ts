import type { RootState } from 'core/store'

import type { SettingsState } from './slice'
import type { UserInfo } from '../types'

export const selectSettingsState = (state: RootState): SettingsState => state.settings

export const selectUserInfo = (state: RootState): UserInfo | undefined => state.settings.userInfo
