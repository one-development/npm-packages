/**
 * @jest-environment node
 */
const constants = require('../../../utils/constants')
const initialize = require('../../initialize')

afterEach(() => {
  // eslint-disable-next-line fp/no-delete
  delete global[constants.globalKey]
})

describe('initialize on server', () => {
  it('should assign the config to global with an initial state', () => {
    initialize({})
    expect(global[constants.globalKey]).toEqual({
      [constants.stateKey]: {
        isFrozen: false,
      },
    })
  })

  it('should support custom handlers', () => {
    const customStore = {}
    const customImplementation = {
      get(key) {
        return customStore[key]
      },
      set(key, value) {
        customStore[key] = value
      },
    }
    const initialState = { foo: 'bar' }
    initialize(initialState, customImplementation)
    expect(customStore[constants.globalKey]).toEqual({
      [constants.stateKey]: {
        isFrozen: false,
      },
      foo: 'bar',
    })
    expect(global[constants.globalKey]).toBe(undefined)
  })
})
