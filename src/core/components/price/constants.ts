import { BalanceType } from 'features/settings'

export const coinIcons: Record<BalanceType, { icon: string; alt: string }> = {
  [BalanceType.Donuts]: {
    icon: '/images/icons/coin.svg',
    alt: 'Donuts',
  },
  [BalanceType.Beer]: {
    icon: '/images/profile/beer.png',
    alt: 'Beer',
  },
  [BalanceType.Dogecoin]: {
    icon: '/images/profile/doge.png',
    alt: 'Dogecoin',
  },
  [BalanceType.Pepecoin]: {
    icon: '/images/profile/pepe.png',
    alt: 'Pepecoin',
  },
  [BalanceType.ShibaInu]: {
    icon: '/images/profile/shiba.png',
    alt: 'Shiba Inu',
  },
}
