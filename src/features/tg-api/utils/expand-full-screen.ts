import { postEvent } from '@telegram-apps/sdk'

export const expandFullScreen = (): void => {
  try {
    postEvent('web_app_expand')
  } catch (e) {
    //
  }
}
