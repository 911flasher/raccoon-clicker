import { slides } from './constants'
import { Guild } from '../../constants'

export const numberWithinRange = (number: number, min: number, max: number): number => {
  return Math.min(Math.max(number, min), max)
}

export const getIndexByGuild = (currentGuild: Guild): number => {
  return slides.indexOf(currentGuild)
}

export const getGuildByIndex = (index: number): Guild => {
  return slides[index]
}

export const getNeighbourGuilds = (index: number): Guild[] => {
  const guildsToLoad = [index - 1, index + 1].filter((i) => i >= 0 && i < slides.length)

  return guildsToLoad.map(getGuildByIndex)
}
