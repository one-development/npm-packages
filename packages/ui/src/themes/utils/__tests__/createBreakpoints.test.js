import _ from 'lodash'
import createBreakpoints from '../createBreakpoints'

describe('createBreakpoints', () => {
  it('should not throw an error when receiving an empty argument', () => {
    expect(() => createBreakpoints()).not.toThrow()
  })

  it('should return a function with the correct default values', () => {
    const breakpoints = createBreakpoints()
    expect(breakpoints.unit).toBe('px')
    expect(breakpoints.xl).toBe('1920px')
    expect(breakpoints.lg).toBe('1280px')
    expect(breakpoints.md).toBe('960px')
    expect(breakpoints.sm).toBe('600px')
    expect(breakpoints.xs).toBe('360px')
    expect(_.isArray(breakpoints)).toBe(true)
    expect(typeof breakpoints.above).toBe('function')
    expect(typeof breakpoints.below).toBe('function')
    expect(typeof breakpoints.between).toBe('function')
  })

  it('should return a min-width media query when above is called', () => {
    const breakpoints = createBreakpoints()
    expect(breakpoints.above('xl')).toBe('@media (min-width:1920px)')
    expect(breakpoints.above('lg')).toBe('@media (min-width:1280px)')
    expect(breakpoints.above('md')).toBe('@media (min-width:960px)')
    expect(breakpoints.above('sm')).toBe('@media (min-width:600px)')
    expect(breakpoints.above('xs')).toBe('@media (min-width:360px)')
  })

  it('should return a max-width media query when below is called', () => {
    const breakpoints = createBreakpoints()
    expect(breakpoints.below('xl')).toBe('@media (max-width:1919px)')
    expect(breakpoints.below('lg')).toBe('@media (max-width:1279px)')
    expect(breakpoints.below('md')).toBe('@media (max-width:959px)')
    expect(breakpoints.below('sm')).toBe('@media (max-width:599px)')
    expect(breakpoints.below('xs')).toBe('@media (max-width:359px)')
  })

  it('should return a min-width and max-width media query when between is called', () => {
    const breakpoints = createBreakpoints()
    expect(breakpoints.between('sm', 'md')).toBe(
      '@media (min-width:600px) and (max-width:959px)'
    )
  })
})
