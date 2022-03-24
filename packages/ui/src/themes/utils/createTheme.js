import createBorders from './createBorders'
import createBorderWidths from './createBorderWidths'
import createBreakpoints from './createBreakpoints'
import createColors from './createColors'
import createFonts from './createFonts'
import createFontSizes from './createFontSizes'
import createFontWeights from './createFontWeights'
import createRadii from './createRadii'
import createShadows from './createShadows'
import createSizes from './createSizes'
import createSpace from './createSpace'
import createTransitions from './createTransitions'
import createTypography from './createTypography'
import createZIndices from './createZIndices'

export default function createTheme({
  colors: colorsInput = {},
  type = 'light',
  ...extra
} = {}) {
  const types = ['light', 'dark']
  const createTypeError = () =>
    new Error(
      [
        `Invalid type: expected one of`,
        `[${types.map(t => `"${t}"`)}],`,
        `but received "${type}" instead.`,
      ].join(' ')
    )

  if (!types.includes(type)) throw createTypeError()

  const colors = createColors({ ...colorsInput, type })
  const breakpoints = createBreakpoints()
  const borderWidths = createBorderWidths()
  const borders = createBorders({ borderWidths, colors })
  const fonts = createFonts()
  const fontSizes = createFontSizes()
  const fontWeights = createFontWeights()
  const radii = createRadii()
  const shadows = createShadows()
  const sizes = createSizes()
  const space = createSpace({ grid: 8 })
  const transitions = createTransitions()
  const typography = createTypography({ fonts, fontSizes, fontWeights })
  const zIndices = createZIndices()

  return Object.freeze({
    ...extra,
    borders,
    borderWidths,
    breakpoints,
    colors,
    fonts,
    fontSizes,
    fontWeights,
    radii,
    shadows,
    sizes,
    space,
    transitions,
    type,
    typography,
    zIndices,
  })
}
