import { createElement, DetailedHTMLProps, FC, HTMLAttributes, ReactHTML } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  as?: keyof ReactHTML
  textStyle?: 'h1' | 'h2' | 'h3' | 'h4' | 'bodyText' | 'number' | 'button' | 'menuText' | 'table' | 'smallPrice'
}

export const Text: FC<TextProps> = ({ as = 'p', textStyle = 'bodyText', ...props }) =>
  createElement(
    as,
    {
      ...props,
      className: clsx(styles[textStyle], props.className),
    },
    props.children,
  )
