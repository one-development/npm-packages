/**
 * @jest-environment node
 */
const config = require('../../config')
const extend = require('../../extend')
const forBrowser = require('../../forBrowser')
const initialize = require('../../initialize')

beforeEach(() => {
  initialize({})
})

describe('extend on server', () => {
  it('should extend global and add a default server prop when omitted', () => {
    extend({ foo: 'bar' })
    expect(config()).toEqual({
      foo: 'bar',
    })
    expect(typeof window === 'undefined').toBe(true)
  })

  it('should extend global and apply the server prop when provided', () => {
    const updates = {
      hey: 'ho',
      server: {
        private: true,
      },
    }
    extend(updates)
    expect(config()).toEqual(updates)
    expect(typeof window === 'undefined').toBe(true)
  })

  it('should do nothing when updates is not an object', () => {
    const updates = 7
    extend(updates)
    expect(config()).toEqual({})
  })

  it('should not apply updates after forBrowser has been called', () => {
    const updates = { foo: 'bar' }
    const browserConfig = forBrowser()
    extend(updates)
    expect(config()).toEqual(browserConfig)
  })

  it('should apply updates after forBrowser has been called when dangerously is true', () => {
    const updates = { foo: 'bar' }
    const browserConfig = forBrowser()
    extend(updates, true)
    expect(config()).toEqual({ foo: 'bar' })
    expect(config()).not.toEqual(browserConfig)
  })
})
