export default function createBorders({ borderWidths, colors }) {
  const borders = [
    'none',
    `${borderWidths[1]} solid ${colors.onSurface.divider}`,
    `${borderWidths[2]} solid ${colors.onSurface.divider}`,
  ]

  /* eslint-disable prefer-destructuring */
  borders.none = borders[0]
  borders.thin = borders[1]
  borders.thick = borders[2]
  /* eslint-enable prefer-destructuring */

  borders.use = type => {
    if (!borders[type]) throw new Error(`"${type}" is not a valid border type`)
    return borders[type]
  }
  borders.use.description =
    'use(key: number|string) - Gets the border style at the provided key'

  return borders
}
