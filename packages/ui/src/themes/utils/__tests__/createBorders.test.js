import _ from 'lodash'
import createBorders from '../createBorders'
import createBorderWidths from '../createBorderWidths'
import createColors from '../createColors'

describe('createBorders', () => {
  it('should throw when it receives no arguments', () => {
    expect(() => createBorders()).toThrow()
  })

  it('should return an object with the correct properties', () => {
    const colors = createColors()
    const borderWidths = createBorderWidths()
    const borders = createBorders({ borderWidths, colors })

    expect(_.isArray(borders)).toBe(true)
    expect(borders[0]).toBe('none')
    expect(borders[1]).toBe(
      `${borderWidths[1]} solid ${colors.onSurface.divider}`
    )
    expect(borders[2]).toBe(
      `${borderWidths[2]} solid ${colors.onSurface.divider}`
    )
    expect(borders.none).toBe('none')
    expect(borders.thin).toBe(
      `${borderWidths[1]} solid ${colors.onSurface.divider}`
    )
    expect(borders.thick).toBe(
      `${borderWidths[2]} solid ${colors.onSurface.divider}`
    )
    expect(_.isFunction(borders.use)).toBe(true)
  })

  it('should define a use function that throws when receiving a bad type', () => {
    const colors = createColors()
    const borderWidths = createBorderWidths()
    const borders = createBorders({ borderWidths, colors })

    expect(() => borders.use('foo')).toThrow()
  })

  it('should define a use function that returns the correct value for a type', () => {
    const colors = createColors()
    const borderWidths = createBorderWidths()
    const borders = createBorders({ borderWidths, colors })

    expect(borders.use('thin')).toBe(
      `${borderWidths[1]} solid ${colors.onSurface.divider}`
    )
  })
})
