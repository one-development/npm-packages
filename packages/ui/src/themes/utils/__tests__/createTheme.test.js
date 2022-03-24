import _ from 'lodash'
import createTheme from '../createTheme'

describe('createTheme', () => {
  it('should not throw when it receives no arguments', () => {
    expect(() => createTheme()).not.toThrow()
  })

  it('should throw when it receives an invalid type', () => {
    expect(() => createTheme({ type: 'red' })).toThrow()
  })

  it('should return an object when the correct default properties', () => {
    const theme = createTheme()
    expect(_.isArray(theme.borders)).toBe(true)
    expect(_.isArray(theme.borderWidths)).toBe(true)
    expect(_.isArray(theme.breakpoints)).toBe(true)
    expect(_.isObject(theme.colors)).toBe(true)
    expect(_.isArray(theme.radii)).toBe(true)
    expect(_.isArray(theme.shadows)).toBe(true)
    expect(_.isObject(theme.sizes)).toBe(true)
    expect(_.isArray(theme.space)).toBe(true)
    expect(_.isString(theme.type)).toBe(true)
    expect(_.isObject(theme.transitions)).toBe(true)
    expect(theme.type).toBe('light')
    expect(_.isObject(theme.typography)).toBe(true)
    expect(_.isArray(theme.zIndices)).toBe(true)
  })

  it('should allow a custom type', () => {
    const theme = createTheme({ type: 'dark' })
    expect(theme.type).toBe('dark')
  })

  it('should support extra keys', () => {
    const theme = createTheme({
      settings: {
        useAlternateDetailsToolbar: false,
        useAlternateFooter: false,
        useAlternateMenu: false,
        useAlternateTopbar: false,
      },
      type: 'light',
    })
    expect(theme.settings.useAlternateDetailsToolbar).toBe(false)
    expect(theme.settings.useAlternateFooter).toBe(false)
    expect(theme.settings.useAlternateMenu).toBe(false)
    expect(theme.settings.useAlternateTopbar).toBe(false)
  })

  it('should pass a sanity check', () => {
    const theme = createTheme()
    expect(theme.space.custom(1)).toBe('8px')
  })
})
