import _ from 'lodash'
import createZIndices from '../createZIndices'

describe('createZIndices', () => {
  it('should not throw an error when receiving an empty argument', () => {
    expect(() => createZIndices()).not.toThrow()
  })

  it('should return a function with the correct default values', () => {
    const zIndices = createZIndices()
    expect(zIndices[0]).toBe(1100)
    expect(zIndices[1]).toBe(1200)
    expect(zIndices[2]).toBe(1300)
    expect(zIndices[3]).toBe(1400)
    expect(zIndices[4]).toBe(1500)
    expect(zIndices.appbar).toBe(1100)
    expect(zIndices.drawer).toBe(1200)
    expect(zIndices.modal).toBe(1300)
    expect(zIndices.notification).toBe(1400)
    expect(zIndices.tooltip).toBe(1500)
    expect(_.isArray(zIndices)).toBe(true)
  })

  it('should return the provided "type"', () => {
    const zIndices = createZIndices()
    expect(zIndices.use('appbar')).toBe(1100)
  })

  it('should throw when an invalid "type" is provided', () => {
    const zIndices = createZIndices()
    expect(() => zIndices.use('foo')).toThrow()
  })
})
