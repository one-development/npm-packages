import _ from 'lodash'
import createFontSizes from '../createFontSizes'

describe('createFontSizes', () => {
  it('should not throw when it receives no arguments', () => {
    expect(() => createFontSizes()).not.toThrow()
  })

  it('should return an object with the correct properties', () => {
    const fontSizes = createFontSizes()

    expect(_.isArray(fontSizes)).toBe(true)
    expect(fontSizes[0]).toBe('0.75rem')
    expect(fontSizes[1]).toBe('0.8125rem')
    expect(fontSizes[2]).toBe('0.875rem')
    expect(fontSizes[3]).toBe('1rem')
    expect(fontSizes[4]).toBe('1.25rem')
    expect(fontSizes[5]).toBe('2.75rem')
    expect(fontSizes[6]).toBe('3.75rem')
    expect(fontSizes[7]).toBe('4.5rem')
    expect(fontSizes.display1).toBe(fontSizes[7])
    expect(fontSizes.display2).toBe(fontSizes[6])
    expect(fontSizes.display3).toBe(fontSizes[5])
    expect(fontSizes.heading1).toBe(fontSizes[4])
    expect(fontSizes.heading2).toBe(fontSizes[3])
    expect(fontSizes.standard).toBe(fontSizes[2])
    expect(fontSizes.smaller).toBe(fontSizes[1])
    expect(fontSizes.smallest).toBe(fontSizes[0])
    expect(_.isFunction(fontSizes.use)).toBe(true)
  })

  it('should define a use function that throws when receiving a bad type', () => {
    const fontSizes = createFontSizes()

    expect(() => fontSizes.use('foo')).toThrow()
  })

  it('should define a use function that returns the correct value for a type', () => {
    const fontSizes = createFontSizes()

    expect(fontSizes.use('smallest')).toBe(fontSizes[0])
  })
})
