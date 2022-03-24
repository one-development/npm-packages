const environment = require('../environment')

describe('environment in browser', () => {
  describe('getEnvironment', () => {
    it('should return browser', () => {
      expect(environment.getEnvironment()).toEqual({
        isBrowser: true,
        isServer: false,
      })
    })
  })
})
