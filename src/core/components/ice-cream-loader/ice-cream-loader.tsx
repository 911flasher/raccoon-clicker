import { FC } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

interface Props {
  className?: string
}

export const IceCreamLoader: FC<Props> = ({ className }) => <div className={clsx(styles.loader, className)} />
