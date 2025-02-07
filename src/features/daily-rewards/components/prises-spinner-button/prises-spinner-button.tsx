import { FC } from 'react'

import clsx from 'clsx'

import spinnerImg from './assets/spinner.svg'
import styles from './styles.module.scss'

interface Props {
  className?: string
  onOpen: () => void
}

export const PrisesSpinnerButton: FC<Props> = ({ className, onOpen }) => (
  <img
    role='presentation'
    onClick={onOpen}
    src={spinnerImg}
    draggable={false}
    alt='prises spinner'
    className={clsx(styles.img, className)}
  />
)
