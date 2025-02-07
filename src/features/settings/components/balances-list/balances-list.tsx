import { FC } from 'react'

import { postEvent } from '@telegram-apps/sdk'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { BaseBlock } from 'core/components/base-block'
import { Button } from 'core/components/button'
import { Text } from 'core/components/text'
import { useAppSelector } from 'core/store/hooks'
import { formatNumber } from 'core/utils/format-number'

import styles from './styles.module.scss'
import { selectSettingsState, selectUserInfo } from '../../store/selectors'

const text = encodeURIComponent(`💸RaccoonCoin Airdrop app: play-to-get-airdrop\n🎉Click and hit the raccoon`)

export const BalancesList: FC = () => {
  const { donuts, beer, dogecoin, pepecoin, shibaInu } = useAppSelector(selectSettingsState)
  const userInfo = useAppSelector(selectUserInfo)

  const { t } = useTranslation()

  const handleShare = async (): Promise<void> => {
    try {
      postEvent('web_app_open_tg_link', {
        path_full: `/share/url?url=${encodeURIComponent(userInfo?.referralLink || '')}&text=${text}`,
      })
    } catch (e) {
      toast.error(`Something went wrong`, { duration: 2000 })
    }
  }

  return (
    <div className={styles.container}>
      <Text textStyle='h3'>{t('Balance')}</Text>

      <BaseBlock className={styles.block} borderColor='black'>
        <img src='/images/profile/apu.png' draggable={false} alt='apu' />
        <Text>{t('Apu')}</Text>
        <Text className={styles.price}>{formatNumber(donuts)}</Text>
      </BaseBlock>

      <BaseBlock className={styles.block} borderColor='black'>
        <img src='/images/profile/cup.png' draggable={false} alt='cup' />
        <Text>{t('Cup')}</Text>
        <Text className={styles.price}>{formatNumber(beer)}</Text>
      </BaseBlock>

      <BaseBlock className={styles.block} borderColor='black'>
        <img src='/images/profile/doge.png' draggable={false} alt='doge' />
        <Text>Doge</Text>
        <Text className={styles.price}>{formatNumber(dogecoin)}</Text>
      </BaseBlock>

      <BaseBlock className={styles.block} borderColor='black'>
        <img src='/images/profile/pepe.png' draggable={false} alt='pepe' />
        <Text>Pepe</Text>
        <Text className={styles.price}>{formatNumber(pepecoin)}</Text>
      </BaseBlock>

      <BaseBlock className={styles.block} borderColor='black'>
        <img src='/images/profile/shiba.png' draggable={false} alt='shiba' />
        <Text>Shiba inu</Text>
        <Text className={styles.price}>{formatNumber(shibaInu)}</Text>
      </BaseBlock>

      <div className={styles.connectWalletButton}>
        <Button className={styles.connectWalletButton} disabled>
          <Text textStyle='button'>{t('CONNECT WALLET')}</Text>
        </Button>

        <Text textStyle='bodyText' className={styles.soon}>
          {t('Soon')}
        </Text>
      </div>

      <div className={styles.divider} />

      <BaseBlock
        className={styles.refLink}
        containerClassName={styles.refLinkContainer}
        borderColor='additional'
        onClick={handleShare}
      >
        <Text>{t('Referral link')}</Text>

        <Text textStyle='number' className={styles.ref}>
          {userInfo?.id}
        </Text>

        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M10.0918 3.21799L9.63781 2.32698V2.32698L10.0918 3.21799ZM9.21799 4.0918L10.109 4.54579V4.54579L9.21799 4.0918ZM20.7822 4.0918L19.8912 4.54579L19.8912 4.54579L20.7822 4.0918ZM19.9079 3.21799L20.3619 2.32698V2.32698L19.9079 3.21799ZM19.9076 14.7822L20.3616 15.6732L20.3616 15.6732L19.9076 14.7822ZM20.7822 13.9078L21.6732 14.3618L21.6732 14.3618L20.7822 13.9078ZM14.7822 19.9076L15.6732 20.3616L14.7822 19.9076ZM13.9079 20.7822L13.4539 19.8912L13.4539 19.8912L13.9079 20.7822ZM13.9079 9.21799L14.3619 8.32698H14.3619L13.9079 9.21799ZM15 12.1969L16 12.1969V12.1969H15ZM14.7822 10.0918L15.6732 9.63781L15.6732 9.63781L14.7822 10.0918ZM3.21799 10.0918L4.10899 10.5458L3.21799 10.0918ZM4.0918 9.21799L4.54579 10.109H4.54579L4.0918 9.21799ZM3.21799 19.9079L2.32698 20.3619H2.32698L3.21799 19.9079ZM4.0918 20.7822L3.6378 21.6732H3.63781L4.0918 20.7822ZM15 15L14 15V15H15ZM17.8002 2H12.2002V4H17.8002V2ZM8 6.2002V9H10V6.2002H8ZM12.2002 2C11.6566 2 11.1887 1.99922 10.805 2.03057C10.4096 2.06286 10.0162 2.13416 9.63781 2.32698L10.5458 4.10899C10.5952 4.08383 10.6959 4.04613 10.9678 4.02393C11.2513 4.00078 11.6237 4 12.2002 4V2ZM10 6.2002C10 5.62365 10.0008 5.25126 10.0239 4.9678C10.0461 4.69595 10.0838 4.59517 10.109 4.54579L8.32698 3.63781C8.13416 4.01624 8.06286 4.40962 8.03057 4.80498C7.99922 5.18874 8 5.65663 8 6.2002H10ZM9.63781 2.32698C9.07332 2.6146 8.6146 3.07332 8.32698 3.63781L10.109 4.54579C10.2049 4.35763 10.3576 4.20487 10.5458 4.10899L9.63781 2.32698ZM22.0002 6.19978C22.0002 5.65623 22.001 5.18842 21.9696 4.80475C21.9373 4.4094 21.866 4.01619 21.6732 3.63781L19.8912 4.54579C19.9164 4.59523 19.9541 4.69595 19.9763 4.96761C19.9994 5.25095 20.0002 5.62322 20.0002 6.19978H22.0002ZM17.8002 4C18.3768 4 18.7489 4.00078 19.0322 4.02393C19.3037 4.04612 19.4044 4.08378 19.4539 4.10899L20.3619 2.32698C19.9835 2.13421 19.5904 2.06288 19.1951 2.03057C18.8115 1.99922 18.3437 2 17.8002 2V4ZM21.6732 3.63781C21.3853 3.07276 20.9258 2.61431 20.3619 2.32698L19.4539 4.10899C19.6426 4.20515 19.7956 4.35819 19.8912 4.54579L21.6732 3.63781ZM17.8031 16C18.3455 16 18.8126 16.0008 19.1958 15.9695C19.5906 15.9372 19.9835 15.8659 20.3616 15.6732L19.4536 13.8912C19.4043 13.9163 19.3038 13.9539 19.0328 13.9761C18.75 13.9992 18.3786 14 17.8031 14V16ZM20.0002 11.7998C20.0002 12.3764 19.9994 12.7486 19.9763 13.032C19.9541 13.3036 19.9164 13.4044 19.8912 13.4538L21.6732 14.3618C21.866 13.9834 21.9373 13.5902 21.9696 13.1948C22.001 12.8112 22.0002 12.3434 22.0002 11.7998H20.0002ZM20.3616 15.6732C20.9259 15.3857 21.3855 14.9265 21.6732 14.3618L19.8912 13.4538C19.7955 13.6417 19.642 13.7952 19.4536 13.8912L20.3616 15.6732ZM4 17.8002V12.2002H2V17.8002H4ZM6.2002 10H9V8H6.2002V10ZM9 10H11.8002V8H9V10ZM14 17.8031C14 18.3786 13.9992 18.75 13.9761 19.0328C13.9539 19.3038 13.9163 19.4043 13.8912 19.4536L15.6732 20.3616C15.8659 19.9835 15.9372 19.5906 15.9695 19.1958C16.0008 18.8126 16 18.3455 16 17.8031H14ZM11.8036 22C12.346 22 12.813 22.0008 13.1962 21.9695C13.591 21.9372 13.9838 21.8659 14.3619 21.6732L13.4539 19.8912C13.4046 19.9164 13.3041 19.9539 13.0332 19.9761C12.7504 19.9992 12.379 20 11.8036 20V22ZM13.8912 19.4536C13.7952 19.6421 13.6417 19.7955 13.4539 19.8912L14.3619 21.6732C14.9267 21.3855 15.3858 20.9258 15.6732 20.3616L13.8912 19.4536ZM11.8002 10C12.3768 10 12.7489 10.0008 13.0322 10.0239C13.3037 10.0461 13.4044 10.0838 13.4539 10.109L14.3619 8.32698C13.9835 8.13421 13.5904 8.06288 13.1951 8.03057C12.8115 7.99922 12.3437 8 11.8002 8V10ZM16 12.1969C16 11.6545 16.0008 11.1873 15.9695 10.804C15.9372 10.4091 15.8659 10.016 15.6732 9.63781L13.8912 10.5458C13.9163 10.595 13.9539 10.6955 13.9761 10.9669C13.9992 11.2498 14 11.6215 14 12.1969H16ZM13.4539 10.109C13.6426 10.2052 13.7956 10.3582 13.8912 10.5458L15.6732 9.63781C15.3853 9.07275 14.9258 8.61431 14.3619 8.32698L13.4539 10.109ZM4 12.2002C4 11.6237 4.00078 11.2513 4.02393 10.9678C4.04613 10.6959 4.08383 10.5952 4.10899 10.5458L2.32698 9.63781C2.13416 10.0162 2.06286 10.4096 2.03057 10.805C1.99922 11.1887 2 11.6566 2 12.2002H4ZM6.2002 8C5.65663 8 5.18874 7.99922 4.80498 8.03057C4.40962 8.06286 4.01624 8.13416 3.63781 8.32698L4.54579 10.109C4.59517 10.0838 4.69595 10.0461 4.9678 10.0239C5.25126 10.0008 5.62365 10 6.2002 10V8ZM4.10899 10.5458C4.20487 10.3576 4.35763 10.2049 4.54579 10.109L3.63781 8.32698C3.07332 8.6146 2.6146 9.07332 2.32698 9.63781L4.10899 10.5458ZM2 17.8002C2 18.3437 1.99922 18.8115 2.03057 19.1951C2.06288 19.5904 2.13421 19.9835 2.32698 20.3619L4.10899 19.4539C4.08378 19.4044 4.04612 19.3037 4.02393 19.0322C4.00078 18.7489 4 18.3768 4 17.8002H2ZM6.19691 20C5.62146 20 5.2498 19.9992 4.96686 19.9761C4.69554 19.9539 4.595 19.9163 4.54579 19.8912L3.63781 21.6732C4.01599 21.8659 4.40906 21.9372 4.80396 21.9695C5.18725 22.0008 5.65444 22 6.19691 22V20ZM2.32698 20.3619C2.61431 20.9258 3.07276 21.3853 3.6378 21.6732L4.54579 19.8912C4.35819 19.7956 4.20515 19.6426 4.10899 19.4539L2.32698 20.3619ZM22.0002 11.7998V6.19978H20.0002V11.7998H22.0002ZM15 16H17.8031V14H15V16ZM14 12.1969L14 15L16 15L16 12.1969L14 12.1969ZM14 15V17.8031H16V15H14ZM11.8036 20H6.19691V22H11.8036V20Z'
            fill='var(--accent-additional)'
          />
        </svg>
      </BaseBlock>
    </div>
  )
}
