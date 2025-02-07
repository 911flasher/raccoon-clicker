import { FC } from 'react'

import clsx from 'clsx'

import clownImg from './assets/clown.svg'
import styles from './styles.module.scss'
import { SpinnerBlock } from '../spinner-block'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const SpinnerModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div className={clsx(styles.container, { [styles.closed]: !isOpen })}>
      <div role='presentation' className={styles.bgShadow} onClick={onClose} />

      <div className={styles.innerContainer}>
        <img src={clownImg} alt='clown' className={styles.clown} draggable={false}/>
        <SpinnerBlock />
      </div>
    </div>
  )
}
