import _ from 'lodash'
import createRadii from '../createRadii'

describe('createRadii', () => {
  it('should not throw an error when receiving an empty argument', () => {
    expect(() => createRadii()).not.toThrow()
  })

  it('should return an object with the correct default values', () => {
    const radii = createRadii()
    expect(radii[0]).toBe('0px')
    expect(radii[1]).toBe('4px')
    expect(radii[2]).toBe('8px')
    expect(radii[3]).toBe('100%')
    expect(radii.none).toBe('0px')
    expect(radii.sm).toBe('4px')
    expect(radii.lg).toBe('8px')
    expect(radii.circular).toBe('100%')
    expect(_.isObject(radii)).toBe(true)
  })

  it('should return the provided "type"', () => {
    const radii = createRadii()
    expect(radii.use('sm')).toBe('4px')
  })

  it('should throw when an invalid "type" is provided', () => {
    const radii = createRadii()
    expect(() => radii.use('foo')).toThrow()
  })
})
