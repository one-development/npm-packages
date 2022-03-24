import _ from 'lodash'
import createSpace from '../createSpace'

describe('createSpace', () => {
  it('should now throw an error when it is called without arguments', () => {
    expect(() => createSpace()).not.toThrow()
  })

  it('should return the correct default values', () => {
    const space = createSpace()
    expect(space.grid).toBe(8)
    expect(space.unit).toBe('px')
    expect(space.xs).toBe('4px')
    expect(space.sm).toBe('8px')
    expect(space.md).toBe('16px')
    expect(space.lg).toBe('24px')
    expect(space.xl).toBe('32px')
    expect(space.xxl).toBe('48px')
    expect(_.isArray(space)).toBe(true)
  })

  it('should accept a custom grid', () => {
    const space = createSpace({ grid: 4 })
    expect(space.custom(1)).toBe('4px')
  })

  it('should accept a custom unit', () => {
    const space = createSpace({ unit: 'em' })
    expect(space.custom(1)).toBe('8em')
  })

  it('should compute the correct value', () => {
    const space = createSpace()
    expect(space.custom(1)).toBe('8px')
    expect(space.custom(1.5)).toBe('12px')
    expect(space.custom(2)).toBe('16px')
    expect(space.custom(1, 1)).toBe('8px 8px')
    expect(space.custom(1, 1, 1)).toBe('8px 8px 8px')
    expect(space.custom(1, 1, 1, 1)).toBe('8px 8px 8px 8px')
  })

  it('should throw when it receives an incorrect value', () => {
    const nodeEnv = process.env.NODE_ENV

    process.env.NODE_ENV = 'development'
    const space = createSpace()
    // eslint-disable-next-line no-console
    console.warn = jest.fn()
    space.custom(1.56)
    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalled()
    process.env.NODE_ENV = nodeEnv
  })
})
