import _ from 'lodash'

export default function createBreakpoints() {
  const unit = 'px'
  const bp = value => `${value}${unit}`
  const breakpoints = [bp(360), bp(600), bp(960), bp(1280), bp(1920)]
  breakpoints.unit = unit
  /* eslint-disable prefer-destructuring */
  breakpoints.xs = breakpoints[0]
  breakpoints.sm = breakpoints[1]
  breakpoints.md = breakpoints[2]
  breakpoints.lg = breakpoints[3]
  breakpoints.xl = breakpoints[4]
  /* eslint-enable prefer-destructuring */

  breakpoints.above = size => {
    const value = _.has(breakpoints, size) ? breakpoints[size] : size
    return `@media (min-width:${value})`
  }

  breakpoints.below = size => {
    const value = _.has(breakpoints, size) ? breakpoints[size] : size
    const raw = _.toNumber(value.replace(breakpoints.unit, ''))
    return `@media (max-width:${raw - 1}${breakpoints.unit})`
  }

  breakpoints.between = (startSize, endSize) => {
    const start = _.has(breakpoints, startSize)
      ? breakpoints[startSize]
      : startSize
    const end = _.has(breakpoints, endSize) ? breakpoints[endSize] : endSize
    const endRaw = _.toNumber(end.replace(breakpoints.unit, ''))

    return (
      `@media (min-width:${start})` +
      ` and (max-width:${endRaw - 1}${breakpoints.unit})`
    )
  }

  return breakpoints
}
