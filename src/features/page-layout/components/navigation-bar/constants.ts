import { i18next } from 'features/localization'

import boostImg from './assets/nav-boost.png'
import clickerImg from './assets/nav-clicker.png'
import earnImg from './assets/nav-earn.png'
import friendsImg from './assets/nav-friends.png'
import tasksImg from './assets/nav-tasks.png'

interface NavLink {
  imageSrc: string
  link: string
  titleKey: string
}

export const getLinks = (): NavLink[] => {
  return [
    {
      imageSrc: clickerImg,
      link: '/clicker',
      titleKey: i18next.t('Clicker'),
    },
    {
      imageSrc: boostImg,
      link: '/boosts',
      titleKey: i18next.t('Boost'),
    },
    {
      imageSrc: earnImg,
      link: '/earn',
      titleKey: i18next.t('Earn'),
    },
    {
      imageSrc: tasksImg,
      link: '/tasks',
      titleKey: i18next.t('Task'),
    },
    {
      imageSrc: friendsImg,
      link: '/friends',
      titleKey: i18next.t('Friends'),
    },
  ]
}
