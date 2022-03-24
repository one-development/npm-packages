import _ from 'lodash'
import createTransitions from '../createTransitions'

describe('createTransitions', () => {
  /* eslint-disable no-console */
  const assertConsoleError = fn => {
    const nodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    console.error = jest.fn()
    fn()
    expect(console.error).toHaveBeenCalled()
    process.env.NODE_ENV = nodeEnv
  }
  /* eslint-enable no-console */
  it('should not throw an error when receiving an empty argument', () => {
    expect(() => createTransitions()).not.toThrow()
  })

  it('should return an object with the correct default values', () => {
    const transitions = createTransitions()
    expect(_.isObject(transitions)).toBe(true)
    expect(_.isFunction(transitions.create)).toBe(true)
    expect(_.isObject(transitions.durations)).toBe(true)
    expect(_.isFunction(transitions.durations.use)).toBe(true)
    expect(_.isObject(transitions.easings)).toBe(true)
    expect(_.isFunction(transitions.easings.use)).toBe(true)
    expect(transitions.durations[0]).toBe(0)
    expect(transitions.durations[1]).toBe(150)
    expect(transitions.durations[2]).toBe(200)
    expect(transitions.durations[3]).toBe(250)
    expect(transitions.durations[4]).toBe(300)
    expect(transitions.durations[5]).toBe(375)
    expect(transitions.durations.none).toBe(0)
    expect(transitions.durations.shortest).toBe(150)
    expect(transitions.durations.shorter).toBe(200)
    expect(transitions.durations.short).toBe(250)
    expect(transitions.durations.standard).toBe(300)
    expect(transitions.durations.complex).toBe(375)
    expect(transitions.easings.easeIn).toBe('cubic-bezier(0.4, 0, 1, 1)')
    expect(transitions.easings.easeInOut).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
    expect(transitions.easings.easeOut).toBe('cubic-bezier(0.0, 0, 0.2, 1)')
    expect(transitions.easings.sharp).toBe('cubic-bezier(0.4, 0, 0.6, 1)')
  })

  it('should throw when create receives a bad props argument', () => {
    const transitions = createTransitions()
    const fn = () => transitions.create(() => {})
    assertConsoleError(fn)
  })

  it('should throw when create receives a bad options.delay argument', () => {
    const transitions = createTransitions()
    const fn = () => transitions.create('all', { delay: () => {} })
    assertConsoleError(fn)
  })

  it('should throw when create receives a bad options.duration argument', () => {
    const transitions = createTransitions()
    const fn = () => transitions.create('all', { duration: () => {} })
    assertConsoleError(fn)
  })

  it('should throw when create receives a bad options.easing argument', () => {
    const transitions = createTransitions()
    const fn = () => transitions.create('all', { easing: 7 })
    assertConsoleError(fn)
  })

  it('should return a valid transition from create', () => {
    const transitions = createTransitions()
    expect(transitions.create()).toBe(
      'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    )
  })
})
