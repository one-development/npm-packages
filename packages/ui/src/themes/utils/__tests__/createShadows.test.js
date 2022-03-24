import _ from 'lodash'
import createShadows from '../createShadows'

describe('createShadows', () => {
  const xs = '0 1px 4px rgba(0,0,0,0.16)'
  const sm = '0 2px 8px rgba(0,0,0,0.16)'
  const md = '0 4px 16px rgba(0,0,0,0.16)'
  const lg = '0 8px 24px rgba(0,0,0,0.16)'
  const xl = '0 20px 32px rgba(0,0,0,0.16)'

  it('should not throw an error when receiving an empty argument', () => {
    expect(() => createShadows()).not.toThrow()
  })

  it('should return a function with the correct default values', () => {
    const shadows = createShadows()

    expect(shadows[0]).toBe('none')
    expect(shadows[1]).toBe(xs)
    expect(shadows[2]).toBe(sm)
    expect(shadows[3]).toBe(md)
    expect(shadows[4]).toBe(lg)
    expect(shadows[5]).toBe(xl)

    expect(shadows.none).toBe('none')
    expect(shadows.xs).toBe(xs)
    expect(shadows.sm).toBe(sm)
    expect(shadows.md).toBe(md)
    expect(shadows.lg).toBe(lg)
    expect(shadows.xl).toBe(xl)

    expect(_.isArray(shadows)).toBe(true)
  })

  it('should return the provided "type"', () => {
    const shadows = createShadows()
    expect(shadows.use(5)).toBe(xl)
  })

  it('should throw when an invalid "type" is provided', () => {
    const shadows = createShadows()
    expect(() => shadows.use('foo')).toThrow()
  })
})
