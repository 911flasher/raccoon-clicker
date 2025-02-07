import { Guild } from 'features/guilds'

import { EventType } from '../../types'

interface Coords {
  x: number
  y: number
}

const angle = 30

export const calculateRotate = (coinRect: DOMRect, touch: Coords): [number, number] => {
  const coinCenterX = coinRect.left + coinRect.width / 2
  const coinCenterY = coinRect.top + coinRect.height / 2

  // Для наклона в левый верхний угол - по X + по Y -
  // Для наклона в правый верхний угол - по X + по Y +
  // Для наклона в левый нижний угол - по X - по Y -
  // Для наклона в левый верхний угол - по X - по Y +
  const angleX = (coinCenterY - touch.y) / angle
  const angleY = (touch.x - coinCenterX) / angle

  // Ограничить максимальный угол наклона
  const rotatedX = Math.max(-angle, Math.min(angle, angleX))
  const rotatedY = Math.max(-angle, Math.min(angle, angleY))

  return [rotatedX, rotatedY]
}

export const chooseIconByGuild = (guild: Guild, activeEvent: EventType): string => {
  if (activeEvent) {
    switch (activeEvent) {
      case 'dogecoin':
        return '/images/clicker/homer-doge.svg'
      case 'shiba-inu':
        return '/images/clicker/homer-shiba-inu.svg'
      case 'pepecoin':
        return '/images/clicker/homer-pepe.svg'
      default:
    }
  }

  switch (guild) {
    case Guild.Maggie:
      return '/images/clicker/maggie.svg'
    case Guild.Lisa:
      return '/images/clicker/lisa.svg'
    case Guild.Bart:
      return '/images/clicker/bart.svg'
    case Guild.Marge:
      return '/images/clicker/marge.svg'
    case Guild.Homer:
      return '/images/clicker/homer.svg'
    default:
      return '/images/clicker/maggie.svg'
  }

}

export const chooseIconPNGByGuild = (guild: Guild, activeEvent: EventType): string => {
  if (activeEvent) {
    switch (activeEvent) {
      case 'dogecoin':
        return '/images/clicker/homer-doge.png'
      case 'shiba-inu':
        return '/images/clicker/homer-shiba-inu.png'
      case 'pepecoin':
        return '/images/clicker/homer-pepe.png'
      default:
    }
  }

  switch (guild) {
    case Guild.Maggie:
      return '/images/clicker/maggie.png'
    case Guild.Lisa:
      return '/images/clicker/lisa.png'
    case Guild.Bart:
      return '/images/clicker/bart.png'
    case Guild.Marge:
      return '/images/clicker/marge.png'
    case Guild.Homer:
      return '/images/clicker/homer.png'
    default:
      return '/images/clicker/maggie.png'
  }

}
