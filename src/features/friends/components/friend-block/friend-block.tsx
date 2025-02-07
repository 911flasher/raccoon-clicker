import { CSSProperties, FC } from 'react'

import { BaseBlock } from 'core/components/base-block'
import { Text } from 'core/components/text'
import { UserAvatar } from 'core/components/user-avatar'
import { formatNumber } from 'core/utils/format-number'
import { trimString } from 'core/utils/trim-string'

import styles from './styles.module.scss'
import { Friend } from '../../types'

interface Props {
  friend: Friend
  style?: CSSProperties
}

export const FriendBlock: FC<Props> = ({ friend, style }) => (
  <div style={style}>
    <BaseBlock className={styles.container} isAnimated>
      <UserAvatar username={friend.name} src={friend.avatar} />

      <div>
        <Text>{trimString(friend.name, 18)}</Text>

        <Text className={styles.price}>
          <img style={{ width: 16, marginRight: 4 }} src='/images/icons/coin.svg' alt='coin' draggable={false}/>
          <span>+{formatNumber(friend.profit)}</span>
        </Text>
      </div>
    </BaseBlock>
  </div>
)
