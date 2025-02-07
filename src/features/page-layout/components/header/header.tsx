import { FC, useState } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { BottomSheet } from 'core/components/bottom-sheet'
import { Portal } from 'core/components/portal'
import { Text } from 'core/components/text'

import styles from './styles.module.scss'

interface Props {}

export const Header: FC<Props> = () => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false)

  const { pathname } = useLocation()
  const { t } = useTranslation()

  const handleOpen = (): void => setIsOpenedMenu(true)
  const handleClose = (): void => setIsOpenedMenu(false)

  return (
    <div className={styles.container}>
      <Text as='h3' textStyle='h3'>
        {t('Pepememe')}
      </Text>

      <button type='button' onClick={handleOpen} className={styles.menuButton}>
        <img src='/images/icons/menu.svg' alt='menu' draggable={false}/>
      </button>

      <Portal>
        <BottomSheet isOpened={isOpenedMenu} onClose={handleClose} className={styles.bottomSheetContainer}>
          <Link
            to='/profile'
            onClick={handleClose}
            className={clsx(styles.menuItem, { [styles.menuItemActive]: pathname === '/profile' })}
            style={{ borderBottom: pathname === '/leaders' ? 'none' : undefined }}
          >
            <img src='/images/icons/menu-item.svg' alt='menu item' draggable={false}/>

            <Text as='span' textStyle='h3'>
              {t('Profile')}
            </Text>
          </Link>

          <Link
            to='/leaders'
            onClick={handleClose}
            className={clsx(styles.menuItem, { [styles.menuItemActive]: pathname === '/leaders' })}
            style={{ borderBottom: pathname === '/presale' ? 'none' : undefined }}
          >
            <img src='/images/icons/menu-item.svg' alt='menu item' draggable={false}/>

            <Text as='span' textStyle='h3'>
              {t('Leaders')}
            </Text>
          </Link>

          <Link
            to='/presale'
            onClick={handleClose}
            className={clsx(styles.menuItem, { [styles.menuItemActive]: pathname === '/presale' })}
            style={{ borderBottom: pathname === '/presale' ? 'none' : undefined }}
          >
            <img src='/images/icons/menu-item.svg' alt='menu item' draggable={false}/>

            <Text as='span' textStyle='h3'>
              {t('Presale')}
            </Text>
          </Link>

          <Link
            to='/partners'
            onClick={handleClose}
            className={clsx(styles.menuItem, { [styles.menuItemActive]: pathname === '/partners' })}
          >
            <img src='/images/icons/menu-item.svg' alt='menu item' draggable={false}/>

            <Text as='span' textStyle='h3'>
              {t('Partners project')}
            </Text>
          </Link>

          <div className={styles.social}>
            <a href='/leaders' className={styles.menuButton}>
              <img src='/images/social/menu-twitter.svg' alt='menu item' draggable={false}/>
            </a>

            <a href='/leaders' className={styles.menuButton}>
              <img src='/images/social/menu-telegram.svg' alt='menu item' draggable={false}/>
            </a>
          </div>
        </BottomSheet>
      </Portal>
    </div>
  )
}
