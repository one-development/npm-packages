/**
 * @jest-environment node
 */
const constants = require('../../../utils/constants')
const config = require('../../config')
const initialize = require('../../initialize')

beforeEach(() => {
  global[constants.globalKey] = {}
})

describe('lib/config in browser', () => {
  it('should return the global config without internal keys', () => {
    initialize({ foo: 'bar' })
    expect(config()).toEqual({ foo: 'bar' })
    expect(config()).not.toEqual(global[constants.globalKey])
  })

  it('should return the global config with server key', () => {
    initialize({ foo: 'bar', server: { private: 'HSA' } })
    expect(config()).toEqual({ foo: 'bar', server: { private: 'HSA' } })
  })
})
