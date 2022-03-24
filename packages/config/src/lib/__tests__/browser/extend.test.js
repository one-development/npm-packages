const extend = require('../../extend')
const config = require('../../config')
const freeze = require('../../freeze')
const initialize = require('../../initialize')

beforeEach(() => {
  initialize({})
})

describe('extend in browser', () => {
  it('should not extend window when dangerously is false', () => {
    const updates = { foo: 'bar' }
    extend(updates)
    expect(config()).toEqual({})
  })

  it('should not extend window after frozen() has been called and dangerously is true', () => {
    const updates = { foo: 'bar' }
    freeze()
    extend(updates, true)
    expect(config()).toEqual({})
  })

  it('should extend window when dangerously is true', () => {
    const updates = { foo: 'bar' }
    extend(updates, true)
    expect(config()).toEqual({ foo: 'bar' })
  })
})
