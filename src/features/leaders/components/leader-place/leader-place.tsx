import { FC } from 'react'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props {
  place: number
}

export const LeaderPlace: FC<Props> = ({ place }) => {
  return (
    <div className={styles.container}>
      <div className={styles.place}>
        {place === 1 && <img src='/images/leaders/cup-1.svg' alt='first place' draggable={false}/>}
        {place === 2 && <img src='/images/leaders/cup-2.svg' alt='first place' draggable={false}/>}
        {place === 3 && <img src='/images/leaders/cup-3.svg' alt='first place' draggable={false}/>}

        <Text textStyle='number'>
          {place > 3 && '#'}
          {place}
        </Text>
      </div>
    </div>
  )
}
