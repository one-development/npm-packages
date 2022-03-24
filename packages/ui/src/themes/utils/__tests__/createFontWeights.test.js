import _ from 'lodash'
import createFontWeights from '../createFontWeights'

describe('createFontWeights', () => {
  it('should not throw when it receives no arguments', () => {
    expect(() => createFontWeights()).not.toThrow()
  })

  it('should return an object with the correct properties', () => {
    const fontWeights = createFontWeights()

    expect(_.isArray(fontWeights)).toBe(true)
    expect(fontWeights[0]).toBe(400)
    expect(fontWeights[1]).toBe(500)
    expect(fontWeights[2]).toBe(700)
    expect(fontWeights.regular).toBe(400)
    expect(fontWeights.bolder).toBe(500)
    expect(fontWeights.boldest).toBe(700)
    expect(_.isFunction(fontWeights.use)).toBe(true)
  })

  it('should define a use function that throws when receiving a bad type', () => {
    const fontWeights = createFontWeights()

    expect(() => fontWeights.use('foo')).toThrow()
  })

  it('should define a use function that returns the correct value for a type', () => {
    const fontWeights = createFontWeights()

    expect(fontWeights.use('bolder')).toBe(500)
  })
})
