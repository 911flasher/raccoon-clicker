import type { FC } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from 'core/components/button'
import { Text } from 'core/components/text'

import styles from './styles.module.scss'

export const StartPage: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoNextPage = (): void => navigate('/daily-reward')

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img className={styles.mainImg} src='/images/start/start-img.png' draggable={false} alt='raccoonfield' />

        <div className={styles.point}>
          <img src='/images/start/airdrop.svg' draggable={false} alt='airdrop' />

          <div>
            <Text textStyle='h3'>{t('Play to airdrop')}</Text>
            <Text>{t('Harvest donuts to earn airdrop chance.')}</Text>
          </div>
        </div>

        <div className={styles.point}>
          <img src='/images/start/invite-friends.svg' draggable={false} alt='invite friends' />

          <div>
            <Text textStyle='h3'>{t('Invite Friends')}</Text>
            <Text>{t('Earn $TON for each spending on referred accounts.')}</Text>
          </div>
        </div>

        <div className={styles.point}>
          <img src='/images/start/cfo.svg' draggable={false} alt='cfo' />

          <div>
            <Text textStyle='h3'>{t('Purchase CFO')}</Text>
            <Text>{t('Hatch the raccoon and harvest donuts to earn airdrop chance.')}</Text>
          </div>
        </div>

        <div className={styles.buttons}>
          <div className={styles.socials}>
            <a href='https://x.com/raccooncoineth'>
              <img src='/images/social/twitter-without-bg.svg' draggable={false} alt='twitter' />
            </a>

            <a href='https://t.me/raccooncointothemoon'>
              <img src='/images/social/tg-without-bg.svg' draggable={false} alt='telegram' />
            </a>
          </div>

          <Button onClick={handleGoNextPage}>
            <Text textStyle='button'>{t('start playing')}</Text>
          </Button>
        </div>
      </div>
    </div>
  )
}
