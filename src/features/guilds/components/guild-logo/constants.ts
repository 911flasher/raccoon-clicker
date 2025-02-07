import { i18next } from 'features/localization'

import { Guild } from '../../constants'

interface ConfigByGuild {
  image: string
  name: string
}

export const getConfigByGuild = (guild: Guild): ConfigByGuild => {
  const configs = {
    [Guild.Maggie]: {
      image: '/images/guilds/maggie.svg',
      png: '/images/guilds/maggie.png',
      name: i18next.t('Maggie'),
    },
    [Guild.Lisa]: {
      image: '/images/guilds/lisa.svg',
      png: '/images/guilds/lisa.png',
      name: i18next.t('Lisa'),
    },
    [Guild.Bart]: {
      image: '/images/guilds/bart.svg',
      png: '/images/guilds/bart.png',
      name: i18next.t('Bart'),
    },
    [Guild.Marge]: {
      image: '/images/guilds/marge.svg',
      png: '/images/guilds/marge.png',
      name: i18next.t('Marge'),
    },
    [Guild.Homer]: {
      image: '/images/guilds/homer.svg',
      png: '/images/guilds/homer.png',
      name: i18next.t('Homer'),
    },
  }

  return configs[guild]
}
