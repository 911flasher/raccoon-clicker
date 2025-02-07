import { CSSProperties, FC } from 'react'

import clsx from 'clsx'

import { BaseBlock } from 'core/components/base-block'
import { Price } from 'core/components/price'
import { Text } from 'core/components/text'
import { UserAvatar } from 'core/components/user-avatar'
import { trimString } from 'core/utils/trim-string'
import { LeaderPlace } from 'features/leaders/components/leader-place'

import styles from './styles.module.scss'
import { Leader } from '../../types'

interface Props {
  className?: string
  containerClassName?: string
  leader: Leader
  style?: CSSProperties
  borderColor?: 'primary' | 'secondary'
  isAnimated?: boolean
}

export const LeaderBlock: FC<Props> = ({ leader, className, borderColor, containerClassName, style, isAnimated }) => (
  <div style={style}>
    <BaseBlock
      className={clsx(styles.container, className)}
      containerClassName={containerClassName}
      borderColor={borderColor}
      isAnimated={isAnimated}
    >
      <LeaderPlace place={leader.place} />

      <UserAvatar src={leader.avatar} username={leader.name} />

      <div>
        <Text>{trimString(leader.name, 18)}</Text>
        <Price price={leader.points} />
      </div>
    </BaseBlock>
  </div>
)
