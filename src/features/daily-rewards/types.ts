export interface DailyRewards {
  day: number
  isAlreadyCollected: boolean
  reward: string
}

export interface DailyBonus {
  day: number
  bonus: string
}

export interface RouletteItem {
  type: 'coin' | 'nothing'
  value: string
}
