import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string
}

export const Button: FC<Props> = ({ children, className, type, ...props }) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type || 'button'}
    className={clsx(styles.button, className)}
    {...props}
  >
    {children}
  </button>
)
