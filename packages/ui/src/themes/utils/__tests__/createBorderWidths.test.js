import _ from 'lodash'
import createBorderWidths from '../createBorderWidths'

describe('createBorderWidths', () => {
  it('should not throw when it receives no arguments', () => {
    expect(() => createBorderWidths()).not.toThrow()
  })

  it('should return an object with the correct properties', () => {
    const borders = createBorderWidths()

    expect(_.isArray(borders)).toBe(true)
    expect(borders[0]).toBe('0px')
    expect(borders[1]).toBe('1px')
    expect(borders[2]).toBe('2px')
    expect(borders.none).toBe('0px')
    expect(borders.thin).toBe('1px')
    expect(borders.thick).toBe('2px')
    expect(_.isFunction(borders.use)).toBe(true)
  })

  it('should define a use function that throws when receiving a bad type', () => {
    const borders = createBorderWidths()

    expect(() => borders.use('foo')).toThrow()
  })

  it('should define a use function that returns the correct value for a type', () => {
    const borders = createBorderWidths()

    expect(borders.use('thin')).toBe('1px')
  })
})
