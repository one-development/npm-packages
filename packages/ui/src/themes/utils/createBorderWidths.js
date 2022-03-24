export default function createBorders() {
  const borderWidths = [0, 1, 2].map(b => `${b}px`)

  /* eslint-disable prefer-destructuring */
  borderWidths.none = borderWidths[0]
  borderWidths.thin = borderWidths[1]
  borderWidths.thick = borderWidths[2]
  /* eslint-enable prefer-destructuring */

  borderWidths.use = type => {
    if (!borderWidths[type])
      throw new Error(`"${type}" is not a valid border width type`)
    return borderWidths[type]
  }

  return borderWidths
}
