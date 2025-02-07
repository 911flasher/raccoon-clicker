import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'
import { motion, Target } from 'framer-motion'

import styles from './styles.module.scss'

interface Props extends PropsWithChildren {
  className?: string
  containerClassName?: string
  borderColor?: 'primary' | 'secondary' | 'additional' | 'black'
  isAnimated?: boolean
  onClick?: () => void
}

export const BaseBlock: FC<Props> = ({
  children,
  borderColor = 'primary',
  className,
  containerClassName,
  isAnimated,
  onClick,
}) => {
  const initial: Target = { scale: 0.96, opacity: 0.5 }

  return (
    <motion.div
      className={clsx(styles.block, containerClassName, {
        [styles.blockWithBorder]: !!borderColor,
        [styles.primaryBorder]: borderColor === 'primary',
        [styles.secondaryBorder]: borderColor === 'secondary',
        [styles.additionalBorder]: borderColor === 'additional',
        [styles.blackBorder]: borderColor === 'black',
      })}
      style={{ cursor: onClick ? 'pointer' : undefined }}
      initial={isAnimated ? initial : undefined}
      animate={isAnimated ? { x: 0, opacity: 1, scale: 1 } : undefined}
      transition={isAnimated ? { duration: 0.4, type: 'spring', stiffness: 100 } : undefined}
      onClick={onClick}
    >
      <div className={clsx(styles.content, className)}>{children}</div>
    </motion.div>
  )
}
