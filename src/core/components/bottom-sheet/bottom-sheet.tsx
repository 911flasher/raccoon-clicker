import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'
import Sheet from 'react-modal-sheet'

import styles from './styles.module.scss'

interface Props extends PropsWithChildren {
  isOpened: boolean
  onClose: () => void
  className?: string
}

export const BottomSheet: FC<Props> = ({ isOpened, onClose, children, className }) => (
  <Sheet isOpen={isOpened} onClose={onClose} detent='content-height' tweenConfig={{ ease: 'easeOut', duration: 0.3 }}>
    <Sheet.Container className={styles.container}>
      <Sheet.Header />
      <Sheet.Content className={clsx(styles.innerContainer, className)}>{children}</Sheet.Content>
    </Sheet.Container>

    <Sheet.Backdrop onTap={onClose} />
  </Sheet>
)
