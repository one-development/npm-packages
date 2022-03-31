import _ from 'lodash'
import createSizes from '../createSizes'

describe('createSizes', () => {
  it('should not throw an error when receiving an empty argument', () => {
    expect(() => createSizes()).not.toThrow()
  })

  it('should return a function with the correct default values', () => {
    const sizes = createSizes()
    expect(sizes.badgeHeight).toBe('36px')
    expect(sizes.inputHeight).toBe('44px')
    expect(sizes.componentHeight).toBe('48px')
    expect(sizes.appbarHeight).toBe('72px')
    expect(_.isObject(sizes)).toBe(true)
  })

  it('should return the provided "type"', () => {
    const sizes = createSizes()
    expect(sizes.use('badgeHeight')).toBe('36px')
  })

  it('should throw when an invalid "type" is provided', () => {
    const sizes = createSizes()
    expect(() => sizes.use('foo')).toThrow()
  })
})
