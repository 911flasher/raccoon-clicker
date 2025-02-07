export interface RouletteItemResponse {
  type: 'coin' | 'nothing'
  value: number
}

export interface GetRouletteResponse {
  success: boolean
  response: {
    available: RouletteItemResponse[]
  }
}

export interface SpinRouletteErrorResponse {
  success: boolean
  error: {
    code: number
    type: 'wheel_already_spun'
    message: 'The wheel has already been spun in the last 24 hours'
    path: '/v1/telegram/user/roulette'
  }
}

export interface SpinRouletteResponse {
  success: boolean
  response: {
    available: RouletteItemResponse[]
    won: RouletteItemResponse
  }
}
