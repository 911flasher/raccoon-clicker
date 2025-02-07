/* eslint-disable @typescript-eslint/ban-ts-comment */

export const isTouch = (): boolean =>
  typeof window !== 'undefined'
    ? 'ontouchstart' in window ||
      // @ts-ignore
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      window.navigator.msMaxTouchPoints > 0
    : false
