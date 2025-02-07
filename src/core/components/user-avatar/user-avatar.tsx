import { FC } from 'react'

import clsx from 'clsx'

import sampleAvatar from './assets/sample-avatar.svg'
import styles from './styles.module.scss'

interface Props {
  username?: string
  src?: string
  isWithoutMargin?: boolean
}

export const UserAvatar: FC<Props> = ({ src, username, isWithoutMargin }) => {
  if (!src) {
    return (
      <img
        className={clsx(styles.sampleAvatar, { [styles.withMarginRight]: !isWithoutMargin })}
        src={sampleAvatar}
        alt='avatar'
        draggable="false"
      />
    )
  }

  return (
    <div className={clsx(styles.container, { [styles.withMarginRight]: !isWithoutMargin })}>
      <img src={sampleAvatar} alt='avatar'  draggable="false"/>

      <img className={styles.avatar} src={src} alt={`${username} avatar`} draggable="false" />
    </div>
  )
}
