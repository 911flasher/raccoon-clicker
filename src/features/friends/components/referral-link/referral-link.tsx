import { FC } from 'react'

import { postEvent } from '@telegram-apps/sdk'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { BaseBlock } from 'core/components/base-block'
// import { Button } from 'core/components/button'
import { Text } from 'core/components/text'
import { UserAvatar } from 'core/components/user-avatar'
import { useAppSelector } from 'core/store/hooks'
import { formatNumber } from 'core/utils/format-number'
import { selectUserInfo } from 'features/settings'

import styles from './styles.module.scss'

const text = `💸RaccoonCoin Airdrop app: play-to-get-airdrop\n🎉Click and hit the raccoon`
const textEncoded = encodeURIComponent(text)

export const ReferralLink: FC = () => {
  // const [isAllSocialsVisible, setIsAllSocialsVisible] = useState(false)

  const userInfo = useAppSelector(selectUserInfo)
  const { t } = useTranslation()

  // const handleOpenAllSocials = (): void => setIsAllSocialsVisible(true)
  const handleShare = async (): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: userInfo?.referralLink,
          title: 'Raccoon Coin',
          text,
        })

        return
      }

      if (userInfo) {
        await navigator.clipboard.writeText(`${text}\n${userInfo.referralLink}`)
        toast.success(t('Copied to clipboard'))
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return

      toast.error(`Error ${(e as Error).name}: ${(e as Error).message}`)
    }
  }

  const handleShareInTelegram = async (): Promise<void> => {
    try {
      postEvent('web_app_open_tg_link', {
        path_full: `/share/url?url=${encodeURIComponent(userInfo?.referralLink || '')}&text=${textEncoded}`,
      })
    } catch (e) {
      toast.error(`Something went wrong`, { duration: 2000 })
    }
  }

  if (!userInfo) return null

  return (
    <BaseBlock
      borderColor='additional'
      className={styles.innerContainer}
      containerClassName={styles.container}
      isAnimated
    >
      <div className={styles.infoContainer}>
        <div className={styles.infoBlock}>
          <UserAvatar username={userInfo.username || 'User'} src={userInfo.avatar} isWithoutMargin />
          <Text className={styles.infoTitle}>{t('You get')}</Text>

          <div className={styles.reward}>
            <img style={{ width: 16, marginRight: 4 }} src='/images/icons/coin.svg' alt='coin' draggable={false}/>

            <Text>+{formatNumber(100)}</Text>
          </div>
        </div>

        <div className={styles.infoBlock}>
          <UserAvatar username='' isWithoutMargin />
          <Text className={styles.infoTitle}>{t('Friend gets')}</Text>

          <div className={styles.reward}>
            <img style={{ width: 16, marginRight: 4 }} src='/images/icons/coin.svg' alt='coin' draggable={false}/>

            <Text>+{formatNumber(100)}</Text>
          </div>
        </div>
      </div>

      <div className={styles.socials}>
        {/* <button type='button' className={styles.inviteButton} onClick={handleShare}>
          <img src='/images/social/facebook.svg' alt='share by facebook' />
        </button>
        <button type='button' className={styles.inviteButton} onClick={handleShare}>
          <img src='/images/social/twitter.svg' alt='share by twitter' />
        </button> */}
        <button type='button' className={styles.inviteButton} onClick={handleShareInTelegram}>
          <img src='/images/social/telegram.svg' alt='share by telegram' draggable={false}/>
        </button>
        {/* <button type='button' className={styles.inviteButton} onClick={handleShare}>
          <img src='/images/social/instagram.svg' alt='share by instagram' />
        </button> */}
        <button type='button' className={styles.inviteButton} onClick={handleShare}>
          <img src='/images/social/link.svg' alt='share by link' draggable={false}/>
        </button>
      </div>

      {/* {!isAllSocialsVisible && (
        <div className={styles.showMoreContainer}>
          <Button className={styles.showMoreButton} onClick={handleOpenAllSocials}>
            <Text textStyle='h3'>{t('show more')}</Text>
          </Button>
        </div>
      )}

      {isAllSocialsVisible && (
        <div className={styles.socials}>
          <button type='button' className={styles.inviteButton} onClick={handleShare}>
            <img src='/images/social/whats-app.svg' alt='share by WhatsApp' />
          </button>
          <button type='button' className={styles.inviteButton} onClick={handleShare}>
            <img src='/images/social/viber.svg' alt='share by viber' />
          </button>
          <button type='button' className={styles.inviteButton} onClick={handleShare}>
            <img src='/images/social/reddit.svg' alt='share by reddit' />
          </button>
          <button type='button' className={styles.inviteButton} onClick={handleShare}>
            <img src='/images/social/discord.svg' alt='share by discord' />
          </button>
        </div>
      )} */}
    </BaseBlock>
  )
}
