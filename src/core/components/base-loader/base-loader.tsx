import { FC } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

interface Props {
  className?: string
}

export const BaseLoader: FC<Props> = ({ className }) => <div className={clsx(styles.loader, className)} />
