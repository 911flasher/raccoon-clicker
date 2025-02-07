import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

interface Props extends PropsWithChildren {
  containerClassName?: string
  innerContainerClassName?: string
}

export const IconWrapper: FC<Props> = ({ children, innerContainerClassName, containerClassName }) => (
  <div className={clsx(styles.container, containerClassName)}>
    <div className={clsx(styles.innerContainer, innerContainerClassName)}>{children}</div>

    <div className={styles.shadow} />
  </div>
)
