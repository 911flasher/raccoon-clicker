import { FC, PropsWithChildren, useEffect, useMemo } from 'react'

import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

import styles from './styles.module.scss'
import { Header } from '../header'
import { NavigationBar } from '../navigation-bar'
import { getLinks } from '../navigation-bar/constants'

const pagesWithoutLayout = ['/', '/earn', '/start', '/guilds']
const pagesWithoutHeader = ['/daily-reward', '/offline-earnings']

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const navLinks = useMemo(() => getLinks(), [])

  const location = useLocation()
  const { pathname } = location

  const isWithoutLayout = pagesWithoutLayout.includes(pathname)
  const isWithoutHeader = pagesWithoutHeader.includes(pathname)
  const isWithoutNav = !navLinks.find((link) => link.link === pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className={clsx({ [styles.container]: !isWithoutLayout })}>
      <div
        className={clsx({
          [styles.innerContainer]: !isWithoutLayout,
          [styles.withNav]: !isWithoutNav && !isWithoutLayout,
        })}
      >
        {!isWithoutLayout && !isWithoutHeader && <Header />}

        {children}
      </div>

      {!isWithoutNav && <NavigationBar />}
    </div>
  )
}
