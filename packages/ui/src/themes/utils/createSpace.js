import _ from 'lodash'

export default function createSpace({ unit = 'px', grid = 8 } = {}) {
  const isDev = process.env.NODE_ENV === 'development'
  // eslint-disable-next-line no-console
  const warn = isDev ? msg => console.warn(msg) : () => {}

  const space = [0, 0.5, 1, 2, 3, 4, 6].map(x => `${x * grid}${unit}`)

  /* eslint-disable prefer-destructuring */
  space.xs = space[1]
  space.sm = space[2]
  space.md = space[3]
  space.lg = space[4]
  space.xl = space[5]
  space.xxl = space[6]
  /* eslint-enable prefer-destructuring */
  space.grid = grid
  space.unit = unit
  space.custom = (...multipliers) => {
    if (multipliers.length > 4 || multipliers.length === 0) {
      throw new Error('space.custom received zero or more than four arguments')
    }

    return _.map(multipliers, m => {
      const result = space.grid * m
      const badInputMsg = `Multiplier "${m}" is not a valid number`
      const badResultMsg = `Multiplier "${m}" did not result in an integer`

      if (!_.isFinite(m)) throw new Error(badInputMsg)
      if (!_.isInteger(result)) warn(badResultMsg)

      return `${result}${space.unit}`
    }).join(' ')
  }

  return space
}
