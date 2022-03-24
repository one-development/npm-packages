import createTypography from '../createTypography'
import createFonts from '../createFonts'
import createFontSizes from '../createFontSizes'
import createFontWeights from '../createFontWeights'

const makeTypography = () =>
  createTypography({
    fonts: createFonts(),
    fontSizes: createFontSizes(),
    fontWeights: createFontWeights(),
  })

describe('createTypography', () => {
  it('should throw an error when missing arguments', () => {
    expect(() => createTypography()).toThrow()
    expect(() => createTypography({ fonts: {} })).toThrow()
    expect(() => createTypography({ fontWeights: [] })).toThrow()
    expect(() => createTypography({ fontSizes: [] })).toThrow()
  })

  it('should return an function with correct default values', () => {
    const typography = makeTypography()
    expect(typeof typography).toBe('object')
    expect(typeof typography.use).toBe('function')
    expect(typeof typography.useImportant).toBe('function')
    expect(typeof typography.remToValue).toBe('function')
  })

  it('should return styles for every font type', () => {
    const typography = makeTypography()
    expect(typeof typography.display1).toBe('object')
    expect(typeof typography.display2).toBe('object')
    expect(typeof typography.display3).toBe('object')
    expect(typeof typography.h1).toBe('object')
    expect(typeof typography.h2).toBe('object')
    expect(typeof typography.subtitle).toBe('object')
    expect(typeof typography.body).toBe('object')
    expect(typeof typography.button).toBe('object')
    expect(typeof typography.label).toBe('object')
    expect(typeof typography.caption).toBe('object')
    expect(typeof typography.overline).toBe('object')
  })

  it('should override toString methods', () => {
    const typography = makeTypography()
    const display1 = `
  font-family: neue-haas-grotesk-display, Helvetica, "Open Sans", sans-serif;
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 4.75rem;
  text-transform: none;`
    expect(`${typography.display1}`).toBe(display1)
  })

  it('should throw an error for an invalid font type', () => {
    const typography = makeTypography()
    expect(() => typography.use('red')).toThrow()
  })

  it('should return the provided font type', () => {
    const typography = makeTypography()
    expect(typeof typography.use('h1')).toBe('object')
  })

  it('should convert rem to value', () => {
    const typography = makeTypography()
    expect(typography.remToValue('16rem')).toBe(16)
  })
})
