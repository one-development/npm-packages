const constants = require('../../../utils/constants')
const config = require('../../config')
const initialize = require('../../initialize')

beforeEach(() => {
  window[constants.globalKey] = {}
  global[constants.globalKey] = {}
})

describe('config in browser', () => {
  it('should return the window config without internal keys', () => {
    initialize({ foo: 'bar' })
    expect(config()).toEqual({ foo: 'bar' })
    expect(config()).not.toEqual(window[constants.globalKey])
  })

  it('should return the window config without server key', () => {
    initialize({ __server: { private: 'HSA' }, foo: 'bar' })
    expect(config()).toEqual({ foo: 'bar' })
    expect(config()).not.toEqual(window[constants.globalKey])
  })

  it('should not return global config', () => {
    global[constants.globalKey] = {
      foo: 'bar',
    }
    initialize({})
    expect(config()).not.toEqual({ foo: 'bar' })
  })
})
