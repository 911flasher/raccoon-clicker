import { postEvent } from '@telegram-apps/sdk'

export const haptic = (): void => {
  try {
    postEvent('web_app_trigger_haptic_feedback', {
      type: 'impact',
      impact_style: 'light',
    })
  } catch (e) {
    //
  }
}
