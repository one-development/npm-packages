const omit = require('lodash/omit')
const constants = require('../utils/constants')
const { getEnvironment, getInGlobal } = require('../utils/environment')

function config() {
  const { isBrowser } = getEnvironment()
  const rawConfig = getInGlobal(constants.globalKey) || {}
  const omittedKeys = isBrowser
    ? [...constants.internalKeys, constants.serverKey]
    : constants.internalKeys

  return omit(rawConfig, omittedKeys)
}

module.exports = config
