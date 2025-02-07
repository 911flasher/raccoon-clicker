import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props extends PropsWithChildren {
  title: string
  className?: string
}

export const Tablet: FC<Props> = ({ title, className, children }) => (
  <div className={clsx(styles.tablet, className)}>
    <svg className={styles.tabletHeader} viewBox='0 0 344 40' fill='none'>
      <path d='M-21.3186 0H364.923V27.5887C208.887 44.2347 124.837 43.8685 -21.3186 27.5887V0Z' fill='#49AC2E' />
    </svg>

    <Text className={styles.tabletHeaderText} textStyle='h3'>
      {title}
    </Text>

    {children}
  </div>
)
