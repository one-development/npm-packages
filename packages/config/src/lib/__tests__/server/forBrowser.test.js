/**
 * @jest-environment node
 */
const forBrowser = require('../../forBrowser')
const { globalKey, serverKey } = require('../../../utils/constants')
const { setInGlobal } = require('../../../utils/environment')

describe('lib/for-browser on server', () => {
  it('Should return a config without the server field', () => {
    setInGlobal(globalKey, {
      [serverKey]: {
        foo: 'bar',
      },
    })
    expect(forBrowser()).toEqual({})
  })
})
