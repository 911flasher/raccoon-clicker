import { FC } from 'react'

import { postEvent } from '@telegram-apps/sdk'
import toast from 'react-hot-toast'

import { Button } from 'core/components/button'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { selectUserInfo } from 'features/settings'

import styles from './styles.module.scss'

const text = `💸RaccoonCoin Airdrop app: play-to-get-airdrop\n🎉Click and hit the raccoon`
const textEncoded = encodeURIComponent(text)

export const InviteFriendsButton: FC = () => {
  const userInfo = useAppSelector(selectUserInfo)

  const handleShareInTelegram = async (): Promise<void> => {
    try {
      postEvent('web_app_open_tg_link', {
        path_full: `/share/url?url=${encodeURIComponent(userInfo?.referralLink || '')}&text=${textEncoded}`,
      })
    } catch (e) {
      toast.error(`Something went wrong`, { duration: 2000 })
    }
  }

  return (
    <Button className={styles.container} onClick={handleShareInTelegram}>
      <Text textStyle='button'>Invite friends</Text>
    </Button>
  )
}
