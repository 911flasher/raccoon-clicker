import { FC } from 'react'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

export const InitError: FC = () => (
  <div className={styles.container}>
    <div className={styles.innerContainer}>
      <img src='/images/404.png' alt='404' draggable={false}/>

      <Text className={styles.subtitle}>We are undergoing scheduled maintenance, and we will be back very soon</Text>
    </div>

    <div className={styles.buttons}>
      <a href='https://x.com/raccooncoineth'>
        <img src='/images/social/twitter-without-bg.svg' alt='twitter' draggable={false}/>
      </a>

      <a href='https://t.me/raccooncointothemoon'>
        <img src='/images/social/tg-without-bg.svg' alt='telegram' draggable={false}/>
      </a>
    </div>
  </div>
)
