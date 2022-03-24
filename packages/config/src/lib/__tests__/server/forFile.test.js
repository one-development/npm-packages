/**
 * @jest-environment node
 */
const forFile = require('../../forFile')
const { globalKey, serverKey } = require('../../../utils/constants')
const { setInGlobal } = require('../../../utils/environment')

describe('lib/forFile on server', () => {
  it('should return a string with a config method that returns fields', () => {
    const config = { foo: 'bar' }
    setInGlobal(globalKey, config)
    const expected = `
const config = ${JSON.stringify(config)} || {}
module.exports = {
  config() {
    return config
  },
  get(key) {
    return config[key]
  },
}
`
    expect(forFile()).toEqual(expected)
  })
  it('should return a string with a config method that excludes server fields', () => {
    const config = { bar: 'baz' }
    setInGlobal(globalKey, {
      bar: 'baz',
      [serverKey]: {
        foo: 'bar',
      },
    })
    const expected = `
const config = ${JSON.stringify(config)} || {}
module.exports = {
  config() {
    return config
  },
  get(key) {
    return config[key]
  },
}
`
    expect(forFile()).toEqual(expected)
  })
})
