import { InterpolationPrimitive } from '@emotion/serialize'

function getMediaQuery(size: number) {
  class MediaQuery {
    size = 0
    min = ''
    max = ''
    gt = ''

    constructor(size: number) {
      this.size = size
      this.min = `(min-width: ${this.size + 1}px)`
      this.gt = `(min-width: ${this.size + 1}px)`
      this.max = `(max-width: ${this.size}px)`
    }
    toString() {
      return this.max
    }
    css(css: InterpolationPrimitive): InterpolationPrimitive {
      return {
        [`@media ${this.max}`]: css,
      }
    }
  }

  return new MediaQuery(size)
}

export const xSmallThreshold = 320

export const smallThreshold = 425
export const mobileThreshold = 768
export const largeThreshold = 1024
export const xLargeThreshold = 1440
export const xxLargeThreshold = 1600
export const xxxLargeThreshold = 1920

export const BREAKPOINTS = {
  /** 320px */
  XS: getMediaQuery(xSmallThreshold),
  /** 425px */
  SM: getMediaQuery(smallThreshold),
  /** 768px */
  MD: getMediaQuery(mobileThreshold),
  /** 1024px */
  LG: getMediaQuery(largeThreshold),
  /** 1440px */
  XL: getMediaQuery(xLargeThreshold),
  // 1600px
  XXL: getMediaQuery(xxLargeThreshold),
  // 1920px
  XXXL: getMediaQuery(xxxLargeThreshold),
}
